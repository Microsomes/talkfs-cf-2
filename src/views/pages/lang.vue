<template>
  <div class="overflow-scroll noselect	">

    <div v-if="!isSelected" class="h-12 flex items-center justify-center text-3xl bg-black text-white w-full">
      <p class="hidden">Talkfs.com</p>
      <p>Her Majesty Queen Elizabeth II 1926-2022</p>
    </div>
  
    <template v-if="!isSelected">
    <div class="home bg-green-300 pt-12 font-bold flex flex-wrap justify-center space-x-2  ">
    <div v-for="n in languages" 
    :key="n"
    class="text-white text-center flex-col flex justify-center items-center text-3xl rounded-md shadow-xl m-2 w-96  bg-black">
     <div class="h-32 flex items-center justify-center space-x-3 flex-col">
      <p>{{n.name}}</p>
      <p class="text-sm mt-2">{{n.sections.length}} Sections</p>
      </div>
      <div class="flex-grow"></div>
      <div @click="selectFeed(sec.feedid)" style="cursor:pointer" class="hover:bg-black bg-green-300 w-full mt-2 cursor" v-for="sec in n.sections" :key="sec.feedid">
        {{sec.feedid}}
      </div>
    </div>
        </div>
    </template>

    <template v-else>
      <div class="flex">
        <div class="h-screen flex  w-screen bg-white">
          <div class="h-screen  text-white text-center w-24 bg-black">
          </div>
          <div class="flex-grow overflow-scroll	 bg-yellow-300">
              <p class="mt-12 text-3xl">{{selectedFeed}}</p>

              <!--cross icon-->
              <div @click="close" class="flex items-center justify-center">
              <div class="flex bg-black w-12 h-12 shadow-xl rounded-full justify-center items-center mt-12">
                <div class="text-center text-xl cursor-pointer" @click="isSelected=false">
                  <svg class="fill-current text-white" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
                </div>
              </div>  
              </div>

              <div v-if="data" class="mt-12">


                <div :key="feedIndex" v-for="(feed,feedIndex) in data.alldocs">

                  <template v-if="feed.type=='sound'">
                    <h1 class="text-5xl">{{feed.val.text}}</h1>

                      <div class="flex items-center justify-center mb-12 mt-12">
                             <audio controls>
                              <source :src="feed.val.image" type="audio/mpeg">
                            Your browser does not support the audio element.
                            </audio>
                          </div>

                  </template>

                  <template v-if="feed.type == 'multi_audio'">
                      <div :key="lesson.lessonName" v-for="(lesson,i) in JSON.parse(feed.val)">


                        <h1 style="color:black" class="text-5xl">{{lesson.lessonName}}:</h1>
                        <div class=" flex items-center justify-center">
                          <p v-if="!lesson.play" @click="startPlay(i)" style="cursor:pointer;color:black;" class="hover:scale-75 bg-green-300 m-2 h-12 flex items-center justify-center text-3xl rounded-full w-32 pl-2">
                          Play
                          </p>
                        </div>

                        <template v-if="currentPlayingIndex === i">
                          <div class="flex items-center justify-center mb-12 mt-12">
                             <audio controls>
                              <source :src="lesson.fileURL" type="audio/mpeg">
                            Your browser does not support the audio element.
                            </audio>
                          </div>
                        </template>
                    
                    </div>
                  
                  </template>
                </div>
              </div>

          </div>
        </div>

      </div>
    </template>

  </div>
</template>

<script>
// @ is an alias to /src
const axios= require("axios");

const API="https://hello.talkfs.workers.dev/?feed="


const renderPost = require("../../components/renderPost");


export default {
  name: 'HomeView',
  components:{
    renderPost:renderPost
  },
  created() {
    this.fetchData();
  },
  methods:{
    close(){
      this.isSelected=false;
      this.currentPlayingIndex=null;
    },
    startPlay(n) {
      this.currentPlayingIndex = n;
    },
    selectFeed(n) {
      axios.get(`https://hello.talkfs.workers.dev/?feed=${n}`).then((resp)=>{
        this.data = resp.data;
         this.selectedFeed = n;
        this.isSelected=true;
      });
    },
    fetchData() {
      axios.get('https://hello.talkfs.workers.dev/?feed=').then((resp)=>{
        this.languages= resp.data;
      })
    }
  },
  data:function(){
    return {
      currentPlayingIndex:null,
      isSelected:false,
      selectedFeed:'Modern Eastern European',
      message: 'Hello Vue!',
      languages:[],
      data:null
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
