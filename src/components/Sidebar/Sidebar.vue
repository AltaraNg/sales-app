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
          class="md:min-w-full text-gray-600 text-xs uppercase font-bold block pt-0 pb-4 ml-2 no-underline"
        >
          SideMenu
        </h6>
        <!-- Navigation -->

        <ul class="md:flex-col md:min-w-full flex flex-col list-none">

          <router-link to="/admin/superadmin" v-if="canDo(Manager) && canView==='beta'" >

          <li class="items-center ml-2">
              <div
                class="text-xs uppercase py-3 font-bold block"
                
              >
                <i
                  class="fas fa-chart-line mr-2 text-sm"
                  :class="['text-gray-400']"
                ></i>
                Admin Dashboard
              </div>
          </li>
            </router-link>

            <router-link to="/admin/dashboard" class="hover:bg-gray-400 hover:text-blue-700"> 

          <li class="items-center ml-2">
              <div
                class="text-xs uppercase py-3 font-bold block"
              >
                <i
                  class="fas fa-chart-line mr-2 text-sm"                  
                ></i>
                Dashboard
              </div>
          </li>
            </router-link>

          
          <router-link to="/admin/register" class="hover:bg-gray-400 hover:text-blue-700"
          >
          <li class="items-center ml-2">
            
              <a
                class="text-xs uppercase py-3 font-bold block"
                
              >
                <i
                  class="fas fa-user-plus mr-2 text-sm"
                  
                ></i>
                Register Customer
              </a>
          </li>
            </router-link>


           <router-link to="/admin/dsaratings" class="hover:bg-gray-400 hover:text-blue-700">
          <li class="items-center ml-2">
           
              <a
                class="text-xs uppercase py-3 font-bold block"
              >
                <i
                  class="fas fa-star-half-alt mr-2 text-sm"
                  
                ></i>
                Leaderboard
              </a>
          </li>
            </router-link>

              <router-link to="/calculator" class="hover:bg-gray-400 hover:text-blue-700">
          <li class="items-center ml-2">
            
              <a
                class="text-xs uppercase py-3 font-bold block"
              >
              <i class="fas fa-calculator  mr-2 text-sm"></i>
                Calculator
              </a>
          </li>
            </router-link>


            <router-link to="/admin/todos" class="hover:bg-gray-400 hover:text-blue-700">

          <li class="items-center ml-2 rounded-lg">
              <a
                class="text-xs uppercase py-3 font-bold block"
              >
                <i
                  class="fas fa-clipboard-list mr-2 text-sm"
                  
                ></i>
                Todos
              </a>
          </li>
            </router-link>

            <router-link to="/admin/feedback" v-if="canDo(Manager)" class="hover:bg-gray-400 hover:text-blue-700">

          <li class="items-center ml-2 rounded-lg">
              <a
                class="text-xs uppercase py-3 font-bold block"
              >
                <i
                  class="fas fa-clipboard-list mr-2 text-sm"
                  
                ></i>
                Feedbacks
              </a>
          </li>
            </router-link>

            
            <router-link to="/admin/send_message" v-if="canDo(Manager)" class="hover:bg-gray-400 hover:text-blue-700">
          <li class="items-center ml-2 rounded-lg">
           
              <a
                class="text-xs uppercase py-3 font-bold block"
              >
                <i
                  class="far fa-envelope mr-2 text-sm"
                  
                ></i>
                Send Message
              </a>
          </li>
            </router-link>

             <router-link to="/admin/notifications" class="hover:bg-gray-400 hover:text-blue-700">
          <li class="items-center ml-2 rounded-lg row">
           
              <a
                class="text-xs flex items-center uppercase py-3 font-bold block col"
              >
                <i
                  class="fas fa-bell mr-2 text-sm"
                  
                ></i>
                <div class="flex  w-full justify-between items-center">
              <p> Notification</p>
              <span class="flex h-8 w-8 relative mr-2">
              <span class=" absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" :class="getNotifications.length > 0 ? 'animate-ping' : ''"></span>
              <span class="relative inline-flex items-center justify-center text-white  rounded-full h-8 w-8 bg-red-600"> {{getNotifications ? getNotifications.length : ""}}</span>
              </span>
               </div>
              </a>
          </li>
            </router-link>

            <router-link to="/admin/inactive-prospects" class="hover:bg-gray-400 hover:text-blue-700">
          <li class="items-center ml-2 rounded-lg">
           
              <a
                class="text-xs flex items-center justify-center uppercase py-3 font-bold block"                
              >
                <i
                  class="fas fa-user-circle mr-2 text-sm"
                  
                ></i> 
              <div class="flex  w-full justify-between items-center ">
              <p> Inactive Prospects</p>
              <span class="flex h-8 w-8 relative mr-2">
              <span class=" absolute inline-flex h-full w-full rounded-full bg-yellow-500 opacity-75" :class="getInactiveProspects > 0 ? 'animate-ping' : ''"></span>
              <span class="relative inline-flex items-center justify-center text-white  rounded-full h-8 w-8 bg-yellow-600">{{getInactiveProspects}}</span>
              </span>
               </div>

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


<script>
import { mapGetters } from "vuex";

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
  async mounted() {
    this.canView = localStorage.getItem('flag');
    await this.$prepareNotifications();
    await this.$prepareInactiveProspects();

},
computed: {
    ...mapGetters(['getNotifications', 'getInactiveProspects'])

  },
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
