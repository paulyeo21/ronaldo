import { NAVIGATE } from './actionTypes';

const navigateTo = routeName => ({
  type: NAVIGATE,
  routeName
});

export default {
  navigateTo
}
