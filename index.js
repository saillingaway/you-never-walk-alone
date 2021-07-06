'use strict';

const url = require('url');

// const twilio = require('twilio');
// const MessagingResponse = twilio.twiml.MessagingResponse;
const MessagingResponse = require('twilio').twiml.MessagingResponse;

const {SecretManagerServiceClient} = require('@google-cloud/secret-manager');
const client = new SecretManagerServiceClient();

const {Storage} = require('@google-cloud/storage');
const storage = new Storage();

const projectId = process.env.GCLOUD_PROJECT;
const accountSid = process.env.TWILIO_ACCOUNT_SID;
//const authToken = process.env.TWILIO_AUTH_TOKEN;
const name = 'projects/499116149825/secrets/twilio_auth_token/versions/1';
const region = 'us-central1';
let photo = "../mocks/taehyung_img.JPG";

//let memberData = require('data.json');

let memberData = {
    "namjoon": {
        "quote": "Life is a sculpture that you cast as you make mistakes and learn from them.",
        "img": "https://storage.googleapis.com/you-never-walk-alone/ynwa-BTS/BTS_Hoseok/stars.jpeg"
    },
    "seokjin": {
        "quote": "You worked hard. Keep trying your best.",
        "img": "https://storage.googleapis.com/you-never-walk-alone/ynwa-BTS/BTS_Hoseok/stars.jpeg"
    },
    "yoongi": {
        "quote": "Those who don’t have a dream, it’s okay, it’s okay if you don’t have a dream. You just have to be happy.",
        "img": "https://storage.googleapis.com/you-never-walk-alone/ynwa-BTS/BTS_Hoseok/stars.jpeg"
    },
    "hoseok": {
        "quote": "Don't ever make decisions based on fear. Make decisions based on hope and possibility",
        "img": "https://storage.googleapis.com/you-never-walk-alone/ynwa-BTS/BTS_Hoseok/stars.jpeg"
    },
    "jimin": {
        "quote": "Remember there is a person here in Korea, in the city of Seoul, who understands you.",
        "img": "https://storage.googleapis.com/you-never-walk-alone/ynwa-BTS/BTS_Hoseok/stars.jpeg"
    },
    "taehyung": {
        "quote": "Don’t be trapped in someone else’s dream.",
        "img": "https://storage.googleapis.com/you-never-walk-alone/ynwa-BTS/BTS_Hoseok/stars.jpeg"
    },
    "jungkook": {
        "quote": "Without anger or sadness, you won’t be able to feel true happiness.",
        "img": "https://storage.googleapis.com/you-never-walk-alone/ynwa-BTS/BTS_Hoseok/stars.jpeg"
    }
}

// initial reply sent on incoming text
exports.reply = (req, res) => {
    // connect to the secret manager
    //let version = undefined | String;
    // async function accessSecretVersion() {
    //     const [version] = await client.accessSecretVersion({
    //         name: name,
    //     });
    //     // extract payload as string
    //     const payload = version.payload.data.toString();
    // }
    // accessSecretVersion();

    // let isValid = true;
    // // Only validate that requests came from Twilio when the function has been
    // // deployed to production.
    // if (process.env.NODE_ENV === 'production') {
    //     isValid = twilio.validateRequest(
    //         payload,
    //         req.headers['x-twilio-signature'],
    //         `https://${region}-${projectId}.cloudfunctions.net/reply`,
    //         req.body
    //     );
    // }

    // Stop early if the request was not sent from Twilio
    // TODO: add logging
    // if (!isValid) {
    //     res
    //         .type('text/plain')
    //         .status(403)
    //         .send('Twilio Request Validation Failed.')
    //         .end();
    //     return;
    // }

    const response = new MessagingResponse();
    // response.message('Thanks for using You Never Walk Alone. ' +
    //     'Reply with one of the members to get a little encouragement:' +
    //     ' yoon, namu, jk, hobi, jin, jimin or tae');
    res
        .status(200)
        .type('text/xml')
        .end(response.toString());
};

exports.send_boys = (req, res) => {
    const response = new MessagingResponse();

    //const queryObject = url.parse(req.url,true).query;
    // console.log("queryObject: " + queryObject.toString());
    console.log("req member: req.query.memberName" + req.query.memberName);
    console.log("req body: req.body" + req.body.toString());
    // let msg = {
    //     "quote": "Those who don’t have a dream, it’s okay, it’s okay if you don’t have a dream. You just have to be happy.",
    //     "url": "https://storage.googleapis.com/you-never-walk-alone/ynwa-BTS/BTS_Hoseok/stars.jpeg"
    // };
    let memberName = "jungkook";
    let quote = memberData[memberName]['quote'];
    let photo = memberData[memberName]['img'];
    // if (mbrName !== undefined){
    //     let quote = memberData[mbrName]['quote'];
    //     let photo = memberData[mbrName]['img'];
    // }
    // else {
    //     quote = memberData["jungkook"]["quote"];
    //     photo = memberData["jungkook"]["img"];
    // }
    // mbrName = req.body.memberName;

    // response.message(quote);

    // response.message('Those who don’t have a dream, it’s okay, it’s okay if you don’t have a dream. You just have to be happy.');
    // response.message.media(photo);
    // message.media('https://storage.googleapis.com/you-never-walk-alone/ynwa-BTS/BTS_Hoseok/stars.jpeg');

    const message = response.message();
    message.body(quote);
    message.media(photo);

    console.log(response.toString());
    res
        .writeHead(200, {'Content-Type': 'text/xml'})
        .end(response.toString());
};
