function bestEconomyInSuperOver(deliveries) {
    const result = {};
    const balls = {};
    const economy={};
    for(let delivery of deliveries){
        //console.log(delivery.bowler);
        if(delivery.is_super_over==='1'){
            //console.log(delivery.bowler);
            if(delivery.extra_runs!=0){
                 count=1;
            }else{
                 count=0;
            }
            if(result[delivery.bowler]){
                result[delivery.bowler]+=parseInt(delivery.total_runs);
                balls[delivery.bowler]+=1;
                balls[delivery]-=count;
                economy[delivery.bowler]=(result[delivery.bowler]*6)/balls[delivery.bowler];
            }else{
                result[delivery.bowler]=parseInt(delivery.total_runs);
                balls[delivery.bowler]=1;
                balls[delivery.bowler]-=count;
                economy[delivery.bowler]=(result[delivery.bowler]*6)/balls[delivery.bowler];
            }
        }
    }
    return economy;
  }
  
  module.exports = bestEconomyInSuperOver;
  