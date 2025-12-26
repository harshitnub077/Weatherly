const OPENWEATHER_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const GOOGLE_MAPS_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

export interface WeatherData {
    temp: number;
    feels_like: number;
    humidity: number;
    pressure: number;
    wind_speed: number;
    clouds: number;
    description: string;
    name: string;
    lat: number;
    lon: number;
    aqi: number;
    aqi_status: string;
}

export async function searchCities(query: string) {
    // Try Google Maps Places if key is available
    if (GOOGLE_MAPS_KEY) {
        try {
            const response = await fetch(
                `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${query}&types=(cities)&key=${GOOGLE_MAPS_KEY}`
            );
            const data = await response.json();
            if (data.status === 'OK') {
                // We'd need to fetch details for coordinates next, 
                // but for now let's fall back to OpenWeather for simple direct search 
                // to keep logic unified if coordinate extraction is complex via Places without a secondary call.
            }
        } catch (e) {
            console.warn("Google Places fetch failed, falling back to OpenWeather", e);
        }
    }

    if (!OPENWEATHER_KEY) return [];
    try {
        const response = await fetch(
            `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${OPENWEATHER_KEY}`
        );
        return await response.json();
    } catch (error) {
        console.error("Geocoding error:", error);
        return [];
    }
}

export async function fetchFullWeatherData(lat: number, lon: number): Promise<WeatherData> {
    if (!OPENWEATHER_KEY) return getMockData();

    try {
        const [weatherRes, aqiRes] = await Promise.all([
            fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${OPENWEATHER_KEY}&units=metric`),
            fetch(`https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${OPENWEATHER_KEY}`)
        ]);

        const weather = await weatherRes.json();
        const aqiData = await aqiRes.json();

        const aqi = aqiData.list[0].main.aqi;
        const aqiMap: Record<number, string> = {
            1: "Excellent",
            2: "Good",
            3: "Moderate",
            4: "Fair",
            5: "Poor"
        };

        return {
            temp: Math.round(weather.main.temp),
            feels_like: Math.round(weather.main.feels_like),
            humidity: weather.main.humidity,
            pressure: weather.main.pressure,
            wind_speed: Math.round(weather.wind.speed),
            clouds: weather.clouds.all,
            description: weather.weather[0].description,
            name: weather.name,
            lat,
            lon,
            aqi: aqi * 10 + 20,
            aqi_status: aqiMap[aqi] || "Normal"
        };
    } catch (error) {
        console.error("Fetch error:", error);
        return getMockData();
    }
}

function getMockData(): WeatherData {
    return {
        temp: 22,
        feels_like: 23,
        humidity: 50,
        pressure: 1015,
        wind_speed: 10,
        clouds: 20,
        description: "luminous sky",
        name: "Paris",
        lat: 48.8566,
        lon: 2.3522,
        aqi: 25,
        aqi_status: "Excellent"
    };
}
