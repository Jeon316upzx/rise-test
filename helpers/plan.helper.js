const Handler = require("../helpers/requesthandler.helper");

class Plan {
  static async getPlan() {
    const url =
      "https://manator-api-br-rn-challenge.herokuapp.com/sample-goal-plan.json";

    let result = await Handler.makeGetRequest(url);
    // console.log(result);
    return result.data;
  }

  static async calculateDailyFixedIncomeReturns(balance, percentage) {
    let bal = parseInt(balance);
    let annualpercent = parseInt(percentage) / 100;
    let dailpercent = annualpercent / 365;

    return bal * dailpercent;
  }
}

module.exports = Plan;
