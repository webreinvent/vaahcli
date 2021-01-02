import {expect, test} from '@oclif/test'

describe('cms:crud', () => {
  test
  .stdout()
  .command(['cms:crud'])
  .it('runs hello', ctx => {
    expect(ctx.stdout).to.contain('hello world')
  })

  test
  .stdout()
  .command(['cms:crud', '--name', 'jeff'])
  .it('runs hello --name jeff', ctx => {
    expect(ctx.stdout).to.contain('hello jeff')
  })
})
