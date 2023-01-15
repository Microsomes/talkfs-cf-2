<template>

<div class="flex bg-blue-200  flex-wrap flex-col p-6 items-center justify-center">

    <h2 class="text-3xl text-black">{{$route.params.section}}</h2>


   
    <div @click="$router.push('/')" class="h-12 w-12 flex items-center justify-center bg-red-500 rounded-full mt-12 cursor-pointer hover:bg-white">
        <svg class="fill-current text-white hover:text-black " xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                    viewBox="0 0 24 24">
                    <path
                      d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                  </svg>
    </div>
    
    <div @click="closeAll();sect.isActive = true"  v-for="sect in lessons"  style="background:#C4DFAA"
          class="mt-8  text-black border-2 text-center rounded-md flex-col flex justify-center items-center text-3xl rounded-md shadow-xl m-2  pl-6 pr-6  p-2 cursor-pointer hover:scale-90">
          {{ sect.name }}


          <audio v-if="sect.isActive" :src="getUrl(sect.S3Audio)" class="mt-2" controls>
                      <source type="audio/mpeg">
                      Your browser does not support the audio element.
                    </audio>
        </div>
</div>

</template>


<script>
    export default {
        data(){
            return {
                lessons:[]
            }
        },
        methods:{
            closeAll(){
                this.lessons.forEach((lesson)=>{
                    lesson.isActive = false
                })
                this.$forceUpdate()
            },
             getUrl(uri){
    const url = "https://maeplet.fra1.digitaloceanspaces.com/pim5"
    return `${url}/${uri.replaceAll(" ","%20")}`
},
           
        },
        mounted(){
            var lessons = localStorage.getItem("last")
            lessons = JSON.parse(lessons);

            this.lessons=lessons
        },
    }
</script>