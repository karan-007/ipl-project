//const mostManOfMatch = require("../ipl/mostManOfMatch");

function fetchAndVisualizeData() {
  fetch("./data.json")
    .then(r => r.json())
    .then(visualizeData);
}

fetchAndVisualizeData();

function visualizeData(data) {
  visualizeMatchesPlayedPerYear(data.matchesPlayedPerYear);
  tossWonMatchWon(data.tossWonMatchWon);
  bestEconomyInSuperOver(data.bestEconomyInSuperOver);
  mostManOfMatch(data.mostManOfMatch);
  strikeRateOfBatsman(data.strikeRateOfBatsman);
  batsmanVsBowler(data.batsmanVsBowler);
  return;
}

function visualizeMatchesPlayedPerYear(matchesPlayedPerYear) {
  const seriesData = [];
  for (let year in matchesPlayedPerYear) {
    seriesData.push([year, matchesPlayedPerYear[year]]);
  }
  //console.log(seriesData)
  Highcharts.chart("matches-played-per-year", {
    chart: {
      type: "column"
    },
    title: {
      text: "Matches Played Per Year"
    },
    subtitle: {
      text:
        'Source: <a href="https://www.kaggle.com/nowke9/ipldata/data">IPL Dataset</a>'
    },
    xAxis: {
      type: "category"
    },
    yAxis: {
      min: 0,
      title: {
        text: "Matches"
      }
    },
    series: [
      {
        name: "Years",
        data: seriesData
      }
    ]
  });
}

function tossWonMatchWon(tossWonMatchWon) {
  const seriesData = [];
  for (let team in tossWonMatchWon) {
    seriesData.push([team, tossWonMatchWon[team]]);
  }

  Highcharts.chart("container", {
    chart: {
      type: "column"
    },
    title: {
      text: "Teams Won toss goes to Win match"
    },
    subtitle: {
      text:
        'Source: <a href="https://www.kaggle.com/nowke9/ipldata/data">IPL Dataset</a>'
    },
    xAxis: {
      type: "category"
    },
    yAxis: {
      min: 0,
      title: {
        text: "Matches"
      }
    },
    series: [
      {
        name: "Team",
        data: seriesData
      }
    ]
  });
}

function bestEconomyInSuperOver(bestEconomyInSuperOver) {
  const seriesData = [];
  for (let bowler in bestEconomyInSuperOver) {
    seriesData.push([bowler, bestEconomyInSuperOver[bowler]]);
  }

  Highcharts.chart("container1", {
    chart: {
      type: "column"
    },
    title: {
      text: "Econmical bowlers in super-Over"
    },
    subtitle: {
      text:
        'Source: <a href="https://www.kaggle.com/nowke9/ipldata/data">IPL Dataset</a>'
    },
    xAxis: {
      type: "category"
    },
    yAxis: {
      min: 0,
      title: {
        text: "Economy"
      }
    },
    series: [
      {
        name: "Player",
        data: seriesData
      }
    ]
  });
}

function mostManOfMatch(data1) {
  Highcharts.chart("container2", {
    chart: {
      type: "column"
    },
    title: {
      text: "Most Player of Match per Season"
    },
    subtitle: {
      text:
        'Source: <a href="https://www.kaggle.com/nowke9/ipldata/data">IPL Dataset</a>'
    },
    xAxis: {
      type:"category"
    },
    yAxis: {
      min: 0,
      title: {
        text: "Matches"
      }
    },
    series: [
      {
        name: "Most Player of Match",
        data: data1
      }
    ]
  });
}


function strikeRateOfBatsman(strikeRateOfBatsman) {
  const seriesData = [];
  for (let season in strikeRateOfBatsman) {
    seriesData.push([season,parseFloat(strikeRateOfBatsman[season])]);
  }

  Highcharts.chart("container3", {
    chart: {
      type: "column"
    },
    title: {
      text: "MS Dhoni - Strike rate in all Seasons."
    },
    subtitle: {
      text:
        'Source: <a href="https://www.kaggle.com/nowke9/ipldata/data">IPL Dataset</a>'
    },
    xAxis: {
      type: "category"
    },
    yAxis: {
      min: 0,
      title: {
        text: "Strike Rate"
      }
    },
    series: [
      {
        name: "Season",
        data: seriesData
      }
    ]
  });
}

function batsmanVsBowler(data1) {
  Highcharts.chart("container4", {
    chart: {
      type: "column"
    },
    title: {
      text: "Highest number of times one Player has been dismissed by another Player"
    },
    subtitle: {
      text:
        'Source: <a href="https://www.kaggle.com/nowke9/ipldata/data">IPL Dataset</a>'
    },
    xAxis: {
      type:"category"
    },
    yAxis: {
      min: 0,
      title: {
        text: "Matches"
      }
    },
    series: [
      {
        name: "Bowler vs Batsman",
        data: data1
      }
    ]
  });
}