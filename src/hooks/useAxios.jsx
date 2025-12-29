import axios from "axios";
import React from "react";

//function ar baire korlam,jeno function render hole ar opor kono effect na pore:
const axiosSecure = axios.create({
  baseURL: `http://localhost:3000/`,
});

const useAxios = () => {
  return axiosSecure;
};

export default useAxios;
