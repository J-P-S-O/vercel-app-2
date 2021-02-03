let minimist = require("minimist")
let issues = require("./issues/lib")
let pull = require("./pull/lib")
  pull.commented = require("./pull/commented").main;
  pull.created = require("./pull/created").main;
  issues.comment = require("./issues/commented").main;
  issues.commented = require("./issues/commented");
  exports.process = (obj, token) => {
    //console.log(token)
    if (typeof obj === "string") {
      obj = JSON.parse(obj);
    }
    if ((minimist(process.argv.slice(2)).debug)) {
      console.log(obj);
    }
    if (obj.action === "opened" && (obj.issue != null) && (obj.issue.comment == null)) {
      return issues.opened(obj, token);
    }
    if (obj.action === "created" && (obj.issue != null) && (obj.comment != null)) {
      return issues.comment(obj, token);
    }
    if (obj.action === "edited" && (obj.issue != null) && (obj.comment == null)) {
      return issues.edited(obj, token);
    }
    if (obj.action === "created" && (obj.pull_request != null) && (obj.comment == null)) {
      return pull.created(obj, token);
    }
    if (obj.action === "created" && (obj.pull_request != null) && (obj.comment != null)) {
      return pull.commented(obj, token);
    }
  };
