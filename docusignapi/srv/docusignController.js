const express = require('express');
const router  = express.Router();
const axios   = require("axios").default;

router.post('/getUserData', async (req, res) => {

    res.set('Content-Type', 'application/json');

    /*
    var data = 
        { "userdata": 
            {
                "user_account_id": "01020304",
                "user_account_guid": "ABCDEFG-123456-HIJKLM-098765",
                "user_account_api_guid": "123456-ABCDEFG-HIJKLM-098765",
                "user_account_uri": "http://docusignapiteste.com.br",
                "user_account_email": "kleber.araujo@spro.com.br",
                "user_account_pass": "123456",
                "apps": [{
                    "app_name": "TesteApp1",
                    "integration_key": "78e2f2e3-5d73-4727-baff-a11d3556641f",
                    "status": "Ativo",
                    "action": "Habilitar"
                }, {
                    "app_name": "TesteApp2",
                    "integration_key": "79e2f2e3-5d73-4727-baff-a11d3556641f",
                    "status": "Ativo",
                    "action": "Habilitar"
                }, {
                    "app_name": "TesteApp3",
                    "integration_key": "79e2f2e3-5d73-4727-baff-a11d3556641f",
                    "status": "Ativo",
                    "action": "Habilitar"
                }, {
                    "app_name": "TesteApp4",
                    "integration_key": "79e2f2e3-5d73-4727-baff-a11d3556641f",
                    "status": "Ativo",
                    "action": "Habilitar"
                }, {
                    "app_name": "App 5",
                    "integration_key": "79e2f2e3-5d73-4727-baff-a11d3556641f",
                    "status": "Inativo",
                    "action": "Habilitar"
                }]
            } 
        };

    res.send(data);
    */
    
});

router.post('/getUserInfo', async (req, res) => {

    var token = req.body.token;

    var options = {
        method: 'GET',
        url: 'https://account-d.docusign.com/oauth/userinfo',
        headers: {
            cookie: '__RequestVerificationToken=AWUbRfbGBttxudiFx_EM4n8B0',
            Authorization: `Bearer ${token}`  
        }
    };

    axios.request(options).then(function (response) {
        
        res.set('Content-Type', 'application/json');
        res.send(response.data);

        }).catch(function (error) {
            console.error(error);
            res.set('Content-Type', 'application/json');
            res.send(error.response.data);
    });
});


router.post('/getAccessToken', async (req, res) => {

    //Assertion: Token gerado no https://jwt.io/ com as chaves da conta e App
    //vide https://developers.docusign.com/platform/auth/jwt/jwt-get-token/

    var assertion = req.body.assertion;
    var options = {
        method: 'POST',
        url: 'https://account-d.docusign.com/oauth/token',
        headers: {
            cookie: '__RequestVerificationToken=AWUbRfbGBttxudiFx_EM4n8B0',
            'Content-Type': 'multipart/form-data; boundary=---011000010111000001101001',
            Authorization: 'Bearer undefined'
        },
        data: `-----011000010111000001101001\r\nContent-Disposition: form-data; name="grant_type"\r\n\r\nurn:ietf:params:oauth:grant-type:jwt-bearer\r\n-----011000010111000001101001\r\nContent-Disposition: form-data; name="assertion"\r\n\r\n${assertion}\r\n-----011000010111000001101001--\r\n`
    };

    axios.request(options).then(function (response) {

        res.set('Content-Type', 'application/json');
        res.send(response.data);

        }).catch(function (error) {
            console.error(error.response.data);
            res.set('Content-Type', 'application/json');
            res.send(error.response.data);

    });
});

router.post('/getDocumentStatus', async (req, res) => {

    // Exemplo da requisição
    // https://demo.docusign.net/restapi/v2.1/accounts/13576193/envelopes/1f37b925-b258-4a5a-bdef-1919b96822bb

    var account_id  = req.body.account_id;
    var envelope_id = req.body.envelope_id;
    var token       = req.body.token;
    var base_uri    = req.body.uri;
    
    var options = {
        method: 'GET',
        url: `${base_uri}/restapi/v2.1/accounts/${account_id}/envelopes/${envelope_id}`,
        headers: {
            cookie: '__RequestVerificationToken=AWUbRfbGBttxudiFx_EM4n8B0',
            Authorization: `Bearer ${token}`  
        }
    };

    axios.request(options).then(function (response) {

        res.set('Content-Type', 'application/json');
        res.send(response.data);

        }).catch(function (error) {
            console.error(error.response.data);
            res.set('Content-Type', 'application/json');
            res.send(error.response.data);

    });
});

router.post('/sentEnvelope', async (req, res) => {

    var token = req.body.token;
    var base_uri = req.body.uri;
    var account_id = req.body.account_id;
    var document64 = req.body.document64;
    var docName = req.body.docName;
    var docId = req.body.docId;
    var subject = req.body.subject;
    var clientUserId = req.body.clientUserId;
    var clientUserEmail = req.body.clientUserEmail;
    var clientUserName = req.body.clientUserName;
    var recipientId = req.body.recipientId;

    var options = {
        method: 'POST',
        url: `${base_uri}/restapi/v2.1/accounts/${account_id}/envelopes`,
        headers: {
            cookie: '__RequestVerificationToken=AWUbRfbGBttxudiFx_EM4n8B0',
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
         data: { 
            documents: [{
                documentBase64: `${document64}`,
                documentId: `${docId}`,
                fileExtension: 'pdf',
                name: `${docName}`,
            }],
            emailSubject: `${subject}`,
            recipients: {
                signers: [
                    {
                        email: `${clientUserEmail}`,
                        name: `${clientUserName}`,
                        recipientId: `${recipientId}`
                    }
                ]
            },
            status: 'sent'
         }        
         //clientUserId: `${clientUserId}`,   
    };

    axios.request(options).then(function (response) {

        res.set('Content-Type', 'application/json');
        res.send(response.data);

        }).catch(function (error) {
            console.error(error.response.data);
            res.set('Content-Type', 'application/json');
            res.send(error.response.data);

    });
});

module.exports = app => app.use('/docusign', router);