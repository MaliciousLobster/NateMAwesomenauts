game.PlayerEntity = me.Entity.extend ({
	init: function(x, y, settings){
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


		this.type = "PlayerEntity";

		this.health = game.data.playerHealth;

		this.body.setVelocity(game.data.playerMoveSpeed, 14); //moves five units right
		me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH); //makes it so the window always follows the character on BOTH axis

		this.now = new Date().getTime();
		this.lastHit = this.now;
		this.lastAttack = new Date().getTime();
		this.facing ="right"; //keeps track of the direction of the character

		this.renderable.addAnimation("idle", [78]); //animation for when the character is not moving
		this.renderable.addAnimation("attack", [65, 66, 67, 68, 69, 70, 71, 72]);
		this.renderable.addAnimation("walk", [117, 118, 119, 120, 121, 122, 123, 124, 125], 80); //walking animation for character using the OrcSpear sprite sheet

		this.renderable.setCurrentAnimation("idle"); //sets the default animation to "idle"

	},

	update: function(delta){
		this.now = new Date().getTime(); //keeps track of the timer

		if(this.health <=0){ //if the character's health is less than zero
			this.dead = true; //the character is dead
		}

		if(me.input.isKeyPressed("right")){ //checks if the right key is pressed
			//adds to the position of the x by adding the velocity defined above in setVelocity() and multiplying
			//it by me.timer.tick
			//me.time.tick makes movement smooth
			this.facing = "right";
			this.body.vel.x += this.body.accel.x * me.timer.tick;
			this.flipX(true);
		}
		else if(me.input.isKeyPressed("left")){
			this.facing = "left";
			this.body.vel.x -= this.body.accel.x * me.timer.tick;
			this.flipX(false); //flips the animation so that when the character goes left, the animation goes the same way
		}
		else{
			this.body.vel.x = 0;
			
		}

		if(me.input.isKeyPressed("jump") && !this.body.jumping && !this.body.falling){ //says that you can only jump if you're not already jumping or falling
			this.body.jumping = true;
			this.body.vel.y -= this.body.accel.y * me.timer.tick;
		}

		if(me.input.isKeyPressed("attack") && !this.body.jumping && !this.body.falling){
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

		me.collision.check(this, true, this.collideHandler.bind(this), true);

		this.body.update(delta); //delta is the change in time

		this._super(me.Entity, "update", [delta]);
		return true;
	},

	collideHandler: function(response){
		if(response.b.type === 'EnemyBaseEntity'){ //if something runs into the Enemy base, it checks some things
			var ydif = this.pos.y - response.b.pos.y; //the difference between the base's y and the player's y
			var xdif = this.pos.x - response.b.pos.x; //the difference between the base's x and the player's x


			if(ydif<-40 && ydif>-50 && xdif<70 && xdif>-35){
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
		}else if(response.b.type==='EnemyCreep'){
			var ydif = this.pos.y - response.b.pos.y; //the difference between the base's y and the player's y
			var xdif = this.pos.x - response.b.pos.x; //the difference between the base's x and the player's x

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

			if(this.renderable.isCurrentAnimation("attack") && this.now-this.lastHit >= game.data.playerTimer
				&&	(Math.abs(ydif<=40)
				&& ((xdif>0) && this.facing==="left") || ((xdif<0) && this.facing==="right")
				)){ //if I'm attacking, and I attacked one second ago, and my ydif is less than 40, and I'm facing right or left, it will attack
				this.lastHit = this.now;
				response.b.loseHealth(game.data.playerHealth);	
			}
		}
	},
	loseHealth: function(damage){
		this.health = this.health - damage;
	}
});

game.PlayerBaseEntity = me.Entity.extend({
	init: function(x, y, settings){
		this._super(me.Entity, 'init', [x, y, {
			image: "tower",
			width: 100,
			height: 100,
			spritewidth: "100",
			spriteheight: "100",
			getShape: function(){
				return (new me.Rect(0, 0, 100, 60)).toPolygon();
			}
		}]);
		this.broken = false;
		this.health = game.data.playerBaseHealth;
		this.alwaysUpdate = true; //says that even though the tower isn't on the map that it's always updating
		this.body.onCollision = this.onCollision.bind(this); //makes it so other things can collide with it

		this.type = "PlayerBase";


		this.renderable.addAnimation("idle", [0]); //animation for when the character is not moving
		this.renderable.addAnimation("broken", [1]);
		this.renderable.setCurrentAnimation("idle"); //sets the default animation to "idle"
	},

	update:function(delta){
		if(this.health <= 0){
			this.broken = true;
			this.renderable.setCurrentAnimation("broken");
		}
		this.body.update(delta);

		this._super(me.Entity, "update", [delta]);
		// return true;

	},

	loseHealth: function(damage){
		this.health = this.health - damage;
	},


	onCollision: function(){

	}
});

game.EnemyBaseEntity = me.Entity.extend({
	init: function(x, y, settings){
		this._super(me.Entity, 'init', [x, y, {
			image: "tower",
			width: 100,
			height: 100,
			spritewidth: "100",
			spriteheight: "100",
			getShape: function(){
				return (new me.Rect(0, 0, 100, 60)).toPolygon();
			}
		}]);
		this.broken = false;
		this.health = game.data.enemyBaseHealth;
		this.alwaysUpdate = true; //says that even though the tower isn't on the map that it's always updating
		this.body.onCollision = this.onCollision.bind(this); //makes it so other things can collide with it

		this.type = "EnemyBaseEntity";

		this.renderable.addAnimation("idle", [0]); //animation for when the character is not moving
		this.renderable.addAnimation("broken", [1]); //animation for when the character is not moving
		this.renderable.setCurrentAnimation("idle"); //sets the default animation to "idle"
	},

	update:function(delta){
		if(this.health <= 0){
			this.broken = true;
			this.renderable.setCurrentAnimation("broken");
		}
		this.body.update(delta);

		this._super(me.Entity, "update", [delta]);
		return true;
	},
	


	onCollision: function(){
		
	},
	loseHealth: function(){
		this.health--;	
	}
});

// game.EnemyCreep = me.Entity.extend({
// 	init: function(x, y, settings){
// 		this._super(me.Entity, 'init', [x, y, {
// 			image: "creep1",
// 			width: 32,
// 			height: 64,
// 			spritewidth: "32",
// 			spriteheight: "64",
// 			getShape: function(){
// 				return(new me.Rect(0, 0, 32, 64)).toPolygon();
// 			}
// 		}]); 
// 		this.health = 10;
// 		this.alwaysUpdate = true;
// 		this.attacking = false; //this.attacking lets us know if we are attacking
// 		this.lastAttacking = new Date().getTime(); //keeps track of when the last attack of the creep was
// 		this.lastHit = new Date().getTime(); //also keeps track if the creep hit anything
// 		this.now = new Date().getTime();
// 		this.body.setVelocity(3, 20);
// 		this.type = "EnemyCreep";
// 		this.renderable.addAnimation("walk", [3, 4, 5], 80);
// 		this.renderable.setCurrentAnimation("walk");
// 	},

// 	update: function(delta){
// 		this.now = new Date().getTime();

// 		this.body.vel.x -= this.body.accel.x * me.timer.tick;

// 		me.collision.check(this, true, this.collideHandler.bind(this), true);

// 		this.body.update(delta);

// 		this._super(me.Entity, "update", [delta]);
// 		return true;
// 	},

// 	collideHandler: function(response){
// 		if(response.b.type==='PlayerBase'){ //checks if there's a reaction with the player base
// 			this.attacking = true; //the creep is attacking
// 			// this.lastAttacking = this.now; //timer that says the last time it attacked
// 			this.body.vel.x = 0; //stops moving
// 			this.pos.x = this.pos.x + 1; //moves a little to the right
// 			if((this.now-this.lasHit >= 1000)){ //checks every second since the last hit
// 				this.lastHit = this.now;
// 				response.b.loseHealth(1); //call function that makes player lose health
// 			}
// 		}
// 	}
// });
game.EnemyCreep = me.Entity.extend({
	init: function(x,y,settings){
		this._super(me.Entity, 'init', [x,y, {
			image: "creep1", 
			width: 32,
			height: 64, 
			spritewidth: "32",
			spriteheight: "64", 
			getShape: function(){
				return (new me.Rect(0,0,32,64)).toPolygon();
			}
		}]);
		this.health = 3;
		this.alwaysUpdate = true;
		this.attacking = false;
		this.lastAttacking = new Date().getTime();
		this.lastHit = new Date().getTime();
		this.now = new Date().getTime();
		this.body.setVelocity(game.data.creepMoveSpeed,20);
		this.type = "EnemyCreep";
		this.renderable.addAnimation("walk", [3,4,5], 80);
		this.renderable.setCurrentAnimation("walk");
	},
	loseHealth: function(damage){
		this.health = this.health - damage;
	},

	update: function(delta){
		if(this.health <= 0){
			me.game.world.removeChild(this);
		}
		this.now = new Date().getTime();

		this.body.vel.x -= this.body.accel.x * me.timer.tick;

		me.collision.check(this, true, this.collideHandler.bind(this), true);

		this.body.update(delta);

		this._super(me.Entity, "update", [delta]);
		return true;
	}, 
	collideHandler: function (response){
		if (response.b.type ==='PlayerBase') {
			this.attacking = true;
			// this.lastAttacking = this.now;
			this.body.vel.x = 0;
			this.pos.x = this.pos.x + 1;
			if((this.now-this.lastHit >= game.data.creepAttackTimer)) {
				this.lastHit = this.now;
				response.b.loseHealth(game.data.enemyCreepAttack);
			}
		}else if(response.b.type=== 'PlayerEntity'){
			var xdif = this.pos.x - response.b.pos.x;
			this.attacking = true;
			// this.lastAttacking = this.now;
			
			if(xdif>0){ //checks to see if the creep hits anything
				this.pos.x = this.pos.x + 1;  //moves creep one to the right
				this.body.vel.x = 0; //stops movement
			}
			if((this.now-this.lastHit >= game.data.creepAttackTimer) && xdif>0) {
				this.lastHit = this.now;
				response.b.loseHealth(game.data.enemyCreepAttack);
			}
		};
	}
});

game.GameManager = Object.extend({
	init: function(x, y, settings){
		this.now = new Date().getTime();//a timer
		this.lastCreep = new Date().getTime(); //keeps track of the last time a creep happened

		this.alwaysUpdate = true;
	},

	update: function(){
		this.now = new Date().getTime();

		if(game.data.player.dead){ //if the player is dead
			me.game.world.removeChild(game.data.player); //removes the player
			me.state.current().resetPlayer(10, 0); //resets him
		}

		if(Math.round(this.now/1000)%10 ===0 && (this.now - this.lastCreep >= 1000)){
			this.lastCreep = this.now;
			var creepe = me.pool.pull("EnemyCreep", 1000, 0, {});
			me.game.world.addChild(creepe, 5);
		}
	return true; 
	}
});