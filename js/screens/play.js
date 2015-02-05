game.PlayScreen = me.ScreenObject.extend({
	/**
	 *  action to perform on state change
	 */
	onResetEvent: function() {
		// reset the score
		game.data.score = 0;

		me.levelDirector.loadLevel("level01"); //loads the map
 
		var player = me.pool.pull("player", 0, 420, {});//loads the player by pulling on an instance of it
		me.game.world.addChild(player, 5); //5 is the layer number

		me.input.bindKey(me.input.KEY.D, "right"); //associates RIGHT with "right"
		me.input.bindKey(me.input.KEY.A, "left"); //associates LEFT with "left"
		me.input.bindKey(me.input.KEY.SPACE, "attack"); //associates MOUSE1 with "attack"
		me.input.bindKey(me.input.KEY.W, "jump"); //associates W with "jump"

		// add our HUD to the game world
		this.HUD = new game.HUD.Container();
		me.game.world.addChild(this.HUD);
	},


	/**
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent: function() {
		// remove the HUD from the game world
		me.game.world.removeChild(this.HUD);
	}
});
