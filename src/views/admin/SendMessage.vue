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
                <div class="mb-3 text-2xl font-bold ml-1"><label class="text-base">Select Role</label>
                </div>
                <select v-model="selectedUser" @change="addToArray()" :disabled="selectAll">
                    <option selected="selected" disabled >Select ...</option>
                    <option :value="role" v-for="role in roles">{{role.name}}</option>
                </select>
                <input type="checkbox"  v-model="selectAll" class="ml-3" @change="addAll()"/><label>select all</label><button class="altaraBlue text-white text-sm pt-0 ml-5 mb-1 px-2 rounded-sm" @click="clear()"><i class="fas fa-trash-alt mr-1"></i>Clear</button>
                <div class="flex-row">
                    <small v-for="item in recepients" class="bg-gray-200 text-xs mx-1 px-1 rounded-sm">{{item.name}}<i @click="removeFromArray(item)" class="fas fa-times text-xs cursor-pointer text-red-600 ml-1 opacity-0  hover:opacity-100"></i></small>
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
                message: '',
                roles: [],
                selectedUser: null,
                URLS: {
                    roles: `/api/role`,
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
                this.$LIPS(true);
                const agents = await get(this.URLS.roles);
                this.roles = agents.data.roles;
                this.$LIPS(false);
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
                    this.recepients = this.roles;
                }
            },
            sendMessage(){
                this.$LIPS(true);
                if(this.message !== '' && this.recepients.length > 0){
                let ids = this.recepients.map(item => {
                    return item.id;
                })
                let data = {
                    roles : ids,
                    message: this.message
                }                    
                    post(this.URLS.sendMessage, data).then(resp => {
                        console.log(resp);

                        this.$swal({
                            icon: "success",
                            title: "Message Sent Successfully",
                             });
                        this.clear();
                        this.message = "";
                             
                    }).catch(err => {

                    }).finally(() => {
                        this.$LIPS(false);
                    })
                }
                else{
                    alert('Enter missing fields!!!');
                }
                    
               
            },
            clear(){
                this.recepients = [];
                this.selectedUser = '';
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>