import reducers from './reducers';
import sagas from './sagas';
import createStoreFromStorage from '../../common/store/fromStorage';

export default createStoreFromStorage(reducers, sagas);
