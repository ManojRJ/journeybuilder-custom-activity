const JWT = require("jsonwebtoken");

module.exports = (body) => {
  if (!body) {
    return new Error("invalid jwtdata");
  }
  console.log("JWT body", body.toString());
  console.log("JWT body object", body);
  console.log("JWT variable", process.env.JWT);

  return JWT.verify(body.toString("utf8"), process.env.JWT, {
    algorithm: "HS256",
  });
};
