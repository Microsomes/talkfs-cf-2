var admin = require("firebase-admin");
const fss = require('fs');

var serviceAccount = require("./social-e5fb1-firebase-adminsdk-wbnqh-6d0bb6b99d.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://social-e5fb1.firebaseio.com"
});

var allFeeds = {}

var allAcceptedLangs = {
    'EasternArabic' : 1,
    'EasternArabic2': 1,
    'EasternArabic3':1,
    'EgyptianArabic':1,
    'Japanese1':1,
    'Japanese2':1,
    'Japanese3':1,
    'ModernArabic':1,
    'ModernArabic2':1,
    'ModernArabic3':1,
    'Pashto1':1,
    'Romanian':1,
    'Spanish1':1,
    'Spanish2':1,
    'Spanish3': 1,
    'Swedish1': 1,
    'Twi':1
};

(async ()=>{
    console.log("attempt to fetch")

    const fs = admin.firestore();

    const feeds = await  fs.collection('feeds').get();

    var allFeedsToCheck = [];
    var feed= {}

    feeds.docs.forEach((doc) => {
        if(doc.id in allAcceptedLangs){
            allFeedsToCheck.push(doc.id);
            feed[doc.id] = doc.data();
        }
    })

   var allLangData = [];


    for(var i=0;i<allFeedsToCheck.length;i++){
        const feedData = await fs.collection('feeds').doc(allFeedsToCheck[i]).collection('feed').get();
        console.log(feedData.docs.length)

        var allDocsData = [];

        feedData.docs.forEach((doc) => {
            allDocsData.push(doc.data());
        })


        allLangData.push({
            feedName: allFeedsToCheck[i],
            feedData: feed[allFeedsToCheck[i]],
            allDocsData: allDocsData
        })

    }

    fss.writeFileSync('feeds_lang.json', JSON.stringify(allLangData), 'utf-8');


})()

// admin.firestore().collection('feeds').get().then(function (querySnapshot) {
//     querySnapshot.forEach(async function (doc) {
//         // console.log(doc.id, ' => ', doc.data());

//         if(doc.id in allAcceptedLangs){
//             var datas = {
//                 feedinfo: doc.data(),
//                 'feeds': {}
//             }

//         const docs = await admin.firestore().collection('feeds').doc(doc.id).collection('feed').get();

//         docs.forEach((doc) => {
//             datas['feeds'][doc.id] = doc.data()
//         });

//         allFeeds[doc.id] = datas
        
    
//     }

//     });

//     fs.writeFileSync('feeds_lang.json', JSON.stringify(allFeeds), 'utf-8');
//     console.log('feeds.json created');
// });

