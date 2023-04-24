import { HttpClient } from '../utils'
import HttpResponse from '../utils/httpResponse'

import config from '../config';

import { WeatherResponse } from '../models/response/WeatherResponse'
import { WeatherEntity } from '../models/entities/Weather'

export const getWeather = async (payload: any): Promise<any> => {
  const { postcode, countryCode } = payload

  const weatherHttpClient = new HttpClient(`https://api.openweathermap.org`);

  const weatherApiResponse: HttpResponse<WeatherResponse> = await weatherHttpClient.get(`/data/2.5/weather`, {
    zip: `${postcode},${countryCode}`,
    appid: config.OPEN_WEATHER_API_KEY,
    units: 'metric'
  })

  const result: WeatherEntity = WeatherEntity.mapToWeatherEntity(weatherApiResponse.data)

  return result
};
