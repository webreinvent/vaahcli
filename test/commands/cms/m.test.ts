import {expect, test} from '@oclif/test'

describe('cms:m', () => {
  test
  .stdout()
  .command(['cms:m'])
  .it('runs hello', ctx => {
    expect(ctx.stdout).to.contain('hello world')
  })

  test
  .stdout()
  .command(['cms:m', '--name', 'jeff'])
  .it('runs hello --name jeff', ctx => {
    expect(ctx.stdout).to.contain('hello jeff')
  })
})
