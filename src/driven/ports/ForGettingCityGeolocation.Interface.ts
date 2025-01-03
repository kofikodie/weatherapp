export interface ForGettingCityGeolocationInterface {
    getCityGeolocation(
        city: string,
        countryCode: string,
    ): Promise<CityGeolocationInterface>
}

export interface CityGeolocationInterface {
    success: boolean
    data?: {
        lat: number
        lon: number
    }
    error?: Error
}
