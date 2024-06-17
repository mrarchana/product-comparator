const express = require("express");
const request = require("request");
const cheerio = require("cheerio");
var deasync = require("deasync");
const router = express.Router();
var flip_res = [];
var amaz_res = [];
process.env["NODE_OPTIONS"] = '--no-force-async-hooks-checks'
function scrap_flipkart(result) {
  var temp = result.split(" ");
  var flip_link = "https://www.flipkart.com/search?q=";
  flip_link = flip_link + temp[0];
  for (var i = 1; i < temp.length; i++) {
    flip_link = flip_link + "+" + temp[i];
  }
  const options = {
    url: flip_link,
    headers: {
      Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7'
    }};
  request(options, (error, response, html) => {
    if (!error && response.statusCode == 200) {
      const $ = cheerio.load(html);
      $(".cPHDOP.col-12-12").each((i, el) => {
        try{
        const title = $(el).find(".KzDlHZ").html();
        const price = $(el).find("._4b5DiR").html();
        const img = $(el).find(".DByuf4").attr().src;
        const link = $(el).find(".CGtC98").attr().href;
        const f_link = "https://www.flipkart.com" + link;
        flip_res.push({ title, price, img, f_link });
        }catch(e){}
      });
    }
  });
  while (flip_res.length == 0) {
    deasync.runLoopOnce();
  }
  return flip_res;
}
function scrap_amazon(result) {
  var temp = result.split(" ");
  var amaz_link = "https://www.amazon.in/s?k=";
  amaz_link = amaz_link + temp[0];
  for (var i = 1; i < temp.length; i++) {
    amaz_link = amaz_link + "+" + temp[i];
  }
  const options = {
    url: amaz_link,
    headers: {
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
      'Accept-Language': 'en-US,en;q=0.9'
    },
    encoding: 'utf8'
};
  request(options, (error, response, html) => {
    if (!error && response.statusCode == 200) {
      const $ = cheerio.load(html);
      $(
        ".s-result-item"
      ).each((i, el) => {
        try{
        const title = $(el)
          .find(".a-size-medium.a-color-base.a-text-normal")
          .html();
        const price = $(el).find(".a-price").find(".a-offscreen").html();
        const img = $(el).find(".s-image").attr().src;
        const link = $(el)
          .find(
            ".a-link-normal"
          )
          .attr();
        var a_link;
        if (link) {
          a_link = "https://www.amazon.in" + link.href;
        }
        if (title != null && price != null) {
          amaz_res.push({ title, price, img, a_link });
        }
      }catch(e){}
      });
    }
  });
  while (amaz_res.length == 0) {
    deasync.runLoopOnce();
  }
  return amaz_res;
}
router.post("/", async (req, res) => {
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
