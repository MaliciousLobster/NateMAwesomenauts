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

		this.body.setVelocity(5, 14); //moves five units right
		me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH); //makes it so the window always follows the character on BOTH axis

		this.facing ="right"; //keeps track of the direction of the character

		this.renderable.addAnimation("idle", [78]); //animation for when the character is not moving
		this.renderable.addAnimation("attack", [65, 66, 67, 68, 69, 70, 71, 72]);
		this.renderable.addAnimation("walk", [117, 118, 119, 120, 121, 122, 123, 124, 125], 80); //walking animation for character using the OrcSpear sprite sheet

		this.renderable.setCurrentAnimation("idle"); //sets the default animation to "idle"

	},

	update: function(delta){
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

		if(me.input.isKeyPressed("jump") && !this.jumping && !this.falling){ //says that you can only jump if you're not already jumping or falling
			this.jumping = true;
			this.body.vel.y -= this.body.accel.y * me.timer.tick;
		}

		if(me.input.isKeyPressed("attack")){
			if(!this.renderable.isCurrentAnimation("attack")){
				this.renderable.setCurrentAnimation("attack", "idle"); //sets current animation to attack then reverts back to idle
				this.renderable.setAnimationFrame(); //the next time this sequence starts, it begins form the first animtion and not from where it left off	
			}
		} 
		else if(this.body.vel.x !== 0) {
			if(!this.renderable.isCurrentAnimation("walk")){
				this.renderable.setCurrentAnimation("walk");
			}
		}
		else{
			this.renderable.setCurrentAnimation("idle"); //if the character isn't moving the character becomes idle
		}

		if(me.input.isKeyPressed("attack")){
			if(!this.renderable.isCurrentAnimation("attack")){
				this.renderable.setCurrentAnimation("attack", "idle"); //sets current animation to attack then reverts back to idle
				this.renderable.setAnimationFrame(); //the next time this sequence starts, it begins form the first animtion and not from where it left off
			}
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


			if(ydif<-40 && xdif<60 && xdif>-35){
				this.body.falling = false;
				this.body.vel.y = -1;
			}
			else if(xdif>-35  && this.facing === 'right' && (xdif < 0)){
				this.body.vel.x = 0;
				this.pos.x = this.pos.x - 1;
			}else if(xdif<60 && this.facing === 'left' && (xdif > 0)){
				this.body.vel.x = 0;
				this.pos.x = this.pos.x + 1;
			}
		}
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
		this.health = 10;
		this.alwaysUpdate = true; //says that even though the tower isn't on the map that it's always updating
		this.body.onCollision = this.onCollision.bind(this); //makes it so other things can collide with it

		this.type = "PlayerBaseEntity";


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
		return true;

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
		this.health = 10;
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
		
	}
});