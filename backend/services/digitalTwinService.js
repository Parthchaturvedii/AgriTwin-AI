import api from "./api";

export const getDigitalTwin = async () => {
  const { data } = await api.get("/digital-twin");
  return data;
};