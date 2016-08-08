/**
 *
 */
export const SET_TEST_DONE = 'common/checklist/SET_TEST_DONE';



/**
 *
 */
export const setTestDone = (id, done) => ({
	type: SET_TEST_DONE,
	payload: {
		id,
		done
	}
});
