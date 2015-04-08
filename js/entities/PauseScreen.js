game.PauseScreen = Object.extend({
	init: function(x, y, settings){
		this.now = new Date().getTime();//a timer
		this.lastPause = new Date().getTime(); //keeps track of the last time a creep happened
		this.pause = false;
		this.alwaysUpdate = true;
		this.updateWhenPaused = true;
	},
	update: function(){
		this.now = new Date().getTime();//a timer
		if(me.input.isKeyPressed("pause") && this.now-this.lastPause >= 1000){
			this.lastPause = this.now;
			if(!this.pause){
				this.pause();
			}else{
				this.unpause(); 
				console.log("the game is not paused");
			}
		}
		this.checkBuyKeys();

		return true;
	},

	pause: function(){
		this.pause = true;
		me.state.pause(me.state.PLAY);
		game.data.pausePos = me.game.viewport.localToWorld(0, 0); //sets to current location, keeps track of player's position
		game.data.buyscreen	 = new me.Sprite(game.data.pausePos.x, game.data.pausePos.y, me.loader.getImage("gold-screen")); //sets up the  gold screen
		game.data.buyscreen.updateWhenPaused = true;
		game.data.buyscreen.setOpacity(0.85);
		me.game.world.addChild(game.data.buyscreen, 34);//adds buy screen
		game.data.player.body.setVelocity(0, 0); //makes player stop moving
	},

	unpause: function(){
		this.buying = false;
		me.state.resume(me.state.PLAY);
		game.data.player.body.setVelocity(game.data.playerMoveSpeed, 20); //returns the player's movement
		me.game.world.removeChild(game.data.buyscreen); //removes the buyscreen
	}
)};