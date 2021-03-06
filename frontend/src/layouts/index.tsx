import React from 'react';
import styles from './index.css';
import strings from '@/locales';

const BasicLayout: React.FC = props => {
  return (
    <div className={styles.normal}>
      <h1 className={styles.title}>{strings.pageTitle}</h1>
      {props.children}
    </div>
  );
};

export default BasicLayout;
