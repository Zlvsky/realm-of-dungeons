import { AxiosError } from "axios";
import axiosClient from "../axiosClient";
import Cookies from "js-cookie";

interface RequestConfig {
  url: string;
  params?: any;
  options?: any;
}

interface ResponseData {
  data?: any;
  status?: number;
  statusText?: string;
  headers?: any;
  error?: any;
}

const getRequest = async (config: RequestConfig): Promise<ResponseData> => {
  const jwt = Cookies.get("jwt");
  try {
    const res = await axiosClient.get(config.url, {
      params: config.params,
      ...config.options,
      headers: { authorization: jwt },
    });
    const result: ResponseData = {
      data: res.data,
      status: res.status,
      statusText: res.statusText,
      headers: res.headers,
      error: "",
    };
    return result;
  } catch (err: any) {
    console.log(err);
    const errors = err as AxiosError;
    const result: ResponseData = {
      error: errors.code,
      status: errors.response?.status,
      data: errors.response?.data,
    };
    return result;
  }
};

export default getRequest;
