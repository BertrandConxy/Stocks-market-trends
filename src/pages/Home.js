import React from 'react';
import { Container } from 'react-bootstrap';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import CompanyStock from '../components/companyStock/CompanyStock';
import TopContainer from '../components/topContainer/TopContainer';

const Home = () => (
  <>
    <header>
      <Header />
    </header>
    <main>
      <Container>
        <TopContainer />
        <CompanyStock />
      </Container>
    </main>
    <Footer />
  </>
);

export default Home;
