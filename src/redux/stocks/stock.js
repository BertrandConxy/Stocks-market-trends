/* eslint-disable max-len */
const LOAD_STOCK_DATA = 'stocks-market-trends/stocks/LOAD_STOCK_DATA';
const LOAD_COMPANY_DETAILS = 'stocks-market-trends/stocks/LOAD_COMPANY_DETAILS';
const LOAD_COMPANY_STATEMENTS = 'stocks-market-trends/stocks/LOAD_COMPANY_STATEMENTS';
const FILTER_COMPANY = 'stocks-market-trends/stocks/FILTER_COMPANY';
const RESET_STOCK = 'stocks-market-trends/stocks/RESET_STOCK';
const endpoint = 'https://financialmodelingprep.com/api/v3/';
const apiKey = 'ddf8f182e284649cacf38622ddf293c3';

const initialState = {
  stocksData: [],
  details: [],
  statement: [],
  filtered: [],
};

export const loadStockData = (payload) => ({
  type: LOAD_STOCK_DATA,
  payload,
});

export const loadCompanyDetails = (payload) => ({
  type: LOAD_COMPANY_DETAILS,
  payload,
});

export const loadCompanyStatement = (payload) => ({
  type: LOAD_COMPANY_STATEMENTS,
  payload,
});

export const filterCompany = (payload) => ({
  type: FILTER_COMPANY,
  payload,
});

export const resetStock = () => ({
  type: RESET_STOCK,
});

export const fetchCompanyDetails = (companyId) => async (dispatch) => {
  try {
    const response = await fetch(
      `${endpoint}profile/${companyId}?apikey=${apiKey}`,
    );
    const result = await response.json();
    dispatch(loadCompanyDetails(result));
  } catch (err) {
    throw new Error(err);
  }
};

export const fetchCompanyStatements = (companyId) => async (dispatch) => {
  try {
    const response = await fetch(
      `${endpoint}income-statement/${companyId}?limit=120&apikey=${apiKey}`,
    );
    const result = await response.json();
    dispatch(loadCompanyStatement(result));
  } catch (err) {
    throw new Error(err);
  }
};

export const fetchStockData = () => async (dispatch) => {
  try {
    const response = await fetch(
      `${endpoint}stock_market/actives?limit=20&apikey=${apiKey}`,
    );
    const result = await response.json();
    const data = result.map(
      ({
        symbol, name, change, price, changesPercentage,
      }) => ({
        id: symbol,
        change,
        companyName: name,
        price,
        changesPercentage,
      }),
    );

    dispatch(loadStockData(data));
  } catch (err) {
    throw new Error(err);
  }
};

const stocksDataReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case LOAD_STOCK_DATA:
      return { ...state, stocksData: [...payload] };

    case LOAD_COMPANY_DETAILS:
      return { ...state, details: [...payload] };

    case LOAD_COMPANY_STATEMENTS:
      return { ...state, statement: [...payload] };
    case RESET_STOCK:
      return { ...state, statement: [], details: [] };
    case FILTER_COMPANY:
      if (payload === '') {
        return { ...state, filtered: [...state.stocksData] };
      }
      return {
        ...state,
        filtered: [
          ...state.stocksData.filter(({ companyName }) => companyName.toLowerCase().includes(payload.toLowerCase())),
        ],
      };

    default:
      return state;
  }
};

export default stocksDataReducer;
