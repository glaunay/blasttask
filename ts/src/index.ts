import tk = require('taskobject');
import typ = require('taskobject/types/index');
declare var __dirname;

export class blasttask extends tk.Task {
    public readonly inputF;
    constructor(management:{}, options?:any) {
        super(management, options); // (1)
        this.rootdir = __dirname; // (2)
        this.coreScript = this.rootdir + '/../data/coreScript.sh'; // (3)
        this.slotSymbols = ['inputF']; // (4)
       
        
        super.initSlots(); // (5)
    }
    prepareJob (inputs) {
	    return super.configJob(inputs);
    }

/* REMARK : 'pathOfCurrentDir' is the key you gave in your core script as JSON output */
    prepareResults (chunkJson) { // from JSON.parse(pushedJob.stdout)
        console.log(typeof chunkJson);
        console.log("---->");
        console.dir(chunkJson);
        return {
		    [this.outKey] : chunkJson.data // This.outKey is a deduced from downstream adressed slot, picked from slotSymbol
	    }
    }
}
