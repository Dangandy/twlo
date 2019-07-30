const result = require("dotenv").config();
const client = require("twilio")(
  process.env.PROD_ACCOUNT_SID,
  process.env.PROD_AUTH_TOKEN
);
const axios = require("axios");

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
    console.log(body.Body);
    // get zoho access token
    const { data } = await axios({
      method: "post",
      data: {
        refresh_token: process.env.ZOHO_REFRESH_TOKEN,
        client_id: process.env.ZOHO_CLIENT_ID,
        client_secret: process.env.ZOHO_CLIENT_SECRET,
        grant_type: "refresh_token"
      },
      url: "https://accounts.zoho.com/oauth/v2/token/oauth/v2/token"
    });
    const { access_token } = await data;
    // add to crm
    const cResp = await axios({
      method: "post",
      url: "https://www.zohoapis.com/crm/v2/Text_Records",
      headers: {
        Authorization: `Zoho-oauthtoken ${access_token}`,
        "Content-Type": "application/json"
      },
      data: {
        data: [
          {
            Name: "Inbound",
            Body: body.Body,
            To: body.To,
            From: body.From
          }
        ],
        trigger: ["workflow"]
      },
      json: true
    });
    console.log(await JSON.stringify(cResp.data));
  } catch (error) {
    console.log(error);
  }
}

//testing for now
const main = async () => {
  try {
    // const body = {
    //   to: "+16474716635",
    //   body: "This is the ship that made the Kessel Run in fourteen parsecs?"
    // };
    // console.log(await sendSMS(body));
    const body = {
      ToCountry: "CA",
      ToState: "ON",
      SmsMessageSid: "SMc93e69f3f586cc7fab49f6a3e54f2370",
      NumMedia: "0",
      ToCity: "Toronto",
      FromZip: "",
      SmsSid: "SMc93e69f3f586cc7fab49f6a3e54f2370",
      FromState: "ON",
      SmsStatus: "received",
      FromCity: "Toronto",
      Body: "Return 7",
      FromCountry: "CA",
      To: "+16475030341",
      ToZip: "",
      NumSegments: "1",
      MessageSid: "SMc93e69f3f586cc7fab49f6a3e54f2370",
      AccountSid: "ACefdbea95f2b349fb83318eb3e8d5b5bd",
      From: "+16474716635",
      ApiVersion: "2010-04-01"
    };
    console.log(await receiveSMS(body));
  } catch (error) {
    console.log(error);
  }
};
// main();

// export
module.exports = {
  sendSMS,
  receiveSMS
};
