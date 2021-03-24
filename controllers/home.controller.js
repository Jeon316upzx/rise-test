//homeControllers
exports.getHome = (req, res) => {
  return res.status(200).send({
    success: true,
    payload: {
      name: "Anuebunwa Ifeanyi",
      email: "jeon316@icloud.com",
    },
    message: "This is the root of the Endpoint",
  });
};
