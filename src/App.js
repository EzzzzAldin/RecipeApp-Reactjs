import { useState, useEffect, useCallback } from "react";

import Recipes from "./components/Recipes";
import Card from "./components/UI/Card";

const APP_ID = "f172bc04";
const APP_KEY = "4d7bac8c59d35ee37a49f1eb31ca8a19";

function App() {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("chicken");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchFoodHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      // Get Data From Api
      const response = await fetch(
        `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
      );
      // Check If Error Fetch
      if (!response.ok) {
        throw Error("Something Went Wrong!");
      }
      // Convert Respone To Json
      const data = await response.json();
      setRecipes(data.hits);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, [query]);

  useEffect(() => {
    fetchFoodHandler();
  }, [fetchFoodHandler]);

  const inputChangeHandler = (event) => {
    setSearch(event.target.value);
  };

  const submitFormHandler = (event) => {
    event.preventDefault();
    setQuery(search);
    setSearch("");
  };

  let content = (
    <Card>
      <p>Found No Recipes.</p>
    </Card>
  );

  if (recipes.length > 0) {
    content = (
      <section className="foods">
        {recipes.map((recipe) => (
          <Recipes
            key={recipe.recipe.label}
            title={recipe.recipe.label}
            calories={recipe.recipe.calories}
            image={recipe.recipe.image}
            ingredients={recipe.recipe.ingredients}
          />
        ))}
      </section>
    );
  }

  if (error) {
    content = (
      <Card>
        <p>{error}</p>
      </Card>
    );
  }

  if (isLoading) {
    content = (
      <Card>
        <p>Loading ....</p>
      </Card>
    );
  }

  return (
    <div className="app">
      <Card>
        <form className="search-form" onSubmit={submitFormHandler}>
          <input
            className="search-input"
            type="text"
            value={search}
            onChange={inputChangeHandler}
          />
          <button className="search-btn" type="submit">
            Search
          </button>
        </form>
      </Card>
      {content}
    </div>
  );
}

export default App;
