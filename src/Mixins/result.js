export default{
      data() {
    return {
      id: this.$route.params.name,
    };
  },
  computed: {
    toggleColor() {
      let color = "";
      let selectDownpayment = this.selectedDownpayment?.percent
      switch (selectDownpayment) {
        case 20:
          color = "bg-blue-300";
          break;
        case 40:
          color = "bg-red-300 ";
          break;
        case 60:
          color = "bg-green-300 ";
          break;
        case 80:
          color = "bg-yellow-300 ";
          break;
        default:
          color = "bg-gray-400 ";
      }
      return color;
    },
    toggletextColor() {
      let color = "";
     let selectDownpayment = this.selectedDownpayment?.percent;
      switch (selectDownpayment) {
        case 20:
          color = "text-blue-500";
          break;
        case 40:
          color = "text-red-500 ";
          break;
        case 60:
          color = "text-green-500 ";
          break;
        case 80:
          color = "text-yellow-500 ";
          break;
        default:
          color = "text-gray-400 ";
      }
      return color;
    },
  
  },
    props: {
    downPaymentRates: {
      type: Array,
      required: true,
    },
    getResultMobile: {
      type: Function,
      required: true,
    },
    selectedDownpayment: {
      type: null,
      function: true,
    },
    computedGetCalc: {
      type: Array,
      required: true,
    },
  },
    methods: {
  
    toggleDownpaymentColor(downpayments) {
      let color = "";
      let selectDownpayment = downpayments?.percent;
      switch (selectDownpayment) {
        case 20:
          color = "lg:bg-blue-100 bg-blue-500";
          break;
        case 40:
          color = "lg:bg-red-100 bg-red-500";
          break;
        case 60:
          color = "lg:bg-green-100 bg-green-500";
          break;
        case 80:
          color = "lg:bg-yellow-100 bg-yellow-500";
          break;
        default:
          color = "lg:bg-gray-100 bg-gray-500";
      }
      return color;
    },
  },
}