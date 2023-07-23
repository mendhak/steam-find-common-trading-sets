var SteamCommunity = require('steamcommunity');
var SteamID = SteamCommunity.SteamID;

var sid = new SteamID('[U:1:46143802]');
console.log(sid.toString()); // 76561198006409530



let community = new SteamCommunity();
community.getSteamUser("mendhak", (err, cSteamuser) => {
    console.log(err);
    // console.log(cSteamuser);

    cSteamuser.getInventoryContents(753, 6, true, "english", (err, inventory) => {
        console.log(err);
        console.log(inventory);
    })
});

