import { WeatherType } from '../../../../types/weather';
import { dayFormatter, fahrenheitToCelsius } from '../convertUnits';
import { getDescription, getIcon, getIconName } from '../icons/icons';
import { timeZone } from '../geolocalization';

import infoCSS from '../info.module.css';
import './dailyWeather.css';

const DailyWeather = ({ weatherData }: { weatherData: WeatherType }) => {
    const daily = weatherData?.daily;
    return (
        <div className="daily-weather">
            <h2
                className={`subtitle ${infoCSS['element-info']} ${infoCSS['middle-bottom']}`}
                text-content={timeZone}
            >
                Week
            </h2>
            <section className="week-grid">
                {daily?.map((day, index) => {
                    const iconName = getIconName(day.iconCode);
                    const iconImage = getIcon(iconName);
                    const weekDay = dayFormatter.format(day.timestamp);
                    const temp = fahrenheitToCelsius(day.maxTemp);
                    const getRelativeDate = () => {
                        switch (index) {
                            case 0:
                                return 'Today';
                            case 1:
                                return 'Tomorrow';
                            default:
                                return `+${index} days`;
                        }
                    };

                    return (
                        <article
                            className={`day-weather card ${infoCSS['element-info']} ${infoCSS['card-translate-1']}`}
                            text-content={getRelativeDate()}
                            key={`${day} ${index}`}
                        >
                            <div
                                className={`${infoCSS['element-info']} ${infoCSS['card-translate-2']}`}
                                text-content={getDescription(iconName)}
                            >
                                <img src={iconImage} alt={iconName}></img>
                            </div>
                            <p>{weekDay}</p>
                            <p
                                className={`${infoCSS['element-info']} ${infoCSS['right-bottom']}`}
                                text-content="Max temp"
                            >
                                {temp}°
                            </p>
                        </article>
                    );
                })}
            </section>
        </div>
    );
};

export default DailyWeather;
