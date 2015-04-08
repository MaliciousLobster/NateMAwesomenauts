game.PlayerCreep = me.Entity.extend({
	init: function(x,y,settings){
		this._super(me.Entity, 'init', [x,y, {
			image: "creep2", 
			width: 100,
			height: 85, 
			spritewidth: "100",
			spriteheight: "85", 
			getShape: function(){
				return (new me.Rect(0,0,100,85)).toPolygon();
			}
		}]);
		this.health = 7;
		this.alwaysUpdate = true;
		this.attacking = false;
		this.lastAttacking = new Date().getTime();
		this.lastHit = new Date().getTime();
		this.now = new Date().getTime();
		this.body.setVelocity(game.data.creepMoveSpeed,20);
		this.type = "PlayerCreep";
		this.renderable.addAnimation("walk", [0,1,2,3,4], 80);
		this.renderable.setCurrentAnimation("walk");
	},
	loseHealth: function(damage){
		this.health = this.health - damage;
	},

	update: function(delta){
		if(this.health <= 0){
			me.game.world.removeChild(this);
		}
		this.now = new Date().getTime();

		this.body.vel.x += this.body.accel.x * me.timer.tick;

		this.flipX(true);

		me.collision.check(this, true, this.collideHandler.bind(this), true);

		this.body.update(delta);

		this._super(me.Entity, "update", [delta]);
		return true;
	}, 
	collideHandler: function (response){
		if (response.b.type ==='EnemyBaseEntity') {
			this.attacking = true;
			// this.lastAttacking = this.now;
			this.body.vel.x = 0;
			this.pos.x = this.pos.x + 1;
			if((this.now-this.lastHit >= game.data.creepAttackTimer)) {
				this.lastHit = this.now;
				response.b.loseHealth(game.data.enemyCreepAttack);
			}
		}else if(response.b.type=== 'EnemyCreep'){
			var xdif = this.pos.x - response.b.pos.x;
			this.attacking = true;
			// this.lastAttacking = this.now;
			
			if(xdif>0){ //checks to see if the creep hits anything
				this.pos.x = this.pos.x + 1;  //moves creep one to the right
				this.body.vel.x = 0; //stops movement
			}
			if((this.now-this.lastHit >= game.data.creepAttackTimer) && xdif>0) {
				this.lastHit = this.now;
				response.b.loseHealth(game.data.enemyCreepAttack);
			}
		};
	}
});
// game.EnemyCreep = me.Entity.extend({
// 	init: function(x, y, settings){
// 		this._super(me.Entity, 'init', [x, y, {
// 			image: "creep1",
// 			width: 32,
// 			height: 64,
// 			spritewidth: "32",
// 			spriteheight: "64",
// 			getShape: function(){
// 				return(new me.Rect(0, 0, 32, 64)).toPolygon();
// 			}
// 		}]); 
// 		this.health = 10;
// 		this.alwaysUpdate = true;
// 		this.attacking = false; //this.attacking lets us know if we are attacking
// 		this.lastAttacking = new Date().getTime(); //keeps track of when the last attack of the creep was
// 		this.lastHit = new Date().getTime(); //also keeps track if the creep hit anything
// 		this.now = new Date().getTime();
// 		this.body.setVelocity(3, 20);
// 		this.type = "EnemyCreep";
// 		this.renderable.addAnimation("walk", [3, 4, 5], 80);
// 		this.renderable.setCurrentAnimation("walk");
// 	},

// 	update: function(delta){
// 		this.now = new Date().getTime();

// 		this.body.vel.x -= this.body.accel.x * me.timer.tick;

// 		me.collision.check(this, true, this.collideHandler.bind(this), true);

// 		this.body.update(delta);

// 		this._super(me.Entity, "update", [delta]);
// 		return true;
// 	},

// 	collideHandler: function(response){
// 		if(response.b.type==='PlayerBase'){ //checks if there's a reaction with the player base
// 			this.attacking = true; //the creep is attacking
// 			// this.lastAttacking = this.now; //timer that says the last time it attacked
// 			this.body.vel.x = 0; //stops moving
// 			this.pos.x = this.pos.x + 1; //moves a little to the right
// 			if((this.now-this.lasHit >= 1000)){ //checks every second since the last hit
// 				this.lastHit = this.now;
// 				response.b.loseHealth(1); //call function that makes player lose health
// 			}
// 		}
// 	}
// });