const coinHistoryRecordToCandle = ({ price, prevClose, time, supply, }) => ({
  open: prevClose,
  close: price,
  date: time,
  supply,
});

const APICallHistoryToCallHistory = (c) => ({
  supply: parseFloat(c.circulatingSupply),
  price: parseFloat(c.priceUsd),
  time: c.time,
});

export const callHistoryToCandles = (callHisotry) => {
  const parsed = callHisotry.map(APICallHistoryToCallHistory);
  const first = parsed[0];

  const initial = coinHistoryRecordToCandle({
    price: first.price,
    prevClose: first.price,
    time: first.time,
    supply: first.supply,
  });

  return parsed
    .reduce((arr, e, i) => {
      if (!i) return [initial];

      const prev = arr[i - 1];

      return [
        ...arr,
        coinHistoryRecordToCandle({
          price: e.price,
          prevClose: prev.close,
          time: e.time,
          supply: e.supply,
        })
      ];
    }, []);
};
