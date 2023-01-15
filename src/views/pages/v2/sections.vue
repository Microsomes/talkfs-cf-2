<template>

<div class="flex h-screen w-screen bg-blue-200 items-center p-6 flex-col flex-wrap ">

    <div @click="$router.push('/')" class="h-12 w-12 flex items-center justify-center bg-red-500 rounded-full mt-12 cursor-pointer hover:bg-white">
        <svg class="fill-current text-white hover:text-black " xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                    viewBox="0 0 24 24">
                    <path
                      d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                  </svg>
    </div>
    
    <div @click="selectUnit(sect)"   v-for="sect in sections"  style="background:#E4D192"
          class="mt-8  text-black border-2 text-center rounded-md flex-col flex justify-center items-center text-2xl rounded-md shadow-xl m-2  pl-6 pr-6 cursor-pointer hover:scale-90">
          {{ sect.courseName }}
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

    methods:{
        async selectUnit(unit){
            console.log(unit)
            const lessonUri = `${window.base}lang?lang=${unit.courseName}`;
            const les = await axios.get(lessonUri)

            localStorage.setItem("last", JSON.stringify(les.data[0].lessons))
            this.$router.push("/lessons/"+unit.courseName)

        }
    },

    mounted(){
        this.selectedlang=this.$route.params.language;

        axios.get("https://talkvxx.ew.r.appspot.com/languages?")
            .then((resp)=>{
                this.sections = resp.data[this.selectedlang];
            })


    }

}

</script>