game.PlayerEntity = me.Entity.extend ({
	init: function(x, y, settings){
		this._super(me.Entity, 'init', [x, y, {
			image: "player",
			width: 64, //size put aside for the character
			height: 64,
			spritewidth: "64", //size of the image
			spriteheight: "64", 
			getShape: function(){
				return(new me.Rect(0, 0, 64, 64)).toPolygon();	//pretty much the hitbox of the character	
			}
		}]);

		this.body.setVelocity(5, 20); //moves five units right
		me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH); //makes it so the window always follows the character on BOTH axis

		this.renderable.addAnimation("idle", [78]); //animation for when the character is not moving
		this.renderable.addAnimation("walk", [117, 118, 119, 120, 121, 122, 123, 124, 125], 80); //walking animation for character using the OrcSpear sprite sheet

		this.renderable.setCurrentAnimation("idle"); //sets the default animation to "idle"

	},

	update: function(delta){
		if(me.input.isKeyPressed("right")){ //checks if the right key is pressed
			//adds to the position of the x by adding the velocity defined above in setVelocity() and multiplying
			//it by me.timer.tick
			//me.time.tick makes movement smooth
			this.body.vel.x += this.body.accel.x * me.timer.tick;
			this.flipX(true);
		}

		else if(me.input.isKeyPressed("left")){
			this.body.vel.x -= this.body.accel.x * me.timer.tick;
			this.flipX(false); //flips the animation so that when the character goes left, the animation goes the same way
		}

		else{
			this.body.vel.x = 0;
			this.renderable.setCurrentAnimation("idle"); //if the character isn't moving the character becomes idle
		}

		if(this.body.vel.x !== 0) {
			if(!this.renderable.isCurrentAnimation("walk")){
				this.renderable.setCurrentAnimation("walk");
			}
		}

		this.body.update(delta); //delta is the change in time

		this._super(me.Entity, "update", [delta]);
		return true;
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
				return (new me.Rect(0, 0, 100, 100)).toPolygon();
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
				return (new me.Rect(0, 0, 100, 100)).toPolygon();
			}
		}]);
		this.broken = false;
		this.health = 10;
		this.alwaysUpdate = true; //says that even though the tower isn't on the map that it's always updating
		this.body.onCollision = this.onCollision.bind(this); //makes it so other things can collide with it

		this.type = "PlayerBaseEntity";

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