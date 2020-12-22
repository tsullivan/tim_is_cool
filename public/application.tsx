import React from 'react';
import ReactDOM from 'react-dom';
import { AppMountParameters, CoreStart } from '../../../src/core/public';
import { AppPluginStartDependencies } from './types';
import { TimIsCoolApp } from './components/app';

export const renderApp = (
  { notifications, http }: CoreStart,
  plugins: AppPluginStartDependencies,
  { appBasePath, element }: AppMountParameters
) => {
  http.get('/api/tim_is_cool/random').then((res) => {
    ReactDOM.render(
      <TimIsCoolApp
        basename={appBasePath}
        notifications={notifications}
        http={http}
        plugins={plugins}
        initialData={res.data}
      />,
      element
    );
  });

  return () => ReactDOM.unmountComponentAtNode(element);
};
