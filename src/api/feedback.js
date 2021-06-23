import { get, post, put } from "../utilities/api.js";

export default {
    index(param) {
        return get(`/api/feedback${param}`);
      },

      create(data){
        return post("/api/feedback", data);
    },

    exportFeedback(params = {}) {
        return get("/api/feedbacks/export", {
          params: params,
          responseType: "blob"
        });
      },
}