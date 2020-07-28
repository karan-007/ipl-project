function batsmanVsBowler(deliveries) {
  let result = deliveries
    .filter((delivery) => delivery.player_dismissed != "")
    .filter((delivery) => delivery.dismissal_kind != "run out")
    .reduce((result, delivery) => {
      if (result[delivery.bowler]) {
        if (result[delivery.bowler][delivery.player_dismissed]) {
          result[delivery.bowler][delivery.player_dismissed] += 1;
        } else {
          result[delivery.bowler][delivery.player_dismissed] = 1;
        }
      } else {
        result[delivery.bowler] = {};
        result[delivery.bowler][delivery.player_dismissed] = 1;
      }
      return result;
    }, {});

  let convertArr = Object.entries(result).map((bowler) => {
    return [bowler[0], Object.entries(bowler[1])];
  });
  let finalResult = convertArr.reduce((finalResult, bowler) => {
    let temp = bowler[1].map((batsman) => {
      return [bowler[0] + " vs " + batsman[0], batsman[1]];
    });
    return finalResult.concat(temp);
  }, []);

  finalResult.sort((a, b) => {
    return b[1] - a[1];
  });

  return finalResult.slice(0, 12);
}

function bestEconomyInSuperOver(deliveries) {
  const player = deliveries
    .filter((delivery) => delivery.is_super_over === "1")
    .reduce((player, delivery) => {
      if (delivery.noball_runs != 0 || delivery.wide_runs != 0) {
        count = 1;
      } else {
        count = 0;
      }
      if (player[delivery.bowler]) {
        if (player[delivery.bowler]["runs"]) {
          player[delivery.bowler]["runs"] +=
            parseInt(delivery.total_runs) -
            (parseInt(delivery.bye_runs) + parseInt(delivery.legbye_runs));
          player[delivery.bowler]["balls"] += 1;
          player[delivery.bowler]["balls"] -= count;
        } else {
          player[delivery.bowler]["runs"] =
            parseInt(delivery.total_runs) -
            (parseInt(delivery.bye_runs) + parseInt(delivery.legbye_runs));
          player[delivery.bowler]["balls"] = 1;
          player[delivery.bowler]["balls"] -= count;
        }
      } else {
        player[delivery.bowler] = {};
        player[delivery.bowler]["runs"] =
          parseInt(delivery.total_runs) -
          (parseInt(delivery.bye_runs) + parseInt(delivery.legbye_runs));
        player[delivery.bowler]["balls"] = 1;
        player[delivery.bowler]["balls"] -= count;
      }
      return player;
    }, {});

  const economy = {};
  for (let bowler in player) {
    economy[bowler] = (player[bowler]["runs"] * 6) / player[bowler]["balls"];
  }
  return economy;
}

function matchesPlayedPerYear(matches) {
  const result = matches.reduce((result, match) => {
    if (result[match.season]) {
      result[match.season] += 1;
    } else {
      result[match.season] = 1;
    }
    return result;
  }, {});
  return result;
}

function mostManOfMatch(matches) {
  let result = matches.reduce((result, match) => {
    if (result[match.season]) {
      if (result[match.season][match.player_of_match]) {
        result[match.season][match.player_of_match] += 1;
      } else {
        result[match.season][match.player_of_match] = 1;
      }
    } else {
      result[match.season] = {};
      result[match.season][match.player_of_match] = 1;
    }
    return result;
  }, {});
  let finalResult = Object.entries(result).reduce((finalResult, season) => {
    let sorting = Object.entries(season[1]).map((player) => {
      return [season[0] + " " + player[0], player[1]];
    });
    sorting.sort((a, b) => {
      return b[1] - a[1];
    });
    return finalResult.concat([sorting[0]]);
  }, []);

  return finalResult;
}

function strikeRateOfBatsman(matches, deliveries, player) {
  let finalResult = {};
  let seasons = new Set(matches.map((match) => match.season));
  seasons = [...seasons];
  seasons.forEach((season) => {
    finalResult[season] = getStrikeRate(matches, deliveries, season);
  });

  return finalResult;

  function getStrikeRate(matches, deliveries, season) {
    let min = 100000;
    let max = 0;

    matches
      .filter((match) => match.season === season)
      .map((match) => {
        if (match.id < min) {
          min = parseInt(match.id);
        }
        if (match.id > max) {
          max = parseInt(match.id);
        }
      });

    let result = deliveries
      .filter(
        (delivery) => min <= delivery.match_id && max >= delivery.match_id
      )
      .filter((delivery) => delivery.batsman === player)
      .reduce((result, delivery) => {
        if (delivery.wide_runs != 0) {
          count = 1;
        } else {
          count = 0;
        }
        if (result["runs"]) {
          result["runs"] += parseInt(delivery.batsman_runs);
          result["balls"] += 1;
          result["balls"] -= count;
        } else {
          result["runs"] = parseInt(delivery.batsman_runs);
          result["balls"] = 1;
        }
        return result;
      }, {});

    return ((result["runs"] * 100) / result["balls"]).toFixed(2);
  }
}

function tossWonMatchWon(matches) {
  const result = matches
    .filter((match) => match.toss_winner === match.winner)
    .reduce((result, match) => {
      if (result[match.winner]) {
        result[match.winner] += 1;
      } else {
        result[match.winner] = 1;
      }
      return result;
    }, {});
  return result;
}

module.exports = {
  tossWonMatchWon: tossWonMatchWon,
  strikeRateOfBatsman: strikeRateOfBatsman,
  mostManOfMatch: mostManOfMatch,
  matchesPlayedPerYear: matchesPlayedPerYear,
  batsmanVsBowler: batsmanVsBowler,
  bestEconomyInSuperOver: bestEconomyInSuperOver,
};
