# Integrate the Acrolinx CLI as NPM Script

Make sure you're familiar with [how to configure and run of the CLI](../README.md).

This repository already contains a working example [package.json](../package.json).

We assume that your project already contains a CLI configuration file like [`.cli-config.json`](../.cli-config.json).

We further assume that you've installed NodeJS and npm already.

## Configure NPM

If you use further tools to process XUnit style test results,
you just have to add the `result-junit` option (already set in CLI config file), and collect the test results:

```bash
acrolinx-cli -c .cli-config.json check
```

To make the build fail in case of issues in your files, we provide a node script to analyze the results: [test-result.js](../scripts/test-result.js).

The script needs to be referenced in the [package.json](../package.json):

```json
  "scripts": {
    "acrolinx-check": "acrolinx-cli -c .cli-config.json check",
    "preacrolinx": "npm run acrolinx-check",
    "acrolinx": "node scripts/test-result.js"
  }
```

You can start an Acrolinx check by running:

```bash
npm run acrolinx
```

If you want to check your file before a build starts, you can reference the script as `pre` script:

```json
"prebuild": "npm run acrolinx",
```

The script will be executed each time you run:

```bash
npm run build
```

## Example

```bash
C:\github\cli-demo>npm run acrolinx
```

```text
> cli-demo@0.0.1 preacrolinx C:\github\cli-demo
> npm run acrolinx-check


> cli-demo@0.0.1 acrolinx-check C:\github\cli-demo
> acrolinx-cli -c .cli-config.json check

Batch ID: gen.cli.d6a60240-2b07-11e9-a4a9-05449bbe020a
You're signed in as "baseline-cli".
Check completed for: C:\github\cli-demo\samples\test.1.md
Check completed for: C:\github\cli-demo\samples\test.txt
Check completed for: C:\github\cli-demo\README.md
Check completed for: https://www.acrolinx.com/
Find the Content Analysis Dashboard here:
https://COMPANY.acrolinx.cloud/api/batch/gen.cli.d6a60240-2b07-11e9-a4a9-05459bbe020a

> cli-demo@0.0.1 acrolinx C:\github\cli-demo
> node scripts/test-result.js

Analyzing Acrolinx Results: ../results/result.json


54 (red) C:\github\cli-demo\samples\test.1.md (https://COMPANY.acrolinx.cloud/output/en/x74r5gfyi5wwb4w2g6u42pcb4g_report.html)
70 (yellow) C:\github\cli-demo\samples\test.txt (https://COMPANY.acrolinx.cloud/output/en/7uxei3twtbjqqmzth7img27au_report.html)
73 (yellow) https://www.acrolinx.com/ (https://COMPANY.acrolinx.cloud/output/en/xxa7ccknnhc5t66llic77scrt6_report.html)


Acrolinx: Please correct 3 files.


npm ERR! code ELIFECYCLE
npm ERR! errno 1
npm ERR! cli-demo@0.0.1 acrolinx: `node scripts/test-result.js`
npm ERR! Exit status 1
npm ERR!
npm ERR! Failed at the cli-demo@0.0.1 acrolinx script.
npm ERR! This is probably not a problem with npm. There is likely additional logging output above.

npm ERR! A complete log of this run can be found in:
npm ERR!     C:\Users\user\AppData\Roaming\npm-cache\_logs\2019-02-06T18_40_34_394Z-debug.log
```

![Output of `npm run acrolinx`](../doc/npm_acrolinx.png)
