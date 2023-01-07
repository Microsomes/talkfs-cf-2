<template>
    <div class="h-screen bg-yellow-300 flex  justify-center w-screen">
        <div class="w-1/2 mt-12 h-96 bg-blue-800 rounded-md">
            <div class="rounded-md text-centre w-full h-6 bg-black text-white  items-center">
                Create a Free Account with Talkfs.com for life.
            </div>
            <div class="flex items-center flex-col justify-center" >
                <div class="h-20 cursor-pointer hover:scale-75 mt-6 w-20 rounded-full bg-yellow-300">
                        
                </div>
                <p class="text-white">Upload a profile Image. Click the circle.</p>
                <form class="w-1/2 flex space-y-3 flex-col mt-3">
                    <input ref="fu" type="file" class="hidden"/>
                    <input class="w-full rounded-md pl-2 h-6" type="text" placeholder="Username"/>
                    <input class="w-full rounded-md pl-2 h-6" type="text" placeholder="Password"/>
                    <input class="text-white bg-black rounded-md cursor-pointer hover:scale-150" type="submit" value="Create"/>
                </form>
            </div>
        </div>
    </div>
</template>