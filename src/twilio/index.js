// 3rd party libraries
const Router = require("koa-router");
const koaBody = require("koa-body");

// local libraries
const { sendSMS } = require("./twilio");

// init
const router = new Router({ prefix: "/twlo" });

// routes
router
  .get("/:id", async ctx => {
    ctx.body = ctx.params;
  })
  .post("/send", koaBody(), async ctx => {
    try {
      console.log(ctx.request.body);
      if (ctx.request.body.company == "beeyond") {
        ctx.body = JSON.stringify(await sendSMS(ctx.request.body));
      } else {
        ctx.body = "Failed";
      }
    } catch (error) {
      console.log(error);
    }
  });

// exports
module.exports = router;

// to do: user dashboards?
