import axios from "axios";
class ServerCall {
  static fnSendGetReq(url) {
    return axios.get(BASE_URL + url, {
      headers: {
        Authorization: sessionStorage.token,
      },
    });
  }
  static fnSendPostReq(url, data) {
    return axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}${url}`, data);
  }
}

export default ServerCall;
