export const generateRandomhHash = (len:number)=>{
    let randomString = "qwertyuasdfg2345vbnm12345hjk";
    let length = randomString.length
    let ans = ""
    for(var i=0;i<len;i++){
        ans+=randomString[Math.floor((Math.random()*length))]
    }

    return ans;
}