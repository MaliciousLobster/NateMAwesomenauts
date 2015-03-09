game.SpendExp = me.ScreenObject.extend({
	/**	
	 *  action to perform on state change
	 */
	onResetEvent: function() {	
		me.game.world.addChild(new me.Sprite(0, 0, me.loader.getImage('exp-screen')), -10); //adds the background, the -10 is the layer

		

		me.game.world.addChild(new (me.Renderable.extend({ //Starts a new game, resets all variables
			init: function(){
				this._super(me.Renderable, 'init',[270, 240, 300, 50]);
				this.font = new me.Font("Comic Sans MS", 46, "white"); //sets the font
			},

			draw: function(renderer){
				this.font.draw(renderer.getContext(), "SPEND EXP", this.pos.x, this.pos.y); //puts "Such Awesomenauts" at those coordinates
				
			}
		})));
	},
	
	
	/**	
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent: function() { //when the state changes to PLAy
		
	}
});
