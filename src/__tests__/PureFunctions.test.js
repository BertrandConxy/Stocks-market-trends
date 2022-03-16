import stocksDataReducer, * as Actions from '../redux/stocks/stock';
import MockDetails from '../__mocks__/MockDetails';
import MockStockData from '../__mocks__/MockStockData';

describe('tests all actions', () => {
  const data = MockStockData.map(
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

  const initialState = {
    stocksData: [],
    details: [],
    statement: [],
    filtered: [],
  };

  const storeData = stocksDataReducer(
    initialState,
    Actions.loadStockData(data),
  );

  it('loads all active companies', () => {
    expect(storeData.stocksData).toEqual(data);
  });

  it('loads all company details', () => {
    const { details } = stocksDataReducer(
      storeData,
      Actions.loadCompanyDetails(MockDetails.details),
    );
    expect(details.length).toBe(1);
    expect(details[0].companyName).toEqual('Apple Inc.');
  });

  it('loads company statement', () => {
    const { statement } = stocksDataReducer(
      storeData,
      Actions.loadCompanyStatement(MockDetails.statement),
    );
    expect(statement.length).toBe(5);
    expect(statement[0].symbol).toEqual('AAPL');
  });

  it('filter company according to search input', () => {
    const { filtered } = stocksDataReducer(
      storeData,
      Actions.filterCompany('Apple'),
    );
    expect(filtered.length).toBe(1);
  });

  it('resets the store data to empty', () => {
    const { details, statement } = stocksDataReducer(
      storeData,
      Actions.resetStock(),
    );
    expect(details.length).toEqual(0);
    expect(statement.length).toEqual(0);
  });
});
