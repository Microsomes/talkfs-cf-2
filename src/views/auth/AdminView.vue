<template>

<div>
    
    <div  class="p-12">
        <h1 class="text-5xl">ADMIN</h1>

        <p>Click to Populate</p>
    
        <button @click="loadFeed(feedIndex)" class="btn bg-green-300 text-black rounded-md p-1 text-xl m-2 cursor-pointer" :key="feed.id" v-for="(feed,feedIndex) in feeds">
            {{feed.id}}
        </button>

        <form class="bg-black rounded-md text-white flex p-12 items-center justify-center flex-col">
            <p>Add Language Form</p>
            <input class="border-2 rounded-md text-black p-1 mt-2" type="text" placeholder="password" name="password"/>
            <input v-model="inp.val" class="border-2 rounded-md text-black p-1 mt-2" :key="inp.name" v-for="inp in form.fields"  :type="inp.type" :placeholder="inp.title"/>

            <button @click.prevent="addSection" class="btn bg-green-300 rounded-md p-1 mt-2 text-black">Add Section</button>

            <template :key="section.name" class="mt-2" v-for="(section,index) in form.sections">
                <div class="flex flex-col relative bg-gray-300 p-2 m-2 mt-6 rounded-md">
                    <div @click="cutSection(index)" style="right:-10px;top:-10px" class="cursor-pointer text-black absolute w-6 h-6x bg-white rounded-full">X</div>
                    <input v-model="inp.val" class="border-2 rounded-md text-black p-1 mt-2" :key="inp.name" v-for="inp in section.fields"  :type="inp.type" :placeholder="inp.title"/>
                    <div class="bg-yellow-300 h-1 w-full"></div>
                    <template v-for="(lesson,lessonIndex) in section.lessons">
                        <template v-for="inp in lesson.fields">
                             <input v-if="inp.type == 'text'"  v-model="inp.val" class="border-2 rounded-md text-black p-1 mt-2"    :type="inp.type" :placeholder="inp.title"/>
                             <input v-if="inp.type == 'file'" @change="handleFile($event, index, lessonIndex)" class="border-2 rounded-md text-black p-1 mt-2"    :type="inp.type" :placeholder="inp.title"/>
                        </template>
                  
                    <div class="bg-green-300 mt-2 text-black rounded-md" v-if="lesson.uploaded">Uploaded</div>
                    </template>

                    <button @click.prevent="addLesson(index)" class="p-1 bg-green-300 rounded-md mt-12 text-black">Add Lesson</button>
                </div>
            </template>

            <div class="flex  space-x-6">
                <button @click.prevent="saveNewFeed" class="btn bg-green-300 mt-12 rounded-md text-black p-1">Save New Feed</button>
            </div>

        </form>

    </div>

</div>

</template>


<script>
window.onbeforeunload = function() {
  return "";
}

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCSdMgDkaOZX5p2x8XUQ8bM8PctvFeP5bg",
  authDomain: "social-e5fb1.firebaseapp.com",
  databaseURL: "https://social-e5fb1.firebaseio.com",
  projectId: "social-e5fb1",
  storageBucket: "social-e5fb1.appspot.com",
  messagingSenderId: "822884826653",
  appId: "1:822884826653:web:fc13527c669d06daca10f4",
  measurementId: "G-Q7NG4SF5CQ"
};

import { getFirestore, collection, getDocs, addDoc, setDoc, doc, getDoc } from 'firebase/firestore/lite';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);


export default{
    async created() {
        const feeds2Ref= collection(db, 'feeds2');
        getDocs(feeds2Ref).then(feeds => {
            feeds.docs.forEach(doc=>{
                this.feeds.push({
                    id: doc.id,
                    data: doc.data()
                });
            })
        });
    },
    methods:{
        loadFeed(feedIndex) {
            this.form= this.feeds[feedIndex].data;
        },
        saveDraftFeed() {

        },
        async saveNewFeed(){
            var feedName = prompt("What name would you like this feed to be saved under?");

            if(!feedName){
                alert("Save Aborted");
            }
            
            await setDoc(doc(db, "feeds2", feedName),this.form);

            alert("Feed Saved");


        },
        handleFile(n, sectionIndex, lessonIndex) {
            if(n.target.files.length>=1) {
                const f= n.target.files[0];
                const name = f.name;
                const uploadRef = ref(storage, `/talkfs/temp/lessons/${f.name}`);

                uploadBytes(uploadRef, f).then((snapshot) => {
                    getDownloadURL(uploadRef).then((url) => {
                        this.form.uploadedFiles.push({
                            name:name,
                            url:url,
                            ref:uploadRef.fullPath
                        })
                        this.form.sections[sectionIndex].lessons[lessonIndex].uploaded=true;
                        this.form.sections[sectionIndex].lessons[lessonIndex].fields[0].val= name;
                        this.form.sections[sectionIndex].lessons[lessonIndex].fields[1].url= url;
                        //todo- using hardcoded values

                    });
                })
            }
        },
        addLesson(index) {
            this.form.sections[index].lessons.push({
                fields:[
                    {
                        title:"Lesson Name",
                        type:"text",
                        val:""
                    },
                    {
                        title:"Lesson File",
                        type:"file",
                        val:"",
                        url:''
                    }
                ]
            })
        },
        cutSection(index) {
            this.form.sections.splice(index,1);
        },
        addSection() {
            this.form.sections.push({
                lessons:[],
                fields:[
                    {
                        type:"text",
                        title:"Section Name",
                        name:"section"
                    }
                ]
            })
        }
    },
    data:function(){
        return {
            feeds:[],
            form:{
                uploadedFiles: [],
                sections:[],
                fields:[
                    {
                        type:"text",
                        title:"Language",
                        name:"language"
                    }
                ]
            }   
    }
           
    }
}

</script>