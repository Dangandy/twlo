// 3rd party libraries
const Koa = require("koa");
const Router = require("koa-router");

// local libraries
const twilio = require("./src/twilio");

// init
const app = new Koa();
const router = new Router();

app.use(router.routes());
app.use(router.allowedMethods());

router.get("/", async ctx => {
  ctx.body = "Hello World";
  console.log("started");
});

app.use(twilio.routes());
app.use(twilio.allowedMethods());

app.listen(3000);
