import React, { useState } from 'react';
import { Form, Button, Input, Message } from 'semantic-ui-react';
import Layout from '../../components/Layout';
import factory from '../../ethereum/factory';
import web3 from '../../ethereum/web3';
import { Router } from '../../routes';

const CampaignNew = () => {
  const [minimumContribution, setMinimumContribution] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit = async (event: any) => {
    event.preventDefault();
    setLoading(true);
    setErrorMessage('');

    try {
      const accounts = await web3.eth.getAccounts();
      await factory.methods.createCampaign(minimumContribution).send({
        from: accounts[0]
      });

      Router.pushRoute('/');
      
    } catch (err) {
      setErrorMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <h3>Create a campaign</h3>
      <Form onSubmit={onSubmit} error={!!errorMessage}>
        <Form.Field>
          <label>Minimum contribution</label>
          <Input
            label='wei'
            labelPosition='right'
            value={minimumContribution}
            onChange={(event: any) =>
              setMinimumContribution(event.target.value)
            }
          />
        </Form.Field>
        <Message error header='Something went wrong' content={errorMessage} />
        <Button loading={loading} primary>
          Create
        </Button>
      </Form>
    </Layout>
  );
};

export default CampaignNew;
