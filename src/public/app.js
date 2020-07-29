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
        data: matchesPlayedPerYear,
      },
    ],
  });
}

function tossWonMatchWon(tossWonMatchWon) {
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
        data: tossWonMatchWon,
      },
    ],
  });
}

function bestEconomyInSuperOver(bestEconomyInSuperOver) {
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
        data: bestEconomyInSuperOver,
      },
    ],
  });
}

function mostManOfMatch(data1) {
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
        data: data1,
      },
    ],
  });
}

function strikeRateOfBatsman(strikeRateOfBatsman) {
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
        data: strikeRateOfBatsman,
      },
    ],
  });
}

function batsmanVsBowler(data1) {
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
        data: data1,
      },
    ],
  });
}
