let lat = null, lon = null

const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
};

function success(pos: any) {
    const crd = pos.coords;
    lat = crd.latitude;
    lon = crd.longitude;
}

function error(err: any) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
}

navigator.geolocation.getCurrentPosition(success, error, options);

if (lat === null) lat = '-12.04'
if (lon === null) lon = '-77.05'

const coords = { lat: lat, lon: lon }

const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

export { coords, timeZone }