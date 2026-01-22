const API_BASE_URL = process.env.API_BASE_URL;
const API_KEY = process.env.API_KEY;

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
  // Validate environment variables once at module load
  if (!apiConfig.baseUrl || !apiConfig.apiKey) {
    throw new Error(
      'API_BASE_URL and API_KEY environment variables are required'
    );
  }

  return fetch(`${apiConfig.baseUrl}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiConfig.apiKey,
      ...options.headers,
    },
  });
}
