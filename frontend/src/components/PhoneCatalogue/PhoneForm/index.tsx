import React from 'react';
import { Form, Input, Button, Upload, Typography, InputNumber } from 'antd';
import strings from '@/locales';
import { PhoneInterface } from '@/domains/entities/phones';

const MAX_LENGTH = 60;

const inputDefaultProps = {
  maxLength: MAX_LENGTH,
};

const labelDefaultProps = {
  labelCol: {
    span: 24,
  },
};

type PhoneFormProps = {
  onFinish: Function;
  loading: boolean;
  initialValues?: PhoneInterface;
};

const PhoneForm: React.FC<PhoneFormProps> = (props) => {

  const [form] = Form.useForm();

  return (
        <Form form={form} onFinish={props?.onFinish} initialValues={props?.initialValues}>
          <Form.Item
            {...labelDefaultProps}
            label={strings.name}
            name="name"
            rules={[{ required: true }]}
          >
            <Input {...inputDefaultProps} placeholder={strings.name} />
          </Form.Item>
          <Form.Item
            {...labelDefaultProps}
            label={strings.manufacturer}
            name="manufacturer"
            rules={[{ required: true }]}
          >
            <Input {...inputDefaultProps} placeholder={strings.manufacturer} />
          </Form.Item>
          <Form.Item
            {...labelDefaultProps}
            label={strings.description}
            name="description"
            rules={[{ required: true }]}
          >
            <Input.TextArea placeholder={strings.description} maxLength={255} />
          </Form.Item>

          <Form.Item
            {...labelDefaultProps}
            label={strings.processor}
            name="processor"
            rules={[{ required: true }]}
          >
            <Input {...inputDefaultProps} placeholder={strings.processor} maxLength={60} />
          </Form.Item>
          <Form.Item
            {...labelDefaultProps}
            label={strings.screen}
            name="screen"
            rules={[{ required: true }]}
          >
            <Input {...inputDefaultProps} placeholder={strings.screen} />
          </Form.Item>

          <Form.Item
            {...labelDefaultProps}
            label={strings.ram}
            name="ram"
            rules={[{ required: true }]}
          >
            <InputNumber {...inputDefaultProps} placeholder={strings.ram} />
          </Form.Item>

          <Form.Item
            {...labelDefaultProps}
            label={strings.color}
            name="color"
            rules={[{ required: true }]}
          >
            <Input {...inputDefaultProps} placeholder={strings.color} maxLength={24} />
          </Form.Item>

          <Form.Item
            {...labelDefaultProps}
            label={strings.imageFileName}
            name="picture"
            normalize={value => {
              return value?.file?.originFileObj;
            }}
          >
            <Upload
              accept="image/*"
              maxCount={1}
              itemRender={(_, file: any) => <Typography.Text>{file.name}</Typography.Text>}
            >
              <Button>{strings.clickToUpload}</Button>
            </Upload>
          </Form.Item>
          <Form.Item
            {...labelDefaultProps}
            label={strings.price}
            name="price"
            rules={[{ required: true }]}
          >
            <InputNumber {...inputDefaultProps} placeholder={strings.price} />
          </Form.Item>
          <Button htmlType='submit' type='primary' loading={props.loading}>
            {strings.save}
          </Button>
        </Form>
  );
};

export default PhoneForm;
