import chai from 'chai'
import Metric from '../../app/models/Metric'
import Sensor from '../../app/models/Sensor'
import SensorIdMapper from '../../app/models/SensorIdMapper'
import JsonParser from '../../app/lib/parsers/JsonParser'
import JsonBinParser from '../../app/lib/parsers/JsonBinParser'
import JsonIdParser from '../../app/lib/parsers/JsonIdParser'
import TextParser from '../../app/lib/parsers/TextParser'
import TextIdParser from '../../app/lib/parsers/TextIdParser'
import BinaryIdParser from '../../app/lib/parsers/BinaryIdParser'
import BinaryParser from '../../app/lib/parsers/BinaryParser'
import consts from '../../app/consts'

const { contentType } = consts

var assert = require('assert')
describe('Datasource parsers tests', function() {
  var sensors
  var sensorIdMappers

  before((done) => {
    const sensorData = [
      {
        identificator: 'id1',
        description: 'desc1',
        datasource_type: 'json',
        jsonMappers: [
          {
            source_name: 'value',
            metric: '5c092ac89695dd154a025c05',
            unit: 'cm',
          },
          {
            source_name: 'key.value',
            metric: '5c092ac89695dd154a025c05',
            unit: 'm',
          },
        ],
      },
      {
        identificator: 'id2',
        description: 'desc2',
        datasource_type: 'text',
        separator: ';',
        textMappers: [
          {
            source_name: 'value=',
            metric: '5c092ac89695dd154a025c05',
            unit: 'cm',
          },
          {
            source_name: 'value2=',
            metric: '5c092ac89695dd154a025c05',
            unit: 'm',
          },
        ],
      },
      {
        identificator: 'id4',
        description: 'desc2',
        datasource_type: 'json/bin',
        binaryMixedMappers: [
          {
            source_name: 'value',
            binaryMappers: [
              {
                from_byte: 0,
                to_byte: 1,
                metric: '5c092ac89695dd154a025c05',
                unit: 'cm',
              },
            ],
          },
        ],
      },
      {
        identificator: 'fa',
        description: 'desc1',
        datasource_type: 'json',
        binaryMappers: [
          {
            from_byte: 3,
            to_byte: 4,
            metric: '5c092ac89695dd154a025c05',
            unit: 'cm',
          },
          {
            from_byte: 5,
            to_byte: 7,
            metric: '5c092ac89695dd154a025c05',
            unit: 'm',
          },
        ],
      },
    ]
    const sensorIdMapperData = [
      { source_name: 'id', content_type: contentType.JSON },
      { source_name: 'id=', content_type: contentType.TEXT, separator: ';' },
      { from_byte: 1, to_byte: 2, content_type: contentType.BINARY },
    ]
    Promise.all([Sensor.deleteMany({}), SensorIdMapper.deleteMany({})])
      .then(() => {
        return Sensor.create(sensorData)
      })
      .then((newSensors) => {
        sensors = newSensors
        return SensorIdMapper.create(sensorIdMapperData)
      })
      .then((newSensorIdMappers) => {
        sensorIdMappers = newSensorIdMappers
        done()
      })
      .catch((err) => {
        throw err
        done()
      })
  })
  it('Test Valid JSON ID parser', function() {
    const body = '{"id": "idvalue", "key": {"value": "4"}}'
    const result = JsonIdParser(sensorIdMappers, JSON.parse(body))
    assert.equal(result, 'idvalue')
  })
  it('Test Valid TEXT ID parser', function() {
    const body = 'id=idvalue;value2=4;'
    const result = TextIdParser(sensorIdMappers, body)
    assert.equal(result, 'idvalue')
  })
  it('Test Invalid JSON ID parser', function() {
    const body = '{"id_noexists": "idvalue", "key": {"value": "4"}}'
    const result = JsonIdParser(sensorIdMappers, JSON.parse(body))
    assert.equal(result, null)
  })
  it('Test Valid BINARY ID parser', function() {
    const body = 'fabacde'
    const result = BinaryIdParser(sensorIdMappers, body)
    assert.equal(result.length, 1)
    assert.equal(result[0], 'fa')
  })
  it('Test Invalid BINARY ID parser', function() {
    const body = ''
    const result = BinaryIdParser(sensorIdMappers, body)
    assert.equal(result.length, 0)
  })
  it('Test Invalid TEXT ID parser', function() {
    const body = 'id_noexists=idvalue;value2=4;'
    const result = TextIdParser(sensorIdMappers, body)
    assert.equal(result, null)
  })
  it('Test JSON parser', function() {
    const body = '{"value": "3", "key": {"value": "4"}}'
    const result = JsonParser(JSON.parse(body), sensors[0])
    assert.equal(result[0].value, '3')
    assert.equal(result[0].unit, 'cm')
    assert.equal(result[0].metric, '5c092ac89695dd154a025c05')
    assert.equal(result[1].value, '4')
    assert.equal(result[1].unit, 'm')
    assert.equal(result[1].metric, '5c092ac89695dd154a025c05')
  })
  it('Test JSON Bin parser', function() {
    const body = '{"value": "F", "key": {"value": "4"}}'
    const result = JsonBinParser(JSON.parse(body), sensors[2])
    assert.equal(result[0].value, '15')
    assert.equal(result[0].unit, 'cm')
    assert.equal(result[0].metric, '5c092ac89695dd154a025c05')
  })
  it('Test TEXT parser', function() {
    const body = 'value=3;value2=4;'
    const result = TextParser(body, sensors[1])
    assert.equal(result[0].value, '3')
    assert.equal(result[0].unit, 'cm')
    assert.equal(result[0].metric, '5c092ac89695dd154a025c05')
    assert.equal(result[1].value, '4')
    assert.equal(result[1].unit, 'm')
    assert.equal(result[1].metric, '5c092ac89695dd154a025c05')
  })
  it('Test BINARY parser', function() {
    const body = 'fabacde'
    const result = BinaryParser(body, sensors[3])
    assert.equal(result[0].value, '186')
    assert.equal(result[0].unit, 'cm')
    assert.equal(result[0].metric, '5c092ac89695dd154a025c05')
    assert.equal(result[1].value, '3294')
    assert.equal(result[1].unit, 'm')
    assert.equal(result[1].metric, '5c092ac89695dd154a025c05')
  })
})
