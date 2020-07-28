const fs = require("fs");
const csv = require("csvtojson");

const ipl = require("./ipl");

const MATCHES_FILE_PATH = "../data/matches.csv";
const DELEVERIES_FILE_PATH = "../data/deliveries.csv";
const MATCHES_PLAYED_JSON_PATH = "../public/output/matchesPlayedPerYear.json";
const TOSS_WON_MATCH_WON_JSON_PATH = "../public/output/tossWonMatchWon.json";
const BEST_ECONOMY_SUPER_OVER_JSON_PATH =
  "../public/output/bestEconomyInSuperOver.json";
const MOST_MAN_OF_MATCH_JSON_PATH = "../public/output/mostManOfMatch.json";
const STRIKERATE_JSON_PATH = "../public/output/strikeRateOfBatsman.json";
const BATSMAN_VS_BOWLER = "../public/output/batsmanVsBowler.json";

function main() {
  csv()
    .fromFile(MATCHES_FILE_PATH)
    .then((matches) => {
      csv()
        .fromFile(DELEVERIES_FILE_PATH)
        .then((deliveries) => {
          let resultMatchesPlayedPerYear = ipl.matchesPlayedPerYear(matches);
          let resultTossWonMatchWon = ipl.tossWonMatchWon(matches);
          let resultBestEconomyInSuperOver = ipl.bestEconomyInSuperOver(
            deliveries
          );
          let resultMostManOfMatch = ipl.mostManOfMatch(matches);
          let resultStrikeRateOfBatsman = ipl.strikeRateOfBatsman(
            matches,
            deliveries,
            "MS Dhoni"
          );
          let resultBatsmanVsBowler = ipl.batsmanVsBowler(deliveries);

          saveResultToOutput(
            resultMatchesPlayedPerYear,
            MATCHES_PLAYED_JSON_PATH
          );
          saveResultToOutput(
            resultTossWonMatchWon,
            TOSS_WON_MATCH_WON_JSON_PATH
          );
          saveResultToOutput(
            resultBestEconomyInSuperOver,
            BEST_ECONOMY_SUPER_OVER_JSON_PATH
          );
          saveResultToOutput(resultMostManOfMatch, MOST_MAN_OF_MATCH_JSON_PATH);
          saveResultToOutput(resultStrikeRateOfBatsman, STRIKERATE_JSON_PATH);
          saveResultToOutput(resultBatsmanVsBowler, BATSMAN_VS_BOWLER);
        });
    });
}

function saveResultToOutput(result, path) {
  const jsonString = JSON.stringify(result);
  fs.writeFile(path, jsonString, "utf8", (err) => {
    if (err) {
      console.error(err);
    }
  });
}

main();
