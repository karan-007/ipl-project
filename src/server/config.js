const dotenv = require('dotenv');
dotenv.config();

const fs = require("fs");
const mysql = require("mysql");

const MATCHES_PLAYED_JSON_PATH = "../public/output/matchesPlayedPerYear.json";
const TOSS_WON_MATCH_WON_JSON_PATH = "../public/output/tossWonMatchWon.json";
const BEST_ECONOMY_SUPER_OVER_JSON_PATH =
    "../public/output/bestEconomyInSuperOver.json";
const MOST_MAN_OF_MATCH_JSON_PATH = "../public/output/mostManOfMatch.json";
const STRIKERATE_JSON_PATH = "../public/output/strikeRateOfBatsman.json";
const BATSMAN_VS_BOWLER = "../public/output/batsmanVsBowler.json";

let con = mysql.createConnection({
    multipleStatements: true,
    host: process.env.HOST,
    user: process.env.USERNAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});

con.connect();

var matchesPlayedPerYear = "select season,count(*)as matchesPlayed from matches group by season";
runquery(matchesPlayedPerYear, MATCHES_PLAYED_JSON_PATH);

var toss = "select winner as team,count(*)as count from matches where toss_winner = winner group by winner";
runquery(toss, TOSS_WON_MATCH_WON_JSON_PATH);

var playerOfMatch = "select season,max(count)as countPOM from (select season,player_of_match,count(player_of_match+player_of_match) as count from matches group by season,player_of_match order by count(player_of_match) desc )p group by season";
runquery(playerOfMatch, MOST_MAN_OF_MATCH_JSON_PATH);

var batsmanVsBowler = `select player_dismissed as batsman,bowler,count(bowler)as count from deliveries where player_dismissed!='' and dismissal_kind!="run out" group by player_dismissed,bowler order by count(bowler) desc limit 12`;
runquery(batsmanVsBowler, BATSMAN_VS_BOWLER);

var economySuperOver = `select bowler,(sum(total_runs)-(sum(bye_runs)+sum(legbye_runs)))*6/(count(bowler)-count(case when wide_runs!=0 then 1 else null end)-count(case when noball_runs!=0 then 1 else null end)) as economy from deliveries where is_super_over=1 group by bowler`;
runquery(economySuperOver, BEST_ECONOMY_SUPER_OVER_JSON_PATH);

var strikeRate = `select season,(sum(batsman_runs)*100/(count(batsman)-count(case when wide_runs!=0 then 1 else null end)))as strikeRate from matches join deliveries on matches.id=deliveries.match_id where batsman="MS Dhoni" group by season`;
runquery(strikeRate, STRIKERATE_JSON_PATH);

function runquery(query, path) {
    con.query(query, (err, results) => {
        if (err) {
            console.log(err);
        } else {
            saveResultToOutput(results, path);
            console.log("excecuted");
        }
    })

}
function saveResultToOutput(result, path) {
    const jsonString = JSON.stringify(result);
    fs.writeFile(path, jsonString, "utf8", (err) => {
        if (err) {
            console.error(err);
        }
    });
}

con.end();
