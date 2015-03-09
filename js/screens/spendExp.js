game.SpendExp = me.ScreenObject.extend({
	/**	
	 *  action to perform on state change
	 */
	onResetEvent: function() {	
		me.game.world.addChild(new me.Sprite(0, 0, me.loader.getImage('exp-screen')), -10); //adds the background, the -10 is the layer

		

		me.game.world.addChild(new (me.Renderable.extend({ //Starts a new game, resets all variables
			init: function(){
				this._super(me.Renderable, 'init',[10, 10, 300, 50]);
				this.font = new me.Font("Comic Sans MS", 46, "white"); //sets the font
			},

			draw: function(renderer){
				this.font.draw(renderer.getContext(), "PRESS 1-4 TO BUY, PRESS ENTER TO SKIP", this.pos.x, this.pos.y); //puts "Such Awesomenauts" at those coordinates
				this.font.draw(renderer.getContext(), "CURRENT EXP: " + game.data.exp.toString(), this.pos.x , this.pos.y + 50); //puts "Such Awesomenauts" at those coordinates
				this.font.draw(renderer.getContext(), "1 - GAIN MORE GOLD " + game.data.exp.toString(), this.pos.x , this.pos.y + 100); //puts "Such Awesomenauts" at those coordinates
				this.font.draw(renderer.getContext(), "2 - +DAMAGE " + game.data.exp.toString(), this.pos.x , this.pos.y + 150); 
				this.font.draw(renderer.getContext(), "3 - +HEALTH " + game.data.exp.toString(), this.pos.x , this.pos.y + 200); 
				this.font.draw(renderer.getContext(), "4 - +ATTACK SPEED " + game.data.exp.toString(), this.pos.x , this.pos.y + 250); 
			}
		})));
	},
	
	
	/**	
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent: function() { //when the state changes to PLAy
		
	}
});
