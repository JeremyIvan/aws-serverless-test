import { returnResponse } from "./return";

import { getWeather } from "../services";

export const getWeatherDataHandler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;

  const { postcode, country_code } = event.queryStringParameters

  const result = await getWeather({
    postcode: postcode,
    countryCode: country_code
  });

  return returnResponse(result);
}

export const handler = getWeatherDataHandler;