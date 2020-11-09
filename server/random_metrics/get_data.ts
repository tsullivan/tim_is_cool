import moment from 'moment';
import { sample } from 'lodash';

const { random, round, ceil } = Math;

// prettier-ignore
const countries = [ 'AF', 'AL', 'DZ', 'AS', 'AD', 'AO', 'AI', 'AQ', 'AG', 'AR', 'AM', 'AW', 'AU', 'AT', 'AZ', 'BS', 'BH', 'BD', 'BB', 'BY', 'BE', 'BZ', 'BJ', 'BM', 'BT', 'BO', 'BQ', 'BA', 'BW', 'BV', 'BR', 'IO', 'BN', 'BG', 'BF', 'BI', 'KH', 'CM', 'CA', 'CV', 'KY', 'CF', 'TD', 'CL', 'CN', 'CX', 'CC', 'CO', 'KM', 'CG', 'CD', 'CK', 'CR', 'HR', 'CU', 'CW', 'CY', 'CZ', 'CI', 'DK', 'DJ', 'DM', 'DO', 'EC', 'EG', 'SV', 'GQ', 'ER', 'EE', 'ET', 'FK', 'FO', 'FJ', 'FI', 'FR', 'GF', 'PF', 'TF', 'GA', 'GM', 'GE', 'DE', 'GH', 'GI', 'GR', 'GL', 'GD', 'GP', 'GU', 'GT', 'GG', 'GN', 'GW', 'GY', 'HT', 'HM', 'VA', 'HN', 'HK', 'HU', 'IS', 'IN', 'ID', 'IR', 'IQ', 'IE', 'IM', 'IL', 'IT', 'JM', 'JP', 'JE', 'MZ', 'MM', 'NA', 'NR', 'NP', 'NL', 'NC', 'NZ', 'NI', 'NE', 'NG', 'NU', 'NF', 'MP', 'NO', 'OM', 'PK', 'PW', 'PS', 'PA', 'PG', 'PY', 'PE', 'PH', 'PN', 'PL', 'PT', 'PR', 'QA', 'RO', 'RU', 'RW', 'RE', 'BL', 'SH', 'KN', 'LC', 'MF', 'PM', 'VC', 'WS', 'SM', 'ST', 'SA', 'SN', 'RS', 'SC', 'SL', 'SG', 'SX', 'SK', 'SI', 'SB', 'SO', 'ZA', 'GS', 'SS', 'ES', 'LK', 'SD', 'SR', 'SJ', 'SZ', 'SE', 'CH', 'SY', 'TW', 'TJ', 'TZ', 'TH', 'TL', 'TG', 'TK', 'VE', 'VN', 'VG', 'VI', 'WF', 'EH', 'YE', 'ZM', 'ZW' ];

const charGroups: { [key: string]: string[] } = {
  vowels: ['a', 'e', 'i', 'o', 'u', 'y'],
  consos: ['f', 'g', 'h', 'j', 'k', 'l', 'm', 'n'],
};

function getMetric(iteration: number) {
  return {
    quality: ceil(random() * 5),
    avocadoes: round(random() * iteration * 10000),
  };
}

const getName = () => {
  const term = Array(Math.ceil(Math.random() * 20));

  for (let i = term.length; i > 0; i--) {
    const kind = sample(['vowels', 'consos']);
    term.push([sample(charGroups[kind as string])]);
  }

  return term.join('');
};

function getCountry() {
  return sample(countries);
}

function getIp() {
  return [
    ceil(random() * 254),
    ceil(random() * 254),
    ceil(random() * 254),
    ceil(random() * 254),
  ].join('.');
}

export function getData() {
  const SPREAD = 500;
  const END_DATE = moment.utc().valueOf();
  const START_DATE = moment.utc().subtract(1, 'year').valueOf();

  let iterations = SPREAD;
  let time = END_DATE;
  const delta = END_DATE - START_DATE;
  const increment = Math.floor(delta / (SPREAD - 1));

  let output = [];
  while (iterations > 0) {
    const result = Object.assign(
      {
        '@date': moment.utc(time).format(),
        name: getName(),
        country: getCountry(),
        ip: getIp(),
      },
      getMetric(SPREAD - iterations)
    );

    output.push(JSON.stringify({ index: {} }));
    output.push(JSON.stringify(result));

    time -= increment;
    iterations--;
  }

  return output;
}
