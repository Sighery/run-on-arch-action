const core = require('@actions/core')
const path = require('path')
const {exec} = require('@actions/exec')

async function main() {
  if (process.platform === 'linux') {

    const image = core.getInput('image', {required: true})
    const runs = core.getInput('run', {required: true})
    const additionalArgs = core.getInput('additionalArgs')

    console.log('Configuring Docker for multi-architecture support')
    await exec(path.join(__dirname, 'run-on-arch.sh'),[image,runs,additionalArgs])
  } else {
    throw new Error('run-on-arch supports only Linux')
  }
}

main().catch(err => {
  core.setFailed(err.message)
})
