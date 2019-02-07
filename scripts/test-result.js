/*
 *
 * * Copyright 2019-present Acrolinx GmbH
 * *
 * * Licensed under the Apache License, Version 2.0 (the "License");
 * * you may not use this file except in compliance with the License.
 * * You may obtain a copy of the License at
 * *
 * * http://www.apache.org/licenses/LICENSE-2.0
 * *
 * * Unless required by applicable law or agreed to in writing, software
 * * distributed under the License is distributed on an "AS IS" BASIS,
 * * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * * See the License for the specific language governing permissions and
 * * limitations under the License.
 * *
 * * For more information visit: https://www.acrolinx.com
 *
 */

const withConsoleColors = true;
const acrolinxResultJsonFilePath = '../results/result.json';

function qualityCriteria(file) {
    // Add further quality criteria here...
    // We recommend not to check for certain scores here.
    // The score limits for the colors can be configured on the Acrolinx Platform side.
    return file.result.status !== 'green';
}

console.log('Analyzing Acrolinx Results: ' + acrolinxResultJsonFilePath + '\n\n');

const acrolinxResult = require(acrolinxResultJsonFilePath);

if (!acrolinxResult || !acrolinxResult.files || acrolinxResult.files.length === 0) {
    console.log('\n\nAcrolinx: No files checked!\n\n');
    process.exit(1);
}

const filesWithBadStatus = acrolinxResult.files
    .sort((f1, f2) => f1.result.score - f2.result.score)
    .filter(qualityCriteria);

filesWithBadStatus.forEach((file) => {
    const colorFormat = (file.result.status === 'yellow' ? '\x1b[33m' : '\x1b[31m') + '%s\x1b[0m';
    const formatStr = (withConsoleColors ? colorFormat : '%s') + '%s';
    console.error(formatStr, file.result.score + ' (' + file.result.status + ') ', file.file + ' (' + file.result.reports.scorecard + ')');
});

if (filesWithBadStatus.length > 0) {
    console.log('\n\nAcrolinx: Please correct ' + filesWithBadStatus.length + ' file' + (filesWithBadStatus.length == 1 ? '' : 's') + '.\n\n');
    process.exit(1);
}

console.log('\n\nAcrolinx: All files are fine.\n\n');
