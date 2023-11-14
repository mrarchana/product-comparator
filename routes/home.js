const express = require("express");
const request = require("request");
const cheerio = require("cheerio");
var deasync = require("deasync");
const router = express.Router();
var flip_res = [];
var amaz_res = [];
function scrap_flipkart() {
  request("https://www.flipkart.com/", (error, response, html) => {
    if (!error && response.statusCode == 200) {
      const $ = cheerio.load(html);
      $("._3YgSsQ").each((i, el) => {
        const title = $(el).find("._3LU4EM").html();
        const price = $(el).find("._2tDhp2").html();
        const img = $(el).find("._396cs4").attr().src;
        const link = $(el).find("._6WQwDJ.T88g6k").attr().href;
        const f_link = "https://www.flipkart.com" + link;
        flip_res.push({ title, price, img, f_link });
      });
    }
  });
  while (flip_res.length == 0) {
    deasync.runLoopOnce();
  }
  return flip_res;
}
function scrap_amazon() {
  request("https://www.amazon.in/", (error, response, html) => {
    if (!error && response.statusCode == 200) {
      const $ = cheerio.load(html);

      $("._deals-shoveler-v2_style_dealCardPrimavera__FdwCk").each((i, el) => {
        const price = $(el)
          .find("._deals-shoveler-v2_style_badgeLabel__USQoX")
          .text();
        const img = $(el)
          .find("._deals-shoveler-v2_style_dealImagePrimavera__39h59")
          .attr().src;
        const link = $(el).find(".a-link-normal.a-text-normal").attr();
        var a_link;
        if (link) {
          a_link = "https://www.amazon.in" + link.href;
        }
        if (price != null) {
          amaz_res.push({ price, img, a_link });
        }
      });
    }
  });
  while (amaz_res.length == 0) {
    deasync.runLoopOnce();
  }
  return amaz_res;
}
router.get("/", (req, res) => {
  const result = req.body.res;
  const f_res = scrap_flipkart(result);
  const a_res = scrap_amazon(result);
  res.json({ flipkart: f_res, amazon: a_res });
  flip_res.length = 0;
  amaz_res.length = 0;
  a_res.length = 0;
  f_res.length = 0;
});
module.exports = router;
