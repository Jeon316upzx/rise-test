const PlanHelper = require("../helpers/plan.helper");

exports.fetchPlan = async (req, res) => {
  let response = await PlanHelper.getPlan();

  if (response && response != "undefined") {
    return res.status(200).send({
      message: true,
      payload: {
        portfolio: response,
      },
    });
  }
};
