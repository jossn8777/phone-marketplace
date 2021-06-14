import React from 'react';
import { Row, Col, message } from 'antd';
import PhoneForm from '@/components/PhoneCatalogue/PhoneForm';
import { useRequest } from '@umijs/hooks';
import { createPhone } from '@/domains/services/phones';
import { history } from 'umi';

const PhoneCreate = () => {
  const createRequest = useRequest(createPhone, {
    manual: true,
    onSuccess: () => {
    history.replace('/phone');
      message.success('Create Phone Model Success');
    },
    onError: () => {
      message.error('Something wrong happen! Please try again');
    },
  });

  const onFinish = (values) => {
    createRequest.run(values);
  };

  return (
    <Row justify="center">
      <Col span={20}>
        <PhoneForm loading={createRequest.loading} onFinish={onFinish} />
      </Col>
    </Row>
  );
};

export default PhoneCreate;
