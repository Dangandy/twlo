const result = require("dotenv").config();
const client = require("twilio")(
  process.env.TEST_ACCOUNT_SID,
  process.env.TEST_AUTH_TOKEN
);

client.messages
  .create({
    body: "This is the ship that made the Kessel Run in fourteen parsecs?",
    from: "+15005550006",
    to: "+16474716635"
  })
  .then(message => console.log(message));
