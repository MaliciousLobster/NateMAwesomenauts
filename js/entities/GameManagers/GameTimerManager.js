game.GameTimerManager = Object.extend({
	init: function(x, y, settings){
		this.now = new Date().getTime();//a timer
		this.lastCreep = new Date().getTime(); //keeps track of the last time a creep happened
		this.lastCreep2 = new Date().getTime();
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
			game.data.gold += (10 + 1);
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
		if(Math.round(this.now/1000)%10 ===0 && (this.now - this.lastCreep2 >= 1000)){
			this.lastCreep2 = this.now;
			var creepp = me.pool.pull("PlayerCreep", 0, 0, {});
			me.game.world.addChild(creepp, 6);
		}
	}
});
