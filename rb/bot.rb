#!/usr/bin/env ruby
require 'discordrb'
require 'httparty'

config  = JSON.parse(File.read("token.json"))
cars  = JSON.parse(File.read("data/cars.json"))

token = config["discord-token"]
bot = Discordrb::Bot.new token: "#{token}"

carlist = [cars["lambo"].to_f,cars["bugatti"].to_f,cars["tesla"].to_f,cars["prius"].to_f,cars["subaru"].to_f,cars["porsche"].to_f,cars["bmw"].to_f,cars["ferrari"].to_f,cars["mercedes"].to_f]
lol_array = ["rofl", "Silly human", "To funny i forgot to laugh...", "lol", "Damn someone told a joke...", "Iv'e heard better jokes from my grandpa and he is a 486.", "giggle...giggle...", "Why are you laughing human?"]
insult_array = ["Can you not read?", "I really hope you used my friend google before asking that...", "Even i don't have time for this garbage."]

bot.message(with_text: ['/lambo', '/Lambo']) do |event|
btcprice = HTTParty.get("https://api.coinmarketcap.com/v1/ticker/bitcoin", :verify => false )
grav = HTTParty.get("https://graviex.net/api/v2/tickers/ethobtc.json", :verify => false )
last = grav['ticker']['last'].to_f
btcp = btcprice[0]['price_usd'].to_f
pAvg = btcp * last
total = carlist[0] / pAvg
pAvg2 = pAvg.round(4)
total2 = total.round(2)
event.respond "You need #{total2} ETHO at the current price of $ #{pAvg2} USD to get a Lamborghini Aventador, Vroom Vroooom!"
end

bot.message(with_text: ['/bugatti', '/Bugatti']) do |event|
btcprice = HTTParty.get("https://api.coinmarketcap.com/v1/ticker/bitcoin", :verify => false )
grav = HTTParty.get("https://graviex.net/api/v2/tickers/ethobtc.json", :verify => false )
last = grav['ticker']['last'].to_f
btcp = btcprice[0]['price_usd'].to_f
pAvg = btcp * last
total = carlist[1] / pAvg
pAvg2 = pAvg.round(4)
total2 = total.round(2)
event.respond "You need #{total2} ETHO at the current price of $ #{pAvg2} USD to get a Bugatti Veyron, Vroom Vroooom!"
end

bot.message(with_text: ['/tesla', '/Tesla']) do |event|
btcprice = HTTParty.get("https://api.coinmarketcap.com/v1/ticker/bitcoin", :verify => false )
grav = HTTParty.get("https://graviex.net/api/v2/tickers/ethobtc.json", :verify => false )
last = grav['ticker']['last'].to_f
btcp = btcprice[0]['price_usd'].to_f
pAvg = btcp * last
total = carlist[2] / pAvg
pAvg2 = pAvg.round(4)
total2 = total.round(2)
event.respond "You need #{total2} ETHO at the current price of $ #{pAvg2} USD to get a Tesla Model X, Fshhhhhhhhhh Weeeeeee!"
end

bot.message(with_text: ['/prius', '/Prius']) do |event|
btcprice = HTTParty.get("https://api.coinmarketcap.com/v1/ticker/bitcoin", :verify => false )
grav = HTTParty.get("https://graviex.net/api/v2/tickers/ethobtc.json", :verify => false )
last = grav['ticker']['last'].to_f
btcp = btcprice[0]['price_usd'].to_f
pAvg = btcp * last
total = carlist[3] / pAvg
pAvg2 = pAvg.round(4)
total2 = total.round(2)
event.respond "You need #{total2} ETHO at the current price of $ #{pAvg2} USD to get a Toyota Prius V, Vroom Vroooom!"
end

