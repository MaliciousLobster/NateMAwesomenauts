game.LoadProfile = me.ScreenObject.extend({
	/**	
	 *  action to perform on state change
	 */
	onResetEvent: function() {	
		me.game.world.addChild(new me.Sprite(0, 0, me.loader.getImage('old-screen')), -10); //adds the background, the -10 is the layer

		me.input.unbindKey(me.input.KEY.B);
		me.input.unbindKey(me.input.KEY.Q);
		me.input.unbindKey(me.input.KEY.E);
		me.input.unbindKey(me.input.KEY.W);
		me.input.unbindKey(me.input.KEY.A);
		var exp1cost = ((game.data.exp1 + 1)*10);

		me.game.world.addChild(new (me.Renderable.extend({ //Starts a new game, resets all variables
			init: function(){
				this._super(me.Renderable, 'init',[10, 10, 300, 50]);
				this.font = new me.Font("Comic Sans MS", 26, "white"); //sets the font
			},

			draw: function(renderer){
				this.font.draw(renderer.getContext(), "ENTER USERNAME AND PASSWORD", this.pos.x, this.pos.y); //puts "Such Awesomenauts" at those coordinates
			}
		})));
	},
	
	/**	
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent: function() {
		
	
	}
});
