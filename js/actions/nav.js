import { NAVIGATE } from './actionTypes';

const navigateTo = (routeName, options={}) => ({
  type: NAVIGATE,
  routeName,
  options
});

export default {
  navigateTo
};
