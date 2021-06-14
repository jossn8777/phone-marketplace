import React from 'react';
import { Spin, Row, Col, message } from 'antd';
import PhoneForm from '@/components/PhoneCatalogue/PhoneForm';
import { useRequest } from '@umijs/hooks';
import { getPhone, updatePhone } from '@/domains/services/phones';
import strings from '@/locales';
import { history } from 'umi';

const PhoneDetail = (props: any) => {
  const { id } = props?.location?.query;

  const { loading, data } = useRequest(getPhone, {
    defaultParams: [id],
  });

  const updatePhoneRequest = useRequest(updatePhone, {
    manual: true,
    onSuccess: () => {
      message.success(strings.updateSuccess);
      history.replace('/phone');
    },
    onError: () => {
      message.error('Something wrong!');
    },
  });

  const onFinish = (values: any) => {
    updatePhoneRequest.run(values, data.id);
  };

  if (loading) {
    return (
      <Row justify="center">
        <Spin spinning />
      </Row>
    );
  }

  return (
    <Row justify="center">
      <Col span={20}>
        <PhoneForm
          loading={updatePhoneRequest.loading}
          onFinish={onFinish}
          initialValues={data}
        />
      </Col>
    </Row>
  );
};

export default PhoneDetail;
