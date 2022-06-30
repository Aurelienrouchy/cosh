import { Dimensions } from 'react-native';

export const width = Dimensions.get('window').width;
export const height = Dimensions.get('window').height;
export const isSmallDevice = width < 375;

export const RESULTS_ADDRESS_HEIGHT = height / 4 - 90;
export const MODAL_HEIGHT = 130;
