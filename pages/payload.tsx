 let handler = function(req, res) {
	res.statusCode = 200
    console.log([req.method, req.path, req.body.action].join(" "));
    return runner(req.body, process.env.QUARTZUM_TOKEN);
    
  };
export default handler
let minimist = require("minimist")
let issues = require("./../quartzum/issues/lib")
let pull = require("./../quartzum/pull/lib")
  pull.commented = require("./../quartzum/pull/commented").main;
  pull.created = require("./../quartzum/pull/created").main;
  issues.comment = require("./../quartzum/issues/commented").main;
  issues.commented = require("./../quartzum/issues/commented");
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