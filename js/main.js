/**
 * @author Richard Benson
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
		  returnedDiceBox.push(new dice(currentDieMax, currentDieColor));
		};
	}

	return returnedDiceBox;
}


function drpgContest (player1,player2){
	this.player1 = player1 || new playerEntity['red'];
	this.player2 = player2 || new playerEntity['blue'];
	this.simulations = 100;
	this.result = '';
}

drpgContest.prototype = {
	setSimulations : function(count){
		this.simulations = count;
	},
	runContest : function(outputLevelOfDetail){
		var result = 'Contest - '+ new Date();
		result = result+'\n'+'Player 1:'+this.player1.getName();
		result = result+'\n'+'Player 1:'+this.player1.getDiceBucket();
		result = result+'\n'+'Player 1:'+this.player1.getHighestPossibleRoll();

		
		/*if (player.getHighestPossibleRoll > 4) {
			for (var i = simulations - 1; i >= 0; i--){
			  result = result + '/n' + runSimulation();
			};
		} else {
			result = 'You die of exhaustion.';
		}*/
		return result;
	},
	isPossible : function(){
		if (maxRollableValue > enemyArmor[0] && maxRollableValue > enemyWounds[0]){return true;} else {return false};		
	},
	runSimulation : function(){
		var diceBucket = [d4s,d6s,d8s,d10s,d12s,d20s];
		var diceResults =[];
		var numberOfRolls = 0;
		var stringOuput = '';
		var enemyDefense = enemyArmor.concat(enemyWounds);
			
			while (enemyDefense.length > 0)
			{
				for (dice in diceBucket){
					
				}
			}
		
		return stringOutput;		
	}
};

function playerEntity(name){
	this.name = name || 'Leroy Jenkins';
	this.diceBucket = [];
	this.armor =['1'];
	this.wounds =['1'];
}

playerEntity.prototype = {
	resetDiceTo : function(diceString) {
		this.diceBucket = new diceParse(diceString);
	},
	setName : function(newName){
		this.name = newName;
	},
	getName : function(){
		return this.name;
	},
	getHighestPossibleRoll : function(){
		var debug;
		debug = JSON.stringify(_.max(this.diceBucket, function(die){ return die.max; }));
		return debug;
	},
	getDiceBucket : function(){
		var debug;
		debug = JSON.stringify(this.diceBucket);
		return debug;
	},
	setArmor : function(armor){
		this.armor = armor.sort(function(a,b){return b-a}) || [1];
	},
	setWounds : function(wounds){
		this.wounds = wounds.sort(function(a,b){return b-a}) || [1];
	}
};

function dice(diceMax, color){
	this.max = diceMax || 6;
	this.min = 1;
	this.color = color || 'white';
	this.name = '1d'+this.max;
}

dice.prototype = {
	roll: function(){
		return Math.floor((random()*this.diceMax)+1);
	},
	getMax: function(){
		return this.max;
	},
	getName: function(){
		return this.name;
	}
};

$('#subCompare').click(function(){
	var redshirt = new playerEntity('Kirk');
	var borg = new playerEntity('lacutis');
	borg.resetDiceTo('1d6');
	borg.setArmor($('#enemy_armor').val().split(','));
	borg.setWounds($('#enemy_wounds').val().split(','));
	redshirt.resetDiceTo($('#dice_set').val());
	
	var compare = new drpgContest(redshirt,borg);
	$('#output_text').val(compare.runContest());
});
