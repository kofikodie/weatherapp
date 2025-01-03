import axios from 'axios'
import { CityGeolocationInterface } from '../ports/ForGettingCityGeolocation.Interface'

import { ForGettingCityGeolocationInterface } from '../ports/ForGettingCityGeolocation.Interface'

export class ForGettingCityGeolacationAdapter
    implements ForGettingCityGeolocationInterface
{
    async getCityGeolocation(city: string): Promise<CityGeolocationInterface> {
        try {
            const response = await axios.get<{
                lat: number
                lon: number
            }>(
                `${process.env.GEOLOCATION_BASE_API_URL}?q=${city}&appid=${process.env.API_KEY}`,
            )

            if (response.status === 200) {
                return {
                    success: true,
                    data: {
                        latitude: response.data.lat,
                        longitude: response.data.lon,
                    },
                }
            }

            return {
                success: false,
                error: new Error('Error getting city geolocation'),
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
