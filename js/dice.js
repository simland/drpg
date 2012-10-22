/**
 * @author Richard Benson
 * -Require: underscore.js
 */

function diceParse (diceString){
	var diceString = diceString || '1d6';
	var diceArray = diceString.split(',');
	var dieCount = 1;
	var currentDieSet = [];
	var currentDie = [];
	var currentDieColor = 'white';
	var currentDieMax = 6;
	var returnedDiceBox = [];
	for (dieKey in diceArray){
		currentDieSet = diceArray[dieKey].split(':');
		currentDieColor = currentDieSet[1] || 'white';
		currentDie = currentDieSet[0].split('d');
		currentDieMax = parseInt(currentDie[1]);
		dieCount = currentDie[0];
		for(var i=0,j=dieCount; i<j; i++){
		  returnedDiceBox.push(new dice(currentDieMax));
		};
	}

	return returnedDiceBox;
}

function dice(setupString){
	this.sides = [1,2,3,4,5,6];
	this.name = 'Default';
	this.init(setupString);
}

dice.prototype = {
	init: function(setupString){
		var outputAttempt = [];
		if (_.isArray(setupString)){
			this.sides = setupString;
		} else {
			for (var i=0; i < parseInt(setupString); i++) {
			  outputAttempt.push(i+1);
			};
			this.sides = outputAttempt;
		}
		return this;
	},
	debug: function(){
		return JSON.stringify(this);
	},
	roll: function(){
		var number_of_sides = this.sides.length
		return this.sides[Math.floor((Math.random()*number_of_sides))];
	},
	getName: function(){
		return this.name;
	},
	addSide: function(choiceToAdd){
		this.sides.push(choiceToAdd);
		return this.sides;
	},
	replaceSide: function(oldSide, newSide){
		this.sides = _.map(this.sides, function(value){if(value == oldSide){return newSide;}else{return value;}});
		return this.sides;
	},
	clone : function(){
		var a = new dice();
		var that = this;
		a.init(that.sides, that.name);
		return a;
	}
};