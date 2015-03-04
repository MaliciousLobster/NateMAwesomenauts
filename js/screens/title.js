game.TitleScreen = me.ScreenObject.extend({
	/**	
	 *  action to perform on state change
	 */
	onResetEvent: function() {	
		me.game.world.addChild(new me.Sprite(0, 0, me.loader.getImage('title-screen')), -10); //adds the background, the -10 is the layer

		

		me.game.world.addChild(new (me.Renderable.extend({
			init: function(){
				this._super(me.Renderable, 'init',[270, 240, 300, 50]);
				this.font = new me.Font("Comic Sans MS", 46, "white"); //sets the font
				me.input.registerPointerEvent('pointerdown', this, this.newGame.bind(this), true); //when you click on the mouse, set to true
			},

			draw: function(renderer){
				this.font.draw(renderer.getContext(), "START NEW GAME", this.pos.x, this.pos.y); //puts "Such Awesomenauts" at those coordinates
				
			},

			update: function(dt){
				return true;
			},
			newGame: function(){
				me.input.releasePointerEvent('pointerdown', this);
				this.removeVar();
				me.state.change(me.state.PLAY); //changes state to PLAY
			},
			removeVar: function(){
				me.save.remove('exp');
				me.save.remove('exp1');
				me.save.remove('exp2');
				me.save.remove('exp3');
				me.save.remove('exp4');	
			}
		})));


	},
	
	
	/**	
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent: function() { //when the state changes to PLAy
		
	}
});
