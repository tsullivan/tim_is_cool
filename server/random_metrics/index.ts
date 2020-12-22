const INDEX_PREFIX = 'tests-';

import { getSettings } from './get_settings';
import { getData } from './get_data';

export const createRandomBulkMetricData = (): string => {
  const data1 = getData();
  const data2 = getData();
  const data3 = getData();

  const returnLines: string[] = [];
  returnLines.push(`DELETE /${INDEX_PREFIX}*`);
  returnLines.push('\n');

  returnLines.push(getSettings());
  returnLines.push('\n');

  returnLines.push(`POST /${INDEX_PREFIX}001/_bulk`);
  for (const doc of data1) {
    returnLines.push(doc);
  }

  returnLines.push(`POST /${INDEX_PREFIX}002/_bulk`);
  for (const doc of data2) {
    returnLines.push(doc);
  }

  returnLines.push(`POST /${INDEX_PREFIX}003/_bulk`);
  for (const doc of data3) {
    returnLines.push(doc);
  }

  return returnLines.join('\n');
};
