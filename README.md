# Block Merge if Keyword in PR Diff

## Setup

Add a file to `.github/workflows` with similar contents to:

```
name: "Block @nocommit Merges"
on: [pull_request]

jobs:
  check_pr:
    runs-on: ubuntu-latest
    steps:
    - name: Check for @nocommit
      uses: bthaile/no-merge-action@releases/v0.1
      with:
        github-token: ${{github.token}}
        keyword: "@nocommit"
```

The `keyword` variable is the string that we don't want the PR to include.
The `message` variable is the error string that will be displayed in the PR.

## Contributing

Use [issues](https://github.com/itsvs/no-commit-action/issues)!

## License

This is a modification of the original template, and is released under the MIT license.
