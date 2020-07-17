function batsmanVsBowler(deliveries) {
  let result = {};
  deliveries
    .filter((delivery) => delivery.player_dismissed != "")
    .filter((delivery) => delivery.dismissal_kind != "run out")
    .map((delivery) => {
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
    });

  let data = [];
  for (let bowler in result) {
    let sorting = [];
    for (let batsman in result[bowler]) {
      sorting.push([bowler + " vs " + batsman, result[bowler][batsman]]);
    }
    sorting.map((player) => {
      data.push(player);
    });
  }

  data.sort((a, b) => {
    return b[1] - a[1];
  });

  return data.slice(0, 12);
}

function bestEconomyInSuperOver(deliveries) {
  const runs = {};
  const balls = {};
  const economy = {};
  deliveries
    .filter((delivery) => delivery.is_super_over === "1")
    .map((delivery) => {
      if (delivery.noball_runs != 0 || delivery.wide_runs != 0) {
        count = 1;
      } else {
        count = 0;
      }
      if (runs[delivery.bowler]) {
        runs[delivery.bowler] +=
          parseInt(delivery.total_runs) -
          (parseInt(delivery.bye_runs) + parseInt(delivery.legbye_runs));
        balls[delivery.bowler] += 1;
        balls[delivery] -= count;
        economy[delivery.bowler] =
          (runs[delivery.bowler] * 6) / balls[delivery.bowler];
      } else {
        runs[delivery.bowler] =
          parseInt(delivery.total_runs) -
          (parseInt(delivery.bye_runs) + parseInt(delivery.legbye_runs));
        balls[delivery.bowler] = 1;
        balls[delivery.bowler] -= count;
        economy[delivery.bowler] =
          (runs[delivery.bowler] * 6) / balls[delivery.bowler];
      }
    });
  return economy;
}

function matchesPlayedPerYear(matches) {
  const result = {};
  matches.map((match) => {
    if (result[match.season]) {
      result[match.season] += 1;
    } else {
      result[match.season] = 1;
    }
  });
  return result;
}

function mostManOfMatch(matches) {
  let result = {};
  matches.map((match) => {
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
  });
  let finalData = [];
  for (season in result) {
    let sorting = [];
    for (player in result[season]) {
      sorting.push([season + " " + player, result[season][player]]);
    }
    sorting.sort(function (a, b) {
      return b[1] - a[1];
    });
    finalData.push(sorting[0]);
  }
  return finalData;
}

function strikeRateOfBatsman(matches, deliveries) {
  let seasons = [];
  result = {};
  balls = {};
  runs = {};
  matches.map((match) => {
    if (!seasons.includes(match.season)) {
      seasons.push(match.season);
    }
  });
  seasons.map((season) => {
    result[season] = getStrikeRate(matches, deliveries, season);
  });

  return result;

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
    deliveries
      .filter(
        (delivery) => min <= delivery.match_id && max >= delivery.match_id
      )
      .filter((delivery) => delivery.batsman === "MS Dhoni")
      .map((delivery) => {
        if (delivery.wide_runs != 0) {
          count = 1;
        } else {
          count = 0;
        }
        if (runs[season]) {
          runs[season] += parseInt(delivery.batsman_runs);
          balls[season] += 1;
          balls[season] -= count;
        } else {
          runs[season] = parseInt(delivery.batsman_runs);
          balls[season] = 1;
        }
      });
    return ((runs[season] * 100) / balls[season]).toFixed(2);
  }
}

function tossWonMatchWon(matches) {
  const result = {};
  matches
    .filter((match) => match.toss_winner === match.winner)
    .map((match) => {
      if (result[match.winner]) {
        result[match.winner] += 1;
      } else {
        result[match.winner] = 1;
      }
    });
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
