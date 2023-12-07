import axios from "axios";
import * as qs from "qs";

// import { ToastService } from "./toast_service";

// const getToken = () => {
//   const token = localStorage.getItem("token");
//   return `Bearer ${token}`;
// };

const api = axios.create({
  baseURL: "http://localhost:8000/",
});

// api.defaults.headers.common["Authorization"] = getToken();
// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error?.response?.status === 401) {
//       localStorage.removeItem("token");
//       localStorage.removeItem("authUser");
//       // window.location.href = "/login";
//       return Promise.reject(error);
//     }
//     if (error?.response?.data?.error) {
//       ToastService.error(error?.response?.data?.error);
//     }
//     return Promise.reject(error);
//   }
// );

const GET = async (url, data, config = {}) => {
  // api.defaults.headers.common["Authorization"] = getToken();
  return await api
    .get(url, {
      ...config,
      params: data,
      paramsSerializer: (params) => {
        return qs.stringify(params, { arrayFormat: "brackets" });
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return Promise.reject(error);
    });
};

const POST = async (url, data, config = {}) => {
  // api.defaults.headers.common["Authorization"] = getToken();
  return await api
    .post(url, { ...data }, { ...config })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return Promise.reject(error);
    });
};

const POST_FORM_DATA = async (url, data, config = {}) => {
  // api.defaults.headers.common["Authorization"] = getToken();
  return await api
    .post(url, data, { ...config })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return Promise.reject(error);
    });
};

const PATCH = async (url, data, config = {}) => {
  // api.defaults.headers.common["Authorization"] = getToken();
  return await api
    .patch(url, { ...data }, { ...config })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return Promise.reject(error);
    });
};

const PUT = async (url, data, config = {}) => {
  // api.defaults.headers.common["Authorization"] = getToken();
  return api
    .put(url, { ...data }, { ...config })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return Promise.reject(error);
    });
};

const DELETE = async (url, config = {}) => {
  // api.defaults.headers.common["Authorization"] = getToken();
  return await api
    .delete(url, { ...config })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return Promise.reject(error);
    });
};

const ApiService = {
  GET,
  POST,
  POST_FORM_DATA,
  PATCH,
  PUT,
  DELETE,
};

export default ApiService;
