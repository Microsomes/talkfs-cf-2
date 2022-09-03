<template>
    <div>
       <div @click="goHome" class="h-12 cursor-pointer flex  bg-gradient-to-r from-green-300   items-center justify-center text-3xl bg-black text-white w-full">
            <p>TalkFS.com</p>
        </div>
        <div  class="h-12 flex items-center justify-center text-3xl bg-black text-white w-full">
            <p class="uppercase"> #{{roomID}} ( Users {{totalConnectedToRoom}} ) </p>
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

    var socket;


    export default {
        name: 'RoomView',
        components: {
        },
        created() {
            this.roomID = this.$route.params.id;

            const ISDEV = false;

            socket = new WebSocket("wss://talkfssocket.herokuapp.com");

            if(ISDEV){
            socket = new WebSocket("ws://localhost:3000");
            }

            socket.onmessage= (msg)=>{
            try{
                const parsedMessage = JSON.parse(msg.data.toString());

                console.log(parsedMessage);

                if(parsedMessage.type == 'joinRoom'){
                    this.totalConnectedToRoom = parsedMessage.data.connectedPeople;
                }

                if(parsedMessage.type == 'connectedToRoom'){
                    this.totalConnectedToRoom = parsedMessage.data
                }
                
            }catch(e){
                //console.log(e);
            }
            }

            //when socket is ready
            socket.onopen = () => {
            console.log("Socket is ready");
            socket.send(JSON.stringify({
                type: "joinRoom",
                data:{
                    roomName: this.roomID
                }
            }));

            }

        



        },
        beforeRouteLeave(to, from, next) {
            //CLOSE SOCKET
            socket.close();
            next();
        },
        mounted() {
        },
        data() {
            return {
                roomID: "",
                totalConnectedToRoom: 0,
                message:''
            }
        },
        methods: {
            goHome(){
                this.$router.push({path: '/'});
            }
        }
    }

    

</script>