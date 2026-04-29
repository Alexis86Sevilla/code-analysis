export async function fetchWithHeaders(url, options = {}) {
  const defaultHeaders = {
    'Accept': 'application/vnd.github.v3+json',
    'User-Agent': 'Astro-Code-Analyzer-App',
  };

  const finalOptions = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  };

  const timeout = options.timeout || 10000;
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...finalOptions,
      signal: controller.signal,
    });
    
    clearTimeout(id);
    return response;
  } catch (error) {
    clearTimeout(id);
    throw error;
  }
}
