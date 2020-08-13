const dotenv = require('dotenv');
dotenv.config();

const mysql = require("mysql");

let con = mysql.createConnection({
    multipleStatements: true,
    host: process.env.HOST,
    user: process.env.USERNAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});

con.connect();

var droptable1 = "DROP TABLE IF EXISTS matches";
runQuery(droptable1, "executed");

var droptable2 = "DROP TABLE IF EXISTS deliveries";
runQuery(droptable2, "executed");

var createTable1 = "CREATE TABLE matches(id int,season int, city varchar(50),date date,team1 varchar(50),team2 varchar(50) ,toss_winner varchar(50),toss_decision varchar(50),result varchar(25),dl_applied int,winner varchar(50),win_by_runs int,win_by_wickets int,player_of_match varchar(50),venue varchar(100),umpire1 varchar(50),umpire2 varchar(50),umpire3 varchar(50))";
runQuery(createTable1, "executed");

var createTable2 = "CREATE TABLE deliveries(match_id int,inning int,batting_team varchar(100),bowling_team varchar(100),over int,ball int,batsman varchar(100),non_striker varchar(100),bowler varchar(100),is_super_over int,wide_runs int,bye_runs int,legbye_runs int,noball_runs int,penalty_runs int,batsman_runs int,extra_runs int,total_runs int,player_dismissed varchar(100),dismissal_kind varchar(100),fielder varchar(100))";
runQuery(createTable2, "executed");

var loadData1 = `LOAD DATA LOCAL INFILE "../data/matches.csv" INTO TABLE matches FIELDS TERMINATED BY ',' ENCLOSED BY '"' LINES TERMINATED BY '\n' IGNORE 1 ROWS`;
runQuery(loadData1, "executed");

var loadData2 = `LOAD DATA LOCAL INFILE "../data/deliveries.csv" INTO TABLE deliveries FIELDS TERMINATED BY ',' ENCLOSED BY '"' LINES TERMINATED BY '\n' IGNORE 1 ROWS`;
runQuery(loadData2, "executed");

function runQuery(query, msg) {
    con.query(query,
        (err, drop) => {
            if (err) {
                console.log("ERROR: ", err);
            } else {
                console.log(msg);
            }
        });
}

con.end();