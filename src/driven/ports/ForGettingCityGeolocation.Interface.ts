export interface ForGettingCityGeolocationInterface {
    getCityGeolocation(
        city: string,
    ): Promise<CityGeolocationInterface>
}

export interface CityGeolocationInterface {
    success: boolean
    data?: {
        lat?: number
        lon?: number
        message?: string
    }
    error?: Error
}
