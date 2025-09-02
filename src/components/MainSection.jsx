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
  const [removeIngredients,setRemoveIngredients]=React.useState(true)
  
  const recipeSection = React.useRef(null)
  
  React.useEffect(()=>{
    if(recipe !== "" && recipeSection.current !== null){
      recipeSection.current.scrollIntoView({behavior:"smooth"})
    }
  },[recipe])
  
  async function getRecipe() {
    setRecipe("")
    const recipeMarkdown = await getRecipeFromMistral(ingredients)
    setRemoveIngredients(false)
    setRecipe(recipeMarkdown)
    setLoader(false)
  }

  // -------------adding ingredients from form
  function addIngredients(formData) {
    const newIngredents = formData.get("ingredient");
    if(newIngredents !==""){
      setNewingredients((prevItem) => [...prevItem, newIngredents]);
      setRemoveIngredients(true)
    }else{
      alert("Please enter an ingrident")
    }
  }

  function removeIngredient(itemToRemove) {
    {removeIngredients && setNewingredients((prev) =>
      prev.filter((item) => item !== itemToRemove)
    );}
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
