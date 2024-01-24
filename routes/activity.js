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

const secretKey =
  "QecXGync1dl34H_Ro8ZKnveYC81ODv-FAtfwsjHwltYMXPH3y8XQx5mlTQWk638Lg8RPwDhlIyY-GqOXS9ykvAzzdviYyS-Nd1Rd9ESeZ-iFLTntoOFnq25jhLmfCKO7ew53k9hOIRuO2QhHhecAlAXX14p-aw_cz7hdKJGBrIOk-04Zbs4kUvjMS4aIcdJkkAr6gaF9k0dTEUAiwg8W4LE1DJHfZLWNyb85iYBjY4Kkw5vDBKskiLkUdiBbGw2";

const token =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.ew0KICAiaW5Bcmd1bWVudHMiOiBbDQogICAgew0KICAgICAgImNvbnRhY3RLZXkiOiAibWozIiwNCiAgICAgICJEcm9wZG93bk9wdGlvbnMiOiAiam91cm5leUVudHJ5IiwNCiAgICAgICJUZXh0IjogIkhlbGxvIg0KICAgIH0NCiAgXSwNCiAgImFjdGl2aXR5T2JqZWN0SUQiOiAiZDY5NjI0ZjYtMzhkYi00N2Y4LTg2M2MtZDBkNjYzNjgzZWI3IiwNCiAgImpvdXJuZXlJZCI6ICJlYTE1M2Y5My0xNWI5LTRhYmQtODBiMS01ZDgwOGUxMGFhZTciLA0KICAiYWN0aXZpdHlJZCI6ICJkNjk2MjRmNi0zOGRiLTQ3ZjgtODYzYy1kMGQ2NjM2ODNlYjciLA0KICAiZGVmaW5pdGlvbkluc3RhbmNlSWQiOiAiNzY2MTIyZmEtYmJkNS00MWEzLWE1MzktOWZjMjVhY2U5YWFjIiwNCiAgImFjdGl2aXR5SW5zdGFuY2VJZCI6ICI2MWQ3M2E2ZC00YTRkLTRmNzMtODJkZi02ODQwZTU5ODVhYzMiLA0KICAia2V5VmFsdWUiOiAibWozIiwNCiAgIm1vZGUiOiAwDQp9.eNcIHjLpNVgcT1Vr-aYa4nChaVZrpUwZgWH4cWXVVCk";

jwts.verify(token, secretKey, (err, decoded) => {
  if (err) {
    console.error("Token verification failed:", err);
  } else {
    console.log("Token verified successfully:", decoded);
  }
});

exports.execute = async (req, res) => {
  // decode data
  console.log("activity js JWT input", JWT);
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
