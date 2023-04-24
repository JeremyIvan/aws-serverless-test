export class WeatherResponse {
    public coord: Coord;
    public weather: Weather[];
    public base: string;
    public main: Main;
    public visibility: number;
    public wind: Wind;
    public rain: Rain;
    public clouds: Clouds;
    public dt: number;
    public sys: Sys;
    public timezone: number;
    public id: number;
    public name: string;
    public cod: number;
}

class Coord {
    public lon: number;
    public lat: number;
}

class Weather {
    public id: number;
    public main: string;
    public description: string;
    public icon: string;
}

class Main {
    public temp: number;
    public feels_like: number;
    public temp_min: number;
    public temp_max: number;
    public pressure: number;
    public humidity: number;
}

class Wind {
    public speed: number;
    public deg: number;
}

class Rain {
    public '1h': number;
}

class Clouds {
    public all: number;
}

class Sys {
    public type: number;
    public id: number;
    public country: string;
    public sunrise: number;
    public sunset: number;
}
