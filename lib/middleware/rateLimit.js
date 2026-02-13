const requestStore = new Map();

export function rateLimit(options = {}){
    const {
        windowMs = 15* 60 * 1000, // 15 minutes in milliseconds
        maxRequests = 5,
        message = "Too many requests, please try again later."
    } = options;

    return async function (request) {
        const ip = request.headers.get("x-forwarded-for")?.split(",")[0] ||
                   request.headers.get("x-real-ip") ||
                   "unknown";

        const now = Date.now();

        if (!requestStore.has(ip)) {
            requestStore.set(ip,[]);
        }
        const requests = requestStore.get(ip);

        const recentRequests = requests.filter(timestamp => now - timestamp < windowMs);

        if (recentRequests.length >= maxRequests) {
            return {
                limited: true,
                message: message,
                retryAfter: Math.ceil((recentRequests[0] + windowMs - now) / 1000)
            }
        }

        recentRequests.push(now);
        requestStore.set(ip, recentRequests);

        return {limited: false};
    }
}