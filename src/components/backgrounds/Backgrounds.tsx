import Night from './Night';
import Day from './Day';

import './backgrounds.css';

type backgroundType = {
    isDay: boolean;
};

const Backgrounds = ({ isDay }: backgroundType) => {
    return <>{isDay ? <Day /> : <Night />}</>;
};

export default Backgrounds;
