import { EuiButton, EuiCodeEditor, EuiFlexGroup, EuiFlexItem } from '@elastic/eui';
import { FormattedMessage } from '@kbn/i18n/react';
import React, { useState } from 'react';
import { TimIsCoolAppDeps } from './app';

export const RandomData = ({ http, initialData }: TimIsCoolAppDeps) => {
  const [randomData, setRandomData] = useState<string | undefined>(initialData);
  const onClickHandler = () => {
    // Use the core http service to make a response to the server API.
    http.get('/api/tim_is_cool/random').then((res) => {
      setRandomData(res.data);
    });
  };

  return (
    <>
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
    </>
  );
};
