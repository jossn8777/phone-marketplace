import React from 'react';
import { useRequest } from '@umijs/hooks';
import { Button, message, Popconfirm } from 'antd';
import { deletePhone } from '@/domains/services/phones';
import strings from '@/locales';


type DeleteConfirmProps = {
  id: number;
  refresh?: Function;
};

const DeleteConfirm: React.FC<DeleteConfirmProps> = (props: DeleteConfirmProps) => {

  const deleteRequest = useRequest(deletePhone, {
    manual: true,
    onSuccess: () => {
      props.refresh && props.refresh();
    },
    onError: (err) => {
        message.error(err)
    }
  });

  return (
    <Popconfirm
      title={strings.deletePhoneQuestion}
      okText={strings.ok}
      cancelText={strings.cancel}
      okButtonProps={{ loading: deleteRequest.loading }}
      onConfirm={() => deleteRequest.run(props.id)}
    >
      <Button>{strings.delete}</Button>
    </Popconfirm>
  );
};

export default DeleteConfirm;
