"use strcit";

const Web3 = require("web3");
const Discord = require("discord.js");
const BigNumber = require('bignumber.js');
const Tx = require("ethereumjs-tx");
const ContractFactory = require("ethereum-contracts");
const solc = require("solc");
const fs = require("fs");
const randomWord = require('random-word');
const botSettings = require("./config.json");
const price = require("./price.js");
const block = require("./gets/getblock.js");

// Load the full build.
var _ = require('lodash');

// update data
setInterval(price,300000);
setInterval(block,9000);

let cooldown = new Set();
let cdseconds = 7200000;

const prefix = botSettings.prefix;

const bot = new Discord.Client({disableEveryone:true});

var web3 = new Web3();

web3.setProvider(new web3.providers.HttpProvider('http://127.0.0.1:8045'));

bot.on('ready', ()=>{
	console.log("Ether-1 Discord Bot is Online.");
});

function sendCoins(address,value,message,name){

	web3.eth.sendTransaction({
	    from: botSettings.address,
	    to: address,
	    gas: web3.utils.toHex(120000),
	    value: value
	})
	.on('transactionHash', function(hash){
		// sent pm with their tx
		// recive latest array
		if(name != 1){
			let fValue = value/Math.pow(10,18).toFixed(8);
			let author = bot.users.find('username',name);
			author.send("Hi "+name+" , you are a lucky human. You just got " + fValue + " ETHO \n Check the following for your prize:\n  https://explorer.ether1.org/tx/"+ hash);
		} else {
			message.channel.send("Tip was sent. \n Check hash: https://explorer.ether1.org/tx/"+ hash)
		}


	})
	.on('error', console.error);
}


function raining(amount,message){
	// registered users
	var data = getJson();
	// online users
	var onlineUsers = getOnline();
	// create online and register array
	var onlineAndRegister = Object.keys(data).filter(username => {return onlineUsers.indexOf(username)!=-1});
	// create object with name - address and name - values
	var latest = {};
	for (let user of onlineAndRegister) {
	  if (data[user]) {
	    latest[data[user]] = user;
	  }
	}
	// if use wrong amount (string or something)
	var camount = amount/Object.keys(latest).length;
	var weiAmount = camount*Math.pow(10,18);

	message.channel.send("It just **rained** on **" + Object.keys(latest).length + "** users. Check pm's." );

	function rainSend(addresses){
		for(const address of Object.keys(addresses)){

			let name = addresses[address];
			sendCoins(address,weiAmount,message,name);
		}
	}
	// main function
	rainSend(latest);
}




// return array with names of online users
function getOnline(){
	var foo = [];
	var users = bot.users;
	users.keyArray().forEach((val) => {
		var userName = users.get(val).username;
		var status = users.get(val).presence.status;
		if(status == "online"){
			foo.push(userName);
		}
	});
	return foo;
}

function getJson(){
				return JSON.parse(fs.readFileSync('data/users.json'));
}
function getPrice(){
				return JSON.parse(fs.readFileSync('data/usdprice.txt'));
}
function getBlock(){
				return JSON.parse(fs.readFileSync('data/block.txt'));
}
const responseObject = {

}

