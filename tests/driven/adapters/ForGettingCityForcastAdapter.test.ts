import nock from 'nock'
import { ForGettingCityForcastAdapter } from '../../../src/driven/adapters/ForGettingCityForcastAdapter'

describe('ForGettingCityForcastAdapter', () => {
    it('should return a list of 5 days forecast', async () => {
        process.env.FORECAST_API_KEY = '1234567890'
        const lat = 51.5073219
        const lon = -0.1276474

        nock(`${process.env.FORECAST_BASE_API_URL}`)
            .get(
                `?lat=${lat}&lon=${lon}&appid=${process.env.FORECAST_API_KEY}&units=metric&cnt=5`,
            )
            .reply(200, {
                city: {
                    id: 3163858,
                    name: 'Zocca',
                    coord: {
                        lon: 10.99,
                        lat: 44.34,
                    },
                    country: 'IT',
                    population: 4593,
                    timezone: 3600,
                },
                cod: '200',
                message: 0.8219128,
                cnt: 5,
                list: [
                    {
                        dt: 1735988400,
                        sunrise: 1735973512,
                        sunset: 1736005787,
                        temp: {
                            day: 4.61,
                            min: 0.68,
                            max: 5.27,
                            night: 1.53,
                            eve: 2.11,
                            morn: 1.24,
                        },
                        feels_like: {
                            day: 3.3,
                            night: -0.44,
                            eve: 2.11,
                            morn: 1.24,
                        },
                        pressure: 1022,
                        humidity: 78,
                        weather: [
                            {
                                id: 802,
                                main: 'Clouds',
                                description: 'scattered clouds',
                                icon: '03d',
                            },
                        ],
                        speed: 1.82,
                        deg: 44,
                        gust: 2.8,
                        clouds: 27,
                        pop: 0,
                    },
                    {
                        dt: 1736074800,
                        sunrise: 1736059906,
                        sunset: 1736092246,
                        temp: {
                            day: 4.25,
                            min: 1.15,
                            max: 5.3,
                            night: 5.27,
                            eve: 4.8,
                            morn: 1.75,
                        },
                        feels_like: {
                            day: 4.25,
                            night: 5.27,
                            eve: 4.8,
                            morn: 0.44,
                        },
                        pressure: 1018,
                        humidity: 90,
                        weather: [
                            {
                                id: 804,
                                main: 'Clouds',
                                description: 'overcast clouds',
                                icon: '04d',
                            },
                        ],
                        speed: 1.87,
                        deg: 204,
                        gust: 3.66,
                        clouds: 100,
                        pop: 0,
                    },
                    {
                        dt: 1736161200,
                        sunrise: 1736146297,
                        sunset: 1736178706,
                        temp: {
                            day: 9.33,
                            min: 4.98,
                            max: 9.98,
                            night: 7.46,
                            eve: 7.4,
                            morn: 5.22,
                        },
                        feels_like: {
                            day: 8.74,
                            night: 7.46,
                            eve: 7.4,
                            morn: 5.22,
                        },
                        pressure: 1012,
                        humidity: 80,
                        weather: [
                            {
                                id: 500,
                                main: 'Rain',
                                description: 'light rain',
                                icon: '10d',
                            },
                        ],
                        speed: 2.25,
                        deg: 193,
                        gust: 5.92,
                        clouds: 100,
                        pop: 0.79,
                        rain: 1.28,
                    },
                    {
                        dt: 1736247600,
                        sunrise: 1736232686,
                        sunset: 1736265169,
                        temp: {
                            day: 8.11,
                            min: 4.37,
                            max: 8.11,
                            night: 4.37,
                            eve: 5.16,
                            morn: 7.48,
                        },
                        feels_like: {
                            day: 6.32,
                            night: 2.16,
                            eve: 3.82,
                            morn: 6.67,
                        },
                        pressure: 1003,
                        humidity: 79,
                        weather: [
                            {
                                id: 501,
                                main: 'Rain',
                                description: 'moderate rain',
                                icon: '10d',
                            },
                        ],
                        speed: 2.88,
                        deg: 221,
                        gust: 8.71,
                        clouds: 87,
                        pop: 1,
                        rain: 7.03,
                    },
                    {
                        dt: 1736334000,
                        sunrise: 1736319073,
                        sunset: 1736351633,
                        temp: {
                            day: 6.42,
                            min: 3.48,
                            max: 6.52,
                            night: 6.52,
                            eve: 6.11,
                            morn: 4.77,
                        },
                        feels_like: {
                            day: 5.29,
                            night: 5.36,
                            eve: 6.11,
                            morn: 4.77,
                        },
                        pressure: 1012,
                        humidity: 93,
                        weather: [
                            {
                                id: 500,
                                main: 'Rain',
                                description: 'light rain',
                                icon: '10d',
                            },
                        ],
                        speed: 2.16,
                        deg: 189,
                        gust: 6.12,
                        clouds: 100,
                        pop: 0.92,
                        rain: 2.21,
                    },
                ],
            })

        const adapter = new ForGettingCityForcastAdapter()
        const result = await adapter.getCityForcast(lat, lon)
        expect(result.data).toHaveLength(5)

        expect(result.success).toBe(true)
        expect(result.data?.[0].main).toBe('Clouds')
        expect(result.data?.[0].description).toBe('scattered clouds')
        expect(result.data?.[0].temp).toEqual({
            day: 4.61,
            eve: 2.11,
            max: 5.27,
            min: 0.68,
            morn: 1.24,
            night: 1.53,
        })
        expect(result.data?.[0].date).toBe('2025-01-04T11:00:00.000Z')

        expect(result.data?.[1].main).toBe('Clouds')
        expect(result.data?.[1].description).toBe('overcast clouds')
        expect(result.data?.[1].temp).toEqual({
            day: 4.25,
            eve: 4.8,
            max: 5.3,
            min: 1.15,
            morn: 1.75,
            night: 5.27,
        })
        expect(result.data?.[1].date).toBe('2025-01-05T11:00:00.000Z')

        expect(result.data?.[2].main).toBe('Rain')
        expect(result.data?.[2].description).toBe('light rain')
        expect(result.data?.[2].temp).toEqual({
            day: 9.33,
            eve: 7.4,
            max: 9.98,
            min: 4.98,
            morn: 5.22,
            night: 7.46,
        })
        expect(result.data?.[2].date).toBe('2025-01-06T11:00:00.000Z')

        expect(result.data?.[3].main).toBe('Rain')
        expect(result.data?.[3].description).toBe('moderate rain')
        expect(result.data?.[3].date).toBe('2025-01-07T11:00:00.000Z')

        expect(result.data?.[4].main).toBe('Rain')
        expect(result.data?.[4].description).toBe('light rain')
        expect(result.data?.[4].date).toBe('2025-01-08T11:00:00.000Z')
    })

    it('should return an error when the api returns an error', async () => {
        const lat = 51.5073219
        const lon = -0.1276474

        nock(`${process.env.FORECAST_BASE_API_URL}`)
            .get(
                `?lat=${lat}&lon=${lon}&appid=${process.env.FORECAST_API_KEY}&units=metric&cnt=5`,
            )
            .reply(500, { message: 'Internal server error' })

        const adapter = new ForGettingCityForcastAdapter()
        const result = await adapter.getCityForcast(lat, lon)
        expect(result.success).toBe(false)
        expect(result.error).toBeDefined()
    })

    it('should return an error when the api key is not valid', async () => {
        process.env.FORECAST_API_KEY = 'not-valid-api-key'
        const lat = 51.5073219
        const lon = -0.1276474

        nock(`${process.env.FORECAST_BASE_API_URL}`)
            .get(
                `?lat=${lat}&lon=${lon}&appid=${process.env.FORECAST_API_KEY}&units=metric&cnt=5`,
            )
            .reply(401, {
                cod: 401,
                message:
                    'Invalid API key. Please see https://openweathermap.org/faq#error401 for more info.',
            })

        const adapter = new ForGettingCityForcastAdapter()
        const result = await adapter.getCityForcast(lat, lon)
        expect(result.success).toBe(false)
        expect(result.error).toBeDefined()
    })
})
