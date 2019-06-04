import axios from "axios";

const instance = axios.create({
  baseURL: "https://react-my-burger-fb031.firebaseio.com/" //must use .json for firebase
});

export default instance;
