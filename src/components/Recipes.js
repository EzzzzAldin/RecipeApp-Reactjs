import { useState } from "react";

import classes from "./Recipes.module.css";

const Recipes = (props) => {
  const [showIngredient, setShowIngredient] = useState(false);
  let i = 0;

  const showIngredientHandler = () => {
    setShowIngredient(true);
  };

  return (
    <div className={classes.recipe}>
      <img src={props.image} alt="" />
      <div className={classes.info}>
        <h3>{props.title}</h3>
        <p>{props.calories}calories</p>
      </div>
      <button onClick={showIngredientHandler}>+</button>
      <ul>
        {props.ingredients.map((ingredient) =>
          showIngredient ? <li key={i++}>{ingredient.text}</li> : null
        )}
      </ul>
    </div>
  );
};

export default Recipes;
