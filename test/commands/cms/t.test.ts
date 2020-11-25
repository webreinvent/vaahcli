import {expect, test} from '@oclif/test'

describe('cms:t', () => {
  test
  .stdout()
  .command(['cms:t'])
  .it('runs hello', ctx => {
    expect(ctx.stdout).to.contain('hello world')
  })

  test
  .stdout()
  .command(['cms:t', '--name', 'jeff'])
  .it('runs hello --name jeff', ctx => {
    expect(ctx.stdout).to.contain('hello jeff')
  })
})
