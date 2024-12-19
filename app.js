var picArr = [];
let isProcessing = false;
let flips = 0;
let score = 0;
var bothFlipsClass = [];
if (localStorage.getItem('scorememory') === null) {
    localStorage.setItem('scorememory',0)
}
let hiscore = localStorage.getItem('scorememory');
document.querySelector(".hi-score").innerHTML= hiscore;

let clicks = 0;
for (let i = 1; i <9;   i++) {
  for (let j = 0; j < 2; j++) {
  picArr.push(`icon_${i}.png`)

    
  }
}
let mins,hrs;
let gameEnded = false;
setInterval(() => {
    if (gameEnded === false) {
        
    
const hr = document.querySelector('.hrs');
const min = document.querySelector('.min');


if (hr.textContent === "1") {
    hrs = 0;
    mins = 60;
}
mins--;

hr.innerHTML = hrs;
min.innerHTML = mins;
}
},1000)

setTimeout(() => {
    if (gameEnded === false) {
        
    
    gameEnded = true;
    const elemental = document.createElement('p');
    document.querySelector('.box').innerHTML = "";
    elemental.innerHTML  = "You Lose!😑";
  elemental.classList.add("timnasa");
     document.querySelector('.box').appendChild(elemental);
     setTimeout(() => {location.reload()},3000)
    }
},60000)



function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        // Generate a random index between 0 and i
        const j = Math.floor(Math.random() * (i + 1));
        // Swap elements at i and j
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

shuffleArray(picArr);

console.log(picArr);


const allSquares = document.querySelectorAll('.sq')

allSquares.forEach((element,index) => {

    element.onclick = () => {
        if (isProcessing) return;

        let startTime = performance.now(); // Records the high-resolution time
        clicks++;
     let endTime = performance.now(); // Records the time again

        const style = window.getComputedStyle(element);

        // Get the background property (background, background-color, etc.)
        const background = style.background;
        
      console.log(element.style.background );
      
        if (element.style.background !== ''  && element.style.background !== 'white') {
            return
        }else if ( element.style.background !== 'none') {
            console.log(background.substring(0,25),element.style.background);
            
         if (background.substring(0,18) === 'rgb(255, 255, 255)' ||element.style.background === 'white' || background.substring(0,19) === 'rgba(255, 255, 255)') {
            bothFlipsClass.push(element.className[0]);            
         }
         if (bothFlipsClass.length <= 2) {
          
        element.style.background = `url(./memory_game_icons/${picArr[index]})`;
        element.style.backgroundSize = `100%`;
        element.style.transform = ` rotateY(180deg)`;
  
         }


flips++;

console.log(flips,bothFlipsClass.length,bothFlipsClass);
            
        if (flips >= 2 && bothFlipsClass.length >= 1 && bothFlipsClass.length <=2) {
            isProcessing = true;
            flips = 0;
            
            if (document.querySelector(`.${bothFlipsClass[0]}`).style.background === document.querySelector(`.${bothFlipsClass[1]}`).style.background && bothFlipsClass[0] !== bothFlipsClass[1]) {
            
            document.querySelector(`.${bothFlipsClass[0]}`).style.background = "black";
            document.querySelector(`.${bothFlipsClass[1]}`).style.background = "black";
             score++;    
     
             document.querySelector('.score').innerHTML = score;
             bothFlipsClass = []
 
             if (score === 8) {
                score = score+mins;
                if (score > hiscore) {
                localStorage.setItem("scorememory",score);
          document.querySelector(".hi-score").innerHTML= score;
                    
                }
                document.querySelector('.score').innerHTML = score;
                gameEnded = true;
               const elemental = document.createElement('p');
               document.querySelector('.box').innerHTML = "";
               elemental.innerHTML  = "You Win!🎉";
             elemental.classList.add("timnasa");
                document.querySelector('.box').appendChild(elemental);
                setTimeout(() => {location.reload()},3000)
             }

             isProcessing = false;
        }else{
            console.log(bothFlipsClass[0]);
            setTimeout(() => { 
                console.log(bothFlipsClass[0]);
                
            document.querySelector(`.${bothFlipsClass[0]}`).style.transform = ` rotateY(0deg)`;
            document.querySelector(`.${bothFlipsClass[1]}`).style.transform = ` rotateY(0deg)`;
            document.querySelector(`.${bothFlipsClass[0]}`).style.background = "white";
            document.querySelector(`.${bothFlipsClass[1]}`).style.background = "white";
            bothFlipsClass = []

            isProcessing = false; 
            },1000)
               
            }
          
         
        }   
        }
    }
})