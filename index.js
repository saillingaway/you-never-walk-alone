'use strict';

const twilio = require('twilio');
const MessagingResponse = twilio.twiml.MessagingResponse;

const {SecretManagerServiceClient} = require('@google-cloud/secret-manager');
const client = new SecretManagerServiceClient();

const projectId = process.env.GCLOUD_PROJECT;
const accountSid = process.env.TWILIO_ACCOUNT_SID;
//const authToken = process.env.TWILIO_AUTH_TOKEN;
const name = 'projects/499116149825/secrets/twilio_auth_token/versions/1';
const region = 'us-central1';

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

    let isValid = true;
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
    if (!isValid) {
        res
            .type('text/plain')
            .status(403)
            .send('Twilio Request Validation Failed.')
            .end();
        return;
    }

    const response = new MessagingResponse();
    response.message('Thanks for using You Never Walk Alone. ' +
        'Reply with one of the members to get a little encouragement:' +
        ' yoon, namu, jk, hobi, jin, jimin or tae');
    res
        .status(200)
        .type('text/xml')
        .end(response.toString());
};