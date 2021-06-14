import React from 'react';
import { Table, Row, Col, Typography, Button } from 'antd';
import styles from './index.less';
import { useRequest } from '@umijs/hooks';
import DeleteConfirm from '../DeleteConfirm';
import { PhoneInterface } from '@/domains/entities/phones';
import { getPhones } from '@/domains/services/phones';
import strings from '@/locales';

const PhoneTable = () => {
  const { refresh, tableProps } = useRequest(getPhones, { paginated: true, defaultPageSize: 2 });

  const columns = [
    {
      title: strings.name,
      key: strings.name,
      render: ({ name, color, processor }: PhoneInterface) => {
        return (
          <>
            <Typography.Title level={4}>{name}</Typography.Title>
            <Typography.Text>
              {color} | {processor}
            </Typography.Text>
          </>
        );
      },
    },
    {
      title: strings.description,
      key: strings.description,
      render: ({
        picture,
        description,
      }: {
        picture: string;
        description: string;
      }) => {
        return (
          <>
            <div>
              <Typography.Text>{picture}</Typography.Text>
            </div>
            <Typography.Text>{description}</Typography.Text>
          </>
        );
      },
    },
    {
      title: strings.manufacturer,
      key: strings.manufacturer,
      dataIndex: 'manufacturer',
    },
    {
      title: strings.price,
      key: strings.price,
      dataIndex: 'price',
      align: 'right',
      render: (price: string) => (
        <Typography.Text className={styles.price}>${price}</Typography.Text>
      ),
    },
    {
      title: strings.action,
      key: strings.action,
      fixed: 'right',
      align: 'right',
      render: (_: any, item: any) => {
        return (
          <Row type="flex" align="middle" justify="end" gutter={[16, 16]}>
            <Col>
              <Button type="primary" href={`/phone/detail?id=${item.id}`}>
                {strings.editPhone}
              </Button>
            </Col>
            <Col>
              <DeleteConfirm id={item.id} refresh={refresh} />
            </Col>
          </Row>
        );
      },
    },
  ];

  return (
    <div className={styles.container}>
      <Row type="flex" justify="end" align="middle" gutter={[16, 16]}>
        <Col>
          <Button href="/phone/create" type="primary">
            {strings.addPhone}
          </Button>
          {/* <CreateUpdatePhoneModal title={strings.addPhone} onSubmitSuccess={refresh}/> */}
        </Col>
        <Col span={24}>
          <Table
            columns={columns}
            bordered
            {...tableProps}
          />
        </Col>
      </Row>
    </div>
  );
};

export default PhoneTable;
