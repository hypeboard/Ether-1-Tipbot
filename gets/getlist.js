"use strict";
var request = require("request");
var fs = require("fs");

const LISTSITE = 'https://api.coinmarketcap.com/v1/ticker/ether-1';

var data = {};

function getRlist(){
	request(LISTSITE, (error, response, body)=>{
		try{
			console.log(body);
			var dataCoin = JSON.parse(body);
		} catch (e) {
			console.log("Api BTS Assets Problem: " + e);
			return
		}
		var rList = body.dataCoin;
		console.log(rlist)

		fs.writeFile("data/rlist.txt",body,(err)=>{
			if(err) throw err;
			//console.log('File with block was updated');
		});
	});
}
module.exports = getRlist;
