
let minimist = require("minimist")
let issues = require("./../quartzum/lib/issues/lib")
let pull = require("./../quartzum/lib/pull/lib")
  pull.commented = require("./../quartzum/lib/pull/commented").main;
  issues.comment = require("./../quartzum/lib/issues/commented").main;

let runner = (obj, token) => {
    //console.log(token)
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
		return "Something went wrong: "+ e.code+ e.message
	}
  };
 let handler = function(req, res) {
    console.log([req.method, req.path, req.body.action].join(" "));
    return runner(req.body, process.env.QUARTZUM_TOKEN);
    
  };
export default handler
