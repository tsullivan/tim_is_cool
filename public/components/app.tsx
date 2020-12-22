import {
  EuiPage,
  EuiPageBody,
  EuiPageContent,
  EuiPageContentBody,
  EuiPageHeader,
  EuiSpacer,
  EuiTab,
  EuiTabs,
  EuiTitle,
} from '@elastic/eui';
import { I18nProvider } from '@kbn/i18n/react';
import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { CoreStart } from '../../../../src/core/public';
import { PLUGIN_ID } from '../../common';
import { AppPluginStartDependencies } from '../types';
import { RandomData } from './random_data';
import { SearchData } from './search';

export interface TimIsCoolAppDeps {
  basename: string;
  notifications: CoreStart['notifications'];
  http: CoreStart['http'];
  plugins: AppPluginStartDependencies;
  initialData: string;
}
const tabs = [
  {
    id: 'tests',
    name: 'Tests',
  },
  {
    id: 'random_data',
    name: 'Random Data',
  },
];

export const TimIsCoolApp = (props: TimIsCoolAppDeps) => {
  // Use React hooks to manage state.
  const [selectedTabId, setSelectedTabId] = useState('tests');

  const onSelectedTabChanged = (id: string) => {
    setSelectedTabId(id);
  };

  const renderTabs = () => {
    return tabs.map((tab, index) => (
      <EuiTab
        onClick={() => onSelectedTabChanged(tab.id)}
        isSelected={tab.id === selectedTabId}
        key={index}
      >
        {tab.name}
      </EuiTab>
    ));
  };

  const renderContent = () => {
    return selectedTabId === 'random_data' ? <RandomData {...props} /> : <SearchData {...props} />;
  };

  // Render the application DOM.
  // Note that `navigation.ui.TopNavMenu` is a stateful component exported on the `navigation` plugin's start contract.
  const { TopNavMenu } = props.plugins.navigation.ui;
  return (
    <Router basename={props.basename}>
      <I18nProvider>
        <>
          <TopNavMenu appName={PLUGIN_ID} showSearchBar={true} useDefaultBehaviors={true} />
          <EuiPage restrictWidth="1000px">
            <EuiPageBody>
              <EuiPageHeader>
                <EuiTitle size="l">
                  <h1>Tim is Cool</h1>
                </EuiTitle>
              </EuiPageHeader>
              <EuiPageContent>
                <EuiPageContentBody>
                  <EuiTabs>{renderTabs()}</EuiTabs>
                  <EuiSpacer />
                  {renderContent()}
                </EuiPageContentBody>
              </EuiPageContent>
            </EuiPageBody>
          </EuiPage>
        </>
      </I18nProvider>
    </Router>
  );
};
