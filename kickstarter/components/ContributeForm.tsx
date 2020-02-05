import React, { useState } from 'react';
import { Form, Input, Message, Button } from 'semantic-ui-react';
import Campaign from '../ethereum/campaign';
import web3 from '../ethereum/web3';
import { Router } from '../routes';

const ContributeForm = (props: any) => {
  const [value, setValue] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const onSubmit = async (event: any) => {
    event.preventDefault();

    const campaign = Campaign(props.address);

    setLoading(true);
    setErrorMessage('');

    try {
      const accounts = await web3.eth.getAccounts();
      await campaign.methods.contribute().send({
        from: accounts[0],
        value: web3.utils.toWei(value, 'ether')
      });

      Router.replaceRoute(`/campaigns/${props.address}`);
    } catch (err) {
      setErrorMessage(err.message);
    }

    setLoading(false);
    setErrorMessage('');
  };

  return (
    <Form onSubmit={onSubmit} error={!!errorMessage}>
      <Form.Field>
        <label>Amount to Contribute</label>
        <Input
          value={value}
          onChange={(event: any) => setValue(event.target.value)}
          label='ether'
          labelPosition='right'
        />
      </Form.Field>
      <Message error header='Oops!' content={errorMessage} />
      <Button primary loading={loading}>
        Contribute!
      </Button>
    </Form>
  );
};

export default ContributeForm;
