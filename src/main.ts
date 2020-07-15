import * as core from '@actions/core';

async function run(): Promise<void> {
  try {
    const releaseVersion: string = core.getInput('release_version');
    core.debug(`Release Version: ${releaseVersion}`);
    for (const key of Object.keys(process.env)) {
      core.debug(`${key}=${process.env[key]}`);
    }
    core.exportVariable('BI_LDFLAGS', 'foobar');
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
