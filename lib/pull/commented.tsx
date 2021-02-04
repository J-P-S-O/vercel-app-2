import {Octokit} from "@octokit/rest"

  export function main(obj, auth) {
    var Octon;
    if (obj.comment.body.trim(" ").toLowerCase().startsWith("lgtm")) {
      return Octon = new Octokit({
        auth: auth
      });
    }
  };
