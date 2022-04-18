<template>
    <div>

        login
        
    </div>
</template>



<script>

    import {auth} from '../../assets/fb.js';

    export default{
        methods:{
            login(){
                auth.signInWithPopup(new auth.GoogleAuthProvider());
            }
        }
    }
</script>
