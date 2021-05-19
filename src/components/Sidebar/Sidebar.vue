<template>
  <nav
    class=" md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-no-wrap md:overflow-hidden shadow-xl bg-white flex flex-wrap items-center justify-between relative md:w-64 z-10 py-4 px-2"
  >
    <div
      class="md:flex-col md:items-stretch md:min-h-full md:flex-no-wrap px-0 flex flex-wrap items-center justify-between w-full mx-auto"
    >
      <!-- Toggler -->
      <button
        class="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
        type="button"
        v-on:click="toggleCollapseShow('bg-white m-2 py-3 px-6')"
      >
        <i class="fas fa-bars"></i>
      </button>
      <!-- Brand -->
      <!-- <img class="logoResize" :src="altaraLogo" alt="..." /> -->
      <!-- Collapse -->
      <div
        class="md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded "
        v-bind:class="collapseShow"
      >
        <!-- Collapse header -->
        <div
          class="md:min-w-full md:hidden block pb-4 mb-4 border-b border-solid border-gray-300"
        >
          <div class="flex flex-wrap">
            <div class="w-6/12">
              <img class="logoResize" :src="altaraLogo" alt="..." />
            </div>
            <div class="w-6/12 flex justify-end">
              <button
                type="button"
                class="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
                v-on:click="toggleCollapseShow('hidden')"
              >
                <i class="fas fa-times"></i>
              </button>
            </div>
          </div>
        </div>

        <h6
          class="md:min-w-full text-gray-600 text-xs uppercase font-bold block pt-1 pb-4 no-underline"
        >
          SideMenu
        </h6>
        <!-- Navigation -->

        <ul class="md:flex-col md:min-w-full flex flex-col list-none">

          <router-link to="/admin/superadmin" v-if="canDo(Manager) && canView==='beta'">

          <li class="items-center ml-2">
              <div
                class="text-xs uppercase py-3 font-bold block"
                :class="['text-gray-800 hover:text-gray-600']"
              >
                <i
                  class="fas fa-chart-line mr-2 text-sm"
                  :class="['text-gray-400']"
                ></i>
                Admin Dashboard
              </div>
          </li>
            </router-link>

            <router-link to="/admin/dashboard">

          <li class="items-center ml-2">
              <div
                class="text-xs uppercase py-3 font-bold block"
                :class="['text-gray-800 hover:text-gray-600']"
              >
                <i
                  class="fas fa-chart-line mr-2 text-sm"
                  :class="['text-gray-400']"
                ></i>
                Dashboard
              </div>
          </li>
            </router-link>

          
          <router-link to="/admin/register"
          >
          <li class="items-center ml-2">
            
              <a
                class="text-xs uppercase py-3 font-bold block"
                :class="['text-gray-800 hover:text-gray-600']"
              >
                <i
                  class="fas fa-user-plus mr-2 text-sm"
                  :class="['text-gray-400']"
                ></i>
                Register Customer
              </a>
          </li>
            </router-link>


           <router-link to="/admin/dsaratings">
          <li class="items-center ml-2">
           
              <a
                class="text-xs uppercase py-3 font-bold block"
                :class="['text-gray-800 hover:text-gray-600']"
              >
                <i
                  class="fas fa-star-half-alt mr-2 text-sm"
                  :class="['text-gray-400']"
                ></i>
                Leaderboard
              </a>
          </li>
            </router-link>


            <router-link to="/admin/todos">

          <li class="items-center ml-2 rounded-lg">
              <a
                class="text-xs uppercase py-3 font-bold block"
                :class="['text-gray-800 hover:text-gray-600']"
              >
                <i
                  class="fas fa-clipboard-list mr-2 text-sm"
                  :class="['text-gray-400']"
                ></i>
                Todos
              </a>
          </li>
            </router-link>

            <router-link to="/admin/send_message">
          <li class="items-center">
           
              <a
                class="text-xs uppercase py-3 font-bold block"
                :class="['text-gray-800 hover:text-gray-600']"
              >
                <i
                  class="far fa-envelope mr-2 text-sm"
                  :class="['text-gray-400']"
                ></i>
                Send Message
              </a>
          </li>
            </router-link>

          <br />
          <li class="absolute bottom-0 ml-2 ">
            <div v-on:click="logOut()">
              <a
                class="text-xs uppercase py-3 font-bold block"
                :class="['text-gray-800 hover:text-gray-600']"
              >
                <i
                  class="fas fa-sign-out-alt mr-2 text-sm"
                  :class="['text-gray-400']"
                ></i>
                logout
              </a>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <!-- Pin to bottom left corner -->
  </nav>
</template>
); }

<script>
import altaraLogo from "@/assets/img/altaraLogo.png";
import permissions from '../mixins/permissions';

export default {
  mixins: [permissions],
  data() {
    return {
      collapseShow: "hidden",
      altaraLogo,
      canView: ''
    };
  },
  methods: {
    toggleCollapseShow: function (classes) {
      this.collapseShow = classes;
    },

    logOut() {
      localStorage.removeItem("api_token");
      this.$router.push("/auth/login");
    },
  },
  components: {},
  mounted() {
    this.canView = localStorage.getItem('flag');
}
};
</script>
<style>
.active{
  background: #094a73;  
}
.active div{
   border-radius: 0.125rem;
  color: #fff;
}

.active a{
  border-radius: 0.125rem;
  color: #fff;
}

.active i{
  color: #fff;
}
</style>
