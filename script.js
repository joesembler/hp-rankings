function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

let characterDisplayed = {};

document.addEventListener("DOMContentLoaded", function() {
    fetch("http://hp-api.herokuapp.com/api/characters")
        .then(resp => resp.json())
        .then(data => {
            // createDbArray();    
            const randomInt = getRandomInt(25);
            const character = data[randomInt];
            character.id = randomInt;
            displayCharacter(character);  
        })
})

function displayCharacter(character) {

    changeHouseColors(character.house);

    const mainImage = document.getElementById('main-image');
    const mainList = document.querySelector('#main-display ul'); 

    const characterName = document.querySelector('#main-display h3');
    const characterHouse = document.getElementById('house');
    const characterAncestry = document.getElementById('ancestry');
    const characterDoB = document.getElementById('dob');
    const characterPatronus = document.getElementById('patronus');

    mainImage.src = character.image;
                 
    characterName.innerHTML = character.name;      
    characterHouse.innerHTML = "House: " + (character.house ? character.house : "n/a");
    characterAncestry.innerHTML = "Ancestry: " + (character.ancestry ? character.ancestry : "n/a");
    characterDoB.innerHTML = "Date of Birth: " + (character.dateOfBirth ? character.dateOfBirth : "n/a");
    characterPatronus.innerHTML = "Patronus: " + (character.patronus ? character.patronus : "n/a");
    characterDisplayed = character;
    characterDisplayed.id = character.id;
}

const nextButton = document.getElementById('next-button');
nextButton.addEventListener("click", () => {
    fetch("http://hp-api.herokuapp.com/api/characters")
    .then(resp => resp.json())
    .then(data => {
        const randomInt = getRandomInt(25);
        const character = data[randomInt];
        displayCharacter(character);
    })
});


function changeHouseColors(house){

    const header = document.querySelector("header");
    const pageTitle = document.querySelector('h2');
    const name = document.querySelector('#main-display h3');
    const list = document.querySelector('#main-display ul');
    

    if(house.toLowerCase() == "gryffindor"){
        header.style.backgroundColor = '#AE0001';
        list.style.backgroundColor = '#EEBA30';
        name.style.backgroundColor = '#EEBA30';
        pageTitle.style.textShadow = '.025em .05em .15em #EEBA30';
    }
    else if(house.toLowerCase() == "slytherin"){
        header.style.backgroundColor = '#2A623D';
        list.style.backgroundColor = '#AAAAAA';
        name.style.backgroundColor = '#AAAAAA';
        pageTitle.style.textShadow = '.025em .05em .08em #AAAAAA';
    }
    else if(house.toLowerCase() == "ravenclaw"){
        header.style.backgroundColor = '#222F5B';
        list.style.backgroundColor = '#946B2D';
        name.style.backgroundColor = '#946B2D';
        pageTitle.style.textShadow = '.025em .05em .15em #946B2D';
    }
    else if(house.toLowerCase() == "hufflepuff"){
        header.style.backgroundColor = '#FFDB00';
        list.style.backgroundColor = '#60605C';
        name.style.backgroundColor = '#60605C';
        pageTitle.style.textShadow = '.025em .05em .45em #000000';
    }
    else {
        header.style.backgroundColor = '#FFFDD0';
        list.style.backgroundColor = '#FFFDD0';
        name.style.backgroundColor = '#FFFDD0';
    }

}

const searchButton = document.getElementById('search');
searchButton.addEventListener("submit", (event) => {
    event.preventDefault();
    const searchInput = document.querySelector('header input');
    fetch("http://hp-api.herokuapp.com/api/characters")
    .then(resp => resp.json())
    .then(data => {
        const character = searchCharacter(data, searchInput.value);
    })
    // // TRYING TO RESET THE PLACEHOLDER TEXT
    // const nameHeader = document.querySelector('#main-display h3');
    // if (nameHeader.innerHTML.toLowerCase() == searchInput.value.toLowerCase()){
    //     searchInput.value = "";
    // }
    // console.log(nameHeader.innerHTML.toLowerCase());
})

function searchCharacter(data, searchInput){
    let characterFound = false;
    const error = document.getElementById('search-error');
    data.forEach(character => {
        if(character.name.toLowerCase() == searchInput.toLowerCase()){
            characterFound = true;
            displayCharacter(character);
            error.innerHTML = "";
            return character;
            
        }
    });
    if(characterFound == false){
        console.log("no character found");
        error.innerHTML = "No character found. Check your spelling and try again.";
        return null;
    }
}


// // TRYING TO GET LIKES TO PERSIST AND CREATE RANKING SYSTEM
// const likeButton = document.getElementById('like-button');
// likeButton.addEventListener('click', function() {
//     let likeCount;
//     let likeObj = {
//         likes: likeCount
//     };
//     fetch(`http://localhost:3000/characters/${characterDisplayed.id}`, {
//         method: 'PATCH',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(likeObj)
//     })
//         .then(resp => resp.json())
// })

// function createDbArray(){
//     let i = 0;
//     let array = [];
//     fetch("http://hp-api.herokuapp.com/api/characters")
//         .then(resp => resp.json())
//         .then(data => {
//             data.forEach(character => {
//                 let obj = {
//                     id: i,
//                     name: character.name,
//                     image: character.image,
//                     likes: 0
//                 }
//                 i++;
//                 array.push(obj);
//             })
//         })
    
    
//     fetch('http://localhost:3000/characters', {
//         method: 'POST',
//         headers: {
//              'Content-Type': 'application/json'
//         },
//             body: JSON.stringify(array)
//     })
//     .then(resp => resp.json())

//     fetch('http://localhost:3000/characters')
//     .then(resp => resp.json())
//     .then(data => {console.log(data)})
    
// }
    

// Terminal Command = json-server --watch db.json