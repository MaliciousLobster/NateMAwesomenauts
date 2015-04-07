game.PlayerEntity = me.Entity.extend ({
	init: function(x, y, settings){
		this.setSuper(x, y);
		this.setPlayerTimers();
		this.setAttributes();
		this.setFlags();
		
		me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH); //makes it so the window always follows the character on BOTH axis

		this.setAnimation();


		this.type = "PlayerEntity";
		
		this.attack = game.data.playerAttack;
		
		this.renderable.setCurrentAnimation("idle"); //sets the default animation to "idle"

	},

	setSuper:function(x, y){
		this._super(me.Entity, 'init', [x, y, {
			image: "player",
			width: 64, //size put aside for the character
			height: 64,
			spritewidth: "64", //size of the image
			spriteheight: "64", 
			getShape: function(){
				return(new me.Rect(0, 0, 64, 50)).toPolygon();	//pretty much the hitbox of the character	
			}
		}]);
	},

	setPlayerTimers: function(){
		this.now = new Date().getTime();
		this.lastHit = this.now;
		this.lastSpear = this.now;
		this.lastAttack = new Date().getTime();
	},

	setAttributes: function(){
		this.health = game.data.playerHealth;
		this.body.setVelocity(game.data.playerMoveSpeed, 14); //moves five units right
	},

	setFlags: function(){ 
		this.dead = false; 
		this.facing ="right";
		//keeps track of the direction of the character
	 },

	update: function(delta){
		this.now = new Date().getTime(); //keeps track of the timer

		this.dead = this.checkIfDead();

		this.checkKeyPressesAndMove();

		this.checkAbilityKeys();

		this.setAnimation();

		me.collision.check(this, true, this.collideHandler.bind(this), true);

		this.body.update(delta); //delta is the change in time

		this._super(me.Entity, "update", [delta]);
		return true;
	},

	checkIfDead: function(){
		if(this.health <=0){ //if the character's health is less than zero
			return true; //the character is dead
		}
	},

	checkKeyPressesAndMove: function(){
		if(me.input.isKeyPressed("right")){ //checks if the right key is pressed
			this.moveRight();
		}
		else if(me.input.isKeyPressed("left")){
			this.moveLeft();
		}
		else{
			this.body.vel.x = 0;
		}
		if(me.input.isKeyPressed("jump") && !this.body.jumping && !this.body.falling){ //says that you can only jump if you're not already jumping or falling
			this.jump();
		}

		this.attacking = me.input.isKeyPressed("attack") && !this.body.jumping && !this.body.falling;
	},

	moveRight: function(){
		//adds to the position of the x by adding the velocity defined above in setVelocity() and multiplying
		//it by me.timer.tick
		//me.time.tick makes movement smooth
		this.facing = "right";
		this.body.vel.x += this.body.accel.x * me.timer.tick;
		this.flipX(true);
	},

	moveLeft: function(){
		this.facing = "left";
		this.body.vel.x -= this.body.accel.x * me.timer.tick;
		this.flipX(false); //flips the animation so that when the character goes left, the animation goes the same way
	},

	jump: function(){
		this.body.jumping = true;
		this.body.vel.y -= this.body.accel.y * me.timer.tick;
	},
 
	checkAbilityKeys: function(){
		if(me.input.isKeyPressed("skill1")){
			//this.speedBurst();
		}else if(me.input.isKeyPressed("skill2")){
			//this.eatCreep();
		}else if(me.input.isKeyPressed("skill3")){
			this.throwSpear();
		}
	},

	throwSpear: function(){
		if((this.now - this.lastSpear) >= game.data.spearTimer && game.data.ability3 > 0){
			this.lastSpear = this.now;
			var spear = me.pool.pull("spear", this.pos.x, this.pos.y, {}, this.facing);
			me.game.world.addChild(spear, 10);
		}
	},

	setAnimation: function(){
		this.renderable.addAnimation("idle", [78]); //animation for when the character is not moving
		this.renderable.addAnimation("attack", [65, 66, 67, 68, 69, 70, 71, 72]);
		this.renderable.addAnimation("walk", [117, 118, 119, 120, 121, 122, 123, 124, 125], 80); //walking animation for character using the OrcSpear sprite sheet

		if(this.attacking){
			if(!this.renderable.isCurrentAnimation("attack")){
				this.renderable.setCurrentAnimation("attack", "idle"); //sets current animation to attack then reverts back to idle
				this.renderable.setAnimationFrame(); //the next time this sequence starts, it begins form the first animtion and not from where it left off	
			}
		} 
		else if(this.body.vel.x !== 0 && !this.renderable.isCurrentAnimation("attack")) {
			if(!this.renderable.isCurrentAnimation("walk")){
				this.renderable.setCurrentAnimation("walk");
			}
		}
		else if(!this.renderable.isCurrentAnimation("attack")){
			this.renderable.setCurrentAnimation("idle"); //if the character isn't moving the character becomes idle
		}
	},

	collideHandler: function(response){
		this.collideWithEnemyBase(response);

		this.collideWithEnemyCreep(response);

	},

	collideWithEnemyBase: function(response){
		if(response.b.type === 'EnemyBaseEntity'){ //if something runs into the Enemy base, it checks some things
			var ydif = this.pos.y - response.b.pos.y; //the difference between the base's y and the player's y
			var xdif = this.pos.x - response.b.pos.x; //the difference between the base's x and the player's x

			if(ydif<-30 && ydif>-40 && xdif<60 && xdif>-45){
				this.body.falling = false;
				this.body.vel.y = -1;
			}
			else if(xdif>-15  && this.facing === 'right' && (xdif < 0)){
				this.body.vel.x = 0;
				this.pos.x = this.pos.x - 1;
			}else if(xdif<50 && this.facing === 'left' && (xdif > 0)){
				this.body.vel.x = 0;
				this.pos.x = this.pos.x + 1;
			}

			if(this.renderable.isCurrentAnimation("attack") && this.now-this.lastHit >= game.data.playerTimer){ //checks to see if there's been 400 miliseconds since the base was last hit
				this.lastHit = this.now;
				response.b.loseHealth(game.data.playerHealth);
			}	
		}		
	},	

	collideWithEnemyCreep: function(response){
		var ydif = this.pos.y - response.b.pos.y; //the difference between the base's y and the player's y
		var xdif = this.pos.x - response.b.pos.x; //the difference between the base's x and the player's x

		this.stopMovement(xdif);

		if(this.checkAttack(xdif, ydif)){
			this.hitCreep(response);
		};

		
	},

	stopMovement: function(xdif){
		if(xdif > 0){ //makes it so you can't walk through the creep without doing damage
			this.pos.x = this.pos.x +1;
			if(this.facing==='left'){				
				this.body.vel.x = 0;	
			}
		}else{
			this.pos.x = this.pos.x -1;
			if(this.facing==='right'){
				this.body.vel.x = 0;	
			}
		}
	},

	checkAttack: function(xdif, ydif){
		if(this.renderable.isCurrentAnimation("attack") && this.now-this.lastHit >= game.data.playerTimer
			&&	(Math.abs(ydif<=40)
			&& ((xdif>0) && this.facing==="left") || ((xdif<0) && this.facing==="right")
			)){ //if I'm attacking, and I attacked one second ago, and my ydif is less than 40, and I'm facing right or left, it will attack
			this.lastHit = this.now;
			return true;
		}
		return false;
	},

	hitCreep: function(response){
		//if the creeps health is less than the attack, execute code
		if(response.b.health <= game.data.playerAttack){				
			//adds one gold for killing a creep
			game.data.gold += 1;
		}
		response.b.loseHealth(game.data.playerAttack);	
	},

	loseHealth: function(damage){
		this.health = this.health - damage;
	}
});
