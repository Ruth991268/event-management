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
      
      console.log(`📡 API Call: ${options.method || 'GET'} ${url}`);
      
      const response = await fetch(url, {
        ...options,
        headers: {
          ...headers,
          ...(options.headers || {})
        }
      });

      console.log('📡 Response status:', response.status);
      
      // Check if response is OK
      if (!response.ok) {
        let errorData = {};
        try {
          errorData = await response.json();
        } catch {
          // Ignore JSON parse error for non-JSON responses
        }
        
        const error = {
          status: response.status,
          statusText: response.statusText,
          data: errorData,
          message: `HTTP error! status: ${response.status}`
        };
        console.error('❌ API Error:', error);
        throw error;
      }

      // Try to parse as JSON
      try {
        const data = await response.json();
        console.log('✅ API Response:', data);
        
        // Check if it's an array or object
        if (Array.isArray(data)) {
          console.log(`📊 Received array with ${data.length} items`);
        }
        
        return data as T;
      } catch (e) {
        console.error('❌ Failed to parse JSON response');
        throw new Error('Invalid JSON response from server');
      }

    } catch (error: any) {
      console.error(`❌ API Error (${url}):`, error);
      
      // Handle 401 Unauthorized
      if (error?.status === 401) {
        console.log('🔐 401 Unauthorized - clearing auth data');
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

  // Convenience methods
  const get = async <T>(url: string, params?: Record<string, any>): Promise<T> => {
    let urlWithParams = url;
    if (params) {
      const searchParams = new URLSearchParams();
      Object.keys(params).forEach(key => {
        if (params[key] !== undefined && params[key] !== null) {
          searchParams.append(key, params[key].toString());
        }
      });
      const queryString = searchParams.toString();
      if (queryString) {
        urlWithParams = `${url}?${queryString}`;
      }
    }
    
    return fetchWithAuth<T>(urlWithParams, { 
      method: 'GET'
    });
  };

  const post = async <T>(url: string, body?: any): Promise<T> => {
    return fetchWithAuth<T>(url, { 
      method: 'POST',
      body: body ? JSON.stringify(body) : undefined
    });
  };

  const put = async <T>(url: string, body: any): Promise<T> => {
    return fetchWithAuth<T>(url, { 
      method: 'PUT',
      body: JSON.stringify(body)
    });
  };

  const del = async <T>(url: string): Promise<T> => {
    return fetchWithAuth<T>(url, { 
      method: 'DELETE'
    });
  };

  // Other helper methods remain the same...
  const getCurrentUser = () => {
    if (process.client) {
      const userStr = localStorage.getItem('user');
      if (userStr && userStr !== 'undefined' && userStr !== 'null') {
        try {
          return JSON.parse(userStr);
        } catch (e) {
          console.error('Error parsing user data:', e);
          return null;
        }
      }
    }
    return null;
  };

  return {
    fetchWithAuth,
    get,
    post,
    put,
    del,
    getCurrentUser
  };
};