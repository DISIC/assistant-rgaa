import * as reference from '../common/sagas/reference';



export default function* sagas() {
	yield [
		reference.watchFetch(),
		reference.watchEnableTest(),
		reference.watchDisableTest()
	];
}
