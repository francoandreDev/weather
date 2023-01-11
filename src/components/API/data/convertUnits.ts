export function fahrenheitToCelsius(fahrenheit: number): number {
    const celsius = ((fahrenheit - 32) * 5) / 9;
    const roundCelsius = Math.round(celsius);
    return roundCelsius;
}

export function roundFahrenheitToCelsius(fahrenheit: number): number {
    const celsius = ((fahrenheit - 32) * 5) / 9;
    const roundCelsius = Math.round(celsius * 100) / 100;
    return roundCelsius;
}

export function mphToKph(mph: number): number {
    return Math.round(mph * 1.60934);
}

export const dayFormatter = new Intl.DateTimeFormat("en-US", { weekday: "long" })
export const hourFormatter = new Intl.DateTimeFormat("en-US", { hour: "numeric" })