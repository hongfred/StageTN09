import { combineReducers } from 'redux'
import {todos} from './reducers'
import {reducer as formReducer} from 'redux-form';
import {
  ITEMS_HAS_ERRORED,
  ITEMS_IS_LOADING,
  ITEMS_FETCH_RESULT_SUCCESS,
  ITEMS_FETCH_LIGNE_SUCCESS,
  ITEMS_FETCH_COMPOSANTS_SUCCESS,
  ITEMS_FETCH_COMPOSANTS_R_SUCCESS,
  ITEMS_FETCH_VOISINS_R_SUCCESS,
  ITEMS_FETCH_COMPOSANTS_A_SUCCESS,
  ITEMS_FETCH_VOISINS_A_SUCCESS,
 
  SCENARIO_POST_SCENARIO_SUCCESS,
  
  ADD_SCENARIO_AUGMENTATION_LIEN,
  ADD_SCENARIO_AUGMENTATION_LIGNE,
  ADD_SCENARIO_AUGMENTATION_NOEUD,
  ADD_SCENARIO_REDUCTION_LIEN,
  ADD_SCENARIO_REDUCTION_LIGNE,
  ADD_SCENARIO_REDUCTION_TRAIN,
  ADD_SCENARIO_PERTURBATION,
  
  TOGGLE_SCENARIO,
  DELETE_SCENARIO,
  DELETE_COMPOSANT,
  DELETE_VOISIN
} from '../actions/actionConst'

function itemsHasErrored(state = false, action) {
    switch (action.type) {
        case ITEMS_HAS_ERRORED:
            return action.hasErrored;

        default:
            return state;
    }
}

function itemsIsLoading(state = false, action) {
    switch (action.type) {
        case ITEMS_IS_LOADING:
            return action.isLoading;

        default:
            return state;
    }
}

function results(state = [], action) {
    switch (action.type) {
        case ITEMS_FETCH_RESULT_SUCCESS:
            return action.results;

        default:
            return state;
    }
}
function itemsLine(state = [], action) {
    switch (action.type) {
        case ITEMS_FETCH_LIGNE_SUCCESS:
            return action.itemsLine;

        default:
            return state;
    }
}

function itemsComposant(state = [], action) {
    switch (action.type) {
        case ITEMS_FETCH_COMPOSANTS_SUCCESS:
            return action.itemsComposant;
        default:
            return state;
    }
}

function itemsComposantR(state = [], action) {
    switch (action.type) {
        case ITEMS_FETCH_COMPOSANTS_R_SUCCESS:
            return action.itemsComposant;
		case DELETE_COMPOSANT:
			state= [];
			return state;
        default:
            return state;
    }
}

function itemsComposantA(state = [], action) {
    switch (action.type) {
        case ITEMS_FETCH_COMPOSANTS_A_SUCCESS:
            return action.itemsComposant;
		case DELETE_COMPOSANT:
			state= [];
			return state;
        default:
            return state;
    }
}

function itemsVoisinR(state = [], action) {
    switch (action.type) {
        case ITEMS_FETCH_VOISINS_R_SUCCESS:
            return action.itemsVoisin;
		case DELETE_VOISIN:
			state= [];
			return state;
        default:
            return state;
    }
}


function itemsVoisinA(state = [], action) {
    switch (action.type) {
        case ITEMS_FETCH_VOISINS_A_SUCCESS:
            return action.itemsVoisin;
		case DELETE_VOISIN:
			state= [];
			return state;
        default:
            return state;
    }
}

function scenario(state, action) {
    switch (action.type) {
		case ADD_SCENARIO_AUGMENTATION_LIEN:
			return{
				id: action.id,
				cas: "augmentation",
				debut: action.debut,
				fin: action.fin,
				nD: action.nD,
				nA: action.nA,
				ligne: action.ligne,
				taux: action.taux,
				supp: false
			};
		case ADD_SCENARIO_AUGMENTATION_LIGNE:
			return{
				id: action.id,
				cas: "augmentation",
				debut: action.debut,
				fin: action.fin,
				ligne: action.ligne,
				taux: action.taux,
				supp: false
			};
			
		case ADD_SCENARIO_AUGMENTATION_NOEUD:
			return{
				id: action.id,
				cas: "reduction",
				debut: action.debut,
				fin: action.fin,
				noeud: action.noeud,
				temps: action.temps,
				supp: false
			};
			
		case ADD_SCENARIO_REDUCTION_LIEN:
			return{
				id: action.id,
				cas: "reduction",
				debut: action.debut,
				fin: action.fin,
				nD: action.nD,
				nA: action.nA,
				ligne: action.ligne,
				taux: action.taux,
				supp: false
			};
		
		case ADD_SCENARIO_REDUCTION_LIGNE:
			return{
				id: action.id,
				cas: "reduction",
				debut: action.debut,
				fin: action.fin,
				ligne: action.ligne,
				taux: action.taux,
				supp: false
			};
		case ADD_SCENARIO_REDUCTION_TRAIN:
			return{
				id: action.id,
				cas: "reduction",
				debut: action.debut,
				fin: action.fin,
				noeud: action.noeud,
				taux: action.taux,
				supp: false
			};
		case ADD_SCENARIO_PERTURBATION:
			return [
				...state,
				{
					scenarioP: action.text
				}
			]
		case TOGGLE_SCENARIO:
			if (state.id !== action.id) {
				return state;
			}
			return {
				id: state.id,
				cas: state.cas,
				debut: state.debut,
				nD: state.nD,
				nA: state.nA,
				noeud: state.noeud,
				fin: state.fin,
				ligne: state.ligne,
				taux: state.taux,
				supp: !state.supp
			};
			
        case SCENARIO_POST_SCENARIO_SUCCESS:
            return [
				{
					scenario: action.scenario
				}
			]
        default:
            return state;
    }
}

function scenarios(state = [], action){
  switch (action.type) {
    case ADD_SCENARIO_AUGMENTATION_LIEN:
		return [
			...state,
			scenario(undefined, action)
		];
    case ADD_SCENARIO_AUGMENTATION_LIGNE:
		return [
			...state,
			scenario(undefined, action)
		];
    case ADD_SCENARIO_AUGMENTATION_NOEUD:
		return [
			...state,
			scenario(undefined, action)
		];
	case ADD_SCENARIO_REDUCTION_LIEN:
		return [
			...state,
			scenario(undefined, action)
		];
	case ADD_SCENARIO_REDUCTION_LIGNE:
		return [
			...state,
			scenario(undefined, action)
		];
	case ADD_SCENARIO_REDUCTION_TRAIN:
		return [
			...state,
			scenario(undefined, action)
		];
    case TOGGLE_SCENARIO:
		return state.map(elem => scenario(elem, action));
	case DELETE_SCENARIO:
		return state.filter( ({supp}) => supp === false);
    default:
      return state;
	  
  }
};

const rootReducer = combineReducers({
    results,
	itemsLine,
	itemsComposant,
	itemsComposantR,
	itemsComposantA,
	itemsVoisinR,
	itemsVoisinA,
    itemsHasErrored,
    itemsIsLoading,
	scenarios,
	todos,
	form: formReducer
})

export default rootReducer