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

	return true; 
	},

	goldTimerCheck: function(){
		if(Math.round(this.now/1000)%20 ===0 && (this.now - this.lastCreep >= 1000)){
			console.log( "Gold" + game.data.gold);
			game.data.gold += 1;
		}
	},
	
	creepTimerCheck: function(){
		if(Math.round(this.now/1000)%10 ===0 && (this.now - this.lastCreep >= 1000)){
			this.lastCreep = this.now;
			var creepe = me.pool.pull("EnemyCreep", 1000, 0, {});
			me.game.world.addChild(creepe, 5);
		}
	}
});


game.HeroDeathManager = object.extend({
	init: function(x, y, settings){
		this.alwaysUpdate = true;
	}
	update: function(){
		if(game.data.player.dead){ //if the player is dead
			me.game.world.removeChild(game.data.player); //removes the player
			me.state.current().resetPlayer(10, 0); //resets him
		}
	}
});