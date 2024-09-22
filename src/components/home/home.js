import AboutHome from './aboutHome/aboutHome';
import SliderHome from './sliderHome/sliderHome';
import ServiceHome from './serviceHome/serviceHome';
import ActionHome from './actionHome/actionHome';
import PortfolioHome from './portfolioHome/portfolioHome';
// import TestimonialHome from './testimonialHome/testimonialHome';
const Home = () => {
    return (
        <div>           
            <SliderHome />
            <AboutHome />
            <PortfolioHome/>
            <ServiceHome/>
            <ActionHome/>
        </div>
    )
}
export default Home;