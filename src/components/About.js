import requirements from '../images/requirements.png';

function About() {
  return (
    <div className="inner-page">
      <img src={requirements} alt="Requirements" />
      <a href="/" className="btn btn-warning mt">
        Go Back
      </a>
    </div>
  );
}

export default About;
