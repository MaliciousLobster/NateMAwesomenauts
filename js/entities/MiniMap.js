game.MiniMap = me.Entity.extend({
	init: function(x, y, settings){
		this._super(me.Entity, "init", [x, y, {
			image: "minimap",
			width: 438,
			height: 165,
			spritewidth: "438",
			spriteheight: "165",
			getShape: function(){
				return (new me.Rect(0, 0, 438, 165)).toPolygon(); 
			}
		}]);
		this.floating = true;
	}
});