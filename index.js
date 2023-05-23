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

const memberAliases = require('./memberAliasMap.json');
let memberData = require('./memberData.json');

exports.send_boys = (req, res) => {
    let name;
    let quote;
    let media;
            name = req.body.memberName.toString().toLowerCase();
            name = memberAliases[name];
            quote = memberData[name]['quote'];
            media = memberData[name]['img'];
    try {
        let responseData = {
            "member": `${name}`,
            "quote": `${quote}`,
            "img_link" : `${media}`
        }
        res.status(200).setHeader('Content-Type', 'application/json').send(responseData);
    } catch(error) {
        console.error('Failed to set responseData: ', error)
        res.status(500).send('An Internal Server Erorr occurred.')
    }
};