/**
 * @author Richard Benson
 * -Require: underscore.js
 */

function dice(setupString){
	this.sides = [1,2,3,4,5,6];
	this.name = 'Default';
	this.init(setupString);
}

dice.prototype = {
	init: function(setupString){
		this.sides = setupString || [1,2,3,4,5,6];
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