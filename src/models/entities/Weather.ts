export class WeatherEntity {
    public lon: number;
    public lat: number;
    public main: string;
    public description: string;
    public temp: number;
    public feels_like: number;
    public temp_min: number;
    public temp_max: number;
    public pressure: number;
    public humidity: number;

    public static mapToWeatherEntity(data: any): WeatherEntity {
        const weatherEntity = new WeatherEntity();
        weatherEntity.lon = data.coord.lon;
        weatherEntity.lat = data.coord.lat;
        weatherEntity.main = data.weather[0].main;
        weatherEntity.description = data.weather[0].description;
        weatherEntity.temp = data.main.temp;
        weatherEntity.feels_like = data.main.feels_like;
        weatherEntity.temp_min = data.main.temp_min;
        weatherEntity.temp_max = data.main.temp_max;
        weatherEntity.pressure = data.main.pressure;
        weatherEntity.humidity = data.main.humidity;
        return weatherEntity;
    }
}