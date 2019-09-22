workflow "New workflow" {
  on = "push"
  resolves = ["npm run deploy"]
}

action "npm install" {
  uses = "actions/npm@59b64a598378f31e49cb76f27d6f3312b582f680"
  args = "install"
}

action "npm run deploy" {
  uses = "actions/npm@59b64a598378f31e49cb76f27d6f3312b582f680"
  args = "run deploy"
  needs = ["npm install"]
  secrets = ["GITHUB_TOKEN"]
}
