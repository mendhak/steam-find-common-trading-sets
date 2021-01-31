const axios = require("axios")

const getData = async url => {

    try {
        const response = await axios.get(url);
        return response.data;
   
    } catch (error) {
        console.error(error);
    }
   
}


async function getTradingCardSetNames(profileId) {
    let userTradingCards = [];

    const userInventory = await getData(`https://steamcommunity.com/inventory/${profileId}/753/6?l=english&count=5000`);

    userInventory.descriptions.forEach(element => {
        userTradingCards.push(element.type);
    });

    let uniqueFirstUserTradingCards = [...new Set(userTradingCards)]
    
    return uniqueFirstUserTradingCards;
}

async function begin(firstUserProfileId, secondUserProfileId) {
    let firstUserSetNames = await getTradingCardSetNames(firstUserProfileId);
    // console.log(firstUserSetNames);
    let secondUserSetNames = await getTradingCardSetNames(secondUserProfileId);
    // console.log(secondUserSetNames);

    const commonSetNames = firstUserSetNames.filter(v => secondUserSetNames.includes(v));
    
    commonSetNames.forEach(s => console.log(s));
    
}

(async () => begin("76561197984170060","76561197984170060") )();
