import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import CompanyDetails from '../components/details/CompanyDetails';
import store from '../redux/configureStore';

const CompanyDetailsProvider = () => (
  <Provider store={store}>
    <CompanyDetails />
  </Provider>
);

describe('renders properly the company details page', () => {
  it('renders correctly', () => {
    const component = renderer.create(<CompanyDetailsProvider />).toJSON();
    expect(component).toMatchSnapshot();
  });
});
