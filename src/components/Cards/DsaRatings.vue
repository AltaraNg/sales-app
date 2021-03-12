<template>
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
          Total Registered : 517
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
              <div class="self-center font-medium mb-3">Abiola Oluwajuwon</div>
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
    <div class="hidden md: contents relative">
      <div
        class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded"
      >
        <div class="rounded-t mb-0 px-4 py-3 border-0">
          <div class="flex flex-wrap items-center">
            <div class="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3 class="font-semibold text-base text-gray-800">DSA Ratings</h3>
            </div>
            <div
              class="relative w-full px-4 max-w-full flex-grow flex-1 text-right"
            ></div>
          </div>
        </div>
        <div class="block w-full overflow-x-auto">
          <!-- Projects table -->

          <!-- Projects table -->
          <table class="items-center w-full bg-transparent border-collapse">
            <thead>
              <tr>
                <th
                  class="px-6 bg-gray-100 text-gray-600 align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left"
                >
                  Position
                </th>
                <th
                  class="px-6 bg-gray-100 text-gray-600 align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left"
                >
                  Name
                </th>
                <th
                  class="px-6 bg-gray-100 text-gray-600 align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left"
                >
                  Purchased
                </th>
                <th
                  class="px-6 bg-gray-100 text-gray-600 align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left"
                >
                  Affidavit
                </th>
                <th
                  class="px-6 bg-gray-100 text-gray-600 align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left"
                >
                  Registered
                </th>

                <th
                  class="px-6 bg-gray-100 text-gray-600 align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left"
                >
                  Contacted
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th
                  class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4 text-left"
                >
                  1
                </th>
                <th
                  class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4 text-left"
                >
                  John Doe
                </th>

                <td
                  class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4"
                >
                  5
                </td>
                <td
                  class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4"
                >
                  6
                </td>
                <td
                  class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4"
                >
                  9
                </td>
                <td
                  class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4"
                >
                  89
                </td>
              </tr>
              <tr>
                <th
                  class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4 text-left"
                >
                  2
                </th>
                <th
                  class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4 text-left"
                >
                  Jane Doe
                </th>
                <td
                  class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4"
                >
                  9
                </td>
                <td
                  class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4"
                >
                  5
                </td>
                <td
                  class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4"
                >
                  6
                </td>

                <td
                  class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4"
                >
                  89
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Sidebar from "@/components/Sidebar/Sidebar.vue";

export default {
  data() {
    return {};
  },
  components: {
    Sidebar,
  },
  methods: {
    generateRandomColor() {
      return "#" + Math.floor(Math.random() * 16777215).toString(16);
    },
  },
};
</script>
