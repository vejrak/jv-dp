import chai from 'chai'
import Data from '../../app/models/Data'
import Sensor from '../../app/models/Sensor'
import SensorIdMapper from '../../app/models/SensorIdMapper'
import consts from '../../app/consts'
import { getRequest } from './helpers'

const { contentType } = consts

chai.should()

describe('Datasource mechanism tests', () => {
  var sensors
  beforeEach((done) => {
    Data.deleteMany({}, (err) => {
      if (err) throw err
      done()
    })
  })

  before((done) => {
    const sensorIdMapperData = [
      { source_name: 'id', content_type: contentType.JSON },
      { source_name: 'id=', content_type: contentType.TEXT, separator: ';' },
      { from_byte: 1, to_byte: 2, content_type: contentType.BINARY },
    ]
    const sensorData = [
      {
        identificator: 'id1',
        description: 'desc1',
        datasource_type: 'json',
        jsonMappers: [
          {
            source_name: 'values.test1',
            metric: '5c092ac89695dd154a025c05',
            unit: 'cm',
          },
          {
            source_name: 'values.test2',
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
            source_name: 'length=',
            metric: '5c092ac89695dd154a025c05',
            unit: 'cm',
          },
          {
            source_name: 'time=',
            metric: '5c092ac89695dd154a025c05',
            unit: 'm',
          },
        ],
      },
      {
        identificator: 'id4',
        description: 'desc2',
        datasource_type: 'json/binary',
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
        identificator: 'ff',
        description: 'desc1',
        datasource_type: 'binary',
        binaryMappers: [
          {
            from_byte: 3,
            to_byte: 4,
            metric: '5c092ac89695dd154a025c05',
            unit: 'cm',
          },
        ],
      },
    ]
    Promise.all([Sensor.deleteMany({}), SensorIdMapper.deleteMany({})])
      .then(() => {
        return Sensor.create(sensorData)
      })
      .then((newSensors) => {
        sensors = newSensors
        return SensorIdMapper.create(sensorIdMapperData)
      })
      .then(() => {
        done()
      })
      .catch((err) => {
        throw err
      })
  })

  describe('/POST datasource', () => {
    it('it should post json data and save them', (done) => {
      const data = { id: sensors[0]._id, values: { test1: 10, test2: 30 } }
      getRequest()
        .post('/datasource')
        .set('Content-Type', contentType.JSON)
        .send(data)
        .end((err, res) => {
          res.should.have.status(200)
          done()
        })
    })
    it('it should post text data and save them', (done) => {
      const data = 'id=' + sensors[1]._id + ';length=10;time=5'
      getRequest()
        .post('/datasource')
        .set('Content-Type', contentType.TEXT)
        .send(data)
        .end((err, res) => {
          res.should.have.status(200)
          done()
        })
    })
  })
  it('it should post JSON BIN data and save them', (done) => {
    const data = { id: sensors[2]._id, value: 'F' }
    getRequest()
      .post('/datasource')
      .set('Content-Type', contentType.JSON_BINARY)
      .send(data)
      .end((err, res) => {
        res.should.have.status(200)
        done()
      })
  })
  it('it should post BIN data and save them', (done) => {
    const data = 'ffba'
    getRequest()
      .post('/datasource')
      .set('Content-Type', contentType.BINARY)
      .send(data)
      .end((err, res) => {
        res.should.have.status(200)
        done()
      })
  })
})
