import nock from 'nock'
import app from '../src/app'
import request from 'supertest'

describe('E2E Test', () => {
    it('should return 200 when requesting weather with a valid city', async () => {
        const city = 'Madrid'
        process.env.GEO_API_KEY = '1234567890'
        process.env.FORECAST_API_KEY = '1234567890'

        nock(`${process.env.GEOLOCATION_BASE_API_URL}`)
            .get(`?q=${city}&limit=1&appid=${process.env.GEO_API_KEY}`)
            .reply(200, [
                {
                    name: 'Madrid',
                    lat: 40.463667,
                    lon: -3.74922,
                },
            ])

        nock(`${process.env.FORECAST_BASE_API_URL}`)
            .get(
                `?lat=40.463667&lon=-3.74922&appid=${process.env.FORECAST_API_KEY}&units=metric&cnt=5`,
            )
            .reply(200, {
                list: [
                    {
                        dt: 1714857600,
                        weather: [
                            {
                                main: 'Clear',
                                description: 'clear sky',
                            },
                        ],
                        temp: {
                            day: 20,
                            min: 10,
                            max: 30,
                        },
                    },
                ],
            })

        const response = await request(app).get(`/weather?city=${city}`)
        expect(response.status).toBe(200)
        expect(response.body).toEqual({
            status: 200,
            data: [
                {
                    date: '2024-05-04T21:20:00.000Z',
                    description: 'clear sky',
                    main: 'Clear',
                    temp: {
                        day: 20,
                        min: 10,
                        max: 30,
                    },
                },
            ],
        })
    })
})
