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
	runContest : function(iterations){
		var result = 'Contest - '+ new Date();
		var p1 = this.player1;
		var p2 = this.player2;
		var itCount = iterations || 1;
		var simCount = this.simulations;
		var p1Sample = [];
		var p1wins = 0;
		var p1mean = 0;
		var p1stddev = 0;
		result += '\n'+p1.getName()+' vs. '+p2.getName();
		result += "\n*******************************************";
		result += '\n'+p1.getName()+': '+p1.debug();
		result += "\n*******************************************";
		result += '\n'+p2.getName()+': '+p2.debug();
		result += "\n*******************************************";
		
		while (itCount--){
			p1wins = 0;
			simCount = this.simulations;
			while (simCount--){
				p1.resetCurrentWounds();
				p2.resetCurrentWounds();
				//console.log('Simulation: '+simCount);
				while (p1.isAlive() && p2.isAlive()){
					p1.attackPlayer(p2);
					if (p2.isAlive()){
						p2.attackPlayer(p1);
					}
				}
				if (p1.isAlive()){p1wins++;
					}else{
						
					}
			}
			p1Sample.push((p1wins/this.simulations));
		}
		
		p1mean = (_.reduce(p1Sample, function(memo, num){ return memo + num; }, 0))/(p1Sample.length);
		p1stddev = Math.sqrt((1/(iterations-1))*(_.reduce(p1Sample, function(memo, num){ return memo + Math.pow((num-p1mean),2); }, 0)));
		
		result += "\n*******************************************";
		result += '\n'+p1.getName()+' has a probability to win of '+formatToPecent(p1mean)+'.  With a stdDev of '+formatToPecent(p1stddev);
		result += "\n*******************************************";
		return result;
	}
};

function formatToPecent(value){
	return ((Math.round(value*10000))/100)+' %';
}

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
	$('#output_text').val(compare.runContest($('#iterations').val()));
});
