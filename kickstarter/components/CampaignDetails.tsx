import React from 'react';
import { Card } from 'semantic-ui-react';
import web3 from '../ethereum/web3';

const CampaignDetail = (props: any) => {
  const {
    balance,
    manager,
    minimumContribution,
    requestsCount,
    approversCount
  } = props;
  const items = [
    {
      header: manager,
      meta: 'Address of Manager',
      description:
        'The manager created this campaign and can create requests to withdraw money',
      style: { overflowWrap: 'break-word' }
    },
    {
      header: minimumContribution,
      meta: 'Minimum Contribution (wei)',
      description:
        'You must contribute at least this much wei to become an approver'
    },
    {
      header: requestsCount,
      meta: 'Number of Requests',
      description:
        'A request tries to withdraw money from the contract. Requests must be approved by approvers'
    },
    {
      header: approversCount,
      meta: 'Number of Approvers',
      description:
        'Number of people who have already donated to this campaign'
    },
    {
      header: web3.utils.fromWei(balance, 'ether'),
      meta: 'Campaign Balance (ether)',
      description:
        'The balance is how much money this campaign has left to spend.'
    }
  ];

  return <Card.Group items={items} />;
}

export default CampaignDetail;