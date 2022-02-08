const SHA256 = require("crypto-js/sha256");
class Block{
    constructor(index , timestamp , data , previousHash = ''){
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = '';
    }
    calculateHash(){

    return    SHA256(this.index+this.timestamp+this.previousHash+JSON.stringify(this.data)).toString();

    }
}

class BlockChain{
    constructor(){
        this.chain = [this.createGenesisBlock];
    }

    createGenesisBlock(){
      return  new Block(0 , "01/01/2018" , "this is genesis block" , "0");
    }

    getLatestBlock(){
        return this.chain[this.chain.length-1];
    }

    addBLock(newBlock){
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }
}
let block1 = new Block(1,"02/01/2018", {mybalance :100});
let block2 = new Block(2,"03/01/2018", {mybalance : 50});

let myBlockChain = new BlockChain();
myBlockChain.addBLock(block1);
myBlockChain.addBLock(block2);

console.log(JSON.stringify(myBlockChain, null , 4));