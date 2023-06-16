import {expect, test} from '@oclif/test'

describe('cms:settings', () => {
  test
  .stdout()
  .command(['cms:settings'])
  .it('runs hello', ctx => {
    expect(ctx.stdout).to.contain('hello world')
  })

  test
  .stdout()
  .command(['cms:settings', '--name', 'jeff'])
  .it('runs hello --name jeff', ctx => {
    expect(ctx.stdout).to.contain('hello jeff')
  })
})
