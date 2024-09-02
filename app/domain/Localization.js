export const defaultLocale = 'en-US';
export const defaultPercentDigits = 2;

export const formatPercent = ({
  percent,
  compact = false,
  locale = defaultLocale,
}) => (percent / 100).toLocaleString(locale, {
  style: 'percent',
  minimumFractionDigits: compact ? 0 : defaultPercentDigits,
  maximumFractionDigits: compact ? 0 : defaultPercentDigits,
});

const getDefaultCompactDigits = (price) => price < 2
  ? 8
  : 1;

const getDefaultDigits = (price) => price < 2
  ? 8
  : 2;

export const formatPrice = ({
  price,
  digits,
  compact = false,
  locale = defaultLocale,
}) => compact
    ? price.toLocaleString(locale, { notation: 'compact', maximumFractionDigits: digits || getDefaultCompactDigits(price) })
    : price.toLocaleString(locale, { maximumFractionDigits: digits || getDefaultDigits(price) });
