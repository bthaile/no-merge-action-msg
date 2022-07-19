"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const core = require('@actions/core');
const github = require('@actions/github');
const parse = require('parse-diff');
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const keyword = core.getInput('keyword');
            const message = core.getInput('message');
            const diff_url = github.context.payload.pull_request.diff_url;
            const result = yield github.request(diff_url);
            const files = parse(result.data);
            core.exportVariable('files', files);
            core.setOutput('files', files);
            let changes = '';
            for (const file of files) {
                for (const chunk of file.chunks) {
                    for (const change of chunk.changes) {
                        if (change.add) {
                            changes += change.content;
                        }
                    }
                }
            }
            if (changes.indexOf(keyword) >= 0) {
                core.setFailed(message || `The code contains ${keyword}`);
            }
        }
        catch (error) {
            core.setFailed(error.message);
        }
    });
}
run();
