const files = [
    {
        chunks: [
            {
                content: '@@ -0,0 +1,8 @@',
                changes: [
                    {
                        type: 'add',
                        add: true,
                        ln: 1,
                        content: '+## Test only '
                    },
                    {
                        type: 'add',
                        add: true,
                        ln: 2,
                        content: '+ - should be deleted after testing'
                    },
                    {
                        type: 'add',
                        add: true,
                        ln: 3,
                        content: '+'
                    },
                    {
                        type: 'add',
                        add: true,
                        ln: 4,
                        content: '+## section'
                    },
                    {
                        type: 'add',
                        add: true,
                        ln: 5,
                        content: '+ - fake text'
                    },
                    {
                        type: 'add',
                        add: true,
                        ln: 6,
                        content: '+'
                    },
                    {
                        type: 'add',
                        add: true,
                        ln: 7,
                        content: '+## another section'
                    },
                    {
                        type: 'add',
                        add: true,
                        ln: 8,
                        content: '+ - another test'
                    }
                ],
                oldStart: 0,
                oldLines: 0,
                newStart: 1,
                newLines: 8
            }
        ],
        deletions: 0,
        additions: 8,
        from: '/dev/null',
        to: 'flips/testing-no-commit.md',
        new: true,
        index: ['000000000..20da76a8d']
    }
]
const keyword = `flips/`
let changes = ''
for (const file of files) {
    if (file.to.indexOf(keyword) >= 0) {
        console.log('no commit, files')
    }
    for (const chunk of file.chunks) {
        for (const change of chunk.changes) {
            if (change.add) {
                changes += change.content
            }
        }
    }
}
if (changes.indexOf(keyword) > -1) {
    console.log("no commit, content")
}