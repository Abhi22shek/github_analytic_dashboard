import { LoaderCircle } from "lucide-react";

const CACHE_PREFIX = 'github-analytics_';
const CACHE_DURATION = 5 * 60 * 1000;

export const cacheService = {
    set: (key,value,duration = CACHE_DURATION) => {
        const cacheKey = `${CACHE_PREFIX} ${key} `
        const cacheData = {
            value,
            timestamp: Date.now(),
            duration
        };
        localStorage.setItem(cacheKey, JSON.stringify(cacheData));
    },
    get:(key) => {
        const cacheKey = `${CACHE_PREFIX} ${key} `;
        const cached = localStorage.getItem(cacheKey);

        if(!cached) return null;

        const {value,timestamp,duration} = JSON.parse(cached);

        if(Date.now() - timestamp > duration){
            localStorage.removeItem(cacheKey);
            return null;
        }
        return value;
    },

    remove:(key) => {
        const cacheKey = `${CACHE_PREFIX} ${key} `;
        localStorage.removeItem(cacheKey);
    },

    clear: () => {
        object.keys(localStorage).forEach(key => {
            if(key.startsWith(CACHE_PREFIX)) {
                localStorage.removeItem(key);
            }
        })
    }
}
