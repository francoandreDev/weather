import { WeatherType } from '../../../../types/weather';
import { timeZone } from '../geolocalization';
import { getIcon, getIconName, getDescription } from '../icons/icons';
import {
    fahrenheitToCelsius,
    mphToKph,
    roundFahrenheitToCelsius,
} from '../convertUnits';
import Loading from '../../loading/Loading';

import infoCSS from '../info.module.css';
import './currentWeather.css';

const CurrentWeather = ({ weatherData }: { weatherData: WeatherType }) => {
    const current = weatherData?.current;
    return (
        <div className="current-weather">
            <h2
                className={`subtitle ${infoCSS['element-info']} ${infoCSS['middle-bottom']}`}
                text-content={timeZone}
            >
                Today
            </h2>
            {current ? (
                <section className="current">
                    <section
                        className={`${infoCSS['element-info']} ${infoCSS['image-translate']} half-layout`}
                        text-content={`${getDescription(
                            getIconName(current.iconCode)
                        )}`}
                    >
                        <img
                            src={getIcon(getIconName(current.iconCode))}
                            alt="Image"
                            className="icon-weather"
                        />
                        <section className="info">
                            <h2 className="weather-description">
                                {getIconName(current.iconCode)}
                            </h2>
                            <h3
                                className={`${infoCSS['element-info']} ${infoCSS['middle-bottom']}`}
                                text-content="Temp now"
                            >
                                {roundFahrenheitToCelsius(current.currentTemp)}°
                            </h3>
                        </section>
                    </section>
                    <div className="separator"></div>
                    <section className="half-layout">
                        <section className="data">
                            <div className="cell">
                                <h3
                                    className={`${infoCSS['element-info']} ${infoCSS['middle-bottom']}`}
                                    text-content="Max temp"
                                >
                                    High
                                </h3>
                                <h3>
                                    {fahrenheitToCelsius(current.highTemp)}°
                                </h3>
                            </div>
                            <div className="cell">
                                <h3
                                    className={`${infoCSS['element-info']} ${infoCSS['middle-bottom']}`}
                                    text-content="Min temp"
                                >
                                    Low
                                </h3>
                                <h3>{fahrenheitToCelsius(current.lowTemp)}°</h3>
                            </div>
                            <div className="cell">
                                <h3
                                    className={`${infoCSS['element-info']} ${infoCSS['middle-bottom']}`}
                                    text-content="Max feel"
                                >
                                    FL high
                                </h3>
                                <h3>
                                    {fahrenheitToCelsius(current.highFeelsLike)}
                                    °
                                </h3>
                            </div>
                            <div className="cell">
                                <h3
                                    className={`${infoCSS['element-info']} ${infoCSS['middle-bottom']}`}
                                    text-content="Min feel"
                                >
                                    FL low
                                </h3>
                                <h3>
                                    {fahrenheitToCelsius(current.lowFeelsLike)}°
                                </h3>
                            </div>
                            <div className="cell">
                                <h3
                                    className={`${infoCSS['element-info']} ${infoCSS['middle-bottom']}`}
                                    text-content="Direction & Speed"
                                >
                                    Wind
                                    <i
                                        className="fa-solid fa-arrow-up"
                                        style={{
                                            rotate: `calc(${current.windDirection} * 1deg)`,
                                        }}
                                    ></i>
                                </h3>
                                <h3>{mphToKph(current.windSpeed)}km/h</h3>
                            </div>
                            <div className="cell">
                                <h3
                                    className={`${infoCSS['element-info']} ${infoCSS['middle-bottom']}`}
                                    text-content="water falling"
                                >
                                    Precip
                                </h3>
                                <h3>{current.precip * 100}%</h3>
                            </div>
                        </section>
                    </section>
                </section>
            ) : (
                <Loading />
            )}
        </div>
    );
};

export default CurrentWeather;
