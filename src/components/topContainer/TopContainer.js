import React from 'react';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Carousel } from 'react-bootstrap';
// import { Link } from "react-router-dom";
import { fetchStockData } from "../../redux/stocks/stock";
import Ford from '../../images/Ford.png';
import Apple from '../../images/Apple.png';
import AMD from '../../images/AMD.jpg';
import SoFi from '../../images/SoFi.jpg';

const TopContainer = () => {
     const stockState = useSelector(
       (state) => state.stocksDataReducer.stocksData
     );
    const mostActive = stockState.slice(0,4);
    console.log(mostActive);
    const dispatch = useDispatch();
      useEffect(() => {
          dispatch(fetchStockData());
      }, []);

  return (
    <section>
      <Carousel>
        <Carousel.Item>
          <img className="d-block w-100" src={Ford} alt="First slide" />
          <Carousel.Caption>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={Apple}
            alt="Second slide"
          />

          <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={AMD}
            alt="Third slide"
          />

          <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={SoFi}
            alt="Third slide"
          />

          <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </section>
  );
}

export default TopContainer