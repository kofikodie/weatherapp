import { ForGettingCityGeolacationAdapter } from '../../../src/driven/adapters/ForGettingCityGeolacationAdapter'
import nock from 'nock'

describe('ForGettingCityGeolacationAdapter', () => {
    process.env.API_KEY = '1234567890'

    nock(`${process.env.GEOLOCATION_BASE_API_URL}`)
        .get(`?q=London&appid=${process.env.API_KEY}`)
        .reply(200, {
            lat: 51.5074,
            lon: -0.1278,
        })

    it('should return the city geolocation', async () => {
        const adapter = new ForGettingCityGeolacationAdapter()
        const city = 'London'
        const result = await adapter.getCityGeolocation(city)
        console.log(result)
        expect(result).toBeDefined()
        expect(result.success).toBe(true)
        expect(result.data).toEqual({
            latitude: 51.5074,
            longitude: -0.1278,
        })
    })
})
