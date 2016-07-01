var M2Mipfs=require("./m2mipfs.js");

var m2mipfs=new M2Mipfs({t:'Test',path:'test\\'});
m2mipfs.addData("xxxxxx.txt","TTTT Text");
m2mipfs.flushData("/ipns/QmPjzaeUgXir37MQG1EzdetZ7n35NBmUZr9oL4QJfb1b1w/xxxxxx.txt","xxxxxx.txt",function(data) {console.log(data);});
//setInterval(function() { console.log(m2mipfs.config); },10000);