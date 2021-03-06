import axios from "axios";
import store from "@/store";
export default function createHttp(secured = true) {

    axios.defaults.baseURL="http://localhost:41597/"
    if (secured) {
      return axios.create({
        headers: { "Authorization": `bearer ${store.state.token}` }
      });
    } else {
      return axios.create();
    }
  } 