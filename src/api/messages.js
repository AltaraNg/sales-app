import { get, post, put } from "../utilities/api";

export default {
  index(param) {
    return get(`/api/message${param}`);
  },
  create(data){
      return post("/api/message", data);
  },
  update(data, id){
    return put(`/api/message/${id}`, data);
  }  
  
};
