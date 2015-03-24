game.SpendExp = me.ScreenObject.extend({
	/**	
	 *  action to perform on state change
	 */
	onResetEvent: function() {	
		me.game.world.addChild(new me.Sprite(0, 0, me.loader.getImage('exp-screen')), -10); //adds the background, the -10 is the layer

		me.input.bindKey(me.input.KEY.F1, "F1");
		me.input.bindKey(me.input.KEY.F2, "F2");
		me.input.bindKey(me.input.KEY.F3, "F3");
		me.input.bindKey(me.input.KEY.F4, "F4");
		me.input.bindKey(me.input.KEY.ENTER, "ENTER");
		var exp1cost = ((game.data.exp1 + 1)*10);

		me.game.world.addChild(new (me.Renderable.extend({ //Starts a new game, resets all variables
			init: function(){
				this._super(me.Renderable, 'init',[10, 10, 300, 50]);
				this.font = new me.Font("Comic Sans MS", 26, "white"); //sets the font
			},

			draw: function(renderer){
				this.font.draw(renderer.getContext(), "PRESS 1-4 TO BUY, PRESS B TO SKIP", this.pos.x, this.pos.y); //puts "Such Awesomenauts" at those coordinates
				this.font.draw(renderer.getContext(), "CURRENT EXP: " + game.data.exp.toString(), this.pos.x , this.pos.y + 50); //puts "Such Awesomenauts" at those coordinates
				this.font.draw(renderer.getContext(), "F1 - GAIN MORE GOLD - CURRENT LEVEL: " + game.data.exp1.toString() + " COST: " + exp1cost , this.pos.x , this.pos.y + 100); //puts "Such Awesomenauts" at those coordinates
				this.font.draw(renderer.getContext(), "F2 - +DAMAGE " , this.pos.x , this.pos.y + 150); 
				this.font.draw(renderer.getContext(), "F3 - +HEALTH ", this.pos.x , this.pos.y + 200); 
				this.font.draw(renderer.getContext(), "F4 - +ATTACK SPEED ", this.pos.x , this.pos.y + 250); 
			}
		})));
		this.handler = me.event.subscribe(me.event.KEYDOWN, function (action, keyCode, edge){ //handles the inputs
			if(action === "F1"){
				if(game.data.exp >= exp1cost){ //if you can afford F1
					game.data.exp1 += 1; //add 1 to exp1
					game.data.exp -= exp1cost; //subtract the cost from the total exp
					me.state.change(me.state.PLAY); //change it to play
				}else{
					console.log("not enough EXP");
				}
			}else if(action === "F2"){

			}else if(action === "F3"){
				
			}else if(action === "F4"){
				
			}else if(action === "ENTER"){
				me.state.change(me.state.PLAY);
			}

		});
	},
	
	/**	
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent: function() { //when the state changes to PLAY
		//unbind or unsubscribe these keys or handlers
		me.input.unbindKey(me.input.KEY.F1, "F1"); 
		me.input.unbindKey(me.input.KEY.F2, "F2");
		me.input.unbindKey(me.input.KEY.F3, "F3");
		me.input.unbindKey(me.input.KEY.F4, "F4");
		me.input.unbindKey(me.input.KEY.ENTER, "ENTER");
		me.event.unsubscribe(this.handler);
	}
});
