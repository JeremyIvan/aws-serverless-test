First when creating an API, I first declared the endpoint of the intended API in this case is GET /chatbot/weather?postcode=2000&country_code=au wherein it takes two query parameters as input(postcode and country_code)

The reason I used GET instead of POST although there is an input is that we will not be persisting any data to a datasource/collection but instead it will be used as parameter to get data.

After having done with the declaration of the API endpoint and http method to be used in the serverless yaml file, I then created the handler to format the input I will be receiving by deconstructing the queryStringParameters to format the naming convention of variables into camelCase from the input format snake_case and will be passed to the service layer as payload

In the service layer, I then deconstructed the payload into separate variables to be used in the template literal during the Http Client call to the Open Weather API

Also I created a models folder where we can find the entity model (Weather.ts) that also contains a mapper to format the fields from the third party API response to its Base Entity format, and as well as the third party api response model (WeatherResponse.ts) so that I can easily handle and manipulate the expected data response from the third-party API

After I called the OpenWeather API and received a response, I then map the values of the Response to its base entity by using the mapper I created in the Base Entity Class

Once the Entity has been mapped from the API Response, I then return the base Entity to the handler that would then be the response for the API call

Also I modified the return.ts file so that the body would stringify the data before returning as the response as in Serverless the body should always be stringified

Aside from that, I added a new package(dotenv) in order to hide the API Key to be used for the third party API wherein we could safely store the sensitive informations such as API Keys/Client ID and Secret/Database Credentials/etc., which is then store in the config folder