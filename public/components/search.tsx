import { EuiButton, EuiFlexGroup, EuiFlexItem, EuiTextArea } from '@elastic/eui';
import React, { useEffect, useState } from 'react';
import {
  IndexPattern,
  isCompleteResponse,
  isErrorResponse,
} from '../../../../src/plugins/data/public';
import { ENHANCED_ES_SEARCH_STRATEGY } from '../../../../x-pack/plugins/data_enhanced/public';
import type { TimIsCoolAppDeps } from './app';

export const SearchData = ({ notifications, plugins }: TimIsCoolAppDeps) => {
  const { data } = plugins;

  const [req, setReq] = useState<{ params: any }>();
  const [indexPattern, setIndexPattern] = useState<IndexPattern>();
  const [response, setResponse] = useState<Record<string, any>>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [abortController, setAbortController] = useState<AbortController>();

  // auto
  useEffect(() => {
    if (!indexPattern) {
      data.indexPatterns
        .create({
          title: 'tests-*',
          fields: {
            name: { name: 'name', type: 'string', searchable: true, aggregatable: true },
            avocadoes: { name: 'avocadoes', type: 'number', searchable: true, aggregatable: true },
          },
        })
        .then((pattern) => {
          setIndexPattern(pattern);
          console.info('got pattern', pattern);

          // Constuct the agg portion of the search request
          const aggs = [
            { type: 'shard_delay', params: { value: '2s' } },
            { type: 'terms', params: { field: 'country', order: 'desc', size: 5 } },
            { type: 'avg', params: { field: 'avocadoes' } },
          ];
          const aggsDsl = data.search.aggs.createAggConfigs(pattern, aggs).toDsl();

          const myReq = { params: { index: pattern.title, size: 1500, body: { aggs: aggsDsl } } }; // Search Request
          setReq(myReq);
          console.info('got req', myReq);
        });
    }
  }, [indexPattern, req, data.indexPatterns, data.search.aggs]);

  // handle click action to search
  const doDelayedAsyncSearch = async () => {
    if (!req) {
      return;
    }

    const controller = new AbortController();
    setAbortController(controller);

    setIsLoading(true);

    // Submit the search request using the `data.search` service.
    const search$ = data.search
      .search(req, {
        strategy: ENHANCED_ES_SEARCH_STRATEGY,
        abortSignal: controller.signal,
      })
      .subscribe({
        next: (res) => {
          if (isCompleteResponse(res)) {
            setResponse(res.rawResponse);
            setIsLoading(false);
            console.info('got response', res.rawResponse);
            search$.unsubscribe();
          } else if (isErrorResponse(res)) {
            setIsLoading(false);
            notifications.toasts.addError(new Error('Error response'), { title: 'Error' });
            search$.unsubscribe();
          }

          if (res.isRunning) {
            notifications.toasts.addInfo('Search is still running...');
          }
        },
        error: (err) => {
          setIsLoading(false);
          console.error(err);
          notifications.toasts.addError(err, { title: 'Failed to run search' });
        },
      });
  };

  // cancel
  const doCancel = () => {
    if (!abortController) {
      throw new Error('bad abort controller initialization');
    }

    abortController.abort();
  };

  return (
    <>
      <EuiFlexGroup>
        <EuiFlexItem grow={true}>
          <EuiTextArea
            defaultValue={JSON.stringify(req)}
            readOnly={true}
            aria-label="Search Shower"
          />
        </EuiFlexItem>
        <EuiFlexItem grow={true}>
          <EuiTextArea
            defaultValue={JSON.stringify(response?.aggregations)}
            readOnly={true}
            aria-label="Search Shower"
          />
        </EuiFlexItem>
      </EuiFlexGroup>

      <EuiFlexGroup>
        <EuiFlexItem grow={false}>
          <EuiButton
            type="primary"
            size="s"
            onClick={() => doDelayedAsyncSearch()}
            isLoading={isLoading}
          >
            Search
          </EuiButton>
        </EuiFlexItem>
        <EuiFlexItem grow={false}>
          <EuiButton type="primary" size="s" onClick={() => doCancel()} isDisabled={!isLoading}>
            Cancel
          </EuiButton>
        </EuiFlexItem>
      </EuiFlexGroup>
    </>
  );
};
