import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Carousel, Card } from 'react-bootstrap';
// import { Link } from "react-router-dom";
import { FaLongArrowAltDown, FaLongArrowAltUp } from 'react-icons/fa';
import { fetchStockData } from '../../redux/stocks/stock';
import Bg from '../../images/top-bg.png';
import './topContainer.css';

const TopContainer = () => {
  const stockState = useSelector((state) => state.stocksDataReducer.stocksData);
  const mostActive = stockState.slice(0, 4);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchStockData());
  }, []);

  return (
    <section>
      <Carousel className="mt-3 position-relative">
        {mostActive.map(
          ({
            id, change, companyName, price, changesPercentage,
          }) => (
            <Carousel.Item key={id}>
              <Card className="bg-dark text-white">
                <Card.Img src={Bg} alt="Card image" />
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
            </Carousel.Item>
          ),
        )}
      </Carousel>
    </section>
  );
};

export default TopContainer;
