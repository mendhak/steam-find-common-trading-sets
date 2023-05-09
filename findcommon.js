const axios = require("axios");
const {table} = require('table');
const chalk = require('chalk');

const getData = async url => {

    try {
        const response = await axios.get(url);
        return response.data;
   
    } catch (error) {
        console.error(`Response data: ${error.response.data}`);
        console.error(`Response status: ${error.response.status}`);
        console.error(error.response.headers);
    }
   
}


async function getTradingCardSet(profileId, startAssetId="") {
    let userTradingCards = [];

    console.log(chalk.gray(`Fetching inventory for ${profileId}...`));

    const userInventory = await getData(`https://steamcommunity.com/inventory/${profileId}/753/6?l=english&count=5000&start_assetid=${startAssetId}`);
    
    if( !userInventory?.descriptions ){
        console.error(`Could not fetch inventory for ${profileId}.`);
        process.exit(1);
    }

    userInventory.descriptions.forEach(element => {
        if(element.type != "Steam Gems" 
            && element.type != "Booster Pack" 
            && !element.type.endsWith("Sticker")
            && !element.type.endsWith("Emoticon") 
            && !element.type.endsWith("Background") ){
            userTradingCards.push({ "type": element.type, "name": element.name});
        }
    });

    if(userInventory.more_items){
        await new Promise(r => setTimeout(r, 2000));
        userTradingCards.push(...await getTradingCardSet(profileId,userInventory.last_assetid));
    }
   
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
    let firstUserSet = await getTradingCardSet(firstUserProfileId);
    console.log(chalk.gray(`${firstUserProfileId} has ${firstUserSet.length} items`));
    let secondUserSet = await getTradingCardSet(secondUserProfileId);
    console.log(chalk.gray(`${secondUserProfileId} has ${secondUserSet.length} items`));
    
    let commonSetNames = await getCommonSetNames(firstUserSet, secondUserSet);

    let commonSets = [];
    
    commonSets.push([ chalk.blue.bold("Set Name"), chalk.blue.bold(`${firstUserProfileId}'s items`), chalk.blue.bold(`${secondUserProfileId}'s items`) ]);

    commonSetNames.forEach(c => {
        let row = [];

        firstUserSetItems = firstUserSet.filter(f=>f.type==c).sort((a,b) => a.name.localeCompare(b.name));
        secondUserSetItems = secondUserSet.filter(s=>s.type==c).sort((a,b) => a.name.localeCompare(b.name));

        //Find the common card names between both sets, so we can gray them out later. 
        namesOfCommonItemsInThisSet = firstUserSetItems.map(f => f.name).filter(f => secondUserSetItems.map(s=> s.name).includes(f));
        
        //The set name
        row.push(chalk.green(c));

        //The card name
        row.push(firstUserSetItems.map(s => {

            if(namesOfCommonItemsInThisSet.includes(s.name)){
                return chalk.dim.white(s.name);
            }
            
            return s.name;
        }).join('\n'));
        row.push(secondUserSetItems.map(s => {

            if(namesOfCommonItemsInThisSet.includes(s.name)){
                return chalk.dim.white(s.name);
            }
            
            return s.name;
        }).join('\n'));
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

