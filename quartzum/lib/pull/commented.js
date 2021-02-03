var {Octokit} = require("@octokit/rest");

  exports.main = function(obj, auth) {
    var Octon;
    if (obj.comment.body.trim(" ").toLowerCase().startsWith("lgtm")) {
      return Octon = new Octokit({
        auth: auth
      });
    }
  };
