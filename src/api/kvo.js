import { serverAPI } from "src/api/helper/ky";

export const getKVOList = () => serverAPI("/hazard-identification-cards").json;

export function getkvo(id) {
  return [
    {
      id: 1,
      name: "",
      date: "",
      subdivision: "",
      place: "",
      danger: "",
      measures: "",
      attachments: "",
      status: "",
      comment: "",
    },
    {
      id: 2,
      name: "",
      date: "",
      subdivision: "",
      place: "",
      danger: "",
      measures: "",
      attachments: "",
      status: "",
      comment: "",
    },
  ].find((i) => i.id == id);
}

export function getkvolist() {
  return [
    {
      id: 1,
      name: "",
      date: "",
      subdivision: "",
      place: "",
      danger: "",
      measures: "",
      attachments: "",
      status: "",
      comment: "",
    },
    {
      id: 2,
      name: "",
      date: "",
      subdivision: "",
      place: "",
      danger: "",
      measures: "",
      attachments: "",
      status: "",
      comment: "",
    },
  ];
}
