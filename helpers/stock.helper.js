const Handler = require("../helpers/requesthandler.helper");

class Stock {
  static async getStockPerformance() {
    const url =
      "https://manator-api-br-rn-challenge.herokuapp.com/stock-performance.json";

    let result = await Handler.makeGetRequest(url);
    // console.log(result);
    return result;
  }

  static async groupDailyStockPerformanceByDate(stockdata) {
    //group stock data by date
    const items = stockdata.reduce((items, data) => {
      //split date from the T character
      const date = data.createdAt.split("T")[0];
      if (!items[date]) {
        items[date] = [];
      }
      items[date].push(data);
      return items;
    }, {});

    //return in Array-like format.
    const itemArrays = Object.keys(items).map((date) => {
      return {
        date,
        data: items[date],
      };
    });

    return itemArrays;
  }

  static async calculateDailyStockPerformanceByDate(groups) {
    //initial per annum performance total
    let per_annum_performance = 0;

    //Get all elements
    groups.forEach((element) => {
      //   console.log(element.date);

      //initial loss total
      let loss = 0;
      //initial gain total
      let gain = 0;

      //loop through each dataset for each group and
      //check if the type of data is loss or gain and treat accordingly
      element.data.forEach((innerElement) => {
        if (innerElement.type == "loss") {
          loss = loss + innerElement.value;
        } else {
          gain = gain + innerElement.value;
        }
      });

      //get daily stock performance like so
      let daily_performance = gain - loss;
      //update the per annum performance total with the daily ie the dately performance
      per_annum_performance = per_annum_performance + daily_performance;

      //   Debugging;
      //   console.log(`${gain} - ${loss}`);
      //   console.log(daily_performance, "DAILY PERFORMANCE");
      //   console.log(per_annum_performance, "PER ANNUM");
    });

    // console.log(per_annum_performance, "PER ANNUM");

    return per_annum_performance;
  }
}

module.exports = Stock;
