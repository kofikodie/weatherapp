import axios from 'axios'
import {
    CityForcastInterface,
    ClientResponseForecastInterface,
    ForGettingCityForcastInterface,
} from '../ports/ForGettingCityForcast.Interface'

export class ForGettingCityForcastAdapter
    implements ForGettingCityForcastInterface
{
    async getCityForcast(
        lat: number,
        lon: number,
    ): Promise<CityForcastInterface> {
        try {
            const response = await axios.get<ClientResponseForecastInterface>(
                `${process.env.FORECAST_BASE_API_URL}?lat=${lat}&lon=${lon}&appid=${process.env.FORECAST_API_KEY}&units=metric&cnt=5`,
            )

            if (
                response.status === 200 &&
                (response.data.list?.length ?? 0) > 0
            ) {
                return {
                    success: true,
                    data: response.data.list?.map(item => ({
                        main: item.weather?.[0]?.main ?? '',
                        description: item.weather?.[0]?.description ?? '',
                        temp: item.temp,
                        date: new Date(item.dt * 1000),
                    })),
                }
            }

            return {
                success: false,
                error: new Error('Error getting city forcast'),
            }
        } catch (error) {
            return {
                success: false,
                error:
                    error instanceof Error
                        ? error
                        : new Error('Error getting city forcast'),
            }
        }
    }
}
