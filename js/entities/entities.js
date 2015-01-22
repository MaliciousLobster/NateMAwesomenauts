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

		this.body.setVelocity(5, 0); //moves five units right

	},

	update: function(delta){
		if(me.input.isKeyPressed("right")){
			this.body.vel.x += this.body.accel.x * me.timer.tick;
		}else{
			this.body.vel.x = 0;
		}

		this.body.update(delta);
		return true;
	}
});