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
const sinon = require("sinon");


// loads memberAliasMap.json as an obj and matches the recieved
// member nickname to my key for memberData.
function matchMember(memberName) {
    let name;
    name = memberAliases[memberName]
    return name;
}

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
