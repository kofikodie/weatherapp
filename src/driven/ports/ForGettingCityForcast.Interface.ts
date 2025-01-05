export interface ForGettingCityForcastInterface {
    getCityForcast(lat: number, lon: number): Promise<CityForcastInterface>
}

export interface CityForcastInterface {
    success: boolean
    data?: CityForcastDataInterface[]
    error?: Error
}

export interface CityForcastDataInterface {
    main: string
    description: string
    temp: Temp
    date: string
    context?: string
}

export interface ClientResponseForecastInterface {
    city: City
    cod: string
    message: number
    cnt: number
    list?: ListEntity[] | null
}

interface City {
    id: number
    name: string
    coord: Coord
    country: string
    population: number
    timezone: number
}
interface Coord {
    lon: number
    lat: number
}
interface ListEntity {
    dt: number
    sunrise: number
    sunset: number
    temp: Temp
    feels_like: FeelsLike
    pressure: number
    humidity: number
    weather?: WeatherEntity[] | null
    speed: number
    deg: number
    gust: number
    clouds: number
    pop: number
    rain?: number | null
}
interface Temp {
    day: number
    min: number
    max: number
    night: number
    eve: number
    morn: number
}
interface FeelsLike {
    day: number
    night: number
    eve: number
    morn: number
}
interface WeatherEntity {
    id: number
    main: string
    description: string
    icon: string
}
