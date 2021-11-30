import Page from '../Page';
import { useSelector } from 'react-redux';
import Content from '../UI/Content';
const getSecurity = ({security})=>security;
const Dashboard = ()=>{
  const {user } = useSelector(getSecurity);

  return (
    <Page title="Nostalgia Drive 1.0" showHeader showNavBar>
      <Content>
        <div>
          { user.email}
          <br/>
          { user._id }
        </div>
      </Content>
    </Page>
  );
}

export default Dashboard;