bot.message(with_text: ['/subaru', '/Subaru']) do |event|
btcprice = HTTParty.get("https://api.coinmarketcap.com/v1/ticker/bitcoin", :verify => false )
grav = HTTParty.get("https://graviex.net/api/v2/tickers/ethobtc.json", :verify => false )
last = grav['ticker']['last'].to_f
btcp = btcprice[0]['price_usd'].to_f
pAvg = btcp * last
total = carlist[4] / pAvg
pAvg2 = pAvg.round(4)
total2 = total.round(2)
event.respond "You need #{total2} ETHO at the current price of $ #{pAvg2} USD to get a Subaru WRX STI, Vroom Vroooom!"
end

bot.message(with_text: ['/porsche', '/Porsche']) do |event|
btcprice = HTTParty.get("https://api.coinmarketcap.com/v1/ticker/bitcoin", :verify => false )
grav = HTTParty.get("https://graviex.net/api/v2/tickers/ethobtc.json", :verify => false )
last = grav['ticker']['last'].to_f
btcp = btcprice[0]['price_usd'].to_f
pAvg = btcp * last
total = carlist[5] / pAvg
pAvg2 = pAvg.round(4)
total2 = total.round(2)
event.respond "You need #{total2} ETHO at the current price of $ #{pAvg2} USD to get a Porsche 911, Vroom Vroooom!"
end

bot.message(with_text: ['/bmw', '/Bmw']) do |event|
btcprice = HTTParty.get("https://api.coinmarketcap.com/v1/ticker/bitcoin", :verify => false )
grav = HTTParty.get("https://graviex.net/api/v2/tickers/ethobtc.json", :verify => false )
last = grav['ticker']['last'].to_f
btcp = btcprice[0]['price_usd'].to_f
pAvg = btcp * last
total = carlist[6] / pAvg
pAvg2 = pAvg.round(4)
total2 = total.round(2)
event.respond "You need #{total2} ETHO at the current price of $ #{pAvg2} USD to get a BMW M6 Coupé, Vroom Vroooom!"
end

bot.message(with_text: ['/ferrari', '/Ferrari']) do |event|
btcprice = HTTParty.get("https://api.coinmarketcap.com/v1/ticker/bitcoin", :verify => false )
grav = HTTParty.get("https://graviex.net/api/v2/tickers/ethobtc.json", :verify => false )
last = grav['ticker']['last'].to_f
btcp = btcprice[0]['price_usd'].to_f
pAvg = btcp * last
total = carlist[7] / pAvg
pAvg2 = pAvg.round(4)
total2 = total.round(2)
event.respond "You need #{total2} ETHO at the current price of $ #{pAvg2} USD to get a FERRARI 488 GTB, Vroom Vroooom!"
end

bot.message(with_text: ['/mercedes', '/Mercedes']) do |event|
btcprice = HTTParty.get("https://api.coinmarketcap.com/v1/ticker/bitcoin", :verify => false )
grav = HTTParty.get("https://graviex.net/api/v2/tickers/ethobtc.json", :verify => false )
last = grav['ticker']['last'].to_f
btcp = btcprice[0]['price_usd'].to_f
pAvg = btcp * last
total = carlist[8] / pAvg
pAvg2 = pAvg.round(4)
total2 = total.round(2)
event.respond "You need #{total2} ETHO at the current price of $ #{pAvg2} USD to get a Mercedes-AMG GT Roadster, Vroom Vroooom!"
end

bot.message(with_text: ['/coin', '/Coin']) do |event|
grav = HTTParty.get("https://graviex.net/api/v2/tickers/ethobtc.json", :verify => false )
btcprice = HTTParty.get("https://api.coinmarketcap.com/v1/ticker/bitcoin", :verify => false )
block_height = HTTParty.get("https://egem.protonmine.io/api/stats")

last = grav['ticker']['last'].to_f
block_h = block_height['nodes'][1]['height']
supply = (block_h.to_i - 5000)*9
btcp = btcprice[0]['price_usd'].to_f
pAvg = btcp * last
mcap = pAvg * supply
pAvg2 = pAvg.round(4)
mcap2 = mcap.round(2)

event.respond "```
***Coin Status***
----------
Name: Ether-1 https://ether1.org
Ticker: ETHO
Block Height: #{block_h}
Supply: #{supply} ETHO
Marketcap: $ #{mcap2} USD
Price Avg: $ #{pAvg2} USD
----------
```"
end

bot.message(with_text: ['/graviex', '/Graviex']) do |event|
gravbtc = HTTParty.get("https://graviex.net/api/v2/tickers/ethobtc.json", :verify => false )

lastbtc = gravbtc['ticker']['last']
volbtc = gravbtc['ticker']['vol']
volbtc24 = gravbtc['ticker']['volbtc']
changebtc = gravbtc['ticker']['change']

event.respond "```
***Graviex Exchange***
----------
EGEM / BTC
----------
Price: #{lastbtc} BTC
Change: #{changebtc}
24 Volume: #{volbtc} EGEM
BTC 24 Volume: #{volbtc24} BTC
----------
```"
end

bot.message(with_text: ['/convert', '/Convert']) do |event|
egemprice = HTTParty.get("https://graviex.net/api/v2/tickers/ethobtc.json", :verify => false )
btcprice = HTTParty.get("https://api.coinmarketcap.com/v1/ticker/bitcoin", :verify => false )
ltcprice = HTTParty.get("https://api.coinmarketcap.com/v1/ticker/litecoin", :verify => false )
ethprice = HTTParty.get("https://api.coinmarketcap.com/v1/ticker/ethereum", :verify => false )
dogeprice = HTTParty.get("https://api.coinmarketcap.com/v1/ticker/dogecoin", :verify => false )
xshprice = HTTParty.get("https://api.coinmarketcap.com/v1/ticker/shield-xsh", :verify => false )
dnrprice = HTTParty.get("https://api.coinmarketcap.com/v1/ticker/denarius-dnr", :verify => false )

btcp = btcprice[0]['price_usd'].to_f
ltcp = ltcprice[0]['price_usd'].to_f
ethp = ethprice[0]['price_usd'].to_f.round(8)
dogep = dogeprice[0]['price_usd'].to_f
xshp = xshprice[0]['price_usd'].to_f
dnrp = dnrprice[0]['price_usd'].to_f

gemp = egemprice['ticker']['last'].to_f
gemp2 = egemprice['ticker']['last']

pAvg = btcp * gemp

btcF = btcp / pAvg
ethF = ethp / pAvg
dgeF = dogep / pAvg
ltcF = ltcp / pAvg
xshF = xshp / pAvg
dnrF = dnrp / pAvg

outBTC = gemp2
outETH = 1 / ethF.round(8)
outDOGE = 1 / dgeF
outLTC = 1 / ltcF
outXSH = 1 / xshF
outDNR = 1 / dnrF

event.respond "```

*** 1 ETHO is equal to: *** (Used for market pricing.)
----------
XSH: #{outXSH}
DNR: #{outDNR}
BTC: #{outBTC}
ETH: #{outETH}
DOGE: #{outDOGE}
LTC: #{outLTC}
----------


```"
end

bot.message(with_text: ['Haha', 'haha']) do |event|
event.respond "What is so damn funny?"
end

bot.message(with_text: ['lol', 'Lol']) do |event|
response = lol_array.sample
event.respond "#{response}"
end

bot.message(with_text: ['huh?', 'what?', 'what', 'huh']) do |event|
response = insult_array.sample
event.respond "#{response}"
end

bot.message(with_text: ['/faq', '/Faq']) do |event|
event.respond "```
Q: Why does the network hashrate and difficulty jump all over the place?
A: We uses a custom per block scheme that makes sure the average block time stays as close to 13 seconds as possible.

Q: Whats the point of Ether-1, when i can use (insert name) coin?
A: We see a world with many coins connected in many ways forming what has been labelled web3.0 and all serving different purposes connecting the world.

Q: Why does the diff spike so hard sometimes?
A: This was implemented to stop the fast block mining when say a nicehash miner hits the network.
```"
end

bot.run
