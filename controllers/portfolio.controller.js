const { response } = require("express");
const RequestHandler = require("../helpers/requesthandler.helper");
const PortfolioHelper = require("../helpers/portfolio.helper");

exports.getPortfolio = async (req, res) => {
  let response = await PortfolioHelper.fetchPortfolio();

  if (response && response != "undefined") {
    return res.status(200).send({
      message: true,
      payload: {
        portfolio: response,
      },
    });
  }
};
