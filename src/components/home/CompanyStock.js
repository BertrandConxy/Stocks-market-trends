import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchStockData} from '../../redux/stocks/stock';
import SkeletonLoader from '../loader/SkeletonLoader';
import Search from '../search/Search';
import TopContainer from '../topContainer/TopContainer';
import './companyStock.css';

let fetched = false;
const CompanyStock = () => {
  const stockState = useSelector((state) => state.stocksDataReducer.stocksData);
  const filteredState = useSelector((state) => state.stocksDataReducer.filtered);
  console.log(filteredState);
  const dispatch = useDispatch();
  useEffect(() => {
    if(!fetched) {
      dispatch(fetchStockData());
      fetched = true;
    }
    
  }, []);

  if(stockState.length === 0) {
    return (

      <SkeletonLoader/>
    )
  }
  return (
    <>
    <TopContainer />
      <Search />
      <section className="companyListing">
      {
  filteredState.length === 0
    ? stockState.map(
        ({ id, change, companyName, price, changesPercentage }) => (
          <div className="card" key={id}>
            <Link to={`/details/${id}`}>
              <h3>{companyName}</h3>
              <br />
              <span>{id}</span>
              <span>{`${price}$`}</span>
              <span>{change}</span>
              <span>{changesPercentage}</span>
            </Link>
          </div>
        )
      )
    : filteredState.map(
        ({ id, change, companyName, price, changesPercentage }) => (
          <div className="card" key={id}>
            <Link to={`/details/${id}`}>
              <h3>{companyName}</h3>
              <br />
              <span>{id}</span>
              <span>{`${price}$`}</span>
              <span>{change}</span>
              <span>{changesPercentage}</span>
            </Link>
          </div>
        )
      )
}
      </section>
    </>
  );
};

export default CompanyStock;



