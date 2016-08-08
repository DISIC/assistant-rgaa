/**
 *
 */
export const SET = 'common/instructions/SET';



/**
 *
 */
export const set = (data) => ({
	type: SET,
	payload: {
		data
	}
});
