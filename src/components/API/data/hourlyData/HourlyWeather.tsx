import { WeatherType } from '../../../../types/weather';
import { getDescription, getIcon, getIconName } from '../icons/icons';
import { timeZone } from '../geolocalization';
import { useEffect } from 'react';
import {
    dayFormatter,
    fahrenheitToCelsius,
    hourFormatter,
    mphToKph,
} from '../convertUnits';

import infoCSS from '../info.module.css'
import './hourlyWeather.css';

const HourlyWeather = ({
    weatherData,
    setIsDay,
}: { weatherData: WeatherType } & { setIsDay: (idDay: boolean) => void }) => {
    const hourly = weatherData?.hourly;

    useEffect(() => {
        if (hourly) {
            const currentHour = hourly[0]?.timestamp;
            const currentHourFormat = hourFormatter.format(currentHour);
            const hour = parseInt(currentHourFormat.slice(0, -2));
            const meridian = currentHourFormat.slice(-2);
            let isDay = false;
            if (meridian === 'AM') {
                isDay = hour >= 6 && hour < 12;
                if(hour === 12) isDay=false;
            } else if (meridian === 'PM') {
                isDay = hour <= 7 && hour > 0;
                if(hour === 12) isDay=true;
            }
            setIsDay(isDay);
        }
    }, [hourly]);

    return (
        <div className="hourly-weather">
            <h2
                className={`subtitle ${infoCSS['element-info']} ${infoCSS['middle-bottom']}`}
                text-content={timeZone}
            >
                Hourly
            </h2>
            <section className="data-weather-container">
                {hourly?.map((hour, index) => {
                    const iconName = getIconName(hour?.iconCode);
                    const iconImage = getIcon(iconName);
                    const weekDay = dayFormatter.format(hour?.timestamp);
                    const hourDay = hourFormatter.format(hour?.timestamp);
                    const temp = fahrenheitToCelsius(hour?.temp);
                    const feelsLikeTemp = fahrenheitToCelsius(hour?.feelsLike);
                    const precipitation = hour?.precip;
                    const wind = mphToKph(hour?.windSpeed);

                    return (
                        <article
                            className="hour-weather"
                            key={`${hour} ${index}`}
                        >
                            <div>
                                <span className="inline-hours">
                                    <p>{weekDay}</p>
                                    <p>{hourDay}</p>
                                </span>
                                <span
                                    className={`inline-hours container-image ${infoCSS['element-info']} ${infoCSS['middle-middle']}`}
                                    text-content={getDescription(iconName)}
                                >
                                    <img
                                        src={iconImage}
                                        alt={iconName}
                                        width="20px"
                                    ></img>
                                </span>
                                <span className="inline-hours">
                                    <p
                                        className={`${infoCSS['element-info']} ${infoCSS['middle-bottom']}`}
                                        text-content="Max temp"
                                    >
                                        Temp
                                    </p>
                                    <p>{temp}°</p>
                                </span>
                                <span className="inline-hours">
                                    <p
                                        className={`${infoCSS['element-info']} ${infoCSS['middle-bottom']}`}
                                        text-content="Max feel"
                                    >
                                        FL temp
                                    </p>
                                    <p>{feelsLikeTemp}°</p>
                                </span>
                                <span className="inline-hours">
                                    <p
                                        className={`${infoCSS['element-info']} ${infoCSS['middle-bottom']}`}
                                        text-content="Speed"
                                    >
                                        Wind
                                    </p>
                                    <p>{wind} km/h</p>
                                </span>
                                <span className="inline-hours">
                                    <p
                                        className={`${infoCSS['element-info']} ${infoCSS['middle-bottom']}`}
                                        text-content="Water falling"
                                    >
                                        Precip
                                    </p>
                                    <p>{precipitation}%</p>
                                </span>
                            </div>
                        </article>
                    );
                })}
            </section>
        </div>
    );
};

export default HourlyWeather;
