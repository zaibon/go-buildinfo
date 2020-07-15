import * as core from '@actions/core';

function releaseVersion(): string {
  let releaseVersion: string = core.getInput('release_version');
  if (releaseVersion !== '') {
    return releaseVersion;
  }

  const ref = process.env.GITHUB_REF;
  if (ref) {
    return ref;
  }

  const runNumber = process.env.GITHUB_RUN_NUMBER;
  if (runNumber) {
    return `v${runNumber}`;
  }

  return 'unknown';
}

function buildURL(): string {
  return `${process.env.GITHUB_SERVER_URL}/${process.env.GITHUB_REPOSITORY}/actions/runs/${process.env.GITHUB_RUN_ID}`
}

function buildHash(): string {
  return process.env.GITHUB_SHA || 'unknown';
}

function buildTimeUnix(): string {
  return `${Math.round(Date.now()/1000)}`;
}

async function run(): Promise<void> {
  try {
    const ldflags = [
      `-X github.com/daaku/buildinfo.releaseVersion=${releaseVersion()}`,
      `-X github.com/daaku/buildinfo.buildHash=${buildHash()}`,
      `-X github.com/daaku/buildinfo.buildTimeUnix=${buildTimeUnix()}`,
      `-X github.com/daaku/buildinfo.buildURL=${buildURL()}`,
    ];
    core.exportVariable('BI_LDFLAGS', ldflags.join(' '));
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
