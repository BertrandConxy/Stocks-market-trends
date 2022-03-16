import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import store from '../redux/configureStore';
import CompanyStock from '../components/companyStock/CompanyStock';

const CompanyProvider = () => (
  <Provider store={store}>
    <CompanyStock />
  </Provider>
);

describe('renders the company stock data', () => {
  it('renders properly', () => {
    const component = renderer.create(<CompanyProvider />).toJSON();
    expect(component).toMatchSnapshot();
  });
});
