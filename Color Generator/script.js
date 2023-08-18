const inputbox = document.getElementById("inputbox");
const colorbox = document.getElementById("colorbox");

const generateColor = () => {
  const rn = Math.floor(Math.random()*16777215); //iss number se he code mil pyega
  const color = '#'+rn.toString(16);
  
  inputbox.innerText = color;
  colorbox.style.backgroundColor = color;
  document.body.style.backgroundColor = color;
};

document.getElementById("btn").addEventListener("click",
   function(){
    generateColor();
   }
)