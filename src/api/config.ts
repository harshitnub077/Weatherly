export const API_CONFIG = {

    BASE_URL: "https://api.openweathermap.org/geo/1.0/direct",
    GEO: "https://api.openweathermap.org/geo/1.0/reverse",
    API_KEY: import.meta.env.VITE_OPENWEATHER_API_KEY,
    DEFAULT_PARAMS: {
        units: "metric",
        appid: import.meta.env.VITE_OPENWEATHER_API_KEY,
    }

}