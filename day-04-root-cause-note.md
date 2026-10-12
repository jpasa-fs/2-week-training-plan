# day-04-root-cause-note

After adding the `build` & `test` scripts in my `package.json`. The pipeline ran successfully although I have noticed a NPM warning `EBADENGINE` in the `Install, build, and test` job that states `package: 'brace-expansion@5.0.12'` is requiring a node version of `{ node: '20 || >=22' }` also stating the current installed version in the pipeline is `node: 'v18.20.8'`. This warning did not occur locally when I ran `npm ci` as I have a node version of `v24.21.0` installed. The warning occurred because of the different Node versions installed locally and in the pipeline, a problem under Node/runtime version parity. Updating the `azure-pipelines.yml` to set `versionSpec` of task `NodeTool@0` to `20` or greater than `22.x` will fix the warning.


