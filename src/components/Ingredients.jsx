import "../styles/MainStyle.css";

export default function IngredientsList(props) {
  const ingredients = props.listItem;

  const ListItems = ingredients.map((item) => {
  return (
    <li key={item} className="ingredient-item">
      <span className="ingredient-text">{item}</span>
      <button
        className="remove-btn"
        onClick={() => props.removeIngredient(item)}
        title="Remove"
      >
        ❌
      </button>
    </li>
  );
});

  return (
    ListItems.length > 0 && (
      <section>
        <h2>Ingredients on hand:</h2>
        <ul className="ingredients-list">{ListItems}</ul>
        {ListItems.length > 3 ? (
          <div  ref={props.recipeRef} className="get-recipe-container">
            <div>
              <h3>Ready for a recipe?</h3>
              <p>Generate a recipe from your list of ingredients.</p>
            </div>
            <button onClick={()=>{props.setLoader(true);props.getRecipe()}}>Get a recipe</button>
          </div>
        ) : null}
      </section>
    )
  );
}
