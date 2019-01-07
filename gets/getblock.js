"use strict";
var request = require("request");
var fs = require("fs");

const BLOCKSITE = 'https://api.ether1.org/api.php?api=chain_summary';

var data = {};
getBlock();
function getBlock(){
        request(BLOCKSITE, (error, response, body)=>{
                try{
                        var dataCoin = JSON.parse(body);
                } catch (e) {
                        console.log("Api Block Problem: " + e);
                        return
                }
                var blockH = dataCoin["block_height"];
                console.log(blockH);

                fs.writeFile("data/block.txt",blockH,(err)=>{
                        if(err) throw err;
                        //console.log('File with block was updated');
                });
     });
}
module.exports = getBlock;
