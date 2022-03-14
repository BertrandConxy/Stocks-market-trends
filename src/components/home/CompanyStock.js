import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchStockData } from '../../redux/stocks/stock';

const CompanyStock = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchStockData());
  }, []);
  return (
    <div>CompanyStock</div>
  );
};

export default CompanyStock;
