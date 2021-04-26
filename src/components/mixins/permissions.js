const permissions = {
  data() {
    return {
      DSA: [18],
      DSACaptain: [17],
      Coordinator: [32],
      Manager: [1, 2, 8, 9],
      role_id: parseInt(localStorage.getItem("role"))
    };
  },
  methods: {
    canDo(role) {
      return role.includes(this.role_id);
    }
  }
};
export default permissions;
