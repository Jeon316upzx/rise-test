const Handler = require("../helpers/requesthandler.helper");

class Portfolio {
  static async fetchPortfolio() {
    const url =
      "https://manator-api-br-rn-challenge.herokuapp.com/sample-user-portfolio.json";

    let result = await Handler.makeGetRequest(url);
    // console.log(result);
    return result;
  }
}

module.exports = Portfolio;
