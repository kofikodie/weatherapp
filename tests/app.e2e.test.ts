import app from '../src/app'
import request from 'supertest'

describe('E2E Test', () => {
    const city = 'Madrid'
    
    it('should return 200 when requesting weather with a valid city', async () => {
        const response = await request(app).get(`/weather?city=${city}`)
        expect(response.status).toBe(200)
        expect(response.body).toEqual({
            city,
        })
    })
})
