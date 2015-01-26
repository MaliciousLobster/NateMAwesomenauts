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

		this.renderable.addAnimation("idle", [78]);
		this.renderable.addAnimation("walk", [117, 118, 119, 120, 121, 122, 123, 124, 125], 80);

		this.renderable.setCurrentAnimation("idle");

	},

	update: function(delta){
		if(me.input.isKeyPressed("right")){ //checks if the right key is pressed
			//adds to the position of the x by adding the velocity defined above in setVelocity() and multiplying
			//it by me.timer.tick
			//me.time.tick makes movement smooth
			this.body.vel.x += this.body.accel.x * me.timer.tick;
			this.flipX(true);
		}else if(me.input.isKeyPressed("left")){
			this.body.vel.x -= this.body.accel.x * me.timer.tick;
		}
		else{
			this.body.vel.x = 0;
			this.renderable.setCurrentAnimation("idle");	
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