import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Container, Card } from 'react-bootstrap';
import { FaLongArrowAltDown, FaLongArrowAltUp } from 'react-icons/fa';
import { FiArrowRightCircle } from 'react-icons/fi';
import { fetchStockData } from '../../redux/stocks/stock';
import SkeletonLoader from '../loader/SkeletonLoader';
import Search from '../search/Search';
import './companyStock.css';
import Chart from '../../images/chart-graph.png';

const CompanyStock = () => {
  const stockState = useSelector((state) => state.stocksDataReducer.stocksData);
  const filteredState = useSelector(
    (state) => state.stocksDataReducer.filtered,
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchStockData());
  }, []);

  if (stockState.length === 0) {
    return <SkeletonLoader />;
  }
  return (
    <>
      <Search />
      <Container className="p-0">
        <section className="companyListing">
          {filteredState.length === 0
            ? stockState.map(
              ({
                id, change, companyName, price, changesPercentage,
              }) => (
                <Card className="text-white alternate" key={id}>
                  <Link to={`/details/${id}`} key={`${id}link`} className="text-white">
                    <Card.Img src={Chart} alt="Card image" />
                    <Card.ImgOverlay className="text-center align-center d-flex flex-column  justify-content-center">
                      <Card.Title>{companyName}</Card.Title>
                      <Card.Text>
                        <span className=" bg-dark text-white p-2 text-center">
                          {id}
                        </span>
                      </Card.Text>
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
                        <Card.Text className="right-side d-flex flex-column">
                          <span>
                            <FiArrowRightCircle className="text-white m-2 h3" />
                          </span>
                        </Card.Text>
                      </Card.Text>
                      <Card.Text>Last updated 20 hours ago</Card.Text>
                    </Card.ImgOverlay>
                  </Link>
                </Card>
              ),
            )
            : filteredState.map(
              ({
                id, change, companyName, price, changesPercentage,
              }) => (
                <Card className=" p-3 text-white alternate" key={id}>
                  <Link to={`/details/${id}`} key={id} className="text-white">
                    <Card.Img src={Chart} alt="Card image" />
                    <Card.ImgOverlay className=" align-center d-flex flex-column  justify-content-start">
                      <Card.Title className="h3">{companyName}</Card.Title>
                      <Card.Text>
                        <span className=" bg-dark text-white p-2 text-center">
                          {id}
                        </span>
                      </Card.Text>
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
                      <Card.Text className="right-side d-flex flex-column-reverse">
                        <span>
                          <FiArrowRightCircle className="text-white m-2 h3" />
                        </span>
                      </Card.Text>
                      <Card.Text>Last updated 20 hours ago</Card.Text>
                    </Card.ImgOverlay>
                  </Link>
                </Card>
              ),
            )}
        </section>
      </Container>
    </>
  );
};

export default CompanyStock;
