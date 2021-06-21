import { get, post, put } from "../utilities/api";

export default {
  index(param) {
    return get(`/api/customer_contact${param}`);
  },

  exportCustomers(params = {}) {
    return get("/api/contact-customer/export", {
      params: params,
      responseType: "blob"
    });
  },
  customerStage(){
      return get("/api/customer_stage");
  },

  employmentStatus(){
      return get("/api/employment_status");
  },

  create(data){
      return post("/api/customer_contact", data);
  },
  update(data, id){
    return put(`/api/customer_contact/${id}`, data);
  }  
  
};
