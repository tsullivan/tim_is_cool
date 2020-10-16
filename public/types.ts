import { NavigationPublicPluginStart } from '../../../src/plugins/navigation/public';

export interface TimIsCoolPluginSetup {
  getGreeting: () => string;
}
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface TimIsCoolPluginStart {}

export interface AppPluginStartDependencies {
  navigation: NavigationPublicPluginStart;
}
