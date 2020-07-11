function batsmanVsBowler(deliveries) {
  let result = {};
  for (let d of deliveries) {
    if (d.player_dismissed != "") {
      if (d.dismissal_kind != "run out") {
        if (result[d.bowler]) {
          if (result[d.bowler][d.player_dismissed]) {
            result[d.bowler][d.player_dismissed] += 1;
          } else {
            result[d.bowler][d.player_dismissed] = 1;
          }
        } else {
          result[d.bowler] = {};
          result[d.bowler][d.player_dismissed] = 1;
        }
      }
    }
  }
  
  let data=[];
  for(let bowler in result){
    let sorting=[];
    for(let batsman in result[bowler]){
        sorting.push([bowler+" vs "+batsman,result[bowler][batsman]]);
    }
    sorting.sort((a,b)=>{
        return b[1]-a[1];
    });
    data.push(sorting[0]);
  }

  data.sort((a,b)=>{
      return b[1]-a[1];
  });

  return data.slice(0,12);
}
module.exports = batsmanVsBowler;
