import ky from "ky";

const serverAPI = ky.create({
  prefixUrl: process.env.API,
  timeout: 20000
});


//проверка
export { serverAPI, serverGeocodeApi };
