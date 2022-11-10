<template>
    <div style="background:#2146C7">
        <template v-if="isLoaded">
        <div @click="close" class="flex items-center justify-center">
            <div
                class="flex bg-black w-12 h-12  hover:bg-gray-300 hover:text-black cursor-pointer ease-in duration-200  text-white shadow-xl rounded-full justify-center items-center mt-12">
                <div class="text-center text-xl  cursor-pointer" @click="isSelected = false">
                    <svg class="fill-current hover:text-black " xmlns="http://www.w3.org/2000/svg" width="24"
                        height="24" viewBox="0 0 24 24">
                        <path
                            d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                    </svg>
                </div>
            </div>
        </div>

        <div class="text-white text-3xl mt-12">
            {{ $route.params.feedName }}
        </div>

        <div class=" mt-12 flex items-center justify-center">
            <div class="mt-2 flex flex-wrap justify-center  gap-12">

                <template v-for="(feed, feedIndex) in data.alldocs">

                    <template v-if="feed.type == 'multi_audio'">
                        <div style="background:#06283D" v-for="(lesson, i) in JSON.parse(feed.val)"
                            class=" p-12 rounded-md shadow-md drop-shadow w-96">

                            <span class="text-white text-3xl mb-2">{{ lesson.lessonName }}</span>

                            <div class="mt-4">
                                <audio controls>
                                    <source :src="lesson.fileURL" type="audio/mpeg">
                                    Your browser does not support the audio element.
                                </audio>
                            </div>
                        </div>
                    </template>


                </template>


            </div>
        </div>
        </template>

        <template v-else>
            
            <div class="text-white text-3xl p-2">
                loading...
            </div>

        </template>
    </div>
</template>


<script>
import axios from 'axios';

export default {
    data() {
        return {
            data: null,
            selectedFeed: null,
            isLoaded:false
        }
    },
    methods: {
        close() {
            this.$router.push("/")
        }
    },
    created() {
        const feedId = this.$route.params.langid;

        axios.get(`https://hello.talkfs.workers.dev/?feed=${feedId}`).then((resp) => {
            this.data = resp.data;
            this.selectedFeed = feedId;
            this.isLoaded = true;
        });
    }
}

</script>