import {expect, test} from '@oclif/test'

describe('flutter:install', () => {
  test
  .stdout()
  .command(['flutter:install'])
  .it('runs hello', ctx => {
    expect(ctx.stdout).to.contain('hello world')
  })

  test
  .stdout()
  .command(['flutter:install', '--name', 'jeff'])
  .it('runs hello --name jeff', ctx => {
    expect(ctx.stdout).to.contain('hello jeff')
  })
})
