const btnSearch = document.querySelector('.search-element');
const sectionListRecipe = document.querySelector('.show-element');
const recipeBox = document.querySelector('.recipe-box')

// Create list of dishes

function searchRecipe (e) {
sectionListRecipe.innerHTML = "";
let inputSearch = document.querySelector('.search').value;

fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${inputSearch}`)
.then(response => response.json())
.then(data => { 
    if(!data.meals){
        sectionListRecipe.innerHTML = `Sorry, we didn't find recipe for you.`
    }
	data.meals.forEach(elem => { 
		sectionListRecipe.innerHTML += `
    <div class="proposition-box" >
        <img src="${elem.strMealThumb}" alt="food-image">
        <h1>${elem.strMeal}</h1>
        <button class="get-recipe" data-id = ${elem.idMeal}>Get recipe</button>
    </div>
`
})
})
.catch((err) => err)
}


// Show more details about dish(recipe)
function getMealRecipe(e) {
  if(e.target.classList.contains('get-recipe')){
    let getID = Number(e.target.dataset.id);
    let arrIngredient = []
    
fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${getID}`)
    .then(response => response.json())
    .then(data => { 
        let getDetails = data.meals[0]
        arrIngredient.push(getDetails.strIngredient1, getDetails.strIngredient2, getDetails.strIngredient3, getDetails.strIngredient4, getDetails.strIngredient5, getDetails.strIngredient6, getDetails.strIngredient7, getDetails.strIngredient8, getDetails.strIngredient9, getDetails.strIngredient10, getDetails.strIngredient11, getDetails.strIngredient12, getDetails.strIngredient13, getDetails.strIngredient14, getDetails.strIngredient15, getDetails.strIngredient16, getDetails.strIngredient17, getDetails.strIngredient18, getDetails.strIngredient19, getDetails.strIngredient20);

let filteredArr = arrIngredient.filter(elem => elem !== "")

        recipeBox.innerHTML = `
        <img class="smaller-pic" src="${getDetails.strMealThumb}" alt="small-food-image">
        <h3>${getDetails.strMeal}</h3>
        <div> You need: </div>
        <ul>
        <li> ${filteredArr} </li>
        </ul>
        <button class="close">X</button>
        <p>${getDetails.strInstructions}</p> 
        `
recipeBox.classList.add('show');
       recipeBox.querySelector('button').addEventListener("click", hideBox)
    })
    .catch((err) => err)

    }
 
  }


  // Hidden the recipe box
function hideBox() {
    recipeBox.classList.remove('show')
}


// Search recipes
btnSearch.addEventListener("click", searchRecipe);


// Show details 

sectionListRecipe.addEventListener('click', getMealRecipe);