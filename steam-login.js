const SteamUser = require('steam-user');
const TradeOfferManager = require('steam-tradeoffer-manager');

const steamClient = new SteamUser();


const createPrompt = require('prompt-sync');
const prompt = createPrompt({});

// The prompt object's hide method gives a prompt where the input 
// is hidden
const username = prompt("Enter a username:")
const password = prompt.hide('Enter a password: ');


steamClient.logOn({
  accountName: username,
  password: password,
});

steamClient.on('loggedOn', () => {
  console.log('Logged into Steam');

  const userId = steamClient.steamID.getSteamID64();
  console.log(steamClient);
  console.log(userId)
  const manager = new TradeOfferManager({
    steam: steamClient,
    domain: 'localhost',
    language: 'en'
  });
  manager.getUserInventoryContents(userId, 753,6, true, (err, inventory) => {
    console.log(err);
    console.log(inventory);
  })
//   manager.loadInventory(userId, 753, 6, true, (err, inventory) => {
//     if (err) {
//       console.log(err);
//       return;
//     }

//     console.log('Inventory:', inventory);
//   });
});