;(function(){
    "use strict";
    //
    //Variables for generating critical success or fail
    //
    var crits = {
        weapon: {
          bludgeoning: [“You call that a crit? Roll damage as normal.”, “Smashed off balance! Roll damage as normal and the next attack against the creature has advantage.”, “Good hit! Do not roll your damage dice, instead deal the maximum result possible with those dice.”, “Sent reeling! Do not roll your damage dice, instead deal the maximum result possible with those dice and push the creature up to 15 feet in any direction.”, “Great hit! Roll your damage dice twice and add them together.”, “Take a seat! Roll damage dice twice and add them together and the creature is knocked prone.”, “Rocked and rolled! Roll damage dice twice and add them together, push the creature up to 15 feet away, and the creature is knocked prone.”, “Grievous injury! Deal the maximum amount of damage from your normal damage dice then roll your damage dice and add the result. Then roll on the Injury chart.”, “Crushed! Deal the twice maximum result of your damage dice and roll on the major injury chart.”, “Splat! Deal the maximum result of your damage dice twice, the creature is stunned until the end of your next turn, and roll on the major injury chart.”],
          slashing: [“You call that a crit? Roll damage as normal.”, “Sliced and diced! Roll damage as normal and the creature loses [[1d6]] hit points at the start of its next turn.”, “Good hit! Do not roll your damage dice, instead deal the maximum result possible with those dice.”, “Open gash! Roll your damage dice as normal and the creature is bleeding. For the next minute the creature loses 2 HP at the start of each of its turns until it uses an action to staunch this wound.”, “Great hit! Roll your damage dice twice and add them together.”, “Deep slice! Roll your damage dice twice and add them together and the creature is bleeding. For the next minute the creature loses [[1d4]] hit points at the start of each of its turns until it uses an action to staunch this wound.”, “Lacerated! Roll your damage dice twice and add them together and the creature is bleeding. For the next minute the creature loses [[1d6]] hit points at the start of each of its turns until it uses an action to staunch this wound.”, “Severed! Deal the maximum amount of damage from your normal damage dice then roll your damage dice and add the result. Then roll on the Injury chart.”, “Dissected! Deal twice the maximum result of your damage dice and roll on the injury chart.”, “Slash! Deal the maximum result of your damage dice twice, roll on the injury chart, and the creature is bleeding. For the next minute the creature loses [[1d8]] hit points at the start of each of its turns until it uses an action to staunch this wound.”],
          piercing: [“You call that a crit? Roll damage as normal.”, “Lunge and thrust! Roll damage dice twice and use the higher result.”, “Good hit! Do not roll your damage dice, instead deal the maximum result possible with those dice.”, “Stabbed! Roll your damage dice twice and add them together.”, Great hit! Roll your damage dice twice and add them together.”, “Swiss cheese! Roll twice as many damage dice as normal. Then roll on the injury chart.”, “Punctured! Roll your damage dice twice and add them together and roll on the minor injury chart.”, “Cruel prick! Roll your damage dice twice and add them together and roll on the injury chart.”, “Run through! Deal twice the maximum result of your damage dice and roll on the injury chart.”, “Pierce! Deal the maximum result of your damage dice twice, roll on the injury chart.”]
        },
        spell: {
          acid: [“You call that a crit? Roll damage as normal.”, “Scalding bile! Roll damage as normal and the creature is scarred. While scarred the creature has disadvantage on all Charisma ability checks except Charisma (Intimidation).Being scarred can be healed in the same way as a minor injury.”, “Good hit! Do not roll your damage dice, instead deal the maximum result possible with those dice.”, “Melted flesh! Roll your damage as normal and the creature is disfigured. While disfigured the creature has disadvantage on all Charisma ability checks except Charisma (Intimidation). Being disfigured can be removed with the spell greater restoration.”, “Great hit! Roll your damage dice twice and add them together.”, “Boiling flesh! Roll twice as many damage dice as normal and if the creature is wearing armor its AC modifier is reduced by 1 until it can be repaired (for 1/4th the price of new armor of the same type) or cleaned (if the armor is magical). If the creature is not wearing armor, roll on the injury chart.”, “Horrific mutilation! Roll twice as many damage dice as normal and roll on the injury chart. Additionally, the creature is disfigured. While disfigured the creature has disadvantage on all Charisma ability checks except Charisma (Intimidation). Being disfigured can be removed with the spell greater restoration.”, “Caustic trauma! Deal the maximum amount of damage from your normal damage dice then roll your damage dice and add that result. If the creature is wearing armor, roll on the minor injury chart and its AC modifier is reduced by 2 until it can be repaired (for half the price of new armor of the same type) or cleaned (if the armor is magical). If the creature is not wearing armor, roll on the injury chart.”, “Vitriolic! Deal twice the maximum result of your damage dice and roll on the injury chart.”, “Acid bath! Deal twice the maximum result of your damage dice. If the creature is wearing armor, the armor is destroyed (if non-magical) or rendered useless until cleaned during a long rest (if magical) and roll on the major injury chart. If the creature is not wearing armor, roll on the major injury chart and the creature is disfigured. While disfigured the creature has disadvantage on all Charisma ability checks except Charisma (Intimidation). Being disfigured can be removed with the spell greater restoration.”],
          cold: ["You call that a crit? Roll damage as normal.”, “Chills! Roll damage as normal and the creature may only move half its movement speed on its next turn.”, “Good hit! Do not roll your damage dice, instead deal the maximum result possible with those dice.”, “Frosty! Roll your damage as normal and the creature’s movement speed is 0 until the end of its next turn.”, “Great hit! Roll twice as many damage dice as normal.”, “Freezing! Roll twice as many damage dice as normal and the creature is paralyzed until the end of its next turn.”, “Frozen! Roll twice as many damage dice as normal and the creature is paralyzed until the end of its next turn. If the creature takes damage before the end of its next turn, roll on the injury chart.”, “Ice block! Deal the maximum amount of damage from your normal damage dice then roll your damage dice and add that result. The creature is paralyzed until the end of its next turn and rolls on the injury chart.”, “Glacial! Deal twice the maximum result of your damage dice and roll on the major injury chart.”, “Subzero! Deal twice the maximum result of your damage dice, roll on the major injury chart, and the creature is paralyzed for the next minute. The creature may attempt a saving throw at the end of each of its turns (DC 16) to end this effect. If it fails this saving throw three times it is frozen solid and becomes a petrified but frozen solid in a block of ice rather than turned to stone.”],
          fire: ["fi1", "fi2", "fi3"],
          force: ["fo1", "fo2", "fo3"],
          lightning: ["l1", "l2", "l3"],
          necrotic: ["n1", "n2", "n3"],
          poison: ["po1", "po2", "po3"],
          psychic: ["ps1", "ps2", "ps3"],
          radiant: ["r1", "r2", "r3"],
          thunder: ["t1", "t2", "t3"]
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
