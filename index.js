'use strict';

const {SecretManagerServiceClient} = require('@google-cloud/secret-manager');
const client = new SecretManagerServiceClient();
const {Storage} = require('@google-cloud/storage');
const storage = new Storage();

// TODO: fix auth: validate request came from Twilio
const projectId = process.env.GCLOUD_PROJECT;
const accountSid = process.env.TWILIO_ACCOUNT_SID;
//const authToken = process.env.TWILIO_AUTH_TOKEN;

const name = 'projects/499116149825/secrets/twilio_auth_token/versions/1';
const region = 'us-central1';
let photo = "../mocks/taehyung_img.JPG";
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false })

const memberAliases = require('./memberAliasMap.json');
let memberData = require('./memberData.json');
const sinon = require("sinon");


// loads memberAliasMap.json as an obj and matches the recieved
// member nickname to my key for memberData.
function matchMember(memberName) {
    let name;
    name = memberAliases[memberName]
    return name;
}

// let memberData = {
//     "namjoon": {
//         "quote": "Life is a sculpture that you cast as you make mistakes and learn from them.",
//         "img": "https://storage.googleapis.com/you-never-walk-alone/ynwa-BTS/BTS_Namjoon/heart.JPG"
//     },
//     "seokjin": {
//         "quote": "You worked hard. Keep trying your best.",
//         "img": "https://storage.googleapis.com/you-never-walk-alone/ynwa-BTS/BTS_Seokjin/smile.JPG"
//     },
//     "yoongi": {
//         "quote": "Those who don’t have a dream, it’s okay, it’s okay if you don’t have a dream. You just have to be happy.",
//         "img": "https://storage.googleapis.com/you-never-walk-alone/ynwa-BTS/BTS_Yoongi/happyYoongi.JPG"
//     },
//     "hoseok": {
//         "quote": "Don't ever make decisions based on fear. Make decisions based on hope and possibility",
//         "img": "https://storage.googleapis.com/you-never-walk-alone/ynwa-BTS/BTS_Hoseok/stars.jpeg"
//     },
//     "jimin": {
//         "quote": "Remember there is a person here in Korea, in the city of Seoul, who understands you.",
//         "img": "https://storage.googleapis.com/you-never-walk-alone/ynwa-BTS/BTS_Jimin/pinkHeart.JPG"
//     },
//     "taehyung": {
//         "quote": "Don’t be trapped in someone else’s dream.",
//         "img": "https://storage.googleapis.com/you-never-walk-alone/ynwa-BTS/BTS_Taehyung/MonstersINC.JPG"
//     },
//     "jungkook": {
//         "quote": "Without anger or sadness, you won’t be able to feel true happiness.",
//         "img": "https://storage.googleapis.com/you-never-walk-alone/ynwa-BTS/BTS_Jungkook/pillow.JPG"
//     }
// }

exports.send_boys = (req, res) => {
    let name;
    let quote;
    let media;
    console.log("content-type: "+ req.get('content-type'))
    switch (req.get('content-type')) {
        // '{"name":"John"}'
        // case 'application/json':
        //     ({name} = req.body.memberName);
        //     console.log("app/json" + req.body.memberName);
        //     console.log({name});
        //     break;
        //
        // // 'John', stored in a Buffer
        // case 'application/octet-stream':
        //     name = req.body.toString(); // Convert buffer to a string
        //     console.log("app/octet" + req.body.memberName);
        //     console.log({name});
        //     break;
        //
        // // 'John'
        // case 'text/plain':
        //     name = req.body;
        //     console.log("txt/plain" + req.body.memberName);
        //     console.log({name});
        //     break;

        // 'name=John' in the body of a POST request (not the URL)
        case 'application/x-www-form-urlencoded; charset=utf-8':
            name = req.body.memberName.toString();
            name = name.toLowerCase();
            name = matchMember(name);
            // console.log("app/x-www: " + req.body.memberName);
            // console.log("member: "+ req.body.memberName);
            // console.log("photo: "+ photo);
            // console.log("{name}: " + {name});
            // console.log("name: " + name);
            // console.log("testName: " + testName);
            // console.log("photo: " + memberData[testName]['img']);
            //member = req.body.memberName;
            quote = memberData[name]['quote'];
            media = memberData[name]['img'];
            break;
    }
    let responseData = {
        "member": `${name}`,
        "quote": `${quote}`,
        "img_link" : `${media}`
    }
    res.status(200).setHeader('Content-Type', 'application/json').send(responseData);
};

module.exports = { matchMember };