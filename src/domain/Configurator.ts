import {
    CityForcastDataInterface,
    ForGettingCityForcastInterface,
} from '../driven/ports/ForGettingCityForcast.Interface'
import { ForGettingCityGeolocationInterface } from '../driven/ports/ForGettingCityGeolocation.Interface'

export default class Configurator {
    private forGettingCityForcast: ForGettingCityForcastInterface
    private forGettingCityGeolocation: ForGettingCityGeolocationInterface

    constructor(
        forGettingCityForcast: ForGettingCityForcastInterface,
        forGettingCityGeolocation: ForGettingCityGeolocationInterface,
    ) {
        this.forGettingCityForcast = forGettingCityForcast
        this.forGettingCityGeolocation = forGettingCityGeolocation
    }

    async getFiveDaysForecast(
        city: string,
    ): Promise<{
        status: number
        data?: CityForcastDataInterface[]
        context?: string
    }> {
        const geolocation =
            await this.forGettingCityGeolocation.getCityGeolocation(
                city,
            )

        if (
            !geolocation.success ||
            !geolocation.data?.lat ||
            !geolocation.data?.lon
        ) {
            return {
                status: 400,
                context: geolocation.error?.message ?? '',
            }
        }

        const forecast = await this.forGettingCityForcast.getCityForcast(
            geolocation.data.lat,
            geolocation.data.lon,
        )

        if (!forecast.success) {
            return {
                status: 400,
                context: forecast.error?.message ?? '',
            }
        }

        return {
            status: 200,
            data: forecast.data,
        }
    }
}
