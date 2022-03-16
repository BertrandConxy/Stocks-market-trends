import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Navbar, Table } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { BsArrowLeftSquareFill } from 'react-icons/bs';
import {
  fetchCompanyDetails,
  fetchCompanyStatements,
  resetStock,
} from '../../redux/stocks/stock';
import './companyDetails.css';
import SkeletonLoader from '../loader/SkeletonLoader';

const CompanyDetails = () => {
  const dispatch = useDispatch();
  const detailsState = useSelector((state) => state.stocksDataReducer.details);
  const statementState = useSelector(
    (state) => state.stocksDataReducer.statement,
  );
  const { companyId } = useParams();
  useEffect(() => {
    dispatch(fetchCompanyDetails(companyId));
    dispatch(fetchCompanyStatements(companyId));
  }, [companyId]);

  const clickHandler = () => {
    dispatch(resetStock());
  };

  if (detailsState.length === 0 || statementState.length === 0) {
    return <SkeletonLoader />;
  }
  return (
    <>
      <header>
        <Container>
          <Navbar expand="lg" variant="dark" bg="primary">
            <Container>
              <Link to="/" onClick={clickHandler}>
                <div className="display-6 text-white">
                  <BsArrowLeftSquareFill />
                </div>
              </Link>
              <Navbar.Brand href="#" className="text-white">
                Company Details
              </Navbar.Brand>
            </Container>
          </Navbar>
        </Container>
      </header>
      <section className="details-section">
        {detailsState.map(
          ({
            companyName,
            ceo,
            description,
            industry,
            country,
            city,
            image,
            currency,
            website,
            volAvg: volatility,
          }) => (
            <Container key={companyId}>
              <div className="details-container flex">
                <div className="image-container flex">
                  <div>
                    <img src={image} alt="company" />
                  </div>
                  <div>
                    <h6>
                      Country:&nbsp;
                      {country}
                    </h6>
                    <h6>
                      City:&nbsp;
                      {city}
                    </h6>
                    <h6>
                      Currency:&nbsp;
                      {currency}
                    </h6>
                  </div>
                </div>
                <div className="company-details flex">
                  <h2>{companyName}</h2>
                  <h3>
                    CEO:&nbsp;
                    {ceo}
                  </h3>
                  <h4>Description:</h4>
                  <p>{description}</p>
                  <h4>
                    Industry:&nbsp;
                    <span>{industry}</span>
                  </h4>
                  <h4>
                    Website:&nbsp;
                    <a href={website} target="_blank" rel="noreferrer">
                      Visit website
                    </a>
                  </h4>
                  <h4>
                    Stock volatility:&nbsp;
                    <span>{volatility}</span>
                  </h4>
                </div>
              </div>
            </Container>
          ),
        )}
      </section>
      <section className="m-4">
        <Container>
          <h2 className="text-center">Financial statements report</h2>
          <Container>
            <Table striped bordered hover variant="dark">
              <thead>
                <tr>
                  <th>Reported Year</th>
                  <th>Income statement</th>
                </tr>
              </thead>
              <tbody>
                {statementState.map(
                  ({
                    revenue,
                    grossProfit,
                    grossProfitRatio,
                    netIncome,
                    netIncomeRatio,
                    calendarYear,
                    operatingIncomeRatio,
                  }) => (
                    <tr key={companyId}>
                      <td>{calendarYear}</td>
                      <td
                        className="statement-data"
                        key={`${companyId}statement`}
                      >
                        <span>
                          <strong>Revenue:</strong>
                          &nbsp;
                          {`${revenue}$`}
                        </span>
                        <span>
                          <strong>GrossProfit:</strong>
                          &nbsp;
                          {`${grossProfit}$`}
                        </span>
                        <span>
                          <strong>Net income:</strong>
                          &nbsp;
                          {`${netIncome}$`}
                        </span>
                        <span>
                          <strong>Gross Profit Ratio:</strong>
                          &nbsp;
                          {`${grossProfitRatio}`}
                        </span>
                        <span>
                          <strong>Net Income Ratio:</strong>
                          &nbsp;
                          {`${netIncomeRatio}`}
                        </span>
                        <span>
                          <strong>Operating Income Ratio:</strong>
                          &nbsp;
                          {`${operatingIncomeRatio}`}
                        </span>
                      </td>
                    </tr>
                  ),
                )}
              </tbody>
            </Table>
          </Container>
        </Container>
      </section>
    </>
  );
};

export default CompanyDetails;
