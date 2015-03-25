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

