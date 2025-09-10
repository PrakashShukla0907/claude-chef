import React from "react";
import "../styles/MainStyle.css";
import IngredientsList from "./Ingredients.jsx";
import ClaudeRecipe from "./ClaudeRecipe.jsx";
import {getRecipeFromMistral } from "./ai.js";
import Loader from "./Loader.jsx";

export default function MainSection() {
  
  const [ingredients, setNewingredients] = React.useState([]);
  const [recipe, setRecipe] = React.useState("");
  const [loader,setLoader]=React.useState(false)
  
  const recipeSection = React.useRef(null)
  
  React.useEffect(()=>{
    if(recipe !== "" && recipeSection.current !== null){
      recipeSection.current.scrollIntoView({behavior:"smooth"})
    }
  },[recipe])
  
  async function getRecipe() {
    setRecipe("")
    const recipeMarkdown = await getRecipeFromMistral(ingredients)
    setRecipe(recipeMarkdown)
    setLoader(false)
  }

  // -------------adding ingredients from form
  function addIngredients(formData) {
    const newIngredients = formData.get("ingredient");
    if(newIngredients !== "" &&
  ingredients.every(item => newIngredients.toLowerCase() !== item.toLowerCase())){
      setNewingredients((prevItem) => [...prevItem, newIngredients]);
    }
    else if(newIngredients !== "" && !ingredients.every(item => newIngredients.toLowerCase() === item.toLowerCase())){
      alert("❌ This ingredient is already in your list!")
    }
    else{
      alert("⚠️ Please enter an ingredient before adding.")
    }
  }

  function removeIngredient(itemToRemove) {
     setNewingredients((prev) =>
      prev.filter((item) => item !== itemToRemove)
    );
  }

  return (
    <main>
      <form action={addIngredients} className="add-ingredient-form">
        <input
          type="text"
          aria-label="Add ingredient"
          placeholder="e.g. oregano"
          name="ingredient"
        />
        <button>Add ingredient</button>
      </form>
      {ingredients.length < 1 && <p>Enter at least Four Ingredients!</p>}
      <IngredientsList
        listItem={ingredients}
        setLoader={setLoader}
        getRecipe={getRecipe}
        recipeRef={recipeSection}
        removeIngredient={removeIngredient}
      />
      {loader && <Loader/>}
      {recipe && <ClaudeRecipe recipe={recipe}/>}
    </main>
  );
}
