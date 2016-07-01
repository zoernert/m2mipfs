var ipfsAPI = require('ipfs-api')

M2Mipfs = function(config) {

		if(!config.ipfsAPI)  config.ipfsAPI='/ip4/127.0.0.1/tcp/5001';
		this.ipfs = ipfsAPI(config.ipfsAPI);
		this.ipfs.id(function(err,res) { config.ipfsID=res.ID; });
		this.config=config;
}
M2Mipfs.prototype.ipfs=null;

M2Mipfs.prototype.config={};

M2Mipfs.prototype.addData=function (name,data) {
	var ipfs=this.ipfs;
	var config = this.config;
	ipfs.files.rm("/"+name,function(err,res) {
	ipfs.files.add(new Buffer(data),function(err,res) {
		ipfs.files.cp(["/ipfs/"+res[0].path,"/"+name],function(err,res) {
			ipfs.files.stat("/",function(err,res) {				
				ipfs.name.publish(res.Hash,function (err, res){ 
						config.ipnsName=res.Name;						
				});
			});
		});	
	});
	});
}
M2Mipfs.prototype.flushData=function(ipnspath,filename,cb) {
	var ipfs=this.ipfs;
	ipfs.name.resolve(ipnspath,function(err,res) {		
		ipfs.files.cp([res.Path,"/"+filename],function(err,res) {			
			ipfs.files.read("/"+filename,function(err,res) {		
				var buf = ''
				  res
					.on('error', (err) => {
						//
					})
					.on('data', (data) => {
					  buf += data
					})
					.on('end', () => {
					  cb(buf);					  
					});
			});		
		});
		
	});
	
}

module.exports=M2Mipfs;
