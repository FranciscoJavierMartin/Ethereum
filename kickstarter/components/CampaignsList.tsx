import React from 'react';
import { Card, Button } from 'semantic-ui-react';
import { Link } from '../routes';

interface ICampaignProps {
  campaings: any;
}

const CampaignsList = (props: ICampaignProps) => {
  const items = props.campaings.map(address => ({
    header: address,
    description: (
      <Link route={`/campaigns/${address}`}>
        <a>View Campaign</a>
      </Link>
    ),
    fluid: true
  }));

  return <Card.Group items={items} />;
};

export default CampaignsList;
