import React from 'react';
import { Typography, Row } from 'antd';
import styles from './index.less';
import LoginForm from '@/components/Authorization/LoginForm';
import '../global.less';

export default function () {
  return (
    <div className={styles.normal}>
      <Row justify='center'>
      <img src='/images/yay.jpg' className={styles.image}/>
      </Row>
      <Row align='middle' justify='center'>
        <Typography.Title className={styles.welcome}>Welcome</Typography.Title>
        
      </Row>
      <Row align='middle' justify='center'>
        <LoginForm />
      </Row>
    </div>
  );
}