bot.on('message',async message => {

	// Not admins cannot use bot in general channel
	if(message.channel.name === '🌐🗣-general' && !message.member.hasPermission('BAN_MEMBERS')) return;
	if(message.author.bot) return;
	//if(message.channel.type === "dm") return;


	var message = message;
	let args = message.content.split(' ');

	if(message.content.startsWith(prefix + "sendToAddress ")){
		if(!message.member.hasPermission('BAN_MEMBERS')){
			return message.channel.send("You cannot use the '!send' command.");
		}
		let address = args[1];
		let amount = Number(args[2]);
		// if use wrong amount (string or something)
		if (!amount) return message.channel.send("Error with the amount.");
		let weiAmount = amount*Math.pow(10,18);

		if(web3.utils.isAddress(args[1])){
			if(amount>10){
				message.channel.send("You tried to send more that 10 ETHO.");
			} else {
				// main function
				message.channel.send("You tried to send " + amount + " ETHO to " + address + " address.");
				sendCoins(address,weiAmount,message,1);
			}
		} else {
			message.channel.send("Wrong address");
		}
	}

	if(message.content.startsWith(prefix + "send ")){
		if(!message.member.hasPermission('BAN_MEMBERS')){
			return message.channel.send("You cannot use '!send' command.");
		}
                var length = args.length;
		let user = args[2];
                for (var i = 3; i < length; i++) {
                    user = user + " " + args[i];
                    console.log(user);
                }
                    console.log(user);
                user = user.replace("!","");
                console.log(user);

		let amount = Number(args[1]);
		// if use wrong amount (string or something)
		if (!amount) return message.channel.send("Error - you've entered the wrong amount.");

		let weiAmount = amount*Math.pow(10,18);
		let data = getJson();
                //console.log(data);
                //console.log(user);
                //console.log(amount);
		if(Object.keys(data).includes(user)){
			let address = data[user];
			message.channel.send("You tried to send " + amount+ " ETHO to "+user  );
			sendCoins(address,weiAmount,message,1); // main function
		} else {
			message.channel.send("This user is not registered.");
		}

	}

	if(message.content.startsWith(prefix + "rain")){
		if(!message.member.hasPermission('ADMINISTRATOR') && !message.member.hasPermission('COMMUNITY MANAGER') && !message.member.hasPermission('MODERATOR') && !message.member.hasPermission('COMMUNITY LEADERS')){
			return message.channel.send("You cannot use '!rain' command");
		}
		var amount = Number(args[1]);
		if (!amount) return message.channel.send("Error - you've entered wrong amount");
		// main func
		raining(amount,message);
	}

	if(message.content.startsWith(prefix + "sprinkle")){
		if(!message.member.hasPermission('ADMINISTRATOR') && !message.member.hasPermission('COMMUNITY MANAGER') && !message.member.hasPermission('MODERATOR') && !message.member.hasPermission('COMMUNITY LEADERS')){
			return message.channel.send("You cannot use '!rain' command");
		}
		var amount = Math.floor((Math.random() * 10) + 1);
		raining(amount,message);
	}

	if(message.content.startsWith(prefix + "downpour")){
                if(!message.member.hasPermission('ADMINISTRATOR') && !message.member.hasPermission('COMMUNITY MANAGER') && !message.member.hasPermission('MODERATOR') && !message.member.hasPermission('COMMUNITY LEADERS')){
			return message.channel.send("You cannot use '!rain' command");
		}
		var amount = Math.floor((Math.random() * 100) + 10);
		raining(amount,message);
	}

	if(message.content.startsWith(prefix + "myrain")){
                if(!message.member.hasPermission('ADMINISTRATOR') && !message.member.hasPermission('COMMUNITY MANAGER') && !message.member.hasPermission('MODERATOR') && !message.member.hasPermission('COMMUNITY LEADERS')){
			return message.channel.send("You cannot use '!myrain' command");
		}
		if(cooldown.has(message.author.id)) {
        message.channel.send("Wait 2 hours before typing this again. - " + message.author);
    } else {
        // the user can type the command ... your command code goes here :)
				var amount = Math.floor((Math.random() * 10) + 1);
			 	if (!amount) return message.channel.send("Error - you've entered the wrong amount");
			 	// main func
			 	raining(amount,message);
        // Adds the user to the set so that they can't talk for x
        cooldown.add(message.author.id);
        setTimeout(() => {
          // Removes the user from the set after a minute
          cooldown.delete(message.author.id);
        }, cdseconds);
    }
	}
	//

	if(message.content.startsWith(prefix + "coming ")){
                if(!message.member.hasPermission('ADMINISTRATOR') && !message.member.hasPermission('COMMUNITY MANAGER') && !message.member.hasPermission('MODERATOR') && !message.member.hasPermission('COMMUNITY LEADERS')){
			return message.channel.send("You cannot use '!rain' command");
		}
		let amount = Number(args[1]);
		//if use wrong amount (string or something)
		if(!amount) return message.channel.send("Error - you've entered the wrong amount");
		let time = Number(args[2])*3600000;
		if(!time) return message.channel.send("Please, set hours correctly");
		 // 1 hour = 3 600 000 milliseconds
		message.channel.send("Raining will be after **" + args[2] + "** hours.");

		// main func
		setTimeout(function(){
			raining(amount,message);
		},time);

	}

	if(responseObject[message.content]) {
		message.channel.send(responseObject[message.content]);
	}

	if(message.content === prefix + "block"){
		message.channel.send("Current ETHO blockchain height is: " + getBlock());
	}

	// Deploy Reward Spliting Contract
	if(message.content.startsWith(prefix + "split ")){
		var user1 = args[1];
		var user2 = args[2];
		let source = 'contract Split {address constant public user1 = ' + user1 + ';address constant public user2 = ' + user2 + ';function() payable public {if (msg.value > 0) {uint touser2 = msg.value / 2;uint touser1 = msg.value - touser2;user2.transfer(touser2);user1.transfer(touser1)}}}';

		let SplitCompiled = solc.compile(source, 1).contracts[':Split'];
		let Split = new web3.eth.Contract(JSON.parse(SplitCompiled.interface), null, {
    	data: '0x' + SplitCompiled.bytecode
		});
		Split.deploy().send({
    from: botSettings.address,
    gas: '4700000'
		}).then((instance) => {
		    console.log("User deployed a contract at: " + instance.options.address);
				message.author.send("Here is the contract address " + instance.options.address);
				return message.channel.send("User has been sent the address in a pm for privacy.");
		    SplitInstance = instance;
		});
	}

	//roll the dice with lodash
	if(message.content.startsWith(prefix + "roll")){
		let array = ['1','2','3','4','5','6','7','8','9','10','11','12'];
		let number = _.sample(array);
		let word = randomWord();
		message.channel.send("The dice hit the table and you get " + number + ", And the random word for this roll is: " + word + ".");
	}

	if(message.content === prefix + "pools"){
		return message.channel.send("```"
		+	"List of Known Pools: \n"
		+ "----------------------------------------------- \n"
		+ "The Sexiest pool: http://etho.pool.sexy/ \n"
		+ "Solo Russian pool: https://etho.solopool.org/ \n"
		+ "WeeMine: http://ether1.weeminepool.com/ \n"
		+ "UPool: https://etho.upool.in/ \n"
		+ "OVH: http://www.ether1.ovh/ \n"
		+ "A Pool for all the crazy people: http://ether1.crazypool.org/ \n"
		+ "Mole Pool: http://etho.mole-pool.net/ \n"
		+ "Solo Pool: http://solo-ether1.ethash.farm/ \n"
    + "Coming: https://comining.io/ \n"
		+ "BYLT: https://etho.bylt.gq/ \n"
		+ "TeraHash: http://terrahash.cc/ \n"
		+ "Extreme Hash: http://etho.extremehash.io/ \n"
		+ "Miner Pool: http://etho.minerpool.net/ \n"
		+ "Uley Pool: https://uleypool.com/mining-pool-ether-1-etho/ \n"
		+ "-----------------------------------------------  \n"
		+ "Talk to a admin to get added to this list.```"
	);
	}

	if(message.content === prefix + "markets"){
		return message.channel.send("```"
		+	"List of Markets: \n"
		+ "----------------------------------------------- \n"
		+ "Stex Market https://app.stex.com/en/trade/pair/BTC/ETHO/1D \n"
		+ "Graviex Market https://graviex.net/markets/ethobtc \n"
		+ "Mercatox Market https://mercatox.com/exchange/ETHO/BTC \n"
		+ "More coming in time! \n"
		+ "-----------------------------------------------  \n"
		+ "Having trouble? Contact a admin.```"
	);
	}

	if(message.content.startsWith(prefix + "tx ")){
		let tx = args[1];
		web3.eth.getTransaction(args[1], (error,result)=>{
			if(!error){
				if(result !== null){
					let minedBlock = result["blockNumber"];
					let from = result["from"];
					let to = result["to"];
					let valueRaw = result["value"];
					let value = (valueRaw/Math.pow(10,18)).toFixed(8);
					let nonce = result["nonce"];
					message.channel.send("Transaction Lookup Results: \n"
						+ "```"
						+ "Mined in Block: " + minedBlock + ". \n"
						+ "From: " + from + ". \n"
						+ "To: " + to + ". \n"
						+ "Value: " + value + " ETHO \n"
						+ "Nonce: " + nonce + ". \n"
						+ "```"
					);
				} else {
					message.channel.send("Transaction result was null, might be a malformed attempt, please double check and retry.");
				}
			} else {
				message.channel.send("Oops, a error occurred with your tx lookup try again, using !tx <txhash>.");
			}
		})
	}

              if(message.content.startsWith(prefix + "balance")){
                let price = getJson('data/usdprice.txt');
		let author = message.author.username;
		let address = args[1];
		if(address == null){
			// show registered address balance
			let data = getJson();
			if(data[author]){
				web3.eth.getBalance(data[author], (error,result)=>{
					if(!error){
						var balance = (result/Math.pow(10,18)).toFixed(8);
						if(balance > 100000){
								message.channel.send("This balance has: **" + balance + "** ETHO, You need to CHILL bro, leave some for the rest!");
						} else if(balance > 15000){
								message.channel.send("This balance has: **" + balance + "** ETHO, congrats, you must be a MN holder!");
						} else if(balance > 5000){
								message.channel.send("This balance has: **" + balance + "** ETHO, congrats, you must be a SN Holder!");
						} else if(balance > 1500){
								message.channel.send("This balance has: **" + balance + "** ETHO, you are in need of more ETHO.");
						} else if(balance > 750){
								message.channel.send("This balance has: **" + balance + "** ETHO, You better go buy some..");
						} else if(balance > 500){
								message.channel.send("This balance has: **" + balance + "** ETHO, YOU NEED MORE!");
						} else if(balance > 250){
								message.channel.send("This balance has: **" + balance + "** ETHO, congrats, you own 0,00000294% of the total supply");
						} else if(balance > 100){
								message.channel.send("This balance has: **" + balance + "** ETHO, congrats.");
						} else if(balance > 50){
								message.channel.send("This balance has: **" + balance + "** ETHO, you are a Guppie");
						} else if(balance > 5){
								message.channel.send("This balance has: **" + balance + "** ETHO, Congrats! AN Etho Jedi you have become!");
						} else if(balance == 0){
								message.channel.send("This balance empty, it has: **" + balance + "** ETHO.");
						} else {
								message.channel.send("Your balance is **" + balance + "** ETHO, Stop wasting my time!.");
						}
					}
				})
				return
			}
		}
		if(web3.utils.isAddress(args[1])){
			web3.eth.getBalance(args[1], (error,result)=>{
				if(!error){
					var balance = (result/Math.pow(10,18)).toFixed(8);
					if(balance > 100000){
							message.channel.send("This balance has: **" + balance + "** ETHO, You need to chill bro! Leave some coins for the others!");
					} else if(balance > 15000){
							message.channel.send("This balance has: **" + balance + "** ETHO, congrats, You must be a MN holder!");
					} else if(balance > 5000){
							message.channel.send("This balance has: **" + balance + "** ETHO, congrats, That's one nice SN.");
					} else if(balance > 1500){
							message.channel.send("This balance has: **" + balance + "** ETHO, you are in need of more ETHO");
					} else if(balance > 750){
							message.channel.send("This balance has: **" + balance + "** ETHO, You better go buy some..");
					} else if(balance > 500){
							message.channel.send("This balance has: **" + balance + "** ETHO, YOU NEED MORE!");
					} else if(balance > 250){
							message.channel.send("This balance has: **" + balance + "** ETHO, congrats, you own 0,00000294% of the total supply");
					} else if(balance > 100){
							message.channel.send("This balance has: **" + balance + "** ETHO, congrats.");
					} else if(balance > 50){
							message.channel.send("This balance has: **" + balance + "** ETHO, congrats, you are a Guppie");
					} else if(balance > 5){
							message.channel.send("This balance has: **" + balance + "** ETHO, Congrats! AN Etho Jedi you have become!");
					} else if(balance == 0){
							message.channel.send("This balance empty, it has: **" + balance + "** ETHO. It didn't have any ETHO in it earlier, it still doesn't. You need to not waste my time!");
					} else {
							message.channel.send("Your balance is **" + balance + "** ETHO, you need to not waste my time!");
					}
				} else {
					message.channel.send("Oops, some problem occured with your address.");
				}
			})
		} else {
			message.channel.send("Wrong address, or not registered. The command is /register <address> or to check a specific balance its !balance <address>.");
		}
	}

	if(message.content === prefix + "fundbot"){
		let balance = await web3.eth.getBalance(botSettings.address)/Math.pow(10,18);
		message.channel.send("Bot address is " + botSettings.address + " with: **" + Number(balance).toFixed(8) + "** ETHO, be sure to send some to the bot to keep the rains going.");
	}

	if(message.content.startsWith("/register")){
		var author = "<@" + message.author.id + ">";
		var address = args[1];
                var authorTag = message.author.tag

		if(web3.utils.isAddress(args[1])){
			var data = getJson();
			if(!Object.values(data).includes(address) && !Object.keys(data).includes(author)){
				data[author] = address;
				message.channel.send(authorTag + " registered new address: " + address);

				fs.writeFile(botSettings.path, JSON.stringify(data), (err) => {
				  if (err) throw err;
				  console.log('The file has been saved.');
				});

			} else {
				message.channel.send("You have already registered.");
			}
		} else {
			message.channel.send(authorTag + " tried to register wrong address. Try another one. Correct format is **/register 0xAddress**");
		}
	}

	if(message.content.startsWith(prefix + "changereg")){
                var author = "<@" + message.author.id + ">";
		var address = args[1];
                var authorTag = message.author.tag
		if(web3.utils.isAddress(args[1])){
			var data = getJson();
			if(Object.keys(data).includes(author)){
				if(address != data[author]){
					data[author] = address;
					fs.writeFile(botSettings.path, JSON.stringify(data), (err) => {
				  		if (err) throw err;
				  		console.log('The file has been changed.');
					});
					message.channel.send(authorTag + " changed register address to " + address);
				} else {
					message.channel.send("Use a different address if you're trying to change your old one.")
				}
			} else {
				message.channel.send("You are not on the list! Register your address by doing **/register OxADDRESS** first.");
			}
		} else {
			message.channel.send(authorTag+" tried to register with wrong address. Correct format is **/register 0xAddress**");
		}
	}
	//-------------------------------------
	if(message.content == prefix + "list"){
		var data = getJson();
		message.channel.send("Total amount of registered users is **" + Object.keys(data).length+ "**.");

	}

	if(message.content == prefix + "onlinetotal"){
                if(!message.member.hasPermission('ADMINISTRATOR') && !message.member.hasPermission('COMMUNITY MANAGER') && !message.member.hasPermission('MODERATOR') && !message.member.hasPermission('COMMUNITY LEADERS')){
			return message.channel.send("You cannot use '!onlinetotal' command");
		}
		var online = getOnline();
		message.channel.send("Total list of online users are **" + online+ "**.");
	}

	if(message.content == prefix + "online"){
	        if(!message.member.hasPermission('ADMINISTRATOR') && !message.member.hasPermission('COMMUNITY MANAGER') && !message.member.hasPermission('MODERATOR') && !message.member.hasPermission('COMMUNITY LEADERS')){
			return message.channel.send("You cannot use '!online' command");
		}
		// registered users
		var data = getJson();
		// online users
		var onlineUsers = getOnline();
		// create online and register array
		var onlineAndRegister = Object.keys(data).filter(username => {return onlineUsers.indexOf(username)!=-1});

		message.channel.send("Total list of registered and online users are **" + onlineAndRegister+ "**.");
	}

	if(message.content == prefix + "checkreg"){
                let author = "<@" + message.author.id + ">";
		let data = getJson();
                let authorTag = message.author.tag
		if(Object.keys(data).includes(author)){
			message.channel.send(authorTag + " already registered.");
		} else {
			message.channel.send("You are not in the list, use the **/register** command fist.");
		}
	}
	if(message.content.startsWith(prefix + "coinhelp")){
		message.channel.send("ETHO BlockChain Commands:\n"+
		        prefix+"balance <address> -  show ETHO balance on the following address \n"+
			prefix+"tx <txhash> - lookup the info of the transaction. \n");
	}

	if(message.content.startsWith(prefix + "adminhelp")){
		if(!message.member.hasPermission('ADMINISTRATOR') && !message.member.hasPermission('COMMUNITY MANAGER') && !message.member.hasPermission('MODERATOR') && !message.member.hasPermission('COMMUNITY LEADERS')){
			return message.channel.send("You cannot use '!adminhelp' command");
		}
		message.channel.send("ETHO Admin Commands:\n"+
			"```" + prefix+"sendToAddress <address> <amount> - send ETHO to the following address\n"+
			prefix+"send <amount> <name> send ETHO to the following user\n"+
			prefix+"rain <amount> - send ETHO to all registered and online address's.\n"+
			prefix+"sprinkle - send 1-10 ETHO to all registered and online address's.\n"+
			prefix+"downpour - send 10-100 ETHO to all registered and online address's.\n"+
			prefix+"online - see list of all online and registered users for raindrops.\n"+
			prefix+"onlinetotal - see the list of every online user.\n"+
			prefix+"coming <amount> <numOfHrs> - rain will be after N hours." + "```"
		);
	}

        if(message.content === prefix + "help"){
                message.channel.send("**ETHER-1 TIP BOT COMMANDS** \n"+
                        "Register your ETHO wallet with this TipBot to be eligible to receive community participation tips & bounty payments. \n"+
                        "This bot can also be used to retrieve useful _Ether-1 $ETHO_ facts and stats. \n"+
                        "_In order to use this bot you must first do **/register <address>**_ \n"+
                        "**TIPPING COMMANDS:** \n"+
                        "**/register <address>** - save your Discord username & ETHO address to Tip Bot db for tipping \n"+
                        prefix+"**fundbot** - show bot address so anyone can fund it, and its balance \n" +
                        prefix+"**changereg** <address> - change your registered address \n"+
                        prefix+"**checkreg** - find whether you're registered or not \n"+
                        "**ETHO INFO COMMANDS:** \n"+
                        prefix+"**pools** - show list of known ETHO pools \n"+
                        prefix+"**markets** - show list of known place to BUY/SELL ETHO \n"+
                        prefix+"**roll** - toss dice and returns a number from 1-12 and a random word \n"+
                        prefix+"**coinhelp** - ETHO Blockchain commands \n"+
                        prefix+"**list** - shows number of users registered for raindrops \n"+
                        prefix+"**block** - will show the current block height \n"+
                        "_Tip Bot dev_ @FallenG#6563 \n"+
                        "_(Bot suggestions are welcome in the #suggestions channel)_ \n");
	}
})


bot.login(botSettings.token);
