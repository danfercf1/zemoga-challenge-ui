import axios from "axios";

export default axios.create({
  baseURL: "https://1s3k18bo01.execute-api.us-east-2.amazonaws.com/prod",
  headers: {
    "Content-type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
  withCredentials: false,
});
