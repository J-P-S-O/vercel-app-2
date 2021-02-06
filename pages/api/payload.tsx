
let minimist = require("minimist")
let issues = require("./../../lib/issues/lib")
let pull = require("./../../lib/pull/lib")
  pull.commented = require("./../../lib/pull/commented").main;
  issues.comment = require("./../../lib/issues/commented").main;

let runner = (obj, token) => {
    //console.log(token)
    console.log("Runner goes live")
    if (typeof obj === "string") {
      obj = JSON.parse(obj);
    }
	try{
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
	}catch(e){
		return {
            code: 500,
            error: e.code,
            message: e.message
        }
    }
    return {
        code: 201,
        message:"ENOACTION"
    }
  };
export default function(req, res) {
    console.log([req.method, req.body.action].join(" "));
    if (req.method != "POST"){
      console.log("Method for request not equal to post")
      res.json({
          status: "error",
          code: 405,
          message:"Method must be POST"
      })
      return null;
    }
    console.log("Method was POST")

    res.json(
        runner(req.body, process.env.QUARTZUM_TOKEN)
        );
    return null;

  };
