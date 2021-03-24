let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../app");
let should = chai.should();

chai.use(chaiHttp);

describe("Rise testCase", () => {
  //get portfolio
  describe("getPorfolio", () => {
    it("it should GET the portfolio of a user", (done) => {
      chai
        .request(server)
        .get("/rise-test-api/v1/portfolio")
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });

  //get plan
  describe("getPlan", () => {
    it("it should GET the plan of a user", (done) => {
      chai
        .request(server)
        .get("/rise-test-api/v1/plan")
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });

  //Get Returns when route is protected ~ 401
  describe("getReturns when route is protected", () => {
    it("it should throw 401 when try to GET the returns when route is protected", (done) => {
      chai
        .request(server)
        .get("/rise-test-api/v1/returns")
        .end((err, res) => {
          res.should.have.status(401);
          done();
        });
    });
  });

  //Get Returns when route is not protected ~ 200, kindly change the status from protected variable to false for this test to pass
  //   describe("getReturns when route is protected", () => {
  //     it("it should GET the returns when route is not protected", (done) => {
  //       chai
  //         .request(server)
  //         .get("/rise-test-api/v1/returns")
  //         .end((err, res) => {
  //           res.should.have.status(200);
  //           done();
  //         });
  //     });
  //   });
});
