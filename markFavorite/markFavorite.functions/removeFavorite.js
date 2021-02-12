const hubspot = require("@hubspot/api-client");

const hapikey = process.env.hapikey;

// This function is executed when a request is made to the endpoint associated with this file in the serverless.json file
exports.main = (context, sendResponse) => {
  const hubspotClient = new hubspot.Client({ apiKey: hapikey });
  const { carId, contactId } = context.body;

  const associationAttempt = hubspotClient.crm.contacts.associationsApi.archive(
    contactId,
    "2-1314243",
    carId,
    "car_to_contact"
  );

  associationAttempt
    .then((response) => sendResponse({ body: response, statusCode: 200 }))

    .catch((error) => {
      sendResponse({ body: error, statusCode: 500 });
      console.log(error);
    });
};
