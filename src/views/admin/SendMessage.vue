<template>
    <div>
        <div>
            <h1 class="text-lg font-bold">Send Message</h1>
            <div class="mt-2">
                <textarea
                rows="8"
              cols="40"
              type="text"
              name="todo"
              class="p-3 border"
              placeholder="Enter Message ..."
              v-validate="'required'" 
              v-model="message"
                           
                >
                </textarea>
            </div>
            <div class="border">
                <div class="mb-3 text-2xl font-bold ml-1"><label class="text-base">Select Agents</label>
                </div>
                <select v-model="selectedUser" @change="addToArray()" :disabled="selectAll">
                    <option value="" selected >Select ...</option>
                    <option :value="agent" v-for="agent in agents">{{agent.full_name}}</option>
                </select>
                <input type="checkbox"  v-model="selectAll" class="ml-3" @change="addAll()"/><label>select all</label><button class="altaraBlue text-white text-sm pt-0 ml-3 px-2 rounded-sm" @click="clear()">clear</button>
                <div class="flex-row">
                    <small v-for="item in recepients" class="bg-gray-200 text-xs mx-1 px-1 rounded-sm">{{item.full_name}}<i @click="removeFromArray(item)" class="fas fa-times text-xs cursor-pointer text-red-600 ml-1 opacity-0  hover:opacity-100"></i></small>
                </div>
            </div>

            <div class="text-center mt-5">
                <button class="altaraBlue text-white p-2 rounded-md " @click="sendMessage()"><i class="far fa-paper-plane mr-2"></i>Send</button>
            </div>
            
        </div>

    </div>
</template>

<script>
import { get, post } from '../../utilities/api';

    export default {
        data() {
            return {
                recepients: [],
                message: [],
                agents: [],
                selectedUser: null,
                URLS: {
                    dsaUrl: `/api/get-users?role=18&stats=true`,
                    sendMessage: `/api/send-dsa-message`
                },
                selectAll: null
            }
        },
        mounted() {
            this.fetchDsa();

        },
        methods: {
            async fetchDsa(){
                const agents = await get(this.URLS.dsaUrl);
                this.agents = agents.data.data.data;
            },
            addToArray(){
                if(this.recepients.includes(this.selectedUser)){
                    return
                }
                this.recepients.push(this.selectedUser);
                
            },
            removeFromArray(item){
                console.log(item);

                this.recepients = this.recepients.filter(a => {
                    return a.id !== item.id
                })
            },
            addAll(){
                if(this.selectAll){
                    this.recepients = this.agents;
                }
            },
            sendMessage(){
                // this.$LIPS(true);
                let numbers = this.recepients.map(item => {
                    return item.id;
                })
                let data = {
                    dsas : numbers,
                    message: this.message
                }
                
                    post(this.URLS.sendMessage, data).then(resp => {
                        console.log(resp)
                    }).catch(err => {

                    }).finally(() => {
                        this.$LIPS(false);
                    })
                    
               
            },
            clear(){
                this.recepients = [];
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>