export interface ForGettingCityGeolocationInterface {
    getCityGeolocation(city: string): Promise<CityGeolocationInterface>
}

export interface CityGeolocationInterface {
    success: boolean
    data?: {
        latitude: number
        longitude: number
    }
    error?: Error
}
