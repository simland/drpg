/**
 * @author Richard Benson
 */
function drpgContest (){
	this.enemyArmor = [];
	this.enemyWounds = [];
	this.simulations = 100;
	this.result = "";
}

drpgContest.prototype = function(){
	setEnemy = function(armor,wounds){
		armor = armor || [];
		wounds = wounds || [];
		enemyArmor = armor.split(",").sort(function(a,b){return b-a});
		enemyWounds = wounds.split(",").sort(function(a,b){return b-a});
	},
	setSimulations = function(count){
		simulations = count;
	},
	runContest = function(player){
		result = "Contest - d[4,6,8,10,12,20]:["+d4s+","+d6s+","+d8s+","+d10s+","+d12s+","+d20s+"]-Enemy Stats [Armor,Wounds] - ["+enemyArmor.join(",")+","+enemyWounds.join(",")+"]";
		if (player.getHighestPossibleRoll > 4) {
			for (var i = simulations - 1; i >= 0; i--){
			  result = result + "/n" + runSimulation();
			};
		} else {
			result = "You die of exhaustion.";
		}
	},
	isPossible = function(){
		var maxRollableValue = function(){
											if (d20s > 0) {return 20;};
											if (d12s > 0) {return 12;};
											if (d10s > 0) {return 10;};
											if (d8s > 0) {return 8;};
											if (d6s > 0) {return 6;};
											if (d4s > 0) {return 4;};
											}();
		if (maxRollableValue > enemyArmor[0] && maxRollableValue > enemyWounds[0]){return true;} else {return false};		
	},
	runSimulation = function(){
		var diceBucket = [d4s,d6s,d8s,d10s,d12s,d20s];
		var diceResults =[];
		var numberOfRolls = 0;
		var stringOuput = "";
		var enemyDefense = enemyArmor.concat(enemyWounds);
			
			while (enemyDefense.length > 0)
			{
				for (dice in diceBucket){
					
				}
			}
		
		return stringOutput;		
	}
}();

function playerEntity(name){
	this.name = "Leroy Jenkins";
	this.diceBucket = [];
}

playerEntity.prototype = function(){
	setDice = function(diceArrayOfMax) {
		diceBucket = [];
		for (var i = diceArrayOfMax.length-1; i >= 0; i--){
			diceBucket.push(new dice(diceArrayOfMax[i]));
		}

	},
	setName = function(newName){
		name = newName;
	},
	getHighestPossibleRoll = function(){
		return _.max(diceBucket, function(die){ return die.max; });
	}
}();

var dice = function(diceMax){
	this.max = diceMax || 6;
	this.min = 1;
	this.color = white;
	this.name = "1d"+this.max;
}

dice.prototype = function(){
	roll = function(){
		return Math.floor((random()*diceMax)+1);
	},
	getMax = function(){
		return max;
	}
}();
