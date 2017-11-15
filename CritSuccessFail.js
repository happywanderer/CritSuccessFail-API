;(function(){
    "use strict";
    //
    //Variables for generating critical success or fail
    //
    var crits = {
        v1: {
          bludgeoning: ["You call that a crit? Roll damage as normal"],
          slashing: ["You call that a crit? Roll damage as normal"],
          piercing: ["You call that a crit? Roll damage as normal"],
          spell: ["Well, that was spectacularly unspectacular. Roll damage as normal."],
        },
        v2t3: {
          bludgeoning: ["Smashed off balance! Roll damage as normal and the next attack against the creature has advantage."],
          slashing: ["Sliced and diced! Roll damage as normal and the creature loses 1d6 hit points at the start of its next turn."],
          piercing: ["Lunge and thrust! Roll damage dice twice and use the higher result."],
          spell: ["Zzzap! Your magical energies zap it good, roll damage dice twice."],
        },
        v4t6: {
          bludgeoning: ["Good hit! Do not roll your damage dice, instead deal the maximum result possible with those dice."],
          slashing: ["Good hit! Do not roll your damage dice, instead deal the maximum result possible with those dice."],
          piercing: ["Good hit! Do not roll your damage dice, instead deal the maximum result possible with those dice."],
          spell: ["Zzzap! Your magical energies zap it good, roll damage dice twice."],  
        },
        v7t8: {
          bludgeoning: ["Sent reeling! Do not roll your damage dice, instead deal the maximum result possible with those dice and push the creature up to 15 feet in any direction."],
          slashing: ["Open gash! Roll your damage dice as normal and the creature is bleeding. For the next minute the creature loses 2 damage at the start of each of its turns until it uses an action to staunch this wound"],
          piercing: ["Stabbed! Roll your damage dice twice and add them together."],
          spell: ["Well, that was spectacularly unspectacular. Roll damage as normal."],  
        },
        v9t11: {
          bludgeoning: ["Great hit! Roll your damage dice twice and add them together."],
          slashing: ["Great hit! Roll your damage dice twice and add them together"],
          piercing: ["Great hit! Roll your damage dice twice and add them together."],
          spell: ["Well, that was spectacularly unspectacular. Roll damage as normal."],  
        },
        v12t13: {
          bludgeoning: ["Take a seat! Roll damage dice twice and add them together and the creature is knocked prone."],
          slashing: ["Deep slice! Roll your damage dice twice and add them together and the creature is bleeding. For the next minute the creature loses [[1d4]] hit points at the start of each of its turns until it uses an action to staunch this wound."],
          piercing: ["Swiss cheese! Roll twice as many damage dice as normal. Then roll twice on the minor injury chart and use the lower result."],
          spell: ["Well, that was spectacularly unspectacular. Roll damage as normal."],  
        },
        v14t16: {
          bludgeoning: ["Rocked and rolled! Roll damage dice twice and add them together, push the creature up to 15 feet away, and the creature is knocked prone."],
          slashing: ["Lacerated! Roll your damage dice twice and add them together and the creature is bleeding. For the next minute the creature loses [[1d6]] hit points at the start of each of its turns until it uses an action to staunch this wound."],
          piercing: ["Punctured! Roll your damage dice twice and add them together and roll on the minor injury chart."],
          spell: ["Well, that was spectacularly unspectacular. Roll damage as normal."], 
        },
        v17t18: {
          bludgeoning: ["Grievous injury! Deal the maximum amount of damage from your normal damage dice then roll your damage dice and add the result. Then roll on the Minor Injury chart. "],
          slashing: ["Severed! Deal the maximum amount of damage from your normal damage dice then roll your damage dice and add the result. Then roll on the Injury chart."],
          piercing: ["Cruel prick! Roll your damage dice twice and add them together and roll on the major injury chart."],
          spell: ["Well, that was spectacularly unspectacular. Roll damage as normal."],  
        },
        v19: {
          bludgeoning: ["Crushed! Deal the twice maximum result of your damage dice and roll on the injury chart"],
          slashing: ["Dissected! Deal twice the maximum result of your damage dice and roll on the injury chart."],
          piercing: ["Run through! Deal twice the maximum result of your damage dice and roll on the injury chart"],
          spell: ["Well, that was spectacularly unspectacular. Roll damage as normal."],  
        },
        v20: {
          bludgeoning: ["Splat! Deal the maximum result of your damage dice twice, the creature is stunned until the end of your next turn, and roll on the major injury chart."],
          slashing: ["Slash! Deal the maximum result of your damage dice twice, roll on the injury chart, and the creature is bleeding. For the next minute the creature loses [[1d8]] hit points at the start of each of its turns until it uses an action to staunch this wound."],
          piercing: ["Pierce! Deal the maximum result of your damage dice twice, roll on the injury chart, and roll on the major injury chart"],
          spell: ["Well, that was spectacularly unspectacular. Roll damage as normal."],
        },       
    };
    
    var fumbles = {
        weapon: ["You miss your attack", "Your target has advantage on their first attack roll against you next round.", "ALL enemies have advantage on their attack rolls against you until the END of your next turn.", "You are knocked prone and your movement is reduced to 0. Your target must succeed a DC 10 dexterity check or they are also knocked prone (they fall over from laughing at you).", "You fall prone and your movement is reduced to 0.", "Disadvantage on your next attack roll against your CURRENT target.", "Disadvantage on your next attack roll against ALL targets.", "Roll a DC 10 Dexterity Check, on failure you drop your weapon at your feet.", "Your weapon flies 10ft from your hands in a random direction [[1d8]] (if using no weapons, you fall prone and incurr and Attack of Opportunity)", "Your enemy can use its reaction to execute and Attack of Opportunity against you (or any ally in range if you are using a ranged attack)", "Your complete turn is over and the next attack against you before the start of your turn are automatic critical hits", "You fall prone. Roll a DC 10 constitution save, on failure you take [[1d6]] damage and are knocked unconscious for 1 round or until you receive damage from any source. On success take half damage and you remain conscious.", "You fall prone and take [[1d6]] damage hitting your head", "You fall prone. Roll a DC 15 constitution save, on failure you take [[2d6]] damage and are knocked unconscious for 1 minute or until you receive damage from any source. On success take half damage and you remain conscious.", "You nail yourself HARD doing [[3d6]] damage and causing a lasting injury. Roll on the Injury table."],
        spell: ["2", "4 [[1d8]]"],
    };
    
    //Variable for output styling
    var BoxStyle = "<div style='box-shadow: 3px 3px 2px #000000; font-family: Verdana; fontWeight: bold; text-align: center; vertical-align: middle; padding: 2px 2px; margin-top: 0.2em; border: 1px solid #000; border-radius: 8px 8px 8px 8px; color: #000000; background-color: #FFFFFF;'>";
    
    //Begin functions on chat input
    on('chat:message',function(msg){

        if('api' !== msg.type){
            return;
        }

        let cmds = msg.content.split(/\s+/);
        
        if( cmds[0] === "!critical" ){
            critical();
        }
        
        if( cmds[0] === "!fumble"){
            fumble();
        }      
          
        //
        //Generate a random critical success effect based on weapon type or spell energy type
        //
        function critical(){
            if( '!critical' === cmds.shift()){
                if(cmds.length) {
                    let wepspell=(cmds.shift()||'').toLowerCase();
                    if(_.has(crits,wepspell)){
                        let type = (cmds.shift()||'').toLowerCase();
                        type = _.has(crits[wepspell],type) ? type : _.sample(_.keys(crits[wepspell]));

                        sendChat('',`${BoxStyle} <b>Critical Success is ${_.sample(crits[wepspell][type])}</b></div>`);
                    } else {
                    sendChat('',`${BoxStyle} You must enter weapon or spell <b>${wepspell}</b>.  Available options are: <b>${_.keys(crits).join(', ')}</b></div>`);
                    }
                } else {
                    sendChat('',`<div>Usage: <br><code>!critical [weapon or spell] [damage type]</code><br>Available</b>`);
                }
            }
        }
        
        //
        //Generate a random town/city name based on geographic region or random
        //
        function fumble(){
            if( '!fumble' === cmds.shift()){
                if(cmds.length) {
                    let weporspell=(cmds.shift()||'').toLowerCase();
                    let fumbleresult = _.sample(_.keys(fumbles[weporspell]));
                    
                    sendChat('',`${BoxStyle} <b>Fumble Result is: ${_.sample(fumbles[weporspell])}</b></div>`);
                } else {
                    sendChat('',`${BoxStyle} <b>You must enter weapon or spell</b>.</b></div>`);
                } 
            } 
        }      
    });
}());
