
let { Octokit } = require("@octokit/rest")

let config = {}
let chalk = require("chalk")
let repo_uri = "https://api.github.com/repos/"
exports.opened = (obj, auth) =>{
  auth = String(auth)
  let Octon = new Octokit({
auth: auth
})
  //console.log(auth)
let user_path = obj.repository.owner.login
let repo_path = obj.repository.name
let issue_num = obj.issue.number
let label = obj.issue.title.split(":")
if (label.length === 0){return 1}
label = label[0]
let date = String(new Date()).split(" GMT")[0]
let path = user_path+"/"+repo_path +"/"+issue_num
console.log(
  chalk.yellow(
date +": "+"Adding label "+chalk.blue(label)+" to "+path
))

Octon.issues.addLabels({
  owner: user_path,
  repo: repo_path,
  issue_number: issue_num,
  labels: [label]
})
.catch((e)=>{
  console.log(e)
})
return label
}
