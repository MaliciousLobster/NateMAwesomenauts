game.ExperienceManager = Object.extend({
	init: function(x, y, settings){
		this.alwaysUpdate = true; //always update the function
		this.gameover = false;
	},
	update: function(){
		if(game.data.win === true && !this.gameover){ //if win=true add 10 exp
			this.gameOver(true);
			alert("YOU WIN");
		}else if(game.data.win === false && !this.gameover){ //if win=false add 3 exp
			this.gameOver(false);
			alert("YOU LOSE");
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


			$.ajax({
				type:"POST",
				url: "php/controller/save-user.php", //passes information into create-user.php
				data: { //looks at username id and looks at the value then calls Username
					exp: game.data.exp,
					exp1: game.data.exp1,
					exp2: game.data.exp2,
					exp3: game.data.exp3,
					exp4: game.data.exp4,
				},
				dataType: "text"
			})
			.success(function(response){
				if(response==="true"){
					me.state.change(me.state.MENU);
				}else{
					alert(response);
				}
			})
			.fail(function(respons){ //sends back message if it fails or succeeds
				alert("Fail");
			});
	}

});

