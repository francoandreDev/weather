import cloud from '../../../../assets/cloud.svg';
import cloudBolt from '../../../../assets/cloudBolt.svg';
import cloudShowersHeavy from '../../../../assets/cloudShowersHeavy.svg';
import cloudSun from '../../../../assets/cloudSun.svg';
import smog from '../../../../assets/smog.svg';
import snowflake from '../../../../assets/snowflake.svg';
import sun from '../../../../assets/sun.svg';
import { ICON_MAP } from '../iconMap';

export const icons: any = {
    cloud,
    cloudBolt,
    cloudShowersHeavy,
    cloudSun,
    smog,
    snowflake,
    sun,
};

export function getIcon(iconName: string = 'sun') {
    const icon = icons[`${iconName}`];
    return icon;
}

export function getIconName(iconCode: number = 0): string {
    const iconName = ICON_MAP.get(iconCode);
    return iconName;
}

export function getDescription(iconName: string = 'sun') {
    let messageDescription = ''
    switch (iconName) {
        case 'cloud': messageDescription = 'Cloudy Sky'; break;
        case 'cloudBolt': messageDescription = 'Clouds of Storm'; break;
        case 'cloudShowersHeavy': messageDescription = 'Dark Rain Clouds'; break;
        case 'cloudSun': messageDescription = 'Cloudy with Clear Intervals'; break;
        case 'smog': messageDescription = 'Mist'; break;
        case 'snowflake': messageDescription = 'Snowing'; break;
        case 'sun': messageDescription = 'Clear sky'; break;
        default: break;
    }
    return messageDescription;
}