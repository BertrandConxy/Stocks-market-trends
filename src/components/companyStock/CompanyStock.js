import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Container, Card } from 'react-bootstrap';
import { FaLongArrowAltDown, FaLongArrowAltUp } from 'react-icons/fa';
import { fetchStockData } from '../../redux/stocks/stock';
import SkeletonLoader from '../loader/SkeletonLoader';
import Search from '../search/Search';
import './companyStock.css';
import Chart from '../../images/chart-graph.png';

const CompanyStock = () => {
  const stockState = useSelector((state) => state.stocksDataReducer.stocksData);
  const filteredState = useSelector((state) => state.stocksDataReducer.filtered);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchStockData());
  }, []);

  if (stockState.length === 0) {
    return (
      <SkeletonLoader />
    );
  }
  return (
    <>
      <Search />
      <Container>
        <section className="companyListing">
          {filteredState.length === 0
            ? stockState.map(
              ({
                id, change, companyName, price, changesPercentage,
              }) => (
                <Link to={`/details/${id}`} key={`${id}link`}>
                  <Card className="text-white">
                    <Card.Img src={Chart} alt="Card image" />
                    <Card.ImgOverlay className="text-center align-center d-flex flex-column  justify-content-center">
                      <Card.Title>{companyName}</Card.Title>
                      <Card.Text>
                        <span>
                          <strong>Price:</strong>
                          {' '}
                          {`${price}$`}
                        </span>
                        <span>
                          <FaLongArrowAltUp className="text-success" />
                          {changesPercentage}
                        </span>
                        <span>
                          <FaLongArrowAltDown className="text-danger" />
                          {change}
                        </span>
                      </Card.Text>
                      <Card.Text>Last updated 20 hours ago</Card.Text>
                    </Card.ImgOverlay>
                  </Card>
                </Link>
              ),
            )
            : filteredState.map(
              ({
                id, change, companyName, price, changesPercentage,
              }) => (
                <Link to={`/details/${id}`} key={id}>
                  <Card className=" p-3 text-white">
                    <Card.Img src={Chart} alt="Card image" />
                    <Card.ImgOverlay className=" align-center d-flex flex-column  justify-content-start">
                      <Card.Title className="h3">{companyName}</Card.Title>
                      <Card.Text className="d-flex flex-column">
                        <span>
                          <strong>Price:</strong>
                          {' '}
                          {`${price}$`}
                        </span>
                        <span>
                          <FaLongArrowAltUp className="text-success" />
                          {changesPercentage}
                        </span>
                        <span>
                          <FaLongArrowAltDown className="text-danger" />
                          {change}
                        </span>
                      </Card.Text>
                      <Card.Text>Last updated 20 hours ago</Card.Text>
                    </Card.ImgOverlay>
                  </Card>
                </Link>
              ),
            )}
        </section>
      </Container>
    </>
  );
};

export default CompanyStock;
