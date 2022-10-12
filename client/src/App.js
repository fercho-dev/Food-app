import './App.css';
import RecipesContainer from './components/recipesContainer';
import SearchBar from './components/searchBar';
import Order from './components/order';
import Landing from './components/landing';
import Diet from './components/diet';
import RecipeDetail from './components/recipeDetail';
import AddRecipe from './components/addRecipe';
import Navbar from './components/navbar';
import Filter from './components/filter';
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
            <Route path='/recipes/community'>
                <Navbar />
                <h2>👩🏼‍🍳 Discover recipes created by the community</h2>
                <div className='searchBarOrderFilter'>
                    <SearchBar />
                    <Order />
                    <Filter />
                </div>
                <RecipesContainer />
            </Route>
            <Route path='/recipes/:id'>
                <Navbar />
                <RecipeDetail />
            </Route>
            <Route path='/recipes'>
                <Navbar />
                <h2>👩🏼‍🍳 What will you cook today?</h2>
                <div className='searchBarOrderFilter'>
                    <SearchBar />
                    <Order />
                    <Filter />
                </div>
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
