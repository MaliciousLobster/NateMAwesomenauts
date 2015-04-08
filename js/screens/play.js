game.PlayScreen = me.ScreenObject.extend({
	/**
	 *  action to perform on state change
	 */
	onResetEvent: function() {
		// reset the score
		game.data.score = 0;

		me.levelDirector.loadLevel("level01"); //loads the map

		this.resetPlayer(10, 50, 2500);
 
		var gameTimerManager = me.pool.pull("GameTimerManager", 0, 0, {});
		me.game.world.addChild(gameTimerManager, 0);

		var heroDeathManager = me.pool.pull("HeroDeathManager", 0, 0, {});
		me.game.world.addChild(heroDeathManager, 0);

		var experienceManager = me.pool.pull("ExperienceManager", 0, 0, {});
		me.game.world.addChild(experienceManager, 0);

		var spendGold = me.pool.pull("SpendGold", 0, 0, {});
		me.game.world.addChild(spendGold, 0);

		var pauseScreen = me.pool.pull("PauseScreen", 0, 0, {});
		me.game.world.addChild(pauseScreen, 0);

		game.data.minimap = me.pool.pull("MiniMap", 10, 10, {});
		me.game.world.addChild(game.data.minimap, 30);	

		me.input.bindKey(me.input.KEY.F9, "pause");
		me.input.bindKey(me.input.KEY.B, "buy");
		me.input.bindKey(me.input.KEY.Q, "skill1");
		me.input.bindKey(me.input.KEY.R, "skill2");
		me.input.bindKey(me.input.KEY.E, "skill3");
		me.input.bindKey(me.input.KEY.D, "right"); //associates RIGHT with "right"
		me.input.bindKey(me.input.KEY.A, "left"); //associates LEFT with "left"
		me.input.bindKey(me.input.KEY.SPACE, "attack"); //associates MOUSE1 with "attack"
		me.input.bindKey(me.input.KEY.W, "jump"); //associates W with "jump"

		// add our HUD to the game world
		this.HUD = new game.HUD.Container();
		me.game.world.addChild(this.HUD);

		//me.audio.playTrack("katy1");
	},


	/**
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent: function() {
		// remove the HUD from the game world
		me.game.world.removeChild(this.HUD);
	},

	resetPlayer: function(x, y){
		game.data.player = me.pool.pull("player", x, y, {});//loads the player by pulling on an instance of it
		me.game.world.addChild(game.data.player, 5); //5 is the layer number
		game.data.miniPlayer = me.pool.pull("miniplayer", 10, 10, {});
		me.game.world.addChild(game.data.miniPlayer, 31);
	}

});
