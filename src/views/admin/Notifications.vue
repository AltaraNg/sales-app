<template>
    <div>
        <div v-if="messages.length != 0" class="block w-full overflow-x-auto">
          <!-- Projects table -->

          <!-- Projects table -->
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
                  Message
                </th>
                <th
                  class="px-6 altaraBlue text-white align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left"
                >
                  Date
                </th>
               
              </tr>
            </thead>
            <tbody>
              <tr
                class="pointer"                
                :key="index"
                v-for="(message, index) in messages"
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
                    {{ index + OId || "" }}
                  </div>
                </th>
                <th
                  class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4 text-left"
                >
                  {{ message.message || "" }}
                </th>
                <th
                  class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4 text-left"
                >
                  {{ message.created_at || "" }}
                </th>
                
              </tr>
            </tbody>
          </table>
        </div>

    </div>
</template>

<script>
import { get } from '../../utilities/api';
import queryParam from '../../utilities/queryParam';
    export default {
        data(){
            return {
                messages: [],
                urls: {
                    message: `/api/message`
                },
                OId :  1
            }},
        mounted(){
            this.fetchMessages();

        },
        methods: {
            async fetchMessages(){
                this.$LIPS(true)
                let userId = localStorage.getItem('user_id');
                let messages = await get(this.urls.message + queryParam({receiver : userId}));
                this.messages = messages.data.data.data;
                this.$LIPS(false)
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>