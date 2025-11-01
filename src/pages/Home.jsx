import React from 'react';
import Banner from '../components/Banner';
import IndorPlants from '../components/IndorPlants';
import PlantCareTips from '../components/PlantCareTips';
import GreenExperts from '../components/GreenExperts';
import PlantOfTheWeek from '../components/PlantOfTheWeek';



const Home = () => {
    return (
        <main className='container mx-auto px-4 py-8'>
           <Banner />

           {/* Indor Plants */}
          <IndorPlants/>
          <PlantCareTips/>
          <GreenExperts/>
          <PlantOfTheWeek/>
        </main>
    );
};

export default Home;