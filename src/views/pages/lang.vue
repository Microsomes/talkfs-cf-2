<template>
  <div style="background:#2146C7" class="overflow-y-scroll noselect	h-screen">

    <div style="background:#2146C7" v-if="!isSelected" class="h-12 flex items-center justify-center text-3xl  text-white w-full">
      <p class="text-xl">TALKFS. The future of languages.</p>
    </div>

    <div style="background:#2146C7" class="h-12 mt-2 mb-3 flex items-center justify-center">
      <div style="background:#06283D" class=" cursor-pointer w-full h-12 ml-12 mr-12 rounded-md">
        <input v-model="query" style="background:#06283D" class="w-full h-full rounded-md pl-3 text-white" placeholder="search languages" type="text" />
      </div>
    </div>

    <template v-if="languages2.length == 0">
      <div class="h-96 bg-yellow text-white text-5xl flex items-center justify-center">
        <p>No language with the query: '{{query}}' found.</p>
      </div>
    </template>

    <template v-if="!isSelected">
      <div style="background:#d" class="home pt-12 font-bold flex flex-wrap justify-center space-x-2  ">

        <div @click="selectLangv2(lang)" v-for="lang in Object.keys(languages2)"  style="background:#06283D"
          class="text-white border-2 text-center rounded-md flex-col flex justify-center items-center text-3xl rounded-md shadow-xl m-2 w-96  p-2 cursor-pointer hover:scale-90">
          {{ lang }}
        </div>

      
      </div>
    </template>

    <template v-else>
      <div class="flex">
        <div class="h-screen flex  w-screen bg-white">
          <div class="h-screen text-center text-white text-center w-32 bg-black">
            <p class="rotate-3 mt-2 text-4xl">TFS</p>
            <p class="rotate-3 mt-2 text-sm">
              LuLu
            </p>
          </div>

          <div style="background:#06283D" class="flex-grow overflow-scroll">
            <p class="mt-12 text-4xl text-white">{{ selectedFeedName }}</p>

            <!--cross icon-->
            <div @click="close" class="flex items-center justify-center">
              <div class="flex bg-black w-12 h-12  hover:bg-gray-300 hover:text-black cursor-pointer ease-in duration-200  text-white shadow-xl rounded-full justify-center items-center mt-12">
                <div class="text-center text-xl  cursor-pointer" @click="isSelected = false">
                  <svg class="fill-current hover:text-black " xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                    viewBox="0 0 24 24">
                    <path
                      d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                  </svg>
                </div>
              </div>
            </div>

            <div v-if="data" class="mt-12">

              <div class="p-3 rounded-md mb-2" :key="feedIndex" v-for="(feed, feedIndex) in data.alldocs">

                <template v-if="feed.type == 'sound'">
                  <h1 class="text-5xl">{{ feed.val.text }}</h1>

                  <div class="flex items-center justify-center mb-12 mt-12">
                    <audio controls>
                      <source :src="feed.val.image" type="audio/mpeg">
                      Your browser does not support the audio element.
                    </audio>
                  </div>

                </template>

                <template v-if="feed.type == 'multi_audio'">
                  <div :key="lesson.lessonName" v-for="(lesson, i) in JSON.parse(feed.val)">
                    <h1 class="text-5xl text-white">{{ lesson.lessonName }}</h1>
                    <div class=" flex items-center justify-center">
                      <p v-if="!lesson.play" @click="startPlay(i)" style="cursor:pointer;color:black;"
                        class="hover:scale-75 ease-in duration-300 bg-green-300 m-2 h-12 flex items-center justify-center text-3xl rounded-full w-32 pl-2">
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
const axios = require("axios");

const API = "https://hello.talkfs.workers.dev/?feed="


const renderPost = require("../../components/renderPost");


export default {
  name: 'HomeView',
  components: {
    renderPost: renderPost
  },
  watch:{
    query(){
      this.search()
    }
  },
  computed:{
    languages2(){
      const langs = Object.keys(this.languages);

      //earch langs with this.query
      const filteredLangs = langs.filter(lang => lang.toLowerCase().includes(this.query.toLowerCase()))


      const filteredLangsObj = {}

      filteredLangs.forEach(lang => {
        filteredLangsObj[lang] = this.languages[lang]
      })

      return filteredLangsObj
    }
  
  },
  created() {
    this.fetchData();
  },
  methods: {
    selectLangv2(lang){
      console.log("selecting lang", lang)
      
      this.$router.push("/langv2/"+lang);
    
    },
    search(){
      console.log("running search ")
    },
    close() {
      this.isSelected = false;
      this.currentPlayingIndex = null;
    },
    startPlay(n) {
      this.currentPlayingIndex = n;
    },
    selectFeed(n, feedName) {
      this.selectedFeedName = feedName;

      this.$router.push("/lang/"+n+"/"+feedName);

      // axios.get(`https://hello.talkfs.workers.dev/?feed=${n}`).then((resp) => {
      //   this.data = resp.data;
      //   this.selectedFeed = n;
      //   this.isSelected = true;
      // });
    },
    fetchData() {
      axios.get('https://hello.talkfs.workers.dev').then((resp) => {
        this.languages = resp.data;

        console.log(resp.data)
      })
    }
  },
  data: function () {
    return {
      query:'',
      currentPlayingIndex: null,
      isSelected: false,
      selectedFeed: '',
      selectedFeedName: '',
      message: 'Hello Vue!',
      languages: [],
      data: null
    }
  },
}
</script>



<style>

  *{
    transition: all .2s;
  }

.noselect {
  -webkit-touch-callout: none;
  /* iOS Safari */
  -webkit-user-select: none;
  /* Safari */
  -khtml-user-select: none;
  /* Konqueror HTML */
  -moz-user-select: none;
  /* Old versions of Firefox */
  -ms-user-select: none;
  /* Internet Explorer/Edge */
  user-select: none;
  /* Non-prefixed version, currently
                                  supported by Chrome, Edge, Opera and Firefox */
}
</style>
