import express, { Request, Response } from 'express'
import { ForConfiguringWeatherParams } from './driving/ports/ForConfiguringWeatherParams.Interface'
import { ForGettingCityGeolacationAdapter } from './driven/adapters/ForGettingCityGeolacationAdapter'

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
        res.send({
            city,
        })
    },
)

export default app
