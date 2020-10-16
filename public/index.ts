import './index.scss';

import { TimIsCoolPlugin } from './plugin';

// This exports static code and TypeScript types,
// as well as, Kibana Platform `plugin()` initializer.
export function plugin() {
  return new TimIsCoolPlugin();
}
export { TimIsCoolPluginSetup, TimIsCoolPluginStart } from './types';
