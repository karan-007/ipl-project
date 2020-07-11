function mostManOfMatch(matches){
    let result={};
    for(let match of matches){
        if(result[match.season]){
            if(result[match.season][match.player_of_match]){
                result[match.season][match.player_of_match]+=1;
            }else{
                result[match.season][match.player_of_match]=1;
            }
        }else{
            result[match.season]={};
            result[match.season][match.player_of_match]=1;
        }
    }
    let data=[];
    for(season in result){
        let sorting=[];
        for(player in result[season]){
            sorting.push([season+" "+player,result[season][player]]);
        }
        sorting.sort(function(a,b){
            return b[1]-a[1];
        });
        data.push(sorting[0]);
    }
    return data;
}
module.exports=mostManOfMatch;