import express, { Request, Response } from 'express'
import { ForConfiguringWeatherParams } from './driving/ports/ForConfiguringWeatherParams.Interface'
import Configurator from './domain/Configurator'
import { ForGettingCityGeolacationAdapter } from './driven/adapters/ForGettingCityGeolacationAdapter'
import { ForGettingCityForcastAdapter } from './driven/adapters/ForGettingCityForcastAdapter'

const app = express()

app.use(express.json())

app.get('/health', (req: Request, res: Response) => {
    res.send('OK')
})

app.get(
    '/weather',
    async (
        req: Request<unknown, unknown, unknown, ForConfiguringWeatherParams>,
        res: Response,
    ) => {
        const { city } = req.query

        const forGettingCityGeolocationAdapter =
            new ForGettingCityGeolacationAdapter()
        const forGettingCityForcastAdapter = new ForGettingCityForcastAdapter()
        const configurator = new Configurator(
            forGettingCityForcastAdapter,
            forGettingCityGeolocationAdapter,
        )
        const result = await configurator.getFiveDaysForecast(city)

        res.status(result.status).send({
            status: result.status,
            data: result.data,
            context: result.context,
        })
    },
)

export default app
