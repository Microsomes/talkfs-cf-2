<template>
    <div class="flex flex-col p-6 items-center justify-center bg-gradient-to-r from-blue-500 to-teal-500 min-h-screen">
  
      <h2 class="text-4xl font-semibold text-white mb-6">{{$route.params.section}}</h2>
  
      <!-- Back Button -->
      <div @click="goBack" class="h-12 w-12 flex items-center justify-center bg-black rounded-full cursor-pointer hover:bg-white transition-all duration-300 ease-in-out transform hover:scale-110">
        <svg class="fill-current hover:text-black" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
          <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
        </svg>
      </div>
  
      <!-- Lessons Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 w-full max-w-6xl">
        <div v-for="sect in lessons" :key="sect.name" @click="closeAll(); sect.isActive = true" 
             class="bg-[#06283D] text-white border-2 border-transparent rounded-md flex flex-col items-center justify-center text-xl p-4 cursor-pointer transition-transform transform hover:scale-95 hover:shadow-xl hover:border-[#34d399] hover:border-2">
          <div class="text-2xl font-semibold">{{ sect.name }}</div>
  
          <audio v-if="sect.isActive" :src="getUrl(sect.S3Audio)" class="mt-4 w-full" controls>
            <source type="audio/mpeg">
            Your browser does not support the audio element.
          </audio>
        </div>
      </div>
    </div>
  </template>
  
  <script>
    const langjson = require("../../../lang.json");
  
    export default {
      data() {
        return {
          lessons: []
        };
      },
      methods: {
        closeAll() {
          this.lessons.forEach((lesson) => {
            lesson.isActive = false;
          });
          this.$forceUpdate();
        },
        getUrl(uri) {
          return uri; // Add your logic here if needed.
        },
        goBack() {
            const section = this.$route.params.language;
            console.log(section);

          this.$router.push("/langv2/"+section);
        }
      },
      mounted() {
        const section = this.$route.params.section;
        Object.keys(langjson).forEach((key) => {
          Object.keys(langjson[key]).forEach((key2) => {
            if (section == key2) {
              langjson[key][key2].forEach((lesson) => {
                this.lessons.push({
                  'name': lesson.text,
                  'S3Audio': lesson.audio,
                });
              });
            }
          });
        });
      },
    };
  </script>
  
  <style scoped>
    /* Custom animations */
    @keyframes fadeIn {
      0% {
        opacity: 0;
        transform: translateY(20px);
      }
      100% {
        opacity: 1;
        transform: translateY(0);
      }
    }
  
    .lesson-item {
      animation: fadeIn 0.5s ease-out;
    }
  </style>
  