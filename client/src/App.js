import './App.css';
import RecipesContainer from './components/recipesContainer';
import SearchBar from './components/searchBar';
import Order from './components/order';
import Landing from './components/landing';
import Diet from './components/diet';
import RecipeDetail from './components/recipeDetail';
import AddRecipe from './components/addRecipe';
import Navbar from './components/navbar';
import { Route, Switch } from 'react-router-dom';

function App() {
  return (
    <div className="App">
        <Switch>
            <Route exact path='/'>
                <Landing />
            </Route>
            <Route path='/recipes/create'>
                <Navbar />
                <AddRecipe />
            </Route>
            <Route path='/recipes/:id'>
                <Navbar />
                <RecipeDetail />
            </Route>
            <Route path='/recipes'>
                <Navbar />
                <h1>Food App</h1>
                <SearchBar />
                <Order />
                <RecipesContainer />
            </Route>
            <Route path='/diets'>
                <Diet />
            </Route>
        </Switch>
    </div>
  );
}

export default App;
