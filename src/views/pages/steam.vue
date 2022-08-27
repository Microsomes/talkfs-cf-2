<template>
  <div class="noselect	">

    <div v-if="!isSelected" class="h-12 flex items-center justify-center text-3xl bg-black text-white w-full">
      <p>WATCH KSI LIVE FULL HD</p>
    </div>
    
    <div>
        <a href="https://www.hlsplayer.org/play?url=https%3A%2F%2Ftalkfssteam.com%2Fhls%2Ftest.m3u8"><button>
            Use Iphone Native Player -- Click here
        </button></a>
    </div>

    <div class="fixed bg-black rounded-md text-white pl-2 pr-2 m-12" >
        Total Viewers: {{totalViewers}}
    </div>

    <div style="height:800px;" class="bg-red-300 flex items-center justify-center">

        <div >
            <video id="mainvid" ref="mainvid"   controls>
      
            Your browser does not support the video tag.
            </video>
        </div>

    </div>
  

    
  </div>
</template>

<script>
// @ is an alias to /src
const axios= require("axios");

const HLS_STREAM_URL="https://talkfssteam.com/hls/test.m3u8"


const socket = new WebSocket("wss://talkfssocket.herokuapp.com");


 
 
export default {
  name: 'StreamView',
  components:{
   },
  created() {
        socket.onmessage= (msg)=>{
    const viewers = JSON.parse(msg.data).data;

   this.totalViewers = parseFloat(viewers);
}

   },
   mounted(){    
     var video = document.getElementById('mainvid');

      var videoSrc = HLS_STREAM_URL;
        if (Hls.isSupported()) {
            var hls = new Hls();
            hls.loadSource(videoSrc);
            hls.attachMedia(video);
        }



   },
  methods:{
     
  },
  data:function(){
    return {
        totalViewers: 0
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
