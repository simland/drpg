/**
 * @author Richard Benson
 */

function player(name){
	this.name = name || 'Leroy Jenkins';
	this.meleeDiceSet = [];
	this.armorDiceSet = [];
	this.resistance =['1'];
	this.maxWounds =['3'];
	this.currentWounds = ['3'];
	this.awake = true;
	this.alive = true;	
}

player.prototype = {
	setMeleeDiceSet : function(diceString) {
		this.meleeDiceSet = new diceParse(diceString);
	},
	setArmorDiceSet : function(diceString) {
		this.armorDiceSet = new diceParse(diceString);
	},
	setName : function(newName){
		this.name = newName;
	},
	getName : function(){
		return this.name;
	},
	getResistance : function(){
		return this.resistance;
	},
	setResistance : function(value){
		this.resistance = parseInt(value);
	},
	debug : function(){
		var debug;
		debug = JSON.stringify(this);
		return debug;
	},
	rollAttack : function(){
		var roll_result_array = [];
		for (dieKey in this.meleeDiceSet){
			roll_result_array.push(this.meleeDiceSet[dieKey].roll());
		}
		return roll_result_array.sort(function(a,b){return b-a});
	},
	rollDefense : function(){
		var roll_result_array = [];
		for (dieKey in this.armorDiceSet){
			roll_result_array.push(this.armorDiceSet[dieKey].roll());
		}
		return roll_result_array.sort(function(a,b){return b-a});
	},
	setMaxWounds : function(wounds){
		this.wounds = parseInt(wounds);
		this.currentWounds = this.wounds;
	},
	takeWounds : function(numberOfWounds){
		var i = numberOfWounds;
		while (i--){
			this.currentWounds = this.currentWounds - 1;
			if (this.currentWounds < 1) {
				this.awake = false;
				this.alive = false;
			}
		}
		return this.wounds;
	},
	resetCurrentWounds : function(){
		this.currentWounds = this.wounds;
		this.alive = true;
		this.awake = true;
	},
	healWounds : function(numberOfWounds){
		var i = numberOfWounds;
		while (i--){
			this.currentWounds = this.currentWounds + 1;
			if (this.currentWounds > 0) {
				this.alive = true;
			}
			if (this.currentWounds > this.wounds){
				this.currentWounds = this.wounds;
			}
		}
		return this.wounds;
	},
	attackPlayer : function(target){ //Pass in a player object
		var myAttack = this.rollAttack();
		var	theirDefense = target.rollDefense();
		var	theirResistance = target.getResistance();
		//console.log(this.getName()+' Attacked With: '+JSON.stringify(myAttack));
		//console.log('\t'+target.getName()+' Defended With: '+JSON.stringify(theirDefense)+', with a resistance of '+theirResistance);  	
		for (var i=0; i < myAttack.length; i++) {
			if(myAttack[i] > Math.max(theirDefense[i]||0,theirResistance)){target.takeWounds(1);};
		};		
	},
	isAlive : function(){
		return this.alive;
	},
	isConcious : function(){
		return this.awake;
	}
};