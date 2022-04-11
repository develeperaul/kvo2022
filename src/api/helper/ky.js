import ky from "ky";

const serverAPI = ky.create({
  prefixUrl: "http://62.33.236.149/api/v1/",
  timeout: 20000,
});

//проверка
export { serverAPI };
