import {
  EuiButton,
  EuiCodeEditor,
  EuiFlexGroup,
  EuiFlexItem,
  EuiPage,
  EuiPageBody,
  EuiPageContent,
  EuiPageContentBody,

  EuiPageHeader,

  EuiText, EuiTitle
} from '@elastic/eui';
import { FormattedMessage, I18nProvider } from '@kbn/i18n/react';
import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { CoreStart } from '../../../../src/core/public';
import { NavigationPublicPluginStart } from '../../../../src/plugins/navigation/public';
import { PLUGIN_ID, PLUGIN_NAME } from '../../common';




interface TimIsCoolAppDeps {
  basename: string;
  notifications: CoreStart['notifications'];
  http: CoreStart['http'];
  navigation: NavigationPublicPluginStart;
}

export const TimIsCoolApp = ({ basename, notifications, http, navigation }: TimIsCoolAppDeps) => {
  // Use React hooks to manage state.
  const [randomData, setRandomData] = useState<string | undefined>();

  const onClickHandler = () => {
    // Use the core http service to make a response to the server API.
    http.get('/api/tim_is_cool/random').then((res) => {
      setRandomData(res.data);
    });
  };

  // Render the application DOM.
  // Note that `navigation.ui.TopNavMenu` is a stateful component exported on the `navigation` plugin's start contract.
  return (
    <Router basename={basename}>
      <I18nProvider>
        <>
          <navigation.ui.TopNavMenu
            appName={PLUGIN_ID}
            showSearchBar={true}
            useDefaultBehaviors={true}
          />
          <EuiPage restrictWidth="1000px">
            <EuiPageBody>
              <EuiPageHeader>
                <EuiTitle size="l">
                  <h1>
                    <FormattedMessage
                      id="timIsCool.helloWorldText"
                      defaultMessage="{name}"
                      values={{ name: PLUGIN_NAME }}
                    />
                  </h1>
                </EuiTitle>
              </EuiPageHeader>
              <EuiPageContent>
                <EuiPageContentBody>
                  <EuiText>
<EuiFlexGroup>
  <EuiFlexItem>
<EuiCodeEditor
      mode="json"
      isReadOnly={true}
      theme="github"
      width="100%"
      value={randomData}
      onBlur={() => {}}
      aria-label="Code Editor"
    />

  </EuiFlexItem>
</EuiFlexGroup>
<EuiFlexGroup>
  <EuiFlexItem>
                    <EuiButton type="primary" size="s" onClick={onClickHandler}>
                      <FormattedMessage id="timIsCool.buttonText" defaultMessage="Get data" />
                    </EuiButton>

  </EuiFlexItem>
</EuiFlexGroup>
                  </EuiText>
                </EuiPageContentBody>
              </EuiPageContent>
            </EuiPageBody>
          </EuiPage>
        </>
      </I18nProvider>
    </Router>
  );
};
