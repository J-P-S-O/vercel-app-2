  // Main file
  // @license: MIT
  // Author: j-p-s-o (https://github.com/j-p-s-o)
  var Octokit, args, bp, chalk, custom_token, express, fs, handler, i, payloadp, perf, runner, successfull, sv, token;

  i = 0;

  perf = function() {
    return i = i + 1;
  };

  setInterval(perf, 1);

  process.title = "Quartzum app";

  custom_token = null; //you can set this

  express = require("express");

  Octokit = require("@octokit/rest");

  args = require("minimist")(process.argv.slice(2));

  chalk = require("chalk");

  fs = require("fs");

  sv = express();

  console.log('\033c');

  console.log(chalk.bold("WARNING, YOU MUST SET WEBHOOKS AND PERMISSIONS BEFORE EFFECTIVE USE"));

  runner = require("./lib/index");

  runner = runner.process;

  bp = require("body-parser");

  token = custom_token ? custom_token : null;

  if (args.token != null) {
    token = fs.readFileSync(args.token);
  } else {
    console.log(`Accessing ${chalk.red("QUARTZUM_TOKEN")} variable`);
    token = process.env.QUARTZUM_TOKEN || (function() {
      throw new Error("No token");
    })();
  }

  //console.log(token)
  handler = function(req, res) {
    console.log([req.method, req.path, req.body.action].join(" "));
    runner(req.body, token);
    return res.write("Succeess!");
  };

  payloadp = args.payloadpath || "/";

  sv.use(bp.json());

  sv.post(payloadp, handler);

  successfull = function() {
    return console.log(chalk.red("App launched in " + i + "ms"));
  };

  sv.listen(2001, successfull);
