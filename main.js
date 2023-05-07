const btnSearch = document.querySelector(".main__btn-search");
const sectionListRecipe = document.querySelector(".section-show-box");
const recipeBox = document.querySelector(".recipe-box");
const suggestionTitle = document.querySelector(".suggestion-text");
let inputSearch = document.querySelector(".main__input-search");

// Create list of dishes

function searchRecipe(e) {
  sectionListRecipe.innerHTML = "";
  inputSearch = document.querySelector(".main__input-search").value;

  fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${inputSearch}`)
    .then((response) => response.json())
    .then((data) => {
      if (!data.meals) {
        sectionListRecipe.innerHTML = `Sorry, we didn't find recipe for you.`;
      }
      if (data.meals) {
        suggestionTitle.innerHTML = "Here are suggestions for you:";
      }
      data.meals.forEach((elem) => {
        sectionListRecipe.innerHTML += `
    <div class="section-show-box__dish" >
        <img src="${elem.strMealThumb}" alt="food-image" class = "section-show-box__image">
        <h1 class = "section-show-box__title">${elem.strMeal}</h1>
        <button class="section-show-box__recipe  buttons" data-id = ${elem.idMeal}>Get recipe</button>
    </div>
`;
      });
    })
    .catch((err) => err);
}

// Show more details about dish(recipe)
function getMealRecipe(e) {
  let getID = Number(e.target.dataset.id);
  let arrIngredient = [];

  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${getID}`)
    .then((response) => response.json())
    .then((data) => {
      let getDetails = data.meals[0];
      arrIngredient.push(
        getDetails.strIngredient1,
        getDetails.strIngredient2,
        getDetails.strIngredient3,
        getDetails.strIngredient4,
        getDetails.strIngredient5,
        getDetails.strIngredient6,
        getDetails.strIngredient7,
        getDetails.strIngredient8,
        getDetails.strIngredient9,
        getDetails.strIngredient10,
        getDetails.strIngredient11,
        getDetails.strIngredient12,
        getDetails.strIngredient13,
        getDetails.strIngredient14,
        getDetails.strIngredient15,
        getDetails.strIngredient16,
        getDetails.strIngredient17,
        getDetails.strIngredient18,
        getDetails.strIngredient19,
        getDetails.strIngredient20
      );

      let filteredArr = arrIngredient.filter((elem) => elem !== "");

      recipeBox.innerHTML = `
        <img class="recipe-box__smaller-pic" src="${getDetails.strMealThumb}" alt="small-food-image">
        <h3 class = "recipe-box__title">${getDetails.strMeal}</h3>
        <div class = "recipe-box__text"> You need: </div>
        <ul class = "recipe-box__list">
        <li class = ""recipe-box__elements> ${filteredArr} </li>
        </ul>
       
        <button class="recipe-box__close-button">X</button>
        <p>Recipe:</p>
        <p class = "recipe-box__instructions">${getDetails.strInstructions}</p> 
        `;
      recipeBox.classList.add("show");
      recipeBox.querySelector("button").addEventListener("click", hideBox);
    })
    .catch((err) => err);
}

// Hidden the recipe box
function hideBox() {
  recipeBox.classList.remove("show");
}

// Search recipes on Click mouse
btnSearch.addEventListener("click", searchRecipe);

// Search recipes on Click enter
inputSearch.addEventListener("keypress", (e) => {
  if (e.keyCode === 13) {
    searchRecipe();
  }
});

// Show details

sectionListRecipe.addEventListener("click", getMealRecipe);
