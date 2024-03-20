import { Helmet } from 'react-helmet-async';
import { useStaticContext } from './StaticContext';
import photo from '../public/photos/MartinHelping.png';

function Home() {
  const staticContext = useStaticContext();
  return (
    <>
      <Helmet>
        <title>Home - {staticContext?.env?.VITE_SITE_TITLE ?? ''}</title>
      </Helmet>
      <main className="container">
        <h1>Home</h1>
        <div className="card">
          <img src={photo} className="card-img-top" alt="Dev/Mission Highlights"></img>
            <div className="card-body">
              <h5 className="card-title">Spotlight: Martin Tran</h5>
              <p className="card-text">A Dev/Mission Fellowship Alumni giving back to the community</p>
            </div>
        </div>
        <div className="card">
          <img src={photo} className="card-img-top" alt="Dev/Mission Highlights"></img>
            <div className="card-body">
              <h5 className="card-title">Spotlight: Martin Tran</h5>
              <p className="card-text">A Dev/Mission Fellowship Alumni giving back to the community</p>
            </div>
        </div>
        <div className="card">
          <img src={photo} className="card-img-top" alt="Dev/Mission Highlights"></img>
            <div className="card-body">
              <h5 className="card-title">Spotlight: Martin Tran</h5>
              <p className="card-text">A Dev/Mission Fellowship Alumni giving back to the community</p>
            </div>
        </div>
      </main>
    </>
  );
}

export default Home;
