<template>

<div class="flex items-center flex-col flex-wrap justify-center">

    <div @click="$router.push('/')" class="h-12 w-12 flex items-center justify-center bg-black rounded-full mt-12 cursor-pointer hover:bg-white">
        <svg class="fill-current hover:text-black " xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                    viewBox="0 0 24 24">
                    <path
                      d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                  </svg>
    </div>
    
    <div   v-for="lang in sections"  style="background:#06283D"
          class="mt-8  text-white border-2 text-center rounded-md flex-col flex justify-center items-center text-3xl rounded-md shadow-xl m-2 w-96  p-2 cursor-pointer hover:scale-90">
          {{ lang.courseName }}
        </div>
</div>

</template>


<script>
    import axios from 'axios';
export default{
    data(){
        return {
            selectedlang:'',
            sections:[]
        }
    },

    mounted(){
        this.selectedlang=this.$route.params.language;

        axios.get("https://hello.talkfs.workers.dev")
            .then((resp)=>{
                this.sections = resp.data[this.selectedlang];
            })


    }

}

</script>