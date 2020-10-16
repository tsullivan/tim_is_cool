import {
  PluginInitializerContext,
  CoreSetup,
  CoreStart,
  Plugin,
  Logger,
} from '../../../src/core/server';

import { TimIsCoolPluginSetup, TimIsCoolPluginStart } from './types';
import { defineRoutes } from './routes';

export class TimIsCoolPlugin implements Plugin<TimIsCoolPluginSetup, TimIsCoolPluginStart> {
  private readonly logger: Logger;

  constructor(initializerContext: PluginInitializerContext) {
    this.logger = initializerContext.logger.get();
  }

  public setup(core: CoreSetup) {
    this.logger.debug('timIsCool: Setup');
    const router = core.http.createRouter();

    // Register server side APIs
    defineRoutes(router);

    return {};
  }

  public start(core: CoreStart) {
    this.logger.debug('timIsCool: Started');
    return {};
  }

  public stop() {}
}
