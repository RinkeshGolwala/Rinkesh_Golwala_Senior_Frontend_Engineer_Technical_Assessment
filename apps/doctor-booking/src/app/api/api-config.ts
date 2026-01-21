const API_BASE_URL = process.env.API_BASE_URL;
const API_KEY = process.env.API_KEY;

// Validate environment variables once at module load
if (!API_BASE_URL) {
  throw new Error('API_BASE_URL environment variable is required');
}

if (!API_KEY) {
  throw new Error('API_KEY environment variable is required');
}

export const apiConfig = {
  baseUrl: API_BASE_URL,
  apiKey: API_KEY,
} as const;

/**
 * Helper to make authenticated requests to the external API
 * @param endpoint
 * @param options
 * @returns
 */
export async function makeExternalApiRequest(
  endpoint: string,
  options: RequestInit = {}
): Promise<Response> {
  return fetch(`${apiConfig.baseUrl}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiConfig.apiKey,
      ...options.headers,
    },
  });
}
