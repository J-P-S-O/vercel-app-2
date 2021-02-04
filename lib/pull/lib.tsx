import {Octokit} from "@octokit/rest"
export let created = function(obj, auth) {
    var Octon;
    return Octon = new Octokit({
      auth: auth
    });
  };
