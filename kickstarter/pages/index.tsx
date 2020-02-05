import React from 'react';
import factory from '../ethereum/factory';
import CampaignsList from '../components/CampaignsList';
import { Button } from 'semantic-ui-react';
import Layout from '../components/Layout';
import { Link } from '../routes';

const Index: any = (props: any) => {
  return (
    <Layout>
      <div>
        <h3>Open campaigns</h3>
        <Link route='/campaigns/new'>
          <a>
            <Button
              floated='right'
              content='Create campaign'
              icon='add circle'
              primary
            />
          </a>
        </Link>
        <CampaignsList campaings={props.campaings} />
      </div>
    </Layout>
  );
};

Index.getInitialProps = async () => {
  const campaings = await factory.methods.getDeployedCampaigns().call();
  return { campaings };
};

export default Index;
