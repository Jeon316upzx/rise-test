const Plan = require("../helpers/plan.helper");
const PortfolioHelper = require("../helpers/portfolio.helper");
const StockHelper = require("../helpers/stock.helper");

exports.getPlanPerformance = async (req, res) => {
  //   const FIXED_INCOME_RETURNS = 0;
  //   const STOCK_RETURNS = 0;

  //get plan details
  let plan_details = await Plan.getPlan();

  //get portfolio
  let portfolio = await PortfolioHelper.fetchPortfolio();

  //get Stock perfomance data
  let stockdata = await StockHelper.getStockPerformance();

  //get PORTFOLIO TOTAL
  const TOTAL_PORTFOLIO_AMOUNT = portfolio.mixes.reduce((a, b) => {
    return parseInt(a.balance) + parseInt(b.balance);
  });

  //CALCULATE FIXED INCOME RETURNS PER ANNUM

  //PERCENTAGE RETURN ON INVESTMENT
  const FIXED_INCOME_ROI_PERCENTAGE = 10;

  //FIXED INCOME BALANCE
  const FIXED_INCOME_ASSET_BALANCE = portfolio.mixes[1].balance;

  const DAILY_FIXED_INCOME_ASSET_RETURNS = await Plan.calculateDailyFixedIncomeReturns(
    FIXED_INCOME_ASSET_BALANCE,
    FIXED_INCOME_ROI_PERCENTAGE
  );

  const YEARLY_FIXED_INCOME_ASSET_RETURNS =
    DAILY_FIXED_INCOME_ASSET_RETURNS * 365;

  //CALCULATE STOCK ASSETS RETURNS PER ANNUM

  //STOCK ASSET BALANCE
  const STOCK_ASSET = portfolio.mixes[0].balance;

  let groups_by_date = await StockHelper.groupDailyStockPerformanceByDate(
    stockdata
  );

  let daily_performance_by_date = await StockHelper.calculateDailyStockPerformanceByDate(
    groups_by_date
  );

  //ADD THE YEARLY FIXED INCOME ASSETS RETURNS  TO AN AGGREGATED DAILY PERFORMANCE RETURNS
  const TOTAL_RETURNS =
    YEARLY_FIXED_INCOME_ASSET_RETURNS + daily_performance_by_date;

  console.log(TOTAL_RETURNS);

  //   console.log(daily_performance_by_date);

  //   console.log(groups_by_date);

  res.status(200).send({
    success: true,
    payload: {
      plan_details: plan_details,
      total_returns: TOTAL_RETURNS,
    },
  });
};
