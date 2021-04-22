<template>
  <div>
    <div>
      <sidebar />
      <br />
      <div class="contents md:hidden relative">
        <div class="altaraBlue">
          <!-- <div class="flex flex-row ...">
          <div>1</div>
          <div>2</div>
          <div>3</div>
        </div> -->
          <div class="flex justify-around">
            <div>
              <div class="flex flex-col ...">
                <br />
                <br />

                <div>
                  <div
                    :style="{ background: generateRandomColor() }"
                    class="text-center text-white text-5xl rounded-full mt-11 mb-5 h-20 w-20 flex items-center justify-center"
                  >
                    A
                  </div>
                </div>
                <div class="ml-2 h-20 w-16 bg-white"></div>
              </div>
            </div>
            <div>
              <div class="flex flex-col ...">
                <div>
                  <div
                    :style="{ background: generateRandomColor() }"
                    class="text-center text-white text-5xl rounded-full mt-11 mb-5 h-20 w-20 flex items-center justify-center"
                  >
                    A
                  </div>
                </div>
                <div class="ml-2 h-32 w-16 bg-white"></div>
              </div>
            </div>
            <div>
              <div class="flex flex-col ...">
                <div>
                  <br />
                  <br />
                  <br />

                  <div
                    :style="{ background: generateRandomColor() }"
                    class="text-center text-white text-5xl rounded-full mt-11 mb-5 h-20 w-20 flex items-center justify-center"
                  >
                    A
                  </div>
                </div>

                <div class="ml-2 h-14 w-16 bg-white"></div>
              </div>
            </div>
          </div>

          <div class="text-center mt-5 mb-10 text-white text-base text-white">
            Total Registered : {{getTotalRegistered}}
          </div>

          <div
            class="bg-white text-xs font-bold uppercase px-5 py-3 rounded-t-lg block leading-normal"
          ></div>
        </div>
        <div class="px-3">
          <div class="customerTile">
            <div class="flex justify-between">
              <div class="flex flex-row ...">
                <div
                  class="mt-3 text-center altaraBlue text-white text-xs mr-4 rounded-full h-5 w-5 flex items-center justify-center"
                >
                  1
                </div>
                <div
                  :style="{ background: generateRandomColor() }"
                  class="text-center text-white text-xl mr-4 rounded-full h-10 w-10 flex items-center justify-center"
                >
                  A
                </div>
                <div class="self-center font-medium mb-3">
                  Abiola Oluwajuwon
                </div>
              </div>

              <div class="flex flex-col">
                <div class="text-xs">Registered</div>
                <div class="text-2xl">124</div>
              </div>
            </div>
          </div>
          <div class="customerTile">
            <div class="flex justify-between">
              <div class="flex flex-row ...">
                <div
                  class="mt-3 text-center altaraBlue text-white text-xs mr-4 rounded-full h-5 w-5 flex items-center justify-center"
                >
                  2
                </div>
                <div
                  :style="{ background: generateRandomColor() }"
                  class="text-center text-white text-xl mr-4 rounded-full h-10 w-10 flex items-center justify-center"
                >
                  J
                </div>
                <div class="self-center font-medium mb-3">John Doe</div>
              </div>

              <div class="flex flex-col">
                <div class="text-xs">Registered</div>
                <div class="text-2xl">120</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="hidden md:contents relative">
        <div class="md:ml-56 bg-white">
          <div class="px-4 md:pl-10">
            <div class="altaraBlue">
              <!-- <div class="flex flex-row ...">
          <div>1</div>
          <div>2</div>
          <div>3</div>
        </div> -->
              <div class="flex justify-around" v-if="sortedAgents.length > 0">
                <div>
                  <div class="flex flex-col ...">
                    <br />
                    <br />

                    <div>
                      <div
                        :style="{ background: generateRandomColor() }"
                        class="text-center text-white text-5xl rounded-full mt-11 mb-5 h-20 w-20 flex items-center justify-center"
                      >
                         {{sortedAgents[1].full_name[0]}}
                      </div>
                    </div>
                    <div class="ml-2 h-20 w-16 bg-white"></div>
                  </div>
                </div>
                <div>
                  <div class="flex flex-col ...">
                    <div>
                      <div
                        :style="{ background: generateRandomColor() }"
                        class="text-center text-white text-5xl rounded-full mt-11 mb-5 h-20 w-20 flex items-center justify-center"
                      >
                        {{sortedAgents[0].full_name[0]}}
                      </div>
                    </div>
                    <div class="ml-2 h-32 w-16 bg-white"></div>
                  </div>
                </div>
                <div>
                  <div class="flex flex-col ...">
                    <div>
                      <br />
                      <br />
                      <br />

                      <div
                        :style="{ background: generateRandomColor() }"
                        class="text-center text-white text-5xl rounded-full mt-11 mb-5 h-20 w-20 flex items-center justify-center"
                      >
                         {{sortedAgents[2].full_name[0]}}
                      </div>
                    </div>

                    <div class="ml-2 h-14 w-16 bg-white"></div>
                  </div>
                </div>
              </div>

              <div
                class="text-center mt-5 mb-10 text-white text-base text-white"
              >
                Total Registered : {{totalRegistered}}
              </div>

              <div
                class="bg-white text-xs font-bold uppercase px-5 py-3 rounded-t-lg block leading-normal"
              ></div>

              <div class="w-full lg:w-2/12 xl:w-3/12 bg-white">
                <div class="relative w-50 mb-3">
                  <label class="block uppercase text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-password">
                    Select Option
                    </label>
                <select
                    v-model="option"
                    @change="changeOrder()"
                    name="dsa_order"
                    class="mx-input"
                  >
                    <option disabled selected="selected">
                      Select sorting option
                    </option>
                    <option value="total">
                      Total
                    </option>
                    <option value="purchased">
                      Purchased
                    </option>
                    <option value="affidavit">
                      Affidavit
                    </option>
                    <option value="registered">
                      Registered
                    </option>
                  </select>
                </div>
              </div>
            </div>
            <table class="items-center w-full bg-transparent border-collapse">
              <thead>
                <tr>
                  <th
                    class="px-6 altaraBlue text-white align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left"
                  >
                    S/N
                  </th>
                  <th
                    class="px-6 altaraBlue text-white align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left"
                  >
                    Name
                  </th>
                  <th
                    class="px-6 altaraBlue text-white align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left"
                  >
                    Total Contacted
                  </th>
                  <th
                    class="px-6 altaraBlue text-white align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left"
                  >
                    Registered on Portal
                  </th>
                  <th
                    class="px-6 altaraBlue text-white align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left"
                  >
                    Affidavit
                  </th>

                  <th
                    class="px-6 altaraBlue text-white align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left"
                  >
                    Purchased
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-if="sortedAgents.length > 0"
                  class="pointer"
                  :key="index"
                  v-for="(user, index) in sortedAgents"
                  :style="
                    index % 2 === 0
                      ? { 'background-color': 'white' }
                      : { 'background-color': '#F3F4F6' }
                  "
                >
                  <th
                    class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4 text-left"
                  >
                    <div
                      class="altaraBlue rounded-full text-center pt-1 h-6 w-6 text-white"
                    >
                      {{ index + OId + 1}}
                    </div>
                  </th>
                  <th
                    class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4 text-left"
                  >
                    {{ user.full_name || "" }}
                  </th>
                  <th
                    class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4 text-left"
                  >
                    {{ user.total }}
                  </th>
                  <td
                    class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4"
                  >
                    {{ user.registered }}
                  </td>
                  <td
                    class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4"
                  >
                    {{ user.affidavit }}
                  </td>

                  <td
                    class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4 font-bold"
                  >
                    {{ user.purchased }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Sidebar from "@/components/Sidebar/Sidebar.vue";
import { get, post } from "../../utilities/api";

export default {
  data() {
    return {
      apiURLs: {
        getDSAs: `/api/get-users?role=18&stats=true`,
      },
      agents: [],
      OId: 0,
      sortedAgents: [],
      totalRegistered: 0,
      option: 'purchased'
    };
  },
  components: {
    Sidebar,
  },
  async created() {
    await this.getAgents();
    this.changeOrder();
    this.totalRegistered = this.getTotalRegistered();

  },
  methods: {
    generateRandomColor() {
      return "#" + Math.floor(Math.random() * 16777215).toString(16);
    },
    
    getTotalRegistered(){
      if(this.agents.length > 0){
        let total = 0;
        this.agents.forEach((item) => {
          total += item.total
        });

        return total;
      

      }
    },
    changeOrder(){
      this.sortedAgents = this.agents.sort((a,b) => {
        return b[this.option] - a[this.option]
      });

      
    },

    

    async getAgents() {
      try {
        const agents = await get(this.apiURLs.getDSAs);
        this.agents = agents.data.data.data;
      } catch (err) {
        this.$displayErrorMessage(err);
      }
    },
  },
};
</script>











