import chai from 'chai'
import Metric from '../../app/models/Metric'
import UnitConverter from '../../app/lib/unitConverter'

var assert = require('assert')
describe('UnitConverter tests', function() {
  var metric

  before((done) => {
    const metricData = {
      name: 'Length',
      units: [
        { name: 'cm', to_anchor: 0.01, anchor: false },
        { name: 'm', anchor: true },
        { name: 'km', to_anchor: 1000, anchor: false },
      ],
    }

    Metric.deleteMany({})
      .then(() => {
        return Metric.create(metricData)
      })
      .then((newMetric) => {
        metric = newMetric
        done()
      })
      .catch((err) => {
        throw err
        done()
      })
  })

  it('Convert cm to m', function() {
    assert.equal(UnitConverter('cm', 'm', metric, '5'), '0.05')
  })
  it('Convert m to cm', function() {
    assert.equal(UnitConverter('m', 'cm', metric, '5'), '500')
  })
  it('Convert cm to km', function() {
    assert.equal(UnitConverter('cm', 'km', metric, '500000'), '5')
  })
  it('Convert km to cm', function() {
    assert.equal(UnitConverter('km', 'cm', metric, '5'), '500000')
  })
  it('Convert m to m', function() {
    assert.equal(UnitConverter('m', 'm', metric, '5'), '5')
  })
})
