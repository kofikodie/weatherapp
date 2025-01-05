# Weather Forecast Service

A TypeScript service that provides 5-day weather forecasts by first converting city names to coordinates and then fetching weather data. Built using Clean Architecture principles.

## Architecture

The service follows Clean Architecture with three main components:

1. **Configurator (Domain)**

    - Main service orchestrator
    - Handles business logic flow
    - Error management

2. **Adapters (External Services)**

    - Geolocation service
    - Weather forecast service
    - External API integration

3. **Ports (Interfaces)**
    - Define contracts for external services
    - Ensure loose coupling

## Setup

1. Create a `.env` file in the root directory with the following:

```bash
cp .env.dist .env
```

2. Build the project:

```bash
docker compose build
```

3. Install dependencies:

```bash
docker compose run --rm app npm install
```

## Development

1. Start development environment:

```bash
docker compose up
```

2. Run linter:

```bash
docker compose exec app npm run lint
```

3. Format code:

```bash
docker compose exec app npm run format
```

4. Run tests:

```bash
docker compose exec app npm test
```

Test coverage includes:

- Unit tests for core components
- Integration tests for external services
- End-to-end testing
- Error scenarios

## API Endpoints

```
GET /weather?city={city}
```

### Response

#### Success Response
```json
{
  {
    "status": 200,
    "data": [
        {
            "main": "Rain",
            "description": "light rain",
            "temp": {
                "day": 4.03,
                "min": 1.94,
                "max": 4.1,
                "night": 3.94,
                "eve": 3.65,
                "morn": 3.22
            },
            "date": "2025-01-05T11:00:00.000Z"
        },
        {
            "main": "Rain",
            "description": "moderate rain",
            "temp": {
                "day": 4.12,
                "min": 3.56,
                "max": 6.35,
                "night": 5.67,
                "eve": 5.53,
                "morn": 3.66
            },
            "date": "2025-01-06T11:00:00.000Z"
        },
        {
            "main": "Rain",
            "description": "moderate rain",
            "temp": {
                "day": 5.77,
                "min": 4.3,
                "max": 6.1,
                "night": 4.37,
                "eve": 5.48,
                "morn": 5.35
            },
            "date": "2025-01-07T11:00:00.000Z"
        },
        {
            "main": "Clouds",
            "description": "scattered clouds",
            "temp": {
                "day": 8.3,
                "min": 3.55,
                "max": 9.22,
                "night": 6.89,
                "eve": 5.67,
                "morn": 3.61
            },
            "date": "2025-01-08T11:00:00.000Z"
        },
        {
            "main": "Rain",
            "description": "light rain",
            "temp": {
                "day": 5.93,
                "min": 5.16,
                "max": 6.26,
                "night": 6.23,
                "eve": 5.77,
                "morn": 5.47
            },
            "date": "2025-01-09T11:00:00.000Z"
        }
    ]
}
```

#### Error Response

```json
{
    "status": 400,
    "context": "Error getting forecast for city. Verify the city name."
}
```

## Error Handling

The service handles several error cases:

- Invalid city names
- Geolocation service failures
- Weather forecast service failures
- Missing or invalid coordinates

