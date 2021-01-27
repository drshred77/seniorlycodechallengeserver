const express = require("express");
const Twitter = require("twitter");

const client = new Twitter({
  consumer_key: "",
  consumer_secret: "",
  access_token_key: "",
  access_token_secret: "",
});

const defaults = {
  screen_name: "drdisrespect",
  tweet_mode: "extended",
};

const app = express();

app.route("/:handle").get(function (req, res) {
  const params = {
    ...defaults,
    count: req.query.max_id ? 21 : 20,
    max_id: req.query.max_id,
    screen_name: req.params.handle,
  };
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3001");
  client.get(
    "statuses/user_timeline",
    params,
    function (error, tweets, response) {
      if (!error) {
        res.json(tweets);
      } else {
        console.error(error);
      }
    }
  );
});

app.listen(3000, function (error) {
  console.log("Trump listening on port 3000");
});
