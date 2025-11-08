import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://deal-craft-server-theta.vercel.app',
});

const useAxios = () => {
  return axiosInstance;
};

export default useAxios;
