const LOAD_STOCK_DATA = 'stocks-market-trends/stocks/LOAD_STOCK_DATA';
const endpoint = 'https://financialmodelingprep.com/api/v3/';
const apiKey = 'e528de4fe03aeb75adc32ec89784f643';

const initialState = {
  stocksData: [],
};

const loadStockData = (payload) => ({
  type: LOAD_STOCK_DATA,
  payload,
});

export const fetchStockData = () => async (dispatch) => {
  try {
    const response = await fetch(`${endpoint}stock_market/actives?limit=20&apikey=${apiKey}`);
    const result = await response.json();
    const data = result.map(({
      symbol, name, change, price, changesPercentage,
    }) => ({
      id: symbol,
      change,
      companyName: name,
      price,
      changesPercentage,
    }));

    dispatch(loadStockData(data));
  } catch (err) {
    throw new Error(err);
  }
};

const stocksDataReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case LOAD_STOCK_DATA:
      return { ...state, stocksData: [...payload] };

    default:
      return state;
  }
};

export default stocksDataReducer;
