const hubspot = require("@hubspot/api-client");

const hapikey = process.env.hapikey;

// This function is executed when a request is made to the endpoint associated with this file in the serverless.json file
exports.main = (context, sendResponse) => {
  const hubspotClient = new hubspot.Client({ apiKey: hapikey });
  const { carId, contactId } = context.body;

  const doesContactExist = hubspotClient.crm.contacts.basicApi.getById(
    contactId
  );

  const epochStart = new Date(0);

  doesContactExist.then((response) => {
    const createdDate = response.body.createdAt;

    if (createdDate.getTime() == epochStart.getTime()) {
      console.log("in if");
      sendResponse({
        body: "Please create an account to save your favorites",
        statusCode: 401,
      });
    } else {
      console.log("in else");
      const associationAttempt = hubspotClient.crm.contacts.associationsApi.create(
        contactId,
        "2-1314243",
        carId,
        "car_to_contact"
      );

      associationAttempt
        .then((response) => sendResponse({ body: response, statusCode: 200 }))

        .catch((error) => {
          sendResponse({ body: error, statusCode: 500 });
          //console.log(error);
        });
    }
  });
};
