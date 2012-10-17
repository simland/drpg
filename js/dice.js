/**
 * @author Richard Benson
 * -Require: underscore.js
 */

function dice(choiceSet, name){
	this.sides = choiceSet.toString().split(",") || [1,2,3,4,5,6];
	this.name = name || 'Default';
}

dice.prototype = {
	init: function(choiceSet, name){
		
	},
	roll: function(caller){
		var number_of_sides = this.sides.length
		return this.sides[Math.floor((Math.random()*number_of_sides))];
	},
	getName: function(){
		return this.name;
	},
	replaceValue: function(){
		
	},
	addSide: function(choiceToAdd){
		if (_.isArray(choiceToAdd)) {
			this.sides.concat(choiceToAdd);
		} else {
			this.sides.push(choiceToAdd);
		}
		return this.sides;
	},
	replaceSide: function(oldSide, newSide){
		
	}
};