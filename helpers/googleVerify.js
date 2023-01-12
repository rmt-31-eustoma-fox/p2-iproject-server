const {OAuth2Client} = require('google-auth-library');

CLIENT_ID=process.env.CLIENT_ID;

const client = new OAuth2Client(CLIENT_ID);

async function verifyGToken(token) {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
        // Or, if multiple clients access the backend:
        //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    });
    const payload = ticket.getPayload();
    // const userid = payload['sub'];
    // If request specified a G Suite domain:
    // const domain = payload['hd'];   
    return payload;
}

module.exports = verifyGToken;