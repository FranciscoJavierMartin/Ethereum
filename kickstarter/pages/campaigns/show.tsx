import React from 'react';
import { Grid, Button } from 'semantic-ui-react';
import Layout from '../../components/Layout';
import Campaign from '../../ethereum/campaign';
import CampaignDetail from '../../components/CampaignDetails';
import ContributeForm from '../../components/ContributeForm';
import { Link } from '../../routes';

const CampaignShow: any = (props: any) => {

  return(
    <Layout>
        <h3>Campaign Show</h3>
        <Grid>
          <Grid.Row>
            <Grid.Column width={10}><CampaignDetail {...props}/></Grid.Column>
            <Grid.Column width={6}>
              <ContributeForm address={props.address} />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Link route={`/campaigns/${props.address}/requests`}>
                <a>
                  <Button primary>View Requests</Button>
                </a>
              </Link>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Layout>
  );
}

CampaignShow.getInitialProps = async (props: any) => {
  const campaing = Campaign(props.query.address);
  const summary = await campaing.methods.getSummary().call();
  return {
    address: props.query.address,
    minimumContribution: summary[0],
    balance: summary[1],
    requestsCount: summary[2],
    approversCount: summary[3],
    manager: summary[4]
  };
};

export default CampaignShow;