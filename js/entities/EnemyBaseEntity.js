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