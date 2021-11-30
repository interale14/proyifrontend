import Page from "../Page"
import logo from './Logo.png';

import "./index.css";
const Splash = ()=>{
  return (
    <Page className="page-center" showNavBar={TextTrackCueList}>
      <img src={logo} />
    </Page>
  );
}

export default Splash;
