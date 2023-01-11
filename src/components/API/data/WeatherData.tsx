import { useState, useEffect } from 'react';
import { coords, timeZone } from './geolocalization';
import { WeatherType } from '../../../types/weather';
import axios from 'axios';
import Loading from '../loading/Loading';
import HourlyWeather from './hourlyData/HourlyWeather';
import DailyWeather from './dailyData/DailyWeather';
import CurrentWeather from './currentData/CurrentWeather';

import './weatherData.css';

const WeatherData = ({ setIsDay }: { setIsDay: (isDay: boolean) => void }) => {
    const baseUrl = 'https://api.open-meteo.com/v1/forecast';
    const query =
        'hourly=temperature_2m,apparent_temperature,precipitation,weathercode,windspeed_10m&daily=weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,precipitation_sum&current_weather=true&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch&timeformat=unixtime';
    const url = `${baseUrl}?${query}`;
    const { lat, lon } = coords;
    const params = {
        latitude: lat,
        longitude: lon,
        timezone: timeZone,
    };
    const [weatherData, setWeatherData] = useState<
        null | WeatherType | unknown
    >(null);

    useEffect(() => {
        axios
            .get(url, { params: params })
            .then(({ data }) => {
                const parseData = {
                    current: parseCurrentData(data),
                    daily: parseDailyData(data),
                    hourly: parseHourlyData(data),
                };
                setWeatherData(parseData);
            })
            .catch((err) => {
                console.error(err.message);
            });
    }, []);

    function parseCurrentData({ current_weather, daily }: any) {
        const {
            temperature: currentTemp,
            weathercode: weatherCode,
            winddirection: windDirection,
            windspeed: windSpeed,
        } = current_weather;
        const {
            temperature_2m_max: [maxTemp],
            temperature_2m_min: [minTemp],
            apparent_temperature_max: [maxFeelsLike],
            apparent_temperature_min: [minFeelsLike],
            precipitation_sum: [precip],
        } = daily;

        return {
            currentTemp: Math.round(currentTemp),
            highFeelsLike: Math.round(maxFeelsLike),
            highTemp: Math.round(maxTemp),
            iconCode: weatherCode,
            lowFeelsLike: Math.round(minFeelsLike),
            lowTemp: Math.round(minTemp),
            precip: Math.round(precip * 100) / 100,
            windDirection,
            windSpeed,
        };
    }

    function parseDailyData({ daily }: any) {
        return daily.time.map((time: number, index: number) => {
            return {
                timestamp: time * 1000,
                iconCode: daily.weathercode[index],
                maxTemp: Math.round(daily.temperature_2m_max[index]),
            };
        });
    }
    function parseHourlyData({ hourly, current_weather }: any) {
        return hourly.time
            .map((time: number, index: number) => {
                return {
                    timestamp: time * 1000,
                    iconCode: hourly.weathercode[index],
                    temp: Math.round(hourly.temperature_2m[index]),
                    feelsLike: Math.round(hourly.apparent_temperature[index]),
                    windSpeed: Math.round(hourly.windspeed_10m[index]),
                    precip: Math.round(hourly.precipitation[index] * 100) / 100,
                };
            })
            .filter(
                ({ timestamp }: any) => timestamp >= current_weather.time * 1000
            );
    }

    return (
        <>
            {weatherData ? (
                <div>
                    <CurrentWeather weatherData={weatherData} />
                    <DailyWeather weatherData={weatherData} />
                    <HourlyWeather
                        weatherData={weatherData}
                        setIsDay={setIsDay}
                    />
                </div>
            ) : (
                <Loading />
            )}
        </>
    );
};

export default WeatherData;
