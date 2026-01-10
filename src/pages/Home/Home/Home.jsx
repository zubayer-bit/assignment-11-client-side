import React from 'react';
import PackagesSection from '../PackagesSection/PackagesSection';
import HeroBanner from '../HeroBanner/HeroBanner';
import AboutSection from '../AboutSection/AboutSection'
import FeaturesSection from '../FeaturesSection/FeaturesSection';

const Home = () => {
    return (
        <div>
         
            <HeroBanner></HeroBanner>
            <AboutSection></AboutSection>
            <PackagesSection></PackagesSection>
            <FeaturesSection></FeaturesSection>
        </div>
    );
};

export default Home;