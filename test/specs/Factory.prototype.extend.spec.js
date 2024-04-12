const { Factory } = require('../../')
const { expect } = require('chai')
const sinon = require('sinon')

describe('Factory.prototype.extend', function () {
  let parentFactoryOne, parentFactoryTwo, childFactory

  beforeEach(function () {
    parentFactoryOne = new Factory(sinon.spy())
      .sequence('id')
      .attr('key', 'key1')
      .option('opt', 'opt1')
      .beforeBuild(sinon.spy())
      .afterBuild(sinon.spy())
      .beforeCreate(sinon.spy())
      .afterCreate(sinon.spy())
      .onCreate(sinon.spy())

    parentFactoryTwo = new Factory()
      .sequence('order')
      .attr('key', 'key2')
      .attr('prop', 'value')
      .option('arg', 'arg1')
      .beforeBuild(sinon.spy())
      .afterBuild(sinon.spy())
      .beforeCreate(sinon.spy())
      .afterCreate(sinon.spy())
      .onCreate(sinon.spy())

    childFactory = new Factory()
      .extend(parentFactoryOne)
      .extend(parentFactoryTwo)
  })

  it('copies the constructor from parent One', function () {
    expect(childFactory.construct).to.eql(parentFactoryOne.construct)
  })

  it('copies the attribute definitions from both parents', function () {
    expect(childFactory._attrs.id).to.eql(parentFactoryOne._attrs.id)
    expect(childFactory._attrs.key).to.eql(parentFactoryTwo._attrs.key)
    expect(childFactory._attrs.prop).to.eql(parentFactoryTwo._attrs.prop)
  })

  it('copies the option definitions', function () {
    expect(childFactory.opts.opt).to.eql(parentFactoryOne.opts.opt)
    expect(childFactory.opts.arg).to.eql(parentFactoryTwo.opts.arg)
  })

  it('copies the beforeBuild hooks from both parents', function () {
    expect(childFactory.beforeBuildHooks).to.include(...parentFactoryOne.beforeBuildHooks)
    expect(childFactory.beforeBuildHooks).to.include(...parentFactoryTwo.beforeBuildHooks)
  })

  it('copies the afterBuild hooks from both parents', function () {
    expect(childFactory.afterBuildHooks).to.include(...parentFactoryOne.afterBuildHooks)
    expect(childFactory.afterBuildHooks).to.include(...parentFactoryTwo.afterBuildHooks)
  })

  it('copies the beforeCreate hooks from both parents', function () {
    expect(childFactory.beforeCreateHooks).to.include(...parentFactoryOne.beforeCreateHooks)
    expect(childFactory.beforeCreateHooks).to.include(...parentFactoryTwo.beforeCreateHooks)
  })

  it('copies the onCreate hook', function () {
    expect(childFactory.createHandler).to.eql(parentFactoryOne.createHandler)
  })

  it('copies the afterCreate hooks', function () {
    expect(childFactory.afterCreateHooks).to.include(...parentFactoryOne.afterCreateHooks)
    expect(childFactory.afterCreateHooks).to.include(...parentFactoryTwo.afterCreateHooks)
  })
})
