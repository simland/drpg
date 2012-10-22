/**
 * @author Richard Benson
 * -Require jQuery
 * -Require underscore
 */

var DRPG_GLOBAL = {};
DRPG_GLOBAL['d6'] = new dice([1,2,3,4,5,6]);
DRPG_GLOBAL['d4'] = new dice().init([1,2,3,4]);
DRPG_GLOBAL['d8'] = new dice().init([1,2,3,4,5,6,7,8]);
DRPG_GLOBAL['d6/20'] = DRPG_GLOBAL['d6'].clone();
DRPG_GLOBAL['d6/20'].replaceSide(6,20);

function drpgContest (player1,player2){
	this.player1 = player1 || new playerEntity['red'];
	this.player2 = player2 || new playerEntity['blue'];
	this.simulations = 1;
	this.result = '';
}

drpgContest.prototype = {
	setSimulations : function(count){
		this.simulations = count;
	},
	runContest : function(outputLevelOfDetail){
		var result = 'Contest - '+ new Date();
		var p1 = this.player1;
		var p2 = this.player2;
		var simCount = this.simulations;
		var p1wins = 0;
		result += '\n'+p1.getName()+' vs. '+p2.getName();
		result += "\n*******************************************";
		result += '\n'+p1.getName()+': '+p1.debug();
		result += "\n*******************************************";
		result += '\n'+p2.getName()+': '+p2.debug();
		result += "\n*******************************************";
		
		while (simCount--){
			p1.resetCurrentWounds();
			p2.resetCurrentWounds();
			console.log('Simulation: '+simCount);
			while (p1.isAlive() && p2.isAlive()){
				p1.attackPlayer(p2);
				if (p2.isAlive()){
					p2.attackPlayer(p1);
				}
			}
			if (p1.isAlive()){
				result += '\n'+p1.getName()+' defeated '+p2.getName();
				p1wins++;
			}else{
				result += '\n'+p2.getName()+' defeated '+p1.getName();
			}
		}
		result += "\n*******************************************";
		result += '\n'+p1.getName()+' wins '+p1wins+' out of '+this.simulations+' simulations';
		result += "\n*******************************************";
		return result;
	}
};



$('#subCompare').click(function(){
	var redshirt = new player($('#p1_name').val());
		redshirt.setMeleeDiceSet($('#p1_dice_set').val());
		redshirt.setArmorDiceSet($('#p1_armor').val());
		redshirt.setResistance($('#p1_resistance').val());
		redshirt.setMaxWounds($('#p1_wounds').val());
	var yellowshirt = new player($('#p2_name').val());
		yellowshirt.setMeleeDiceSet($('#p2_dice_set').val());
		yellowshirt.setArmorDiceSet($('#p2_armor').val());
		yellowshirt.setResistance($('#p2_resistance').val());
		yellowshirt.setMaxWounds($('#p2_wounds').val());
	
	var compare = new drpgContest(redshirt,yellowshirt);
	compare.setSimulations($('#simulations').val());
	$('#output_text').val(compare.runContest());
});
