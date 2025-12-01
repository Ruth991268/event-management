// composables/useApi.ts
export const useApi = () => {
  const getAuthHeaders = (): Record<string, string> => {
    if (process.client) {
      const token = localStorage.getItem('jwt_token');
      if (!token) {
        console.warn('No JWT token found in localStorage');
        return {
          'Content-Type': 'application/json'
        };
      }
      
      console.log('Using token for API call:', token.substring(0, 20) + '...');
      return {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      };
    }
    return {
      'Content-Type': 'application/json'
    };
  };

  const fetchWithAuth = async <T>(url: string, options: RequestInit = {}): Promise<T> => {
    try {
      const headers = getAuthHeaders();
      
      console.log(`Making API call to: ${url}`);
      console.log('Headers:', headers);
      
      const response = await fetch(url, {
        ...options,
        headers: {
          ...headers,
          ...(options.headers || {})
        }
      });

      console.log('Response status:', response.status);
      
      if (!response.ok) {
        let errorData = {};
        try {
          errorData = await response.json();
        } catch {
          // Ignore JSON parse error for non-JSON responses
        }
        
        throw {
          status: response.status,
          statusText: response.statusText,
          data: errorData,
          message: `HTTP error! status: ${response.status}`
        };
      }

      const data = await response.json();
      console.log('API response data:', data);
      return data as T;

    } catch (error: any) {
      console.error(`API Error (${url}):`, error);
      
      if (error?.status === 401) {
        console.log('401 Unauthorized - clearing auth data');
        if (process.client) {
          localStorage.removeItem('jwt_token');
          localStorage.removeItem('user');
          localStorage.removeItem('user_id');
          
          if (window.location.pathname !== '/login') {
            setTimeout(() => {
              window.location.href = '/login';
            }, 1000);
          }
        }
        throw new Error('Session expired. Please log in again.');
      }
      
      throw error;
    }
  };

  return {
    fetchWithAuth,
    getAuthHeaders
  };
};