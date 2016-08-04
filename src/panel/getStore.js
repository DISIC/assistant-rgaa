import createStoreFromStorage from '../common/store/fromStorage';
import {reducers} from '../common/reducers';
import sagas from './sagas';



export default () => createStoreFromStorage('panel', reducers, sagas);
