game.HeroDeathManager = Object.extend({
	init: function(x, y, settings){
		this.alwaysUpdate = true;
	},
	update: function(){
		if(game.data.player.dead){ //if the player is dead
			me.game.world.removeChild(game.data.player); //removes the player
			me.state.current().resetPlayer(0, 5700); //resets him
		}
		return true;
	}
});