import blastTask = require("../index");
import jmClient = require("ms-jobmanager/build/nativeJS/job-manager-client");

import streams = require('stream');

import fs = require("fs");



let myOptions = {
	'logLevel': 'debug',
    'modules' : ['ncbi-blast/2.2.26','blastXMLtoJSON'],
    'exportVar' : { 'dbPath' : 'nr70',
                    'eValue' : '0.1',
                    'nbIter' : '1',
                    'maxSeq' : '50'}
};



let jobManager = jmClient.start({"TCPip": "localhost", "port": "2323"});

jobManager.on("ready", () => {
    let a = new blastTask.blasttask({ "jobManager" : jmClient, "jobProfile" : "default" }, myOptions);
    a.on("processed", (a)=>{
    //Do smtg w/ output

    });
    fs.readFile("../data/P98160.fasta", function (err, data) {
        if (err) throw err;
        console.log(data.toString());
        let container = {"inputF" : data.toString()};
        let fastaStream = new streams.Readable();
        fastaStream.push( JSON.stringify(container));
        fastaStream.push(null);
        fastaStream.pipe(a.inputF);
    });
});
