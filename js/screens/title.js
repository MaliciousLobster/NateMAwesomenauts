game.TitleScreen = me.ScreenObject.extend({
	/**	
	 *  action to perform on state change
	 */
	onResetEvent: function() {	
		me.game.world.addChild(new me.Sprite(0, 0, me.loader.getImage('title-screen')), -10); //adds the background, the -10 is the layer

		me.input.bindKey(me.input.KEY.ENTER, "start"); //binds ENTER to start

		me.game.world.addChild(new (me.Renderable.extend({
			init: function(){
				this._super(me.Renderable, 'init',[510, 30, me.game.viewport.width, me.game.viewport.height]);
				this.font = new me.Font("Comic Sans MS", 46, "white"); //sets the font
			},

			draw: function(renderer){
				this.font.draw(renderer.getContext(), "Such Awesomenauts", 450, 130); //puts "Such Awesomenauts" at those coordinates
				this.font.draw(renderer.getContext(), "Press ENTER, wow", 250, 530); //puts "Press Enter, wow" at those coordinates
			}
		})));

		this.handler = me.event.subscribe(me.event.KEYDOWN, function (action, keyCode, edge){ //because there's no update: function, this is how it checks to see if the key is pressed
			if(action === "start"){
				me.state.change(me.state.PLAY); //changes the game from Menu to Pay
			}


		});
	},
	
	
	/**	
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent: function() { //when the state changes to PLAy
		me.input.unbindKey(me.input.KEY.ENTER); //it unbinds the key ENTER
		me.event.unsubscribe(this.handler); // TODO
	}
});
