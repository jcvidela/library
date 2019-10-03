import { FIND_USER } from '../actions/types';

const initialState = {

}


export default function (state = initialState, action) {
	switch(action.type) {
		case FIND_USER:
			return {
				...state,
				name: action.user.name,
				lastname: action.user.lastname,
				alumncode: action.user.alumncode,
				career: action.user.career
			}

			default:
				return state;
	}
}