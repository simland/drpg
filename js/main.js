/**
 * @author Richard Benson
 */

var DRPG_GLOBAL = {};
DRPG_GLOBAL['d6'] = new dice([1,2,3,4,5,6]);
DRPG_GLOBAL['d4'] = new dice().init([1,2,3,4]);
DRPG_GLOBAL['d8'] = new dice().init([1,2,3,4,5,6,7,8]);
DRPG_GLOBAL['d6/20'] = DRPG_GLOBAL['d6'].clone();
DRPG_GLOBAL['d6/20'].replaceSide(6,20);

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
		result = result+'\n'+DRPG_GLOBAL['d6'].debug();
		result = result+'\n'+DRPG_GLOBAL['d6/20'].debug();
		result = result+'\n'+'Player 1: Setting my name to -> '+this.player1.getName();
		result = result+'\n'+p1name+': My dice bag has *********************\n'+this.player1.getDiceBucket()+"\n*******************************************";
		result = result+'\n'+p1name+': A test roll results in -- '+this.player1.rollDiceBucket();

		return result;
	},
	canDefeat : function(playerAttack,playerDefend){
		if (playerAttack.getHighestPossibleRoll() > playerDefend.getHighestDefenseStat()){return true;} else {return false;};		
	},
	rollAttackHighToHigh : function(playerAttack,playerDefend){
		var p1roll = playerAttack.rollDiceBucket();
		var p2roll = playerDefend.rollDiceBucket();
		
	},
	rollAttackHighToLow : function(playerAttack,playerDefend){
		
	}
};



$('#subCompare').click(function(){
	var redshirt = new player($('#p1_name').val());
		redshirt.resetDiceTo($('#p1_dice_set').val());
		redshirt.setArmor($('#p1_armor').val().split(','));
		redshirt.setWounds($('#p1_wounds').val().split(','));
	var yellowshirt = new player($('#p2_name').val());
		yellowshirt.resetDiceTo($('#p2_dice_set').val());
		yellowshirt.setArmor($('#p2_armor').val().split(','));
		yellowshirt.setWounds($('#p2_wounds').val().split(','));
	
	var compare = new drpgContest(redshirt,yellowshirt);
	$('#output_text').val(compare.runContest());
});
