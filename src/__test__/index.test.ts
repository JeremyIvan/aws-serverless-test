import { getWeather } from '../services/weather';
import { HttpClient } from '../utils';
import config from '../config';
import { WeatherResponse } from '../models/response/WeatherResponse';
import { WeatherEntity } from '../models/entities/Weather';

jest.mock('../utils/HttpClient');

describe('getWeather', () => {
    const mockHttpClientGet = HttpClient.prototype.get as jest.MockedFunction<typeof HttpClient.prototype.get>;

    afterEach(() => {
        jest.resetAllMocks();
    })

    it('should call Weather API with correct parameters and return mapped weather entity', async () => {
        const mockWeatherApiResponse: WeatherResponse = {
            "coord": {
                "lon": -0.1257,
                "lat": 51.5085
            },
            "weather": [
                {
                    "id": 804,
                    "main": "Clouds",
                    "description": "overcast clouds",
                    "icon": "04d"
                }
            ],
            "base": "stations",
            "main": {
                "temp": 283.15,
                "feels_like": 281.61,
                "temp_min": 281.24,
                "temp_max": 285.52,
                "pressure": 1009,
                "humidity": 72
            },
            "visibility": 10000,
            "wind": {
                "speed": 3.09,
                "deg": 330
            },
            "rain": {
                "1h": 0.1
            },
            "clouds": {
                "all": 100
            },
            "dt": 1682330764,
            "sys": {
                "type": 2,
                "id": 2075535,
                "country": "GB",
                "sunrise": 1682311597,
                "sunset": 1682363428
            },
            "timezone": 3600,
            "id": 2643743,
            "name": "London",
            "cod": 200
        }
        
        mockHttpClientGet.mockResolvedValueOnce({
            statusCode: 200,
            data: mockWeatherApiResponse,
        })

        const mockPayload = {
            postcode: '2000',
            countryCode: 'au',
        }
        const expectedZipCode = `${mockPayload.postcode},${mockPayload.countryCode}`;

        const result = await getWeather(mockPayload);

        expect(mockHttpClientGet).toHaveBeenCalledWith('/data/2.5/weather', {
            zip: expectedZipCode,
            appid: config.OPEN_WEATHER_API_KEY,
            units: 'metric',
        });

        expect(result).toEqual(WeatherEntity.mapToWeatherEntity(mockWeatherApiResponse));
    });

    it('should throw an error if the API call fails', async () => {
        mockHttpClientGet.mockRejectedValueOnce(new Error('API call failed'));

        const mockPayload = {
            postcode: '2000',
            countryCode: 'au',
        }

        await expect(getWeather(mockPayload)).rejects.toThrowError('API call failed');
    })
})