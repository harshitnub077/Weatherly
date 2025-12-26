import { useState, useEffect, useCallback } from 'react';
import { fetchFullWeatherData } from '../lib/weather-service';
import type { WeatherData } from '../lib/weather-service';

export function useWeather(initialLat: number, initialLon: number) {
    const [data, setData] = useState<WeatherData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [location, setLocation] = useState({ lat: initialLat, lon: initialLon });

    const refresh = useCallback(async (lat: number, lon: number) => {
        try {
            setLoading(true);
            const result = await fetchFullWeatherData(lat, lon);
            setData(result);
            setLocation({ lat, lon });
        } catch (err) {
            setError("Atmospheric resonance failure");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        refresh(location.lat, location.lon);
    }, [location.lat, location.lon, refresh]);

    return { data, loading, error, refresh, setLocation };
}
