const axios = require("axios");

class RequestHandler {
  static async makeGetRequest(url) {
    let result = await axios.get(url);
    return result.data;
  }

  static async makePostRequest(url, data) {
    let result = await axios.post(url, data);
    return result.data;
  }
}

module.exports = RequestHandler;
