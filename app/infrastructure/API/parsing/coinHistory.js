const APICoinHistoryRecordToCoinHistoryRecord = ({ price, prevClose, time, supply, }) => ({
  open: prevClose,
  close: price,
  date: time,
  supply,
});

const APICoinHistoryRecordToNumeric = (c) => ({
  supply: parseFloat(c.circulatingSupply),
  price: parseFloat(c.priceUsd),
  time: c.time,
});

export const APICallHistoryToCallHistory = (callHistory) => {
  const parsed = callHistory.map(APICoinHistoryRecordToNumeric);
  const first = parsed.shift();

  const initial = APICoinHistoryRecordToCoinHistoryRecord({
    price: first.price,
    prevClose: first.price,
    time: first.time,
    supply: first.supply,
  });

  return parsed
    .reduce((arr, e, i) => {
      const prev = i > 0
        ? arr[i - 1]
        : initial;

      return [
        ...arr,
        APICoinHistoryRecordToCoinHistoryRecord({
          price: e.price,
          prevClose: prev.close,
          time: e.time,
          supply: e.supply,
        })
      ];
    }, []);
};
