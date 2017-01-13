import * as tests from '../common/sagas/tests';



export default function* sagas() {
	yield [
		tests.watchEnable(),
		tests.watchDisable()
	];
}
