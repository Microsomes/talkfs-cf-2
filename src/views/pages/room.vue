<template>
    <div>
       <div v-if="!isSelected" @click="goHome" class="h-12 cursor-pointer flex  bg-gradient-to-r from-green-300   items-center justify-center text-3xl bg-black text-white w-full">
            <p>TalkFS.com</p>
        </div>
        <div v-if="!isSelected" class="h-12 flex items-center justify-center text-3xl bg-black text-white w-full">
            <p class="uppercase"> {{roomID}} </p>
        </div>


        <div class="h-screen  flex flex-col bg-white border-1 border-2 w-96 fixed  right-0">
            <div id="chatView" class="flex-grow">
                chat view
            </div>
            <div class="mb-24  rounded-md">
                <input type="text" v-model="message" class="w-96 pl-2 bg-black text-white rounded-md mr-2 h-12 border-1 border-2" placeholder="Type a message">
            </div>
        </div>

    </div>
</template>

<script>

    export default {
        name: 'RoomView',
        components: {
        },
        created() {
            this.roomID = this.$route.params.id
        },
        mounted() {
        },
        data() {
            return {
                roomID: "",
            }
        },
        methods: {
            goHome(){
                this.$router.push({path: '/'});
            }
        }
    }

    

</script>