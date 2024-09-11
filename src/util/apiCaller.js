import axios from "axios";

const ApiCaller = (
  url,
  method,
  data = {},
  host
) => {
  return axios({  
    url: `${host}${url}`,
    method,
    data,
  });
};

export default ApiCaller;