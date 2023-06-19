var firebase = require('firebase-admin');
if (!firebase.apps.length) {
    firebase.initializeApp();
}

const express = require("express");
const api = express();

const { ethers } = require("ethers");

const streamerJSON = require(__base + 'social/Streamer.json');

const fetch = require('node-fetch');

const nftContract = `0xDb46d1Dc155634FbC732f92E853b10B288AD5a1d`; // lens Profiles on Polygon
const lensAPI = `https://api.lens.dev/`;
const tokenbound = require("@tokenbound/sdk-ethers");
console.log(tokenbound);

var provider = new ethers.providers.JsonRpcProvider({"url": process.env.API_URL_GOERLI});
var providerPolygon = new ethers.providers.JsonRpcProvider({"url": process.env.API_URL_POLYGON});
var signer;

async function getLensProfile(user) {
    const handle = user.handle;
    return new Promise(async (resolve, reject) => {
        const headers = {
            'Content-Type': 'application/json'
        };
        var res = await fetch(lensAPI, { 
        method: 'POST', 
        headers: headers,
        body: JSON.stringify({
            query: `
            query Profile {
                profile(request: { handle: "${handle}" }) {
                    id
                    name
                    bio
                    attributes {
                    displayType
                    traitType
                    key
                    value
                    }
                    followNftAddress
                    metadata
                    isDefault
                    picture {
                    ... on NftImage {
                        contractAddress
                        tokenId
                        uri
                        verified
                    }
                    ... on MediaSet {
                        original {
                        url
                        mimeType
                        }
                    }
                    __typename
                    }
                    handle
                    coverPicture {
                    ... on NftImage {
                        contractAddress
                        tokenId
                        uri
                        verified
                    }
                    ... on MediaSet {
                        original {
                        url
                        mimeType
                        }
                    }
                    __typename
                    }
                    ownedBy
                    dispatcher {
                    address
                    canUseRelay
                    }
                    stats {
                    totalFollowers
                    totalFollowing
                    totalPosts
                    totalComments
                    totalMirrors
                    totalPublications
                    totalCollects
                    }
                    followModule {
                    ... on FeeFollowModuleSettings {
                        type
                        amount {
                        asset {
                            symbol
                            name
                            decimals
                            address
                        }
                        value
                        }
                        recipient
                    }
                    ... on ProfileFollowModuleSettings {
                        type
                    }
                    ... on RevertFollowModuleSettings {
                        type
                    }
                    }
                }
                }                  
                `
        })
        });
        var profileResult = await res.json();        
        resolve(profileResult.data.profile);
    });
}

function getParams(req, res, next) {
    var params;
    if (req.method === 'POST') {
      params = req.body;
    } else {
      params = req.query;
    }
    req.q = params;
    next();
}

function cors(req, res, next) {
    res.set('Access-Control-Allow-Origin', '*');
    if (req.method === 'OPTIONS') {
      // Send response to OPTIONS requests
      res.set('Access-Control-Allow-Methods', 'GET, POST');
      res.set('Access-Control-Allow-Headers', 'Content-Type');
      res.set('Access-Control-Max-Age', '3600');
      return res.status(204).send('');
    } else {
      // Set CORS headers for the main request
      res.set('Access-Control-Allow-Origin', '*');
    }
    next();
}

api.use(cors);
api.use(getParams);

api.get("/api", async function (req, res) {
    return res.json({"what": "tokenbound.social", "why": "tba"});
});

api.get("/api/widget", async function (req, res) {
    var from = {};
    var to = {};
    from.handle = req.q.from;
    to.handle = req.q.to;
    
    from.profile = await getLensProfile(from);

    to.profile = await getLensProfile(to);

    to.tba = await tokenbound.getAccount(nftContract, to.profile.id, providerPolygon);

    return res.json({"from": from, "to": to});
});

module.exports.api = api;

