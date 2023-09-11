export const upperFirstLetter=(sample="")=>{
let words=sample.split(" ")
let newWords=[]
for (let i = 0; i < words.length; i++) {
    let tempWord = "";
    for (let j = 0; j < words[i].length; j++) {
        if(j===0){
            tempWord += words[i][j].toLocaleUpperCase("tr-TR")
        }else{
            tempWord += words[i][j].toLocaleLowerCase("tr-TR")
        }
        
    }
    newWords.push(tempWord)
    
}
const newSample=newWords.join(" ")
return newSample
}