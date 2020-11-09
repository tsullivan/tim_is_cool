import { IRouter } from '../../../../src/core/server';
import { createRandomBulkMetricData } from '../random_metrics';

export function defineRoutes(router: IRouter) {
  router.get(
    {
      path: '/api/tim_is_cool/example',
      validate: false,
    },
    async (context, request, response) => {
      return response.ok({
        body: {
          time: new Date().toISOString(),
        },
      });
    }
  );

  router.get(
    { path: '/api/tim_is_cool/random', validate: false },
    async (context, request, response) => {
      return response.ok({ body: { data: createRandomBulkMetricData() } });
    }
  );
}
