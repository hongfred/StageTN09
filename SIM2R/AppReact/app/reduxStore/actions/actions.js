/*
 * action types
 */
import {
  ADD_TODO,
  TOGGLE_TODO,
  ITEMS_HAS_ERRORED,
  ITEMS_IS_LOADING,
  ITEMS_FETCH_RESULT_SUCCESS,
  ITEMS_FETCH_LIGNE_SUCCESS,
  ITEMS_FETCH_COMPOSANTS_SUCCESS,
  ITEMS_FETCH_COMPOSANTS_R_SUCCESS,
  ITEMS_FETCH_VOISINS_R_SUCCESS,
  ITEMS_FETCH_COMPOSANTS_A_SUCCESS,
  ITEMS_FETCH_VOISINS_A_SUCCESS,
  DATA_POST_SCENARIO_SUCCESS,
  ADD_SCENARIO_AUGMENTATION_LIEN,
  ADD_SCENARIO_AUGMENTATION_LIGNE,
  ADD_SCENARIO_AUGMENTATION_NOEUD,
  ADD_SCENARIO_REDUCTION_LIEN,
  ADD_SCENARIO_REDUCTION_LIGNE,
  ADD_SCENARIO_REDUCTION_TRAIN,
  TOGGLE_SCENARIO,
  DELETE_SCENARIO,
  DELETE_COMPOSANT,
  DELETE_VOISIN
} from '../actions/actionConst'

/*
 * action creators
 */
let nextTodoId = 0;
export function addTodo(text) {
  return {
	type: ADD_TODO, 
	id: nextTodoId++,
	text 
  }
}

export function toggleScenario(id) {
  return { type: TOGGLE_SCENARIO, id }
}

export function itemsHasErrored(bool) {
    return {
        type: ITEMS_HAS_ERRORED,
        hasErrored: bool
    };
}

export function itemsIsLoading(bool) {
    return {
        type: ITEMS_IS_LOADING,
        isLoading: bool
    };
}

export function itemsFetchDataSuccess(results) {
    return {
        type: ITEMS_FETCH_RESULT_SUCCESS,
        results
    };
}

export function itemsFetchLineSuccess(itemsLine) {
    return {
        type: ITEMS_FETCH_LIGNE_SUCCESS,
        itemsLine
    };
}

export function itemsFetchComposantsSuccess(itemsComposant) {
    return {
        type: ITEMS_FETCH_COMPOSANTS_SUCCESS,
        itemsComposant
    };
}

export function itemsFetchComposantsRSuccess(itemsComposant) {
    return {
        type: ITEMS_FETCH_COMPOSANTS_R_SUCCESS,
        itemsComposant
    };
}
export function itemsFetchComposantsASuccess(itemsComposant) {
    return {
        type: ITEMS_FETCH_COMPOSANTS_A_SUCCESS,
        itemsComposant
    };
}

export function itemsFetchVoisinsRSuccess(itemsVoisin) {
    return {
        type: ITEMS_FETCH_VOISINS_R_SUCCESS,
        itemsVoisin
    };
}

export function itemsFetchVoisinsASuccess(itemsVoisin) {
    return {
        type: ITEMS_FETCH_VOISINS_A_SUCCESS,
        itemsVoisin
    };
}

export function addScenarioALien(debut,fin,nD,nA,ligne,taux) {
	return { 
		type: ADD_SCENARIO_AUGMENTATION_LIEN, 
		id: nextTodoId++,
		debut,
		fin,
		nD,
		nA,
		ligne,
		taux	
	};
}

export function addScenarioALigne(debut,fin,ligne,taux) {
	return { 
		type: ADD_SCENARIO_AUGMENTATION_LIGNE, 
		id: nextTodoId++,
		debut,
		fin,
		ligne,
		taux	
	}
}

export function addScenarioANoeud(debut,fin,noeud,temps) {
	return { 
		type: ADD_SCENARIO_AUGMENTATION_NOEUD, 
		id: nextTodoId++,
		debut,
		fin,
		noeud,
		temps	
	};
}

export function addScenarioRLien(debut,fin,nD,nA,ligne,taux) {
	return { 
		type: ADD_SCENARIO_REDUCTION_LIEN, 
		id: nextTodoId++,
		debut,
		fin,
		nD,
		nA,
		ligne,
		taux
	};
}

export function addScenarioRLigne(debut,fin,ligne) {
	return { 
		type: ADD_SCENARIO_REDUCTION_LIGNE, 
		id: nextTodoId++,
		debut,
		fin,
		ligne
	};
}
export function addScenarioRTrain(debut,fin,noeud,taux) {
	return { 
		type: ADD_SCENARIO_REDUCTION_TRAIN, 
		id: nextTodoId++,
		debut,
		fin,
		noeud,
		taux
	};
}

export function addScenarioP(text) {
	return { 
		type: ADD_SCENARIO_PERTURBATION, 
		text
	};
}

export function deleteScenario() {
	return { 
		type: DELETE_SCENARIO
	};
}

export function deleteComposant() {
	return { 
		type: DELETE_COMPOSANT
	};
}

export function deleteVoisin() {
	return { 
		type: DELETE_VOISIN
	};
}

export function scenarioPostScenarioSuccess(scenario) {
	return {
        type: DATA_POST_SCENARIO_SUCCESS,
        scenario
    };
}

export function itemsFetchData(url, option) {
    return((dispatch) => {
        dispatch(itemsIsLoading(true));
        fetch(url)
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }

                dispatch(itemsIsLoading(false));

                return response;
            })
            .then((response) => response.json())
            .then((items) => {
				switch(option){
					case '1':
						dispatch(itemsFetchDataSuccess(items))
						break;
					case '2':
						dispatch(itemsFetchLineSuccess(items))
						break;
					case '3':
						dispatch(itemsFetchComposantsRSuccess(items))
						break;
					case '4':
						dispatch(itemsFetchVoisinsRSuccess(items))
						break;
					case '5':
						dispatch(itemsFetchComposantsASuccess(items))
						break;
					case '6':
						dispatch(itemsFetchVoisinsASuccess(items))
						break;
					case '7':
						dispatch(itemsFetchComposantsSuccess(items))
						break;
				}}
			)
            .catch(() => dispatch(itemsHasErrored(true)));
    });
}

export function scenarioPostData(url, data) {
    return((dispatch) => {
        dispatch(itemsIsLoading(true));
        fetch(url, {
			headers: {
				'content-type': 'application/json'
			},
			method: 'POST',
			body: 	JSON.stringify(data)
		})
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }

                dispatch(itemsIsLoading(false));

                return response;
            })
            .then((response) => response.json())
            .then((scenario) => dispatch(scenarioPostScenarioSuccess(scenario)))
            .catch(() => dispatch(itemsHasErrored(true)));
    });
}