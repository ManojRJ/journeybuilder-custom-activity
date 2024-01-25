const { v1: Uuidv1 } = require("uuid");
const JWT = require("../utils/jwtDecoder");
const SFClient = require("../utils/sfmc-client");
const logger = require("../utils/logger");
const jwts = require("jsonwebtoken");

/**
 * The Journey Builder calls this method for each contact processed by the journey.
 * @param req
 * @param res
 * @returns {Promise<void>}
 *
 *
 *
 */

// const secretKey =
//   "QecXGync1dl34H_Ro8ZKnveYC81ODv-FAtfwsjHwltYMXPH3y8XQx5mlTQWk638Lg8RPwDhlIyY-GqOXS9ykvAzzdviYyS-Nd1Rd9ESeZ-iFLTntoOFnq25jhLmfCKO7ew53k9hOIRuO2QhHhecAlAXX14p-aw_cz7hdKJGBrIOk-04Zbs4kUvjMS4aIcdJkkAr6gaF9k0dTEUAiwg8W4LE1DJHfZLWNyb85iYBjY4Kkw5vDBKskiLkUdiBbGw2";

// const token =
//   "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpbkFyZ3VtZW50cyI6W3siY29udGFjdEtleSI6Im1qMyIsIkRyb3Bkb3duT3B0aW9ucyI6ImpvdXJuZXlFbnRyeSIsIlRleHQiOiJIZWxsbyJ9XSwiYWN0aXZpdHlPYmplY3RJRCI6ImQ2OTYyNGY2LTM4ZGItNDdmOC04NjNjLWQwZDY2MzY4M2ViNyIsImpvdXJuZXlJZCI6ImVhMTUzZjkzLTE1YjktNGFiZC04MGIxLTVkODA4ZTEwYWFlNyIsImFjdGl2aXR5SWQiOiJkNjk2MjRmNi0zOGRiLTQ3ZjgtODYzYy1kMGQ2NjM2ODNlYjciLCJkZWZpbml0aW9uSW5zdGFuY2VJZCI6Ijc2NjEyMmZhLWJiZDUtNDFhMy1hNTM5LTlmYzI1YWNlOWFhYyIsImFjdGl2aXR5SW5zdGFuY2VJZCI6IjYxZDczYTZkLTRhNGQtNGY3My04MmRmLTY4NDBlNTk4NWFjMyIsImtleVZhbHVlIjoibWozIiwibW9kZSI6MH0.vPV4PA_iZcWDLCMr3WCCGMPeSR9Jw2Mud2ziqBrl1s8";

// jwts.verify(token, secretKey, (err, decoded) => {
//   if (err) {
//     console.error("Token verification failed:", err);
//   } else {
//     console.log("Token verified successfully:", decoded);
//   }
// });

exports.execute = async (req, res) => {
  // decode data
  console.log("activity js JWT request body", req.body);
  const data = JWT(req.body);
  console.log("activity js JWT output", data);
  logger.info(data);

  try {
    const id = Uuidv1();

    await SFClient.saveData(process.env.DATA_EXTENSION_EXTERNAL_KEY, [
      {
        keys: {
          Id: id,
          SubscriberKey: data.inArguments[0].contactKey,
        },
        values: {
          Event: data.inArguments[0].DropdownOptions,
          Text: data.inArguments[0].Text,
        },
      },
    ]);
  } catch (error) {
    logger.error(error);
  }

  res.status(200).send({
    status: "ok",
  });
};

/**
 * Endpoint that receives a notification when a user saves the journey.
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.save = async (req, res) => {
  res.status(200).send({
    status: "ok",
  });
};

/**
 *  Endpoint that receives a notification when a user publishes the journey.
 * @param req
 * @param res
 */
exports.publish = (req, res) => {
  res.status(200).send({
    status: "ok",
  });
};

/**
 * Endpoint that receives a notification when a user performs
 * some validation as part of the publishing process.
 * @param req
 * @param res
 */
exports.validate = (req, res) => {
  res.status(200).send({
    status: "ok",
  });
};
