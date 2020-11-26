import {expect, test} from '@oclif/test'

describe('cms:m-make', () => {
  test
  .stdout()
  .command(['cms:m-make'])
  .it('runs hello', ctx => {
    expect(ctx.stdout).to.contain('hello world')
  })

  test
  .stdout()
  .command(['cms:m-make', '--name', 'jeff'])
  .it('runs hello --name jeff', ctx => {
    expect(ctx.stdout).to.contain('hello jeff')
  })
})
