import {expect, test} from '@oclif/test'

describe('cms:taxonomies', () => {
  test
  .stdout()
  .command(['cms:taxonomies'])
  .it('runs hello', ctx => {
    expect(ctx.stdout).to.contain('hello world')
  })

  test
  .stdout()
  .command(['cms:taxonomies', '--name', 'jeff'])
  .it('runs hello --name jeff', ctx => {
    expect(ctx.stdout).to.contain('hello jeff')
  })
})
