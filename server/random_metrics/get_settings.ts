const INDEX_PREFIX = 'tests';

export function getSettings() {
  const settings = {
    settings: {
      number_of_shards: 1,
      number_of_replicas: 0,
    },
    mappings: {
      properties: {
        '@date': {
          type: 'date',
        },
        name: {
          type: 'text',
        },
        country: {
          type: 'keyword',
        },
        ip: {
          type: 'ip',
        },
        quality: {
          type: 'integer',
        },
        avocadoes: {
          type: 'integer',
        },
      },
    },
  };

  const output = [];
  output.push(`PUT /_index_template/${INDEX_PREFIX}dev`);
  output.push('{');
  output.push(`  "index_patterns": ["${INDEX_PREFIX}*"],`);
  output.push('  "priority": 1,');
  output.push(`  "template":\n    ${JSON.stringify(settings)}`);
  output.push('}');
  return output.join('\n');
}
