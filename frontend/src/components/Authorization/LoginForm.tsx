import React from 'react';
import { useRequest } from '@umijs/hooks';
import { login } from '@/domains/services/authorization';
import { Button, message } from 'antd';
import strings from '@/locales';
import { history } from 'umi';

const LoginForm = () => {
  const { loading, run } = useRequest(
    () => login({ userIdentity: 'superadmin', password: '123456' }),
    {
      manual: true,
      onSuccess: () => {
        message.success(strings.loginSuccess);
        history.push({ pathname: '/phone' })
      },
      onError: (e) => {
        message.error('Something wrong, please try again!');
      },
    },
  );
  return (
    <Button onClick={run} loading={loading} type='primary'>
      {strings.loginAsDefaultAdmin}
    </Button>
  );
};

export default LoginForm;
