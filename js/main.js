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
		var p1name = this.player1.getName();
		var p2name = this.player2.getName();
		result = result+'\n'+'Player 1: Setting my name to -> '+this.player1.getName();
		result = result+'\n'+p1name+': My dice bag has *********************\n'+this.player1.getDiceBucket()+"\n*******************************************";
		result = result+'\n'+p1name+': My highest possible roll value is '+this.player1.getHighestPossibleRoll();
		result = result+'\n'+p1name+': A test roll results in -- '+this.player1.rollDiceBucket();

		return result;
	},
	canDefeat : function(playerAttack,playerDefend){
		if (playerAttack.getHighestPossibleRoll() > playerDefend.getHighestDefenseStat()){return true;} else {return false};		
	},
	rollAttack : function(playerAttack,playerDefend,count){
		
	}
};

function playerEntity(name){
	this.name = name || 'Leroy Jenkins';
	this.diceBucket = [];
	this.armor =['1'];
	this.currentArmor = ['1'];
	this.wounds =['1'];
	this.currentWounds = ['1'];
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
		debug = (_.max(this.diceBucket, function(die){ return die.max; })).max;
		return debug;
	},
	getDiceBucket : function(){
		var debug;
		debug = JSON.stringify(this.diceBucket, null, "\t");
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

function dice(diceMax, color){
	this.max = diceMax || 6;
	this.min = 1;
	this.color = color || 'white';
	this.name = '1d'+this.max;
}

dice.prototype = {
	roll: function(){
		return Math.floor((Math.random()*this.max)+1);
	},
	getMax: function(){
		return this.max;
	},
	getName: function(){
		return this.name;
	}
};

$('#subCompare').click(function(){
	var redshirt = new playerEntity($('#p1_name').val());
		redshirt.resetDiceTo($('#p1_dice_set').val());
		redshirt.setArmor($('#p1_armor').val().split(','));
		redshirt.setWounds($('#p1_wounds').val().split(','));
	var yellowshirt = new playerEntity($('#p2_name').val());
		yellowshirt.resetDiceTo($('#p2_dice_set').val());
		yellowshirt.setArmor($('#p2_armor').val().split(','));
		yellowshirt.setWounds($('#p2_wounds').val().split(','));
	
	var compare = new drpgContest(redshirt,yellowshirt);
	$('#output_text').val(compare.runContest());
});
