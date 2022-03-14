import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCompanyDetails, fetchCompanyStatements } from '../../redux/stocks/stock';
import './companyDetails.css';


const CompanyDetails = () => {
  const dispatch = useDispatch();
  const detailsState = useSelector(
    (state) => state.stocksDataReducer.details,
  );
  const statementState = useSelector((state)=> state.stocksDataReducer.statement);
  console.log(statementState);
  const { companyId } = useParams();
  useEffect(() => {
    dispatch(fetchCompanyDetails(companyId));
    dispatch(fetchCompanyStatements(companyId));
  }, [companyId]);
  return (
    <>
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
            <div key={companyId} className="details-container flex">
              <div className="image-container flex">
                <div>
                  <img src={image} alt="company" />
                </div>
                <div>
                  <h4>
                    Country:
                    {country}
                  </h4>
                  <h4>
                    City:
                    {city}
                  </h4>
                  <h4>
                    Currency:
                    {currency}
                  </h4>
                </div>
              </div>
              <div className="company-details flex">
                <h2>{companyName}</h2>
                <h3>
                  CEO:
                  {ceo}
                </h3>
                <h4>Description:</h4>
                <p>{description}</p>
                <h4>
                  Industry:
                  <span>{industry}</span>
                </h4>
                <h4>
                  Website:
                  <a href={website} target="_blank" rel="noreferrer">
                    Visit website
                  </a>
                </h4>
                <h4>
                  Stock volatility:
                  <span>{volatility}</span>
                </h4>
              </div>
            </div>
          )
        )}
      </section>
      <section>
          <h2>Financial statements report</h2>
          <table>
              <tbody>
                  <tr>
                      <th>Reported year</th>
                      <th>Income statement</th>
                  </tr>
                  {statementState.map(({
                      revenue,
                      grossProfit,
                      grossProfitRatio,
                      netIncome,
                      netIncomeRatio,
                      calendarYear,
                  })=>(
                      <tr key={companyId}>
                          <td>{calendarYear}</td>
                          <td>
                              <span>Revenue: {`${revenue}$`}</span>
                              <span>grossProfit: {`${grossProfit}$`}</span>
                              <span>Net income: {`${netIncome}$`}</span>
                              <span>Gross Profit Ratio: {`${grossProfitRatio}`}</span>
                              <span>Net Income Ratio: {`${netIncomeRatio}`}</span>
                          </td>
                      </tr>
                  ))}
              </tbody>
          </table>
      </section>
    </>
  );
};

export default CompanyDetails;
