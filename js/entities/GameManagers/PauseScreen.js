game.PauseScreen = Object.extend({
	init: function(x, y, settings){
		this.now = new Date().getTime();//a timer
		this.lastPause = new Date().getTime(); //keeps track of the last time a creep happened
		this.paused = false;
		this.alwaysUpdate = true;
		this.updateWhenPaused = true;
	},
	update: function(){
		this.now = new Date().getTime();//a timer
		if(me.input.isKeyPressed("pause") && this.now-this.lastPause >= 1000){
			this.lastPause = this.now;
			if(!this.paused){
				this.pause();
			}else{
				this.unpause(); 
			}
		}


		return true;
	},

	pause: function(){
		this.paused = true;
		me.state.pause(me.state.PLAY);
		game.data.pausePos = me.game.viewport.localToWorld(0, 0); //sets to current location, keeps track of player's position
		game.data.buyscreen	 = new me.Sprite(game.data.pausePos.x, game.data.pausePos.y, me.loader.getImage("gold-screen")); //sets up the  gold screen
		game.data.buyscreen.updateWhenPaused = true;
		game.data.buyscreen.setOpacity(0.90);
		me.game.world.addChild(game.data.buyscreen, 34);//adds buy screen
		game.data.player.body.setVelocity(0, 0); //makes player stop moving
		this.setPauseText();
	},

	unpause: function(){
		this.paused = false;
		me.state.resume(me.state.PLAY);
		game.data.player.body.setVelocity(game.data.playerMoveSpeed, 20); //returns the player's movement
		me.game.world.removeChild(game.data.buyscreen); //removes the buyscreen
		me.game.world.removeChild(game.data.pausetext);
	},

	setPauseText: function(){
		game.data.pausetext = new (me.Renderable.extend({ //Starts a new game, resets all variables
			init: function(){
				this._super(me.Renderable, 'init',[game.data.pausePos.x, game.data.pausePos.y, 300, 50]);
				this.font = new me.Font("Comic Sans MS", 26, "white"); //sets the font
				this.updateWhenPaused = true;
				this.alwaysUpdate = true;
			},

			draw: function(renderer){
				this.font.draw(renderer.getContext(), "THE GAME IS PAUSED", this.pos.x, this.pos.y);
				this.font.draw(renderer.getContext(), "press F9 to unpause", this.pos.x, this.pos.y + 50);
				
			}
		}));
		me.game.world.addChild(game.data.pausetext, 35);	
	}
});