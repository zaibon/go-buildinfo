import * as core from '@actions/core';

async function run(): Promise<void> {
  try {
    const ldflags = [];

    let releaseVersion: string = core.getInput('release_version');
    if (releaseVersion === '') {
      releaseVersion = process.env['GITHUB_RUN_NUMBER'] || 'unknown';
    }
    ldflags.push(
      `-X github.com/daaku/buildinfo.releaseVersion=${releaseVersion}`
    );

    core.debug(`Release Version: ${releaseVersion}`);
    for (const key of Object.keys(process.env)) {
      core.debug(`${key}=${process.env[key]}`);
    }
    core.exportVariable('BI_LDFLAGS', ldflags.join(' '));
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
