import {expect, test} from '@oclif/test'

describe('cms:install', () => {
  test
  .stdout()
  .command(['cms:install'])
  .it('runs hello', ctx => {
    expect(ctx.stdout).to.contain('hello world')
  })

  test
  .stdout()
  .command(['cms:install', '--name', 'jeff'])
  .it('runs hello --name jeff', ctx => {
    expect(ctx.stdout).to.contain('hello jeff')
  })
})
