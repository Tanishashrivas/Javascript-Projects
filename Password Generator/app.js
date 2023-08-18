//data
const upperset = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowerset = "abcdefghijklmnopqrstuvwxyz";
const numset = "0123456789";
const symbolset = "~!@#$%^&*()_+-/";

//selectors
const pwbox =  document.getElementById("pwbox");
const upper = document.getElementById("upper");
const lower = document.getElementById("lower");
const numbers = document.getElementById("numbers");
const symbol = document.getElementById("special");
const len = document.getElementById("total-char");

const getRandomData = (dataset)=>{
    return dataset[Math.floor(Math.random()* dataset.length)];
}//random element nikal kr dega set se

const generatePw =(password ="")=>{
    if(upper.checked){
        password+= getRandomData(upperset);
    }
    if(lower.checked){
        password+= getRandomData(lowerset);
    }
    if(number.checked){
        password+= getRandomData(numset);
    }
    if(special.checked){
        password+= getRandomData(symbolset);
    }
    if(password.length < len.value){
        return generatePw(password);
    }
    pwbox.innerText= password.slice(0,len.value);
}

// generatePw();

document.getElementById("btn").addEventListener("click",
   function(){
    generatePw();
   }
)

// function truncateString(str,num){//it generates pw of length in multiples of 4 so we need to trim it
//     if(str.length >num){
//         let substr =  str.substring(0,num);
//         return substr;
//     }
//     else
//     return str;
// } 