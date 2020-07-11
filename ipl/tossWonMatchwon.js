function matchesPlayedPerYear(matches) {
    const result = {};
    for (let match of matches) {
      if(match.toss_winner===match.winner){
          if(result[match.winner]){
              result[match.winner]+=1;
          }else{
              result[match.winner]=1;
          }
      }
    }
    return result;
  }
  
  module.exports = matchesPlayedPerYear;
  