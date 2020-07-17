const fs = require("fs");
const csv = require("csvtojson");

const ipl = require("./ipl");

const MATCHES_FILE_PATH = "../data/matches.csv";
const DELEVERIES_FILE_PATH = "../data/deliveries.csv";
const MATCHES_PLAYED_JSON_PATH = "../output/matchesPlayedPerYear.json";
const TOSS_WON_MATCH_WON_JSON_PATH = "../output/tossWonMatchWon.json";
const BEST_ECONOMY_SUPER_OVER_JSON_PATH =
  "../output/bestEconomyInSuperOver.json";
const MOST_MAN_OF_MATCH_JSON_PATH = "../output/mostManOfMatch.json";
const STRIKERATE_JSON_PATH = "../output/strikeRateOfBatsman.json";
const BATSMAN_VS_BOWLER = "../output/batsmanVsBowler.json";

function main() {
  csv()
    .fromFile(MATCHES_FILE_PATH)
    .then((matches) => {
      csv()
        .fromFile(DELEVERIES_FILE_PATH)
        .then((deliveries) => {
          let result = ipl.matchesPlayedPerYear(matches);
          let result1 = ipl.tossWonMatchWon(matches);
          let result2 = ipl.bestEconomyInSuperOver(deliveries);
          let result3 = ipl.mostManOfMatch(matches);
          let result4 = ipl.strikeRateOfBatsman(matches, deliveries);
          let result5 = ipl.batsmanVsBowler(deliveries);

          saveMatchesPlayedPerYear(result);
          savetossWonMatchWon(result1);
          savebestEconomyInSuperOver(result2);
          savemostManOfMatch(result3);
          savestrikeRateOfBatsman(result4);
          savebatsmanVsBowler(result5);
        });
    });
}

function saveMatchesPlayedPerYear(result) {
  const jsonString = JSON.stringify(result);
  fs.writeFile(MATCHES_PLAYED_JSON_PATH, jsonString, "utf8", (err) => {
    if (err) {
      console.error(err);
    }
  });
}

function savetossWonMatchWon(result) {
  const jsonString = JSON.stringify(result);
  fs.writeFile(TOSS_WON_MATCH_WON_JSON_PATH, jsonString, "utf8", (err) => {
    if (err) {
      console.error(err);
    }
  });
}

function savebestEconomyInSuperOver(result) {
  const jsonString = JSON.stringify(result);
  fs.writeFile(BEST_ECONOMY_SUPER_OVER_JSON_PATH, jsonString, "utf8", (err) => {
    if (err) {
      console.error(err);
    }
  });
}

function savemostManOfMatch(result) {
  const jsonString = JSON.stringify(result);
  fs.writeFile(MOST_MAN_OF_MATCH_JSON_PATH, jsonString, "utf8", (err) => {
    if (err) {
      console.error(err);
    }
  });
}

function savestrikeRateOfBatsman(result) {
  const jsonString = JSON.stringify(result);
  fs.writeFile(STRIKERATE_JSON_PATH, jsonString, "utf8", (err) => {
    if (err) {
      console.error(err);
    }
  });
}

function savebatsmanVsBowler(result) {
  const jsonString = JSON.stringify(result);
  fs.writeFile(BATSMAN_VS_BOWLER, jsonString, "utf8", (err) => {
    if (err) {
      console.error(err);
    }
  });
}

main();
