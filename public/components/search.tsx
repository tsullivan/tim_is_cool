import { EuiButton, EuiFlexGroup, EuiFlexItem, EuiTextArea } from '@elastic/eui';
import React, { useEffect, useState } from 'react';
import useObservable from 'react-use/lib/useObservable';
import * as Rx from 'rxjs';
import type { IEsSearchResponse, IndexPattern } from 'src/plugins/data/public';
import { ENHANCED_ES_SEARCH_STRATEGY } from '../../../../x-pack/plugins/data_enhanced/public';
import type { TimIsCoolAppDeps } from './app';

export const SearchData = ({ notifications, plugins }: TimIsCoolAppDeps) => {
  const { data } = plugins;

  const [req, setReq] = useState<{ params: any }>();
  const [indexPattern, setIndexPattern] = useState<IndexPattern>();

  const searchSubscription$ = new Rx.Subject<IEsSearchResponse>();
  const myCoolData = useObservable<IEsSearchResponse>(searchSubscription$);

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
          const aggs = [{ type: 'avg', params: { field: 'avocadoes' } }];
          const aggsDsl = data.search.aggs.createAggConfigs(pattern, aggs).toDsl();

          const myReq = { params: { index: pattern.title, size: 1500, body: { aggs: aggsDsl } } }; // Search Request
          setReq(myReq);
          console.info('got req', myReq);
        });
    }
  }, [indexPattern, req, data.indexPatterns, data.search.aggs]);

  // onClick
  const doAsyncSearch = async () => {
    if (!req) {
      return;
    }

    // Submit the search request using the `data.search` service.
    data.search
      .search(req, {
        strategy: ENHANCED_ES_SEARCH_STRATEGY,
      })
      .subscribe({
        next: (res) => {
          searchSubscription$.next(res);
        },
        error: (err) => {
          console.error(err);
          notifications.toasts.addDanger('Failed to run search');
        },
      });
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
            defaultValue={JSON.stringify(myCoolData?.rawResponse.aggregations)}
            readOnly={true}
            aria-label="Search Shower"
          />
        </EuiFlexItem>
      </EuiFlexGroup>
      <EuiFlexGroup>
        <EuiFlexItem grow={true}>
          <EuiButton type="primary" size="s" onClick={() => doAsyncSearch()}>
            Send search
          </EuiButton>
        </EuiFlexItem>
      </EuiFlexGroup>
    </>
  );
};
