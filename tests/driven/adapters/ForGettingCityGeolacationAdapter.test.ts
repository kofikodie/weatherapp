import { ForGettingCityGeolacationAdapter } from '../../../src/driven/adapters/ForGettingCityGeolacationAdapter'
import nock from 'nock'

describe('ForGettingCityGeolacationAdapter', () => {
    it('should return the city geolocation when the city is valid', async () => {
        process.env.GEO_API_KEY = '1234567890'
        const city = 'London'

        nock(`${process.env.GEOLOCATION_BASE_API_URL}`)
            .get(
                `?q=${city}&limit=1&appid=${process.env.GEO_API_KEY}`,
            )
            .reply(200, [
                {
                    name: 'London',
                    local_names: {
                        en: 'London',
                    },
                    lat: 51.5073219,
                    lon: -0.1276474,
                    country: 'GB',
                    state: 'England',
                },
            ])

        const adapter = new ForGettingCityGeolacationAdapter()
        const result = await adapter.getCityGeolocation(city)

        expect(result).toBeDefined()
        expect(result.success).toBe(true)
        expect(result.data).toEqual({
            lat: 51.5073219,
            lon: -0.1276474,
        })
    })

    it('should return an error when the api key is not valid', async () => {
        process.env.GEO_API_KEY = 'not-valid-api-key'
        const city = 'London'

        nock(`${process.env.GEOLOCATION_BASE_API_URL}`)
            .get(
                `?q=${city}&limit=1&appid=${process.env.GEO_API_KEY}`,
            )
            .reply(401, {
                cod: 401,
                message:
                    'Invalid API key. Please see https://openweathermap.org/faq#error401 for more info.',
            })

        const adapter = new ForGettingCityGeolacationAdapter()
        const result = await adapter.getCityGeolocation(city)

        expect(result.error).toBeDefined()
        expect(result.success).toBe(false)
        expect(result.error?.message).toBe(
            'Request failed with status code 401',
        )
    })

    it('should return an empty object when the city is not found', async () => {
        process.env.GEO_API_KEY = '1234567890'
        const city = 'Not-Found'

        nock(`${process.env.GEOLOCATION_BASE_API_URL}`)
            .get(
                `?q=${city}&limit=1&appid=${process.env.GEO_API_KEY}`,
            )
            .reply(200, [])

        const adapter = new ForGettingCityGeolacationAdapter()
        const result = await adapter.getCityGeolocation(city)

        expect(result.data).toBeUndefined()
        expect(result.success).toBe(false)
        expect(result.error).toBeDefined()
        expect(result.error?.message).toBe(
            'Error getting forecast for city. Verify the city name.',
        )
    })

    it('should return an error when weather api is down', async () => {
        process.env.GEO_API_KEY = '1234567890'
        const city = 'London'

        nock(`${process.env.GEOLOCATION_BASE_API_URL}`)
            .get(
                `?q=${city}&limit=1&appid=${process.env.GEO_API_KEY}`,
            )
            .reply(500)

        const adapter = new ForGettingCityGeolacationAdapter()
        const result = await adapter.getCityGeolocation(city)

        expect(result.error).toBeDefined()
        expect(result.success).toBe(false)
        expect(result.error?.message).toBe(
            'Request failed with status code 500',
        )
    })

    it('should return an error when the latitude or longitude is not defined', async () => {
        process.env.GEO_API_KEY = '1234567890'
        const city = 'London'

        nock(`${process.env.GEOLOCATION_BASE_API_URL}`)
            .get(
                `?q=${city}&limit=1&appid=${process.env.GEO_API_KEY}`,
            )
            .reply(200, [
                {
                    name: 'London',
                    country: 'GB',
                    state: 'England',
                },
            ])

        const adapter = new ForGettingCityGeolacationAdapter()
        const result = await adapter.getCityGeolocation(city)

        expect(result.success).toBe(false)
        expect(result.error?.message).toBe('City not found')
    })
})
