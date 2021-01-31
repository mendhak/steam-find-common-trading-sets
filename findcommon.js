const axios = require("axios");
const {table} = require('table');
const chalk = require('chalk');

const getData = async url => {

    try {
        const response = await axios.get(url);
        return response.data;
   
    } catch (error) {
        console.error(error.response.data);
        console.error(error.response.status);
        console.error(error.response.headers);
    }
   
}


async function getTradingCardSetNames(profileId) {
    let userTradingCards = [];

    const userInventory = await getData(`https://steamcommunity.com/inventory/${profileId}/753/6?l=english&count=5000`);

    if(!userInventory.descriptions){
        console.error(`Could not fetch inventory for ${profileId}.`);
        process.exit(1);
    }

    userInventory.descriptions.forEach(element => {
        userTradingCards.push({ "type": element.type, "name": element.name});
    });

    //let uniqueFirstUserTradingCards = [...new Set(userTradingCards)]
    
    return userTradingCards;
}

async function getCommonSetNames(firstSet, secondSet){
    let commonSetNames = []
    const commonSets = firstSet.filter(
        function(o1){
            return secondSet.some(function(o2){
                return o1.type === o2.type;
            })
        }
    );

    commonSets.forEach(c => commonSetNames.push(c.type));
    let uniqueCommonSetNames = [...new Set(commonSetNames)];
    return uniqueCommonSetNames;
}

async function begin(firstUserProfileId, secondUserProfileId) {
    let firstUserSet = await getTradingCardSetNames(firstUserProfileId);
    let secondUserSet = await getTradingCardSetNames(secondUserProfileId);
    
    let commonSetNames = await getCommonSetNames(firstUserSet, secondUserSet);

    let commonSets = [];
    
    commonSets.push([ chalk.blue.bold("Set Name"), chalk.blue.bold(`${firstUserProfileId}'s items`), chalk.blue.bold(`${secondUserProfileId}'s items`) ]);

    commonSetNames.forEach(c => {
        let row = [];

        row.push(chalk.green(c));
        row.push(firstUserSet.filter(s => s.type==c).map(s => s.name).join(', '));
        row.push(secondUserSet.filter(s => s.type==c).map(s => s.name).join(', '));
        commonSets.push(row);
    });

    let tableConfig = {
        columns: {
          0: {
            paddingLeft: 3
          },
          1: {
            width: 50,
            paddingRight: 3,
            wrapWord: true
          },
          2: {
            width: 50,
            paddingRight: 3,
            wrapWord: true
          }
        }
    };

    console.log(table(commonSets, tableConfig));
   
}

let args = process.argv.slice(2);
if(args.length < 2){
    console.error("Plese provide two profile IDs");
    process.exit(1);
}

const firstUserProfileId = args[0];
const secondUserProfileId = args[1];

(async () => begin(firstUserProfileId,secondUserProfileId) )();

