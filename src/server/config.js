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

// console.log(process.env.HOST);
// console.log(process.env.USERNAME);
// console.log(process.env.PASSWORD);
// console.log(process.env.DATABASE);

const hostname = process.env.HOST,
    username = process.env.USERNAME,
    password = process.env.PASSWORD,
    databasename = process.env.DATABASE

let con = mysql.createConnection({
    multipleStatements: true,
    host: process.env.HOST,
    user: process.env.USERNAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});

// let con = mysql.createConnection({
//     multipleStatements: true,
//     host: 'localhost',
//     user: 'root',
//     password: 'password',
//     database: 'ipl'
// });

con.connect();

con.query("DROP TABLE IF EXISTS matches",
    (err, drop) => {
        if (err) {
            console.log("ERROR: ", err);
        } else {
            console.log("matches created");
        }
    });

con.query("DROP TABLE IF EXISTS deliveries",
    (err, drop) => {
        if (err) {
            console.log("ERROR: ", err);
        } else {
            console.log("deliveries created");
        }
    });

con.query("CREATE TABLE matches(id int,season int, city varchar(50),date date,team1 varchar(50),team2 varchar(50) ,toss_winner varchar(50),toss_decision varchar(50),result varchar(25),dl_applied int,winner varchar(50),win_by_runs int,win_by_wickets int,player_of_match varchar(50),venue varchar(100),umpire1 varchar(50),umpire2 varchar(50),umpire3 varchar(50))",
    (err, drop) => {
        if (err) {
            console.log("ERROR: ", err);
        } else {
            console.log("done");
        }
    });

con.query("CREATE TABLE deliveries(match_id int,inning int,batting_team varchar(100),bowling_team varchar(100),over int,ball int,batsman varchar(100),non_striker varchar(100),bowler varchar(100),is_super_over int,wide_runs int,bye_runs int,legbye_runs int,noball_runs int,penalty_runs int,batsman_runs int,extra_runs int,total_runs int,player_dismissed varchar(100),dismissal_kind varchar(100),fielder varchar(100))",
    (err, drop) => {
        if (err) {
            console.log("ERROR: ", err);
        } else {
            console.log("done");
        }
    });

con.query(`LOAD DATA LOCAL INFILE "../data/matches.csv" INTO TABLE matches FIELDS TERMINATED BY ',' ENCLOSED BY '"' LINES TERMINATED BY '\n' IGNORE 1 ROWS`,
    (err, drop) => {
        if (err) {
            console.log("ERROR: ", err);
        } else {
            console.log("Loaded data into matches");
        }
    });

con.query(`LOAD DATA LOCAL INFILE "../data/deliveries.csv" INTO TABLE deliveries FIELDS TERMINATED BY ',' ENCLOSED BY '"' LINES TERMINATED BY '\n' IGNORE 1 ROWS`,
    (err, drop) => {
        if (err) {
            console.log("ERROR: ", err);
        } else {
            console.log("Loaded data into deliveries");
        }
    });

con.query("select season,count(*)as matchesPlayed from matches group by season", (err, results, fields) => {
    if (err) {
        console.log(err);
    } else {
        saveResultToOutput(results, MATCHES_PLAYED_JSON_PATH)
    }
})

con.query("select winner as team,count(*)as count from matches where toss_winner = winner group by winner", (err, results, fields) => {
    if (err) {
        console.log(err);
    } else {
        saveResultToOutput(results, TOSS_WON_MATCH_WON_JSON_PATH)
    }
})

con.query("select season,max(count)as countPOM from (select season,player_of_match,count(player_of_match+player_of_match) as count from matches group by season,player_of_match order by count(player_of_match) desc )p group by season", (err, results, fields) => {
    if (err) {
        console.log(err);
    } else {
        saveResultToOutput(results, MOST_MAN_OF_MATCH_JSON_PATH)
    }
})

con.query(`select player_dismissed as batsman,bowler,count(bowler)as count from deliveries where player_dismissed!='' and dismissal_kind!="run out" group by player_dismissed,bowler order by count(bowler) desc limit 12`, (err, results, fields) => {
    if (err) {
        console.log(err);
    } else {
        saveResultToOutput(results, BATSMAN_VS_BOWLER)
    }
})

con.query(`select bowler,(sum(total_runs)-(sum(bye_runs)+sum(legbye_runs)))*6/(count(bowler)-count(case when wide_runs!=0 then 1 else null end)-count(case when noball_runs!=0 then 1 else null end)) as economy from deliveries where is_super_over=1 group by bowler`, (err, results, fields) => {
    if (err) {
        console.log(err);
    } else {
        saveResultToOutput(results, BEST_ECONOMY_SUPER_OVER_JSON_PATH)
    }
})

con.query(`select season,(sum(batsman_runs)*100/(count(batsman)-count(case when wide_runs!=0 then 1 else null end)))as strikeRate from matches join deliveries on matches.id=deliveries.match_id where batsman="MS Dhoni" group by season`, (err, results, fields) => {
    if (err) {
        console.log(err);
    } else {
        saveResultToOutput(results, STRIKERATE_JSON_PATH)
    }
})

function saveResultToOutput(result, path) {
    const jsonString = JSON.stringify(result);
    fs.writeFile(path, jsonString, "utf8", (err) => {
        if (err) {
            console.error(err);
        }
    });
}

con.end();
