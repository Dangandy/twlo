const result = require("dotenv").config();
const client = require("twilio")(
  process.env.PROD_ACCOUNT_SID,
  process.env.PROD_AUTH_TOKEN
);

// wrap twilio functions into promise for async / await
async function sendSMS(body) {
  try {
    return await client.messages.create({
      body: body.body,
      from: process.env.PROD_NUMBER,
      to: body.to
    });
    //to do add db and db logic
  } catch (error) {
    console.log(error);
  }
}

async function receiveSMS(body) {
  try {
    console.log(body);
    // parse body
  } catch (error) {
    console.log(error);
  }
}

//testing for now
const main = async () => {
  try {
    const body = {
      to: "+16474716635",
      body: "This is the ship that made the Kessel Run in fourteen parsecs?"
    };
    console.log(await sendSMS(body));
  } catch (error) {}
};
// main();

// export
module.exports = {
  sendSMS,
  receiveSMS
};
