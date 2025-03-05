const fs = require("fs");


const feeds = require("./feeds_lang.json");

// var allLanguages = {
//     'Lang': {
//         'Module1':[
//             {}
//         ]
//     }
// }

var allLanguages = {};

var moduleToLang = {
    'Eastern Arabic': ['EasternArabic', 'EasternArabic2','EasternArabic3'],
    'Egyptian Arabic': ['EgyptianArabic'],
    'Japanese': ['Japanese1', 'Japanese2', 'Japanese3'],
    'Modern Arabic': ['ModernArabic', 'ModernArabic2', 'ModernArabic3'],
    'Pashto': ['Pashto1'],
    'Romanian': ['Romanian'],
    'Spanish': ['Spanish1', 'Spanish2', 'Spanish3'],
    'Swedish': ['Swedish1'],
    'Twi': ['Twi']
}


function getHumanNameFromModule(module){
    var toReturn = '';

    Object.keys(moduleToLang).forEach((lang)=>{
        if(moduleToLang[lang].includes(module)){
            toReturn = lang;
        }
    })

    return toReturn;
}

var allLanges = {}

feeds.forEach((feed)=>{
    const humanName = getHumanNameFromModule(feed.feedName);
    const moduleName = feed.feedName;
    console.log(humanName+"_"+moduleName);

    if(allLanges[humanName] == undefined){
        allLanges[humanName] = {};
    }


    allLanges[humanName][moduleName] = [];

    feed.allDocsData.forEach((doc)=>{
        // console.log(doc.type)

        if(doc.type == "sound"){
            // console.log(doc)
            console.log(doc.val.text)
            console.log(doc.val.image)

            allLanges[humanName][moduleName].push({
                text: doc.val.text,
                audio: doc.val.image
            })

        }
        
        if(doc.type == "multi_audio"){
            var allMedia = JSON.parse(doc.val);

            allMedia.forEach((media)=>{
               console.log(media.lessonName)
               console.log(media.fileURL)

               allLanges[humanName][moduleName].push({
                text: media.lessonName,
                audio: media.fileURL
            })

            })
        }
    })


})


console.log(allLanges)

fs.writeFileSync("feeds_lang_cleaned.json", JSON.stringify(allLanges, null, 2))