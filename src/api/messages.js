import { api } from "src/api/helper/ky";
const server = api.create;
//список сообщений
export const getMessages = (isRead) =>
  server(`hazard-identification-card-notifications?isRead=${isRead}`).json();
//получение списка с помощью пагинации
export const getMessagesPaginate = ({ isRead, page }) =>
  server(
    `hazard-identification-card-notifications?isRead=${isRead}&page=${page}`
  ).json();
//количество непрочитанных сообщений
export const totalMessages = () =>
  server(
    "hazard-identification-card-notifications/total-count?isRead=0"
  ).json();

//карточка сообщений
export const getMessage = (notification) =>
  server(`hazard-identification-card-notifications/${notification}`).json();
//отметить прочитанным
export const markAsRead = (notification) =>
  server
    .post(
      `hazard-identification-card-notifications/${notification}/mark-as-read`
    )
    .json();
