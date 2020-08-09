function fetchAndVisualizeData() {
  fetch("./output/matchesPlayedPerYear.json")
    .then((r) => r.json())
    .then(visualizeMatchesPlayedPerYear);
  fetch("./output/tossWonMatchWon.json")
    .then((r) => r.json())
    .then(tossWonMatchWon);
  fetch("./output/bestEconomyInSuperOver.json")
    .then((r) => r.json())
    .then(bestEconomyInSuperOver);
  fetch("./output/mostManOfMatch.json")
    .then((r) => r.json())
    .then(mostManOfMatch);
  fetch("./output/strikeRateOfBatsman.json")
    .then((r) => r.json())
    .then(strikeRateOfBatsman);
  fetch("./output/batsmanVsBowler.json")
    .then((r) => r.json())
    .then(batsmanVsBowler);
}

fetchAndVisualizeData();

function visualizeMatchesPlayedPerYear(matchesPlayedPerYear) {
  const data = matchesPlayedPerYear.reduce((data, season) => {
    data.push([season.season, season.matchesPlayed]);
    return data;
  }, [])
  Highcharts.chart("matches-played-per-year", {
    chart: {
      type: "column",
    },
    title: {
      text: "Matches Played Per Year",
    },
    subtitle: {
      text:
        'Source: <a href="https://www.kaggle.com/nowke9/ipldata/data">IPL Dataset</a>',
    },
    xAxis: {
      type: "category",
    },
    yAxis: {
      min: 0,
      title: {
        text: "Matches",
      },
    },
    series: [
      {
        name: "Years",
        data: data,
      },
    ],
  });
}

function tossWonMatchWon(tossWonMatchWon) {
  const data = tossWonMatchWon.reduce((data, teamData) => {
    data.push([teamData.team, teamData.count]);
    return data;
  }, [])
  Highcharts.chart("container", {
    chart: {
      type: "column",
    },
    title: {
      text: "Teams Won toss goes to Win match",
    },
    subtitle: {
      text:
        'Source: <a href="https://www.kaggle.com/nowke9/ipldata/data">IPL Dataset</a>',
    },
    xAxis: {
      type: "category",
    },
    yAxis: {
      min: 0,
      title: {
        text: "Matches",
      },
    },
    series: [
      {
        name: "Wins",
        data: data,
      },
    ],
  });
}

function bestEconomyInSuperOver(bestEconomyInSuperOver) {
  const data = bestEconomyInSuperOver.reduce((data, bowlerData) => {
    data.push([bowlerData.bowler, bowlerData.economy]);
    return data;
  }, [])
  Highcharts.chart("container1", {
    chart: {
      type: "column",
    },
    title: {
      text: "Econmical bowlers in super-Over",
    },
    subtitle: {
      text:
        'Source: <a href="https://www.kaggle.com/nowke9/ipldata/data">IPL Dataset</a>',
    },
    xAxis: {
      type: "category",
    },
    yAxis: {
      min: 0,
      title: {
        text: "Economy",
      },
    },
    series: [
      {
        name: "Economy",
        data: data,
      },
    ],
  });
}

function mostManOfMatch(mostManOfMatch) {
  const result = mostManOfMatch.reduce((result, data) => {
    result.push([data.season, data.countPOM]);
    return result;
  }, [])
  Highcharts.chart("container2", {
    chart: {
      type: "column",
    },
    title: {
      text: "Most Player of Match per Season",
    },
    subtitle: {
      text:
        'Source: <a href="https://www.kaggle.com/nowke9/ipldata/data">IPL Dataset</a>',
    },
    xAxis: {
      type: "category",
    },
    yAxis: {
      min: 0,
      title: {
        text: "Matches",
      },
    },
    series: [
      {
        name: "Most Player of Match",
        data: result,
      },
    ],
  });
}

function strikeRateOfBatsman(strikeRateOfBatsman) {
  const result = strikeRateOfBatsman.reduce((result, data) => {
    result.push([data.season, data.strikeRate]);
    return result;
  }, [])
  Highcharts.chart("container3", {
    chart: {
      type: "column",
    },
    title: {
      text: "MS Dhoni - Strike rate in all Seasons.",
    },
    subtitle: {
      text:
        'Source: <a href="https://www.kaggle.com/nowke9/ipldata/data">IPL Dataset</a>',
    },
    xAxis: {
      type: "category",
    },
    yAxis: {
      min: 0,
      title: {
        text: "Strike Rate",
      },
    },
    series: [
      {
        name: "Strike Rate",
        data: result,
      },
    ],
  });
}

function batsmanVsBowler(batsmanVsBowler) {
  const result = batsmanVsBowler.reduce((result, data) => {
    result.push([data.batsman + " vs " + data.bowler, data.count]);
    return result;
  }, [])
  Highcharts.chart("container4", {
    chart: {
      type: "column",
    },
    title: {
      text:
        "Highest number of times one Player has been dismissed by another Player",
    },
    subtitle: {
      text:
        'Source: <a href="https://www.kaggle.com/nowke9/ipldata/data">IPL Dataset</a>',
    },
    xAxis: {
      type: "category",
    },
    yAxis: {
      min: 0,
      title: {
        text: "Matches",
      },
    },
    series: [
      {
        name: "Wickets",
        data: result,
      },
    ],
  });
}
