/**
 * @author Richard Benson
 */

function fargatePlayer(name){
	this.name = name || 'Leroy Jenkins';
	this.baseDieSet = [];
	this.selectedDice = [];
	this.energy = 0;
	this.military = 0;
	this.scientist = 0;
	this.diplomats = 0;
	this.plotpoints = 0;
	this.alienencounter = 0;
	
}

fargatePlayer.prototype = {
	init : function(){
		//Set initial base dice and then add any bonus based on 'class'
	},	
	firstDiceRoll : function(diceString) {
		this.selectedDice = this.baseDieSet;
	},
	setName : function(newName){
		this.name = newName;
	},
	getName : function(){
		return this.name;
	},
	getDiceBucket : function(){
		var debug;
		debug = JSON.stringify(this.diceBucket);
		return debug;
	},
	rollDiceBucket : function(){
		var debug = [];
		for (dieKey in this.diceBucket){
			debug.push(this.diceBucket[dieKey].roll());
		}
		return JSON.stringify(debug.sort(function(a,b){return b-a}));
	}
};