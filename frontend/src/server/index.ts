
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse} from 'axios';


interface IRequestConfig extends AxiosRequestConfig{
onFaiture?:(error: AxiosError) =>void;
onSuccess?:(response: AxiosResponse) => void;
}


const api = axios.create({
  baseURL:'http://localhost:3000',
});
const refreshSubscribe : Array <(token:string)=> void>=[];
let failedRequest: Array<IRequestConfig> =[];

api.interceptors.request.use((config) =>{
const token = localStorage.getItem('token:semana-heroi')
if(token){
config.headers.Authorization = 'Bearer ${token}';
}
return config;
});


api.interceptors.response.use(
 (response)=>response,
  async (error: AxiosError |unknown)=>{
    const  originalRequest = (error as AxiosError).config as IRequestConfig;
  if(error instanceof AxiosError && error.response?.status== 401){
    if(error.response.data && error.response?.data.code == 'token.expired'
    ){
try {
  const refresh = localStorage.getItem('refresh_token:semana-heroi',);
const response = await api.post('/refresh',{
  refresh_token:refresh,
});

const {token, refresh_token} = response.data;
localStorage.setItem('token:semana-heroi', token);
localStorage.setItem('refresh-token:semana-heroi', refresh_token);

authRefreshd(token);
if (originalRequest?.headers){
  originalRequest.headers.Authorization='Bearer ${token}';
}

  return axios(originalRequest);
} catch (error) {
  failedRequest.forEach((request)=>{
    request.onFaiture?.(error as AxiosError)
  });
  failedRequest=[];
}   
}
  }else{
    localStorage.removeItem('token:semana-heroi');
    localStorage.removeItem('refles_token:semana-heroi');
    localStorage.removeItem('user:semana-heroi');
  }
return Promise.reject(error);
  },
);

function authRefreshd(token:string){
  refreshSubscribe.forEach((callback)=> callback(token));
}


export {api};