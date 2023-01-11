import { useState } from 'react';
import WeatherData from '../API/data/WeatherData';
import Backgrounds from '../backgrounds/Backgrounds';

import './app.css';

function App() {
    const [isDay, setIsDay] = useState<boolean>(false);

    return (
        <div
            className="app"
            style={
                isDay
                    ? { color: 'var(--font-color-day)' }
                    : { color: 'var(--font-color-night)' }
            }
        >
            <Backgrounds isDay={isDay} />
            <WeatherData setIsDay={setIsDay} />
        </div>
    );
}

export default App;
