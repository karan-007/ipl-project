function strikeRateOfBatsman(matches,deliveries){
    let seasons=[];
    result={};
    balls={};
    runs={};
    for(let match of matches){
        if(!seasons.includes(match.season)){
            seasons.push(match.season);
        }
    }
    seasons.forEach(year => {
        result[year]=getResults(matches,deliveries, year);
    });

    return result;

    function getResults(matches,deliveries,year){
        let id=[];
        for(let match of matches){
            if(match.season===year){
                if(!id.includes(match.id)){
                    id.push(match.id);
                }
            }
        }
        for(let i of id){
            for(let d of deliveries){
                if(d.match_id===i){
                    if(d.batsman==="MS Dhoni"){
                        if(d.wide_runs!=0){
                            count=1;
                        }else{
                            count=0;
                        }
                        if(runs[year]){
                            runs[year]+=parseInt(d.batsman_runs);
                            balls[year]+=1;
                            balls[year]-=count;
                        }else{
                            runs[year]=parseInt(d.batsman_runs);
                            balls[year]=1;
                        }
                    }
                }
            }
        }
        return ((runs[year]*100)/balls[year]).toFixed(2);
    }
}

module.exports = strikeRateOfBatsman;