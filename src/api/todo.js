import { get, post, put } from "../utilities/api.js";

export default {
    index(param) {
        return get(`/api/todo${param}`);
      },

      create(data){
        return post("/api/todo", data);
    },

    
}