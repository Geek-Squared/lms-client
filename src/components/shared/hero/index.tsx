import './styles.scss';

const Hero = () => {
    return (
        <section className="hero">
            <div className="hero__left">
                <h1 className="hero__header">COURSES</h1>
            </div>
            <div className="hero__right">
                <p className="hero__text">Embark on a journey of knowledge discovery with LMS, where education transcends boundaries. </p>
                <button className="hero__button">Explore Courses</button>
            </div>
        </section>
    );
}

export default Hero;