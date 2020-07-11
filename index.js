const fs = require("fs");
const csv = require("csvtojson");
const matchesPlayedPerYear = require("./ipl/matchesPlayedPerYear");
const tossWonMatchWon= require("./ipl/tossWonMatchwon");
const bestEconomyInSuperOver = require("./ipl/bestEconomyInSuperOver");
const mostManOfMatch = require("./ipl/mostManOfMatch");
const strikeRateOfBatsman = require("./ipl/strikeRateOfBatsman");
const batsmanVsBowler = require("./ipl/batsmanVsBowler");

const MATCHES_FILE_PATH = "./csv_data/matches.csv";
const DELEVERIES_FILE_PATH = "./csv_data/deliveries.csv";
const JSON_OUTPUT_FILE_PATH = "./public/data.json";

function main() {
  csv()
    .fromFile(MATCHES_FILE_PATH)
    .then(matches => {
      csv()
        .fromFile(DELEVERIES_FILE_PATH)
        .then(deliveries => {
          let result = matchesPlayedPerYear(matches);
          let result1 = tossWonMatchWon(matches);
          let result2 = bestEconomyInSuperOver(deliveries);
          let result3 = mostManOfMatch(matches);
          let result4 = strikeRateOfBatsman(matches,deliveries);
          let result5 = batsmanVsBowler(deliveries);
          saveMatchesPlayedPerYear(result,result1,result2,result3,result4,result5);
        }) 
    });
}

function saveMatchesPlayedPerYear(result,result1,result2,result3,result4,result5) {
  const jsonData = {
    matchesPlayedPerYear: result,
    tossWonMatchWon: result1,
    bestEconomyInSuperOver:result2,
    mostManOfMatch:result3,
    strikeRateOfBatsman:result4,
    batsmanVsBowler:result5
  };
  const jsonString = JSON.stringify(jsonData);
  fs.writeFile(JSON_OUTPUT_FILE_PATH, jsonString, "utf8", err => {
    if (err) {
      console.error(err);
    }
  });
}

main();
