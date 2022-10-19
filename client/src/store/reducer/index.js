import { FETCH_RECIPES, SEARCH_RECIPES, FETCH_DIETS, SORT, FILTER, COMMUNITY, RELOAD_RECIPES } from '../actions'

const initialState = {
    recipes: [],
    filteredRecipes: [],
    diets: [],
    order: '',
    filter: '',
    community: false,
    communityRecipes: []
}

export default function reducer(state = initialState, action) {
    function innerSort(arrRecipes, order) {
        switch(order) {
            case 'ascendent':
                arrRecipes.sort((a, b) => {
                    if (a.name < b.name) {
                        return -1;
                    }
                    if (b.name < a.name) {
                        return 1;
                    }
                    return 0;
                });
                break;
            case 'descendent':
                arrRecipes.sort((a, b) => {
                    if (a.name > b.name) {
                        return -1;
                    }
                    if (b.name > a.name) {
                        return 1;
                    }
                    return 0;
                });
                break;
            case 'high':
                arrRecipes.sort((a, b) => {
                    if (a.health_score
                        > b.health_score
                        ) {
                        return -1;
                    }
                    if (b.health_score
                        > a.health_score
                        ) {
                        return 1;
                    }
                    return 0;
                });
                break;
            case 'low':
                arrRecipes.sort((a, b) => {
                    if (a.health_score < b.health_score) {
                        return -1;
                    }
                    if (b.health_score < a.health_score) {
                        return 1;
                    }
                    return 0;
                });
                break;
            default:
                break;
        }
        return arrRecipes;
    }
    switch(action.type) {
        case FETCH_RECIPES:
            return {
                ...state,
                recipes: action.payload,
                filteredRecipes: action.payload
            }
        case SEARCH_RECIPES:
            if(action.payload.length > 0) {
                return {
                    ...state,
                    filteredRecipes: action.payload
                }
            }
            alert('Ups, there are no recipes with that name')
            return {
                ...state
            }
        case FETCH_DIETS:
            return {
                ...state,
                diets: action.payload
            }
        case SORT:
            let orderedRecipes
            if(state.filter === '' || state.filter === 'all') {
                if(state.community) {
                    orderedRecipes = [...state.communityRecipes]
                } else {
                    orderedRecipes = [...state.recipes]
                }
            } else {
                orderedRecipes = [...state.filteredRecipes]
            }
            
            orderedRecipes = innerSort(orderedRecipes, action.payload)
            
            return {
                ...state,
                filteredRecipes: orderedRecipes,
                order: action.payload
            }
        case FILTER:
            let filterApplyRecipes
            if(state.community) {
                filterApplyRecipes = [...state.communityRecipes]
            } else {
                filterApplyRecipes = [...state.recipes]
            }
            if(action.payload === 'all') {
                filterApplyRecipes = innerSort(filterApplyRecipes, state.order)
                return {
                    ...state,
                    filteredRecipes: filterApplyRecipes,
                    filter: action.payload
                }
            }
            let recipesResult = []
            for(let i=0; i<filterApplyRecipes.length; i++) {
                let diets = filterApplyRecipes[i].diets
                if(diets.includes(action.payload)) {
                    recipesResult.push(filterApplyRecipes[i])
                }
            }
            recipesResult = innerSort(recipesResult, state.order)
            return {
                ...state,
                filteredRecipes: recipesResult,
                filter: action.payload
            };
        case COMMUNITY:
            return {
                ...state,
                filteredRecipes: action.payload,
                filter: 'community',
                community: true,
                communityRecipes: action.payload
            }
        case RELOAD_RECIPES:
            return {
                ...state,
                filteredRecipes: state.recipes,
                filter: '',
                community: false
            }
        default:
            return state
    }
}