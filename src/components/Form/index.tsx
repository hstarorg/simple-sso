'use client';

import RcForm, { Field, FormProps as RcFormProps } from 'rc-field-form';
import { FieldProps } from 'rc-field-form/es/Field';
import { PropsWithChildren } from 'react';

export type FormProps = {
  onFinish?: RcFormProps['onFinish'];
  form?: RcFormProps['form'];
};

export function Form({
  form,
  onFinish,
  children,
}: PropsWithChildren<FormProps>) {
  return (
    <RcForm form={form} className="layui-form" onFinish={onFinish}>
      {children}
    </RcForm>
  );
}

Form.Item = (props: FieldProps) => {
  return (
    <div className="layui-form-item">
      <Field {...props} />
    </div>
  );
};
Form.useForm = RcForm.useForm;
