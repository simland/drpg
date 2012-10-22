/**
 * @author Richard Benson
 */

function player(name){
	this.name = name || 'Leroy Jenkins';
	this.diceBucket = [];
	this.armor =['1'];
	this.currentArmor = ['1'];
	this.wounds =['1'];
	this.currentWounds = ['1'];
}

player.prototype = {
	resetDiceTo : function(diceString) {
		this.diceBucket = new diceParse(diceString);
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
	},
	setArmor : function(armor){
		this.armor = armor.sort(function(a,b){return b-a}) || [1];
		this.currentArmor = this.armor;
	},
	setWounds : function(wounds){
		this.wounds = wounds.sort(function(a,b){return b-a}) || [1];
		this.currentWounds = this.wounds;
	},
	getHighestDefenseStat : function (){
		var debug;
		debug = _.max(this.armor.concat(this.wounds));
		return parseInt(debug);
	},
	resetCurrentArmor : function(){
		this.currentArmor = this.armor;
	},
	resetCurrentWounds : function(){
		this.currentWounds = this.wounds;
	}
};