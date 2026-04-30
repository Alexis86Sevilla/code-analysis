export async function fetchWithHeaders(url, options = {}) {
  const token = import.meta.env.GITHUB_TOKEN;
  const defaultHeaders = {
    'Accept': 'application/vnd.github.v3+json',
    'User-Agent': 'Astro-Code-Analyzer-App',
    ...(token ? { 'Authorization': `token ${token}` } : {}),
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

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const error = new Error(errorData.message || `HTTP error! status: ${response.status}`);
      error.status = response.status;
      throw error;
    }
    
    return response;
  } catch (error) {
    clearTimeout(id);
    throw error;
  }
}
