const JWT = require("jsonwebtoken");

module.exports = (body) => {
  if (!body) {
    return new Error("invalid jwtdata");
  }
  console.log("JWT body", body.toString("utf8"));
  console.log("JWT variable", process.env.JWT);

  return JWT.verify(body.toString("utf8"), process.env.JWT, {
    algorithm: "HS256",
  });
};
