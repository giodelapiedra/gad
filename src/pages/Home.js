import React from 'react';
import Clients from '../components/Clients';
import Cta from '../components/Cta';
import Footer from '../components/Footer';
import MainPage from '../components/MainPage';  // Capitalized component name
import Intro from '../components/Intro';
import Portfolio from '../components/Portfolio';
import Services from '../components/Services';

const Home = () => {
    return (
        <>
            <MainPage />  {/* Capitalized component name */}
            <Services />
            
            <Intro />
            
            <Portfolio />
     
            <Clients />
            <Cta />
            <Footer />
        </>
    )
}

export default Home;
