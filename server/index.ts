import { PluginInitializerContext } from '../../../src/core/server';
import { TimIsCoolPlugin } from './plugin';

//  This exports static code and TypeScript types,
//  as well as, Kibana Platform `plugin()` initializer.

export function plugin(initializerContext: PluginInitializerContext) {
  return new TimIsCoolPlugin(initializerContext);
}

export { TimIsCoolPluginSetup, TimIsCoolPluginStart } from './types';
