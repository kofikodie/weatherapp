import Configurator from '../../src/domain/Configurator'
import { ForGettingCityForcastAdapter } from '../../src/driven/adapters/ForGettingCityForcastAdapter'
import { ForGettingCityGeolacationAdapter } from '../../src/driven/adapters/ForGettingCityGeolacationAdapter'

describe('Configurator', () => {
    const forecastAdapter = new ForGettingCityForcastAdapter()
    const geolocationAdapter = new ForGettingCityGeolacationAdapter()
    const configurator = new Configurator(forecastAdapter, geolocationAdapter)

    describe('getFiveDaysForecast', () => {
        it('should return forecast data for valid city and country code', async () => {
            jest.spyOn(
                geolocationAdapter,
                'getCityGeolocation',
            ).mockResolvedValueOnce({
                success: true,
                data: {
                    lat: 51.5074,
                    lon: -0.1278,
                },
            })

            jest.spyOn(forecastAdapter, 'getCityForcast').mockResolvedValueOnce(
                {
                    success: true,
                    data: [
                        {
                            main: 'Clear',
                            description: 'Sunny',
                            temp: {
                                day: 20,
                                min: 10,
                                max: 30,
                                night: 15,
                                eve: 25,
                                morn: 12,
                            },
                            date: new Date(),
                        },
                    ],
                },
            )

            const result = await configurator.getFiveDaysForecast('London')

            // Assert
            expect(result.status).toBe(200)
            expect(result.data).toBeDefined()
            expect(result.data?.[0]).toHaveProperty('main')
            expect(result.data?.[0]).toHaveProperty('description')
            expect(result.data?.[0]).toHaveProperty('temp')
            expect(result.data?.[0]).toHaveProperty('date')
        })

        it('should return an error if longitude or latitude is not found', async () => {
            jest.spyOn(
                geolocationAdapter,
                'getCityGeolocation',
            ).mockResolvedValueOnce({
                success: false,
                error: new Error('City not found'),
            })

            const result = await configurator.getFiveDaysForecast('London')

            expect(result.status).toBe(400)
            expect(result.data).toBeUndefined()
            expect(result.context).toBe('City not found')
        })

        it('should return an error if the city is not found', async () => {
            jest.spyOn(
                geolocationAdapter,
                'getCityGeolocation',
            ).mockResolvedValueOnce({
                success: false,
                error: new Error(
                    'Error getting forecast for city. Verify the city name and country code',
                ),
            })

            const result = await configurator.getFiveDaysForecast('London')

            expect(result.status).toBe(400)
            expect(result.data).toBeUndefined()
            expect(result.context).toBe(
                'Error getting forecast for city. Verify the city name and country code',
            )
        })

        it('should return an error if the forecast is not found', async () => {
            jest.spyOn(
                geolocationAdapter,
                'getCityGeolocation',
            ).mockResolvedValueOnce({
                success: true,
                data: {
                    lat: 51.5074,
                    lon: -0.1278,
                },
            })

            jest.spyOn(forecastAdapter, 'getCityForcast').mockResolvedValueOnce(
                {
                    success: false,
                    error: new Error('Error getting forecast for city'),
                },
            )

            const result = await configurator.getFiveDaysForecast('London')

            expect(result.status).toBe(400)
            expect(result.data).toBeUndefined()
            expect(result.context).toBe('Error getting forecast for city')
        })
    })
})
