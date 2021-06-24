const permissions = {
  data() {
    return {
      DSA: [18, 44, 45],
      DSACaptain: [17, 46 ],
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
