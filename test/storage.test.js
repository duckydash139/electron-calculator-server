import mongoose from 'mongoose'
import Storage from '../src/models/storage'

import server from './mockServer'

describe('Storage', () => {
  beforeAll(async done => {
    // start the server
    await server.start()
    done()
  })

  afterAll(async done => {
    await server.stop()
    done()
  })

  beforeEach(async done => {
    // clear database before each test
    await Storage.remove({})
    done()
  })

  describe('/GET /storage/{id}', () => {
    test('it should fetch if the client_id is found', async done => {
      // add mock data to db
      const file = { a: 45, b: 55, operator: 'add', result: 100 }
      const mockData = new Storage({ client_id: '123-456', file })

      await mockData.save()

      const response = await server.inject('/storage/123-456')
      expect(response.statusCode).toBe(200)
      expect(response.result).toEqual(file)

      done()
    })

    test('it should return status 500 if the client_id is not found ', async done => {
      const response = await server.inject('/storage/123-4567')
      expect(response.statusCode).toBe(500)

      done()
    })
  })

  describe('/POST /storage', () => {
    const mockData = {
      client_id: '123-456',
      file: { a: 45, b: 55, operator: 'add', result: 100 }
    }

    const options = { method: 'POST', url: '/storage' }

    test('it should record the new data', async done => {
      const response = await server.inject({ ...options, payload: mockData })
      expect(response.statusCode).toBe(201)
      expect(response.result).toEqual({ success: true, message: 'created' })

      done()
    })

    test('it should not record the new data if it exists', async done => {
      const newClient = new Storage(mockData)

      await newClient.save()

      const response = await server.inject({
        ...options,
        payload: mockData
      })
      expect(response.statusCode).toBe(202)
      expect(response.result).toEqual({
        success: false,
        message: 'client_id already exists'
      })

      done()
    })

    test('it should return status 400 if request payload is invalid', async done => {
      const mockData = {
        client_id: '123-456',
        file: { a: 45, b: 55, operator: 'add' }
      }

      const response = await server.inject({
        ...options,
        payload: mockData
      })
      expect(response.statusCode).toBe(400)

      done()
    })
  })

  describe('/PUT /storage/{id}', () => {
    const mockData = {
      client_id: '123-456',
      file: { a: 45, b: 55, operator: 'add', result: 100 }
    }

    const options = { method: 'PUT', url: '/storage/123-456' }

    test('it should update data with request payload', async done => {
      const newClient = new Storage(mockData)

      await newClient.save()

      const response = await server.inject({
        ...options,
        payload: { file: { a: 2, b: 55, operator: 'add', result: 57 } }
      })
      expect(response.statusCode).toBe(200)
      expect(response.result).toEqual({
        success: true,
        message: 'updated'
      })

      done()
    })

    test('it should not update if the client_id is not found ', async done => {
      const response = await server.inject({
        method: 'PUT',
        url: '/storage/123-4567',
        payload: { file: { a: 2, b: 55, operator: 'add', result: 57 } }
      })
      expect(response.statusCode).toBe(202)
      expect(response.result).toEqual({
        success: true,
        message: 'not found'
      })

      done()
    })

    test('it should return status 400 if request payload is invalid', async done => {
      const mockData = {
        client_id: '123-456',
        file: { a: 45, b: 55, operator: 'add' }
      }

      const response = await server.inject({
        ...options,
        payload: mockData
      })
      expect(response.statusCode).toBe(400)

      done()
    })
  })

  describe('/DELETE /storage/{id}', () => {
    const mockData = {
      client_id: '123-456',
      file: { a: 45, b: 55, operator: 'add', result: 100 }
    }

    const options = { method: 'DELETE', url: '/storage/123-456' }

    test('it should delete data if the client_id is found', async done => {
      const newClient = new Storage(mockData)

      await newClient.save()

      const response = await server.inject(options)
      expect(response.statusCode).toBe(200)
      expect(response.result).toEqual({
        success: true,
        message: 'removed'
      })

      done()
    })

    test('it should not delete if the client_id is not found ', async done => {
      const response = await server.inject(options)
      expect(response.statusCode).toBe(202)
      expect(response.result).toEqual({ success: true, message: 'not found' })

      done()
    })
  })
})
