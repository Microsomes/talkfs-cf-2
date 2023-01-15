
<style scoped>

.create:hover{
    transform: scale(1.1);
    transition: 0.5s;
    background-color: #3A516E;
}

</style>

<template>
    <div style="background-color:#CBCEC9" class="h-screen flex  justify-center w-screen">
        <div style="border:2px solid #3A516E" class="w-1/3 mt-12 h-96  rounded-md">
            <div style="background-color:#3A516E" class=" text-centre w-full h-6  text-white  items-center">
                Create a Free Account with Talkfs.com for life.
            </div>
            <div class="flex items-center flex-col justify-center" >
                <div style="border:2px solid #3A516E" @click="triggerUpload" class="h-20 cursor-pointer hover:scale-75 mt-6 w-20 rounded-full">
                    <img v-if="currentPic" :src="currentPic" class="h-20 w-20 rounded-full"/>
                </div>
                <p class="text-black text-xl mt-2CBCEC9 mt-2">Upload a profile Image. Click the circle.</p>
                <form @submit.prevent="signUp()" class="w-1/2 flex space-y-3 flex-col mt-3">
                    <input @change="handleUpload" ref="fu" type="file" class="hidden"/>
                    <input v-model="username" class="w-full rounded-md pl-2 h-6" type="text" placeholder="Username"/>
                    <input v-model="password" class="w-full rounded-md pl-2 h-6" type="text" placeholder="Password"/>
                    <input style="background-color:#3A516E" class="text-white rounded-md cursor-pointer create" type="submit" value="Create"/>
                </form>
            </div>
        </div>
    </div>
</template>


<script>

    import { app, getAuth } from '../../../../assets/database.js'

    import {createUserWithEmailAndPassword} from 'firebase/auth'

    export default{
        data(){
            return {
                currentPic:'',
                picSelected:null,
                username:'aimen',
                password:'password'
            }
        },
        methods:{
            signUp(){
                // if (this.picSelected == null){
                //     alert('Please select a profile picture.')
                //     return
                // }

                if (this.username == ''){
                    alert('Please enter a username.')
                    return
                }

                if (this.password == ''){
                    alert('Please enter a password.')
                    return
                }

                //remove spaces from username
                this.username = this.username.replace(/\s/g, '');

                const auth = getAuth(app);

                console.log(auth);

                createUserWithEmailAndPassword(auth, this.username+"@maeplet.com", this.password)
                    .then((auth)=>{
                        alert('Account created successfully.')
                    }).catch((err)=>{
                        alert(err.message)
                    })



            },
            triggerUpload(){
                this.$refs.fu.click()
            },
            handleUpload(e){
                const f = e.target.files[0];
                this.picSelected = f;

                //read file
                const reader = new FileReader();
                reader.onload = (e) => {
                    this.currentPic = e.target.result;
                }
                reader.readAsDataURL(f);
            }
        }
    }

</script>