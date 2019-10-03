import { FIND_USER } from './types';

export const findUser = user => {
	console.log(user)
	return {
		type: FIND_USER,
		user
	}
}

