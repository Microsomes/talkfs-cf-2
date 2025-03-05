<template>
  <div style="background:#2146C7" class="p-6 overflow-y-scroll noselect h-screen">

    <!-- Header -->
    <div v-if="!isSelected" class="h-12 flex items-center justify-center text-3xl text-white w-full">
      <p class="text-xl font-semibold">TALKFS. The future of languages.</p>
    </div>

    <!-- Search Input -->
    <div class="h-12 mt-1 mb-3 flex items-center justify-center">
      <div class="cursor-pointer w-full h-12 ml-12 mr-12 rounded-md bg-[#06283D]">
        <input v-model="query" class="w-full h-full rounded-md pl-3 text-white placeholder-gray-300 bg-[#06283D] focus:outline-none" placeholder="Search languages" type="text" />
      </div>
    </div>

    <!-- No Languages Found Message -->
    <template v-if="languages2.length === 0">
      <div class="h-96 bg-yellow-600 text-white text-5xl flex items-center justify-center">
        <p>No language with the query: '{{ query }}' found.</p>
      </div>
    </template>

    <!-- Languages Display -->
    <template v-if="!isSelected">
      <div class="home pt-6 font-bold flex flex-wrap justify-center space-x-4">

        <div @click="selectLangv2(lang)" v-for="lang in Object.keys(languages2)" :key="lang" class="bg-[#06283D] text-white text-center rounded-md flex flex-col justify-center items-center text-3xl p-6 cursor-pointer hover:scale-105 transition-transform transform duration-200 shadow-xl m-2 w-80">
          {{ lang }}
        </div>

      </div>
    </template>

    <!-- Selected Language Feed -->
    <template v-else>
      <div class="flex">
        <div class="h-screen flex w-screen bg-white">
          
          <!-- Sidebar -->
          <div class="h-screen w-32 bg-black text-center text-white py-4">
            <p class="rotate-3 text-4xl font-bold">TFS</p>
            <p class="rotate-3 text-sm">LuLu</p>
          </div>

          <!-- Main Content -->
          <div style="background:#06283D" class="flex-grow overflow-y-auto p-6">
            <p class="mt-12 text-4xl text-white font-bold">{{ selectedFeedName }}</p>

            <!-- Close Button -->
            <div @click="close" class="flex justify-center mt-6">
              <div class="flex bg-black w-12 h-12 hover:bg-gray-300 hover:text-black cursor-pointer ease-in-out duration-200 text-white shadow-xl rounded-full items-center justify-center">
                <svg class="fill-current hover:text-black" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                  <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                </svg>
              </div>
            </div>

            <!-- Feed Content -->
            <div v-if="data" class="mt-12 space-y-8">

              <div v-for="(feed, feedIndex) in data.alldocs" :key="feedIndex" class="p-4 bg-[#1a3d56] rounded-lg shadow-md">
                
                <!-- Sound Feed -->
                <template v-if="feed.type === 'sound'">
                  <h1 class="text-5xl text-white">{{ feed.val.text }}</h1>
                  <div class="flex items-center justify-center mt-6 mb-12">
                    <audio controls>
                      <source :src="feed.val.image" type="audio/mpeg">
                      Your browser does not support the audio element.
                    </audio>
                  </div>
                </template>

                <!-- Multi-Audio Feed -->
                <template v-if="feed.type === 'multi_audio'">
                  <div v-for="(lesson, i) in JSON.parse(feed.val)" :key="i">
                    <h1 class="text-5xl text-white">{{ lesson.lessonName }}</h1>
                    <div class="flex items-center justify-center mt-4">
                      <p v-if="!lesson.play" @click="startPlay(i)" class="cursor-pointer bg-green-300 hover:scale-90 ease-in duration-300 text-3xl rounded-full w-32 m-2 h-12 flex items-center justify-center">
                        Play
                      </p>
                    </div>

                    <template v-if="currentPlayingIndex === i">
                      <div class="flex items-center justify-center mt-12">
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
// Importing required modules
const axios = require("axios");

const API = "https://hello.talkfs.workers.dev/?feed=";

const renderPost = require("../../components/renderPost");

const langjson = require("../../lang.json");

export default {
  name: 'HomeView',
  components: {
    renderPost: renderPost
  },
  watch: {
    query() {
      this.search();
    }
  },
  computed: {
    languages2() {
      const langs = Object.keys(this.languages);

      // Filter languages based on the query
      const filteredLangs = langs.filter(lang => lang.toLowerCase().includes(this.query.toLowerCase()));

      const filteredLangsObj = {};

      filteredLangs.forEach(lang => {
        filteredLangsObj[lang] = this.languages[lang];
      });

      return filteredLangsObj;
    }
  },
  created() {
    this.fetchData();
  },
  methods: {
    selectLangv2(lang) {
      console.log("Selecting language:", lang);
      this.$router.push("/langv2/" + lang);
    },
    search() {
      console.log("Running search...");
    },
    close() {
      this.isSelected = false;
      this.currentPlayingIndex = null;
    },
    startPlay(n) {
      this.currentPlayingIndex = n;
    },
    fetchData() {
      this.languages = langjson;
    }
  },
  data() {
    return {
      query: '',
      currentPlayingIndex: null,
      isSelected: false,
      selectedFeedName: '',
      languages: { 'English': ['boobs'] },
      data: null
    };
  }
};
</script>

<style scoped>
* {
  transition: all .2s ease-in-out;
}

.noselect {
  user-select: none;
}
</style>
