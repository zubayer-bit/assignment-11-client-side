import React from 'react';
import PackagesSection from '../PackagesSection/PackagesSection';
import HeroBanner from '../HeroBanner/HeroBanner';
import AboutSection from '../AboutSection/AboutSection'
import FeaturesSection from '../FeaturesSection/FeaturesSection';
import TestimonialsSection from '../TestimonialsSection/TestimonialsSection';
import ExtraSections from '../ExtraSections/ExtraSections';

const Home = () => {
    return (
        <div>
         
            <HeroBanner></HeroBanner>
            <AboutSection></AboutSection>
            <PackagesSection></PackagesSection>
            <FeaturesSection></FeaturesSection>
            <TestimonialsSection></TestimonialsSection>
            <ExtraSections></ExtraSections>
        </div>
    );
};

export default Home;