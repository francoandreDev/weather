export type CurrentWeatherType =
    {
        currentTemp: number;
        highTemp: number;
        lowTemp: number;
        highFeelsLike: number;
        lowFeelsLike: number;
        iconCode: number;
        precip: number;
        windDirection: number;
        windSpeed: number;
    };


type dailyObjectType = {
    timestamp: number, iconCode: number, maxTemp: number
}

export type DailyWeatherType = Array<dailyObjectType>


type hourlyObjectType = {
    timestamp: number, iconCode: number, temp: number, feelsLike: number, precip: number, windSpeed: number
}

export type HourlyWeatherType = Array<hourlyObjectType>


export type WeatherType = {
    current?: CurrentWeatherType,
    daily?: DailyWeatherType,
    hourly?: HourlyWeatherType
}

export type WeatherDataProps = {
    isDay: boolean,
    setIsDay: (isDay: boolean) => void;
};
