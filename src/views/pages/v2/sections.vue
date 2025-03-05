<template>
    <div class="flex items-center justify-center p-6 bg-gradient-to-r from-blue-500 to-teal-500 min-h-screen">
  
      <!-- Back Button -->
      <div @click="goBack" class="h-12 w-12 mr-12 flex items-center justify-center bg-black rounded-full cursor-pointer hover:bg-white transition-all duration-300 ease-in-out transform hover:scale-110">
        <svg class="fill-current hover:text-black" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
          <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
        </svg>
      </div>
  
      <!-- Course Sections Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 w-full max-w-6xl">
        <div v-for="sect in sections" :key="sect.courseName" @click="selectUnit(sect)"
             class="bg-[#06283D] text-white border-2 border-transparent rounded-md flex flex-col items-center justify-center text-xl p-6 cursor-pointer transition-transform transform hover:scale-95 hover:shadow-xl hover:border-[#34d399] hover:border-2">
          <div class="text-2xl font-semibold">{{ sect.courseName }}</div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
    import axios from 'axios';
    const langjson = require("../../../lang.json");
  
    export default {
      data() {
        return {
          selectedlang: '',
          sections: []
        };
      },
  
      methods: {
        async selectUnit(unit) {
          console.log(unit);
          // const lessonUri = `${window.base}lang?lang=${unit.courseName}`;
          // const les = await axios.get(lessonUri);
          // localStorage.setItem("last", JSON.stringify(les.data[0].lessons));

          this.selectedlang = this.$route.params.language;

          this.$router.push("/lessons/"+this.selectedlang+'/' + unit.courseName);
        },
        goBack(){
            const section = this.$route.params.section;

            this.$router.push("/");
        }
      },
  
      mounted() {
        this.selectedlang = this.$route.params.language;
        console.log(langjson[this.selectedlang]);
  
        this.sections = [];

        if(this.selectedlang == "EgyptianArabic"){
            this.selectedlang = "Egyptian Arabic";
        }

        if(this.selectedlang == "ModernArabic"){
            this.selectedlang = "Modern Arabic";
        }

        
  
        Object.keys(langjson[this.selectedlang]).forEach((key) => {
          console.log(key);
          this.sections.push({
            'courseName': key
          });
        });
      }
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
  
    .course-item {
      animation: fadeIn 0.5s ease-out;
    }
  </style>
  