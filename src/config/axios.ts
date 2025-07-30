 
 import axios from 'axios';
import Cookies from 'js-cookie';

const url = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: url,
  // withCredentials: true,
});

// Queue to hold failed requests during token refresh
// let isRefreshing = false;
// let failedQueue: {
//   resolve: (value?: unknown) => void;
//   reject: (reason?: unknown) => void;
// }[] = [];

// const processQueue = (error: Error | null, token: string | null) => {
//   failedQueue.forEach((prom) => {
//     if (error) {
//       prom.reject(error);
//     } else {
//       prom.resolve(token);
//     }
//   });
//   failedQueue = [];
// };

api.interceptors.request.use(
  (config) => {
    const token = Cookies.get('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  // (error: AxiosError) => Promise.reject(error)
);

// api.interceptors.response.use(
//   (response: AxiosResponse) => response,
//   async (error: AxiosError): Promise<AxiosResponse | void> => {
//     const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

//     if (error.response?.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;

//       if (!isRefreshing) {
//         isRefreshing = true;
//         try {
//           const refreshResponse = await axios.post(
//             `${url}/api/v1/auth/users/refresh-token`,
//             {},
//             { withCredentials: true }
//           );

//           const newAccessToken: string = refreshResponse.data.token;
//           Cookies.set('token', newAccessToken, { expires: 1 }); // Store new token

//           processQueue(null, newAccessToken);
//           isRefreshing = false;

//           if (originalRequest.headers) {
//             originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
//           }

//           return await api(originalRequest);
//         } catch (refreshError) {
//           const err = refreshError instanceof Error
//             ? refreshError
//             : new Error('Token refresh failed');

//           processQueue(err, null);
//           isRefreshing = false;

//           // Optional: clear token and redirect
//           Cookies.remove('token');
//           window.location.href = '/login';
//           return Promise.reject(err);
//         }
//       }

//       return new Promise((resolve, reject) => {
//         failedQueue.push({
//           resolve: (token: unknown) => {
//             if (typeof token === 'string' && originalRequest.headers) {
//               originalRequest.headers.Authorization = `Bearer ${token}`;
//             }
//             resolve(api(originalRequest));
//           },
//           reject: (err) => {reject(err instanceof Error ? err : new Error('Queue retry failed'))},
//         });
//       });
//     }

//     return Promise.reject(error instanceof Error ? error : new Error('Unknown error occurred'));
//   }
// );

export default api;
