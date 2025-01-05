import axios from 'axios'
import { CityGeolocationInterface } from '../ports/ForGettingCityGeolocation.Interface'

import { ForGettingCityGeolocationInterface } from '../ports/ForGettingCityGeolocation.Interface'

export class ForGettingCityGeolacationAdapter
    implements ForGettingCityGeolocationInterface
{
    async getCityGeolocation(city: string): Promise<CityGeolocationInterface> {
        try {
            const response = await axios.get<
                [
                    {
                        lat: number
                        lon: number
                    },
                ]
            >(
                `${process.env.GEOLOCATION_BASE_API_URL}?q=${city}&limit=1&appid=${process.env.GEO_API_KEY}`,
            )

            if (response.status === 200 && response.data.length > 0) {
                if (
                    response.data[0].lat === undefined ||
                    response.data[0].lon === undefined
                ) {
                    return {
                        success: false,
                        error: new Error('City not found'),
                    }
                }

                return {
                    success: true,
                    data: {
                        lat: response.data[0].lat,
                        lon: response.data[0].lon,
                    },
                }
            }

            return {
                success: false,
                error: new Error(
                    'Error getting forecast for city. Verify the city name.',
                ),
            }
        } catch (error) {
            return {
                success: false,
                error:
                    error instanceof Error ? error : new Error(String(error)),
            }
        }
    }
}
