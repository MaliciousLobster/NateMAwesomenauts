game.GameTimerManager = Object.extend({
	init: function(x, y, settings){
		this.now = new Date().getTime();//a timer
		this.lastCreep = new Date().getTime(); //keeps track of the last time a creep happened
		this.paused = false;
		this.alwaysUpdate = true;
	},

	update: function(){
		this.now = new Date().getTime();

		this.goldTimerCheck();

		this.creepTimerCheck();

		this.playerCreepTimerCheck();

	return true; 
	},

	goldTimerCheck: function(){
		if(Math.round(this.now/1000)%20 ===0 && (this.now - this.lastCreep >= 1000)){
			console.log( "Gold" + game.data.gold);
			game.data.gold += (game.data.exp1 + 1);
			console.log("current gold: " + game.data.gold);
		}
	},

	creepTimerCheck: function(){
		if(Math.round(this.now/1000)%10 ===0 && (this.now - this.lastCreep >= 1000)){
			this.lastCreep = this.now;
			var creepe = me.pool.pull("EnemyCreep", 1000, 0, {});
			me.game.world.addChild(creepe, 5);
		}
	},

	playerCreepTimerCheck: function(){
		if(Math.round(this.now/1000)%10 ===0 && (this.now - this.lastCreep >= 1000)){
			this.lastCreep = this.now;
			var creepe = me.pool.pull("PlayerCreep", 1000, 0, {});
			me.game.world.addChild(creepe, 5);
		}
	}
});


game.HeroDeathManager = Object.extend({
	init: function(x, y, settings){
		this.alwaysUpdate = true;
	},
	update: function(){
		if(game.data.player.dead){ //if the player is dead
			me.game.world.removeChild(game.data.player); //removes the player
			me.state.current().resetPlayer(10, 0); //resets him
		}
		return true;
	}
});

game.ExperienceManager = Object.extend({
	init: function(x, y, settings){
		this.alwaysUpdate = true; //always update the function
		this.gameover = false;
	},
	update: function(){
		if(game.data.win === true && !this.gameover){ //if win=true add 10 exp
			this.gameOver(true);
		}else if(game.data.win === false && !this.gameover){ //if win=false add 3 exp
			this.gameOver(false);
		}
		return true;
	},
	gameOver: function(win){
		if(win){ //if win, add 10 exp
			game.data.exp += 10;
		}else{
			game.data.exp += 3;//if not, add 3 exp
		}

		game.data.exp += 10;
		this.gameover = true;
		me.save.exp = game.data.exp; //saves exp
	}

});

game.SpendGold = Object.extend({
	init: function(x, y, settings){
		this.now = new Date().getTime();//a timer
		this.lastBuy = new Date().getTime(); //keeps track of the last time a creep happened
		this.paused = false;
		this.alwaysUpdate = true;
		this.updateWhenPaused = true;
	},
	update: function(){
		this.now = new Date().getTime();//a timer
		if(me.input.isKeyPressed("buy") && this.now-this.lastBuy >= 1000){
			this.lastBuy = this.now;
			if(!this.buying){
				this.startBuying();
			}else{
				this.stopBuying();
			}
		}	
		return true;
	},
	startBuying: function(){
		this.buying = true;
		me.state.pause(me.state.PLAY);
		game.data.pausePos = me.game.viewport.localToWorld(0, 0); //sets to current location, keeps track of player's position
		game.data.buyscreen	 = new me.Sprite(game.data.pausePos.x, game.data.pausePos.y, me.loader.getImage("gold-screen")); //sets up the  gold screen
		game.data.buyscreen.updateWhenPaused = true;
		game.data.buyscreen.setOpacity(0.85);
		me.game.world.addChild(game.data.buyscreen, 34);//adds buy screen
		game.data.player.body.setVelocity(0, 0); //makes player stop moving
		me.input.bindKey(me.input.KEY.F1, "F1", true);
		me.input.bindKey(me.input.KEY.F2, "F2", true);
		me.input.bindKey(me.input.KEY.F3, "F3", true);
		me.input.bindKey(me.input.KEY.F4, "F4", true);
		me.input.bindKey(me.input.KEY.F5, "F5", true);
		me.input.bindKey(me.input.KEY.F6, "F6", true);
		this.setBuyText();

	},
	setBuyText: function(){
		game.data.buytext = new (me.Renderable.extend({ //Starts a new game, resets all variables
			init: function(){
				this._super(me.Renderable, 'init',[game.data.pausePos.x, game.data.pausePos.y, 300, 50]);
				this.font = new me.Font("Comic Sans MS", 26, "white"); //sets the font
				this.updateWhenPaused = true;
				this.alwaysUpdate = true;
			},

			draw: function(renderer){
				this.font.draw(renderer.getContext(), "PRESS F1-F6 TO BUY, PRESS B TO SKIP", this.pos.x, this.pos.y); //puts "Such Awesomenauts" at those coordinate
			}
		}));
		me.game.world.addChild(game.data.buytext, 35);
	},
	stopBuying: function(){
		this.buying = false;
		me.state.resume(me.state.PLAY);
		game.data.player.body.setVelocity(game.data.playerMoveSpeed, 20); //returns the player's movement
		me.game.world.removeChild(game.data.buyscreen); //removes the buyscreen
		me.input.unbindKey(me.input.KEY.F1, "F1", true);
		me.input.unbindKey(me.input.KEY.F2, "F2", true);
		me.input.unbindKey(me.input.KEY.F3, "F3", true);
		me.input.unbindKey(me.input.KEY.F4, "F4", true);
		me.input.unbindKey(me.input.KEY.F5, "F5", true);
		me.input.unbindKey(me.input.KEY.F6, "F6", true);
		me.game.world.removeChild(game.data.buytext);
	}
});