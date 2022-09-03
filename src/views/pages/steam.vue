<template>
  <div class="noselect	">

    <div class="h-12 flex  bg-gradient-to-r from-green-300   items-center justify-center text-3xl bg-black text-white w-full">
      <p>TalkFS.com</p>
    </div>
    <div class="h-12 flex items-center justify-center text-3xl bg-black text-white w-full">
      <p>Weekend Party Rooms</p>
    </div>
    
    <div class="fixed bg-black rounded-md text-white pl-2 pr-2 m-12" >
        Total Visitors In Lobby: {{totalViewers}}
    </div>

    <div class="flex flex-wrap space-x-3 space-y-3 items-center justify-center mt-24 rounded-md ">
  
      <div @click="createRoom" class="w-96 flex cursor-pointer hover:opacity-70 rounded-md bg-gradient-to-r from-black ease-in duration-300  items-center justify-center h-96 bg-green-300">
        <span class="text-5xl text-white">+</span>
      </div>

      <div v-for="room in rooms" :key="room.roomName" @click="openRoom(room.roomName)" class="w-96 flex cursor-pointer hover:opacity-70 rounded-md bg-gradient-to-r from-indigo-500 ease-in duration-300  items-center justify-center h-96 bg-red-300">
        <span class="text-5xl text-white uppercase">  #{{room.roomName}} </span>
      </div>

      
  
    </div>

    
  

    
  </div>
</template>

<script>
// @ is an alias to /src
const axios= require("axios");

const HLS_STREAM_URL="https://talkfssteam.com/hls/test.m3u8"

var socket;


const ISDEV = false;

socket = new WebSocket("ws://talkfssocket.herokuapp.com");



if(ISDEV){
   socket = new WebSocket("ws://localhost:3000");
}



export default {
  name: 'StreamView',
  components:{
   },
  created() {



    socket.onmessage= (msg)=>{
      try{
      const parsedMessage = JSON.parse(msg.data.toString());

        if(parsedMessage.type == 'roomNotCreated'){
          alert("Room not created, name already exists");
        }else if(parsedMessage.type == 'roomCreated'){
          // this.$router.push({name: 'Room', params: {roomName: parsedMessage.roomName}});
          this.currentRoom = parsedMessage.data;
        }else if(parsedMessage.type == 'rooms'){
          //broadcast rooms
          console.log(parsedMessage.data);
          this.rooms = parsedMessage.data;
          this.$forceUpdate();
        }
        else{
          this.totalViewers = parsedMessage.data;
        }
      }catch(e){}
}

   },
   mounted(){    
     
   },
  methods:{
    openRoom(roomName){
      this.$router.push({name: 'room', params: {id: roomName}});
    },
    createRoom(){
      
      const roomName = prompt("Enter room name");
      if(roomName.length< 5){
        alert("Room name must be at least 5 characters");
        return;
      }

      socket.send(JSON.stringify({
        type:"createRoom",
        data:{
          roomName:roomName,
          roomPassword:"test"
        }
      }))


    }
  },
  beforeRouteLeave(to, from, next) {
    //CLOSE SOCKET
    socket.close();
    next();
  },
  data:function(){
    return {
        totalViewers: 0,
        allRooms:[],
        currentRoom: null,
    }
  },
}
</script>



<style>

.noselect {
  -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
     -khtml-user-select: none; /* Konqueror HTML */
       -moz-user-select: none; /* Old versions of Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
            user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome, Edge, Opera and Firefox */
}

</style>
