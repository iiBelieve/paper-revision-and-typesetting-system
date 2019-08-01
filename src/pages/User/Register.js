import React, { Component } from 'react';
import { connect } from 'dva';
import { formatMessage, FormattedMessage } from 'umi/locale';
import Link from 'umi/link';
import router from 'umi/router';
import { Form, Input, Button, Select, Popover, Progress, Spin } from 'antd';
import styles from './Register.less';

const FormItem = Form.Item;

const passwordStatusMap = {
  ok: (
    <div className={styles.success}>
      <FormattedMessage id="validation.password.strength.strong" />
    </div>
  ),
  pass: (
    <div className={styles.warning}>
      <FormattedMessage id="validation.password.strength.medium" />
    </div>
  ),
  poor: (
    <div className={styles.error}>
      <FormattedMessage id="validation.password.strength.short" />
    </div>
  ),
};

const passwordProgressMap = {
  ok: 'success',
  pass: 'normal',
  poor: 'exception',
};

@connect(({ register, loading }) => ({
  register,
  loading: loading.models.register,
}))
@Form.create()
class Register extends Component {
  state = {
    confirmDirty: false,
    visible: false,
    help: '',
    role: '1',
    loading: false,
  };

  // componentDidUpdate() {
  //   const { form, register } = this.props;
  //   const account = form.getFieldValue('mail');
  //   if (register.status === 'ok') {
  //     router.push({
  //   //       pathname: '/user/register-result',
  //   //       state: {
  //   //         account,
  //   //       },
  //   //     });
  //   }
  // }

  getPasswordStatus = () => {
    const { form } = this.props;
    const value = form.getFieldValue('password');
    if (value && value.length > 9) {
      return 'ok';
    }
    if (value && value.length > 5) {
      return 'pass';
    }
    return 'poor';
  };

  handleSubmit = e => {
    e.preventDefault();
    const { form, dispatch } = this.props;
    form.validateFields({ force: true }, (err, values) => {
      console.log(values);
      const val = {};
      val.username = values.username;
      val.name = values.name;
      val.email = values.email;
      val.password = values.password;

      console.log("val");
      console.log(val);

      if (!err) {
        const { role } = this.state;
        if (role === "1") {
          this.setState({
            loading: true
          }, () => {
            dispatch({
              type: 'register/studentSignUp',
              payload: val,
              callback: (response) => {
                this.setState({
                  loading: false
                }, () => {
                  if (response.message === '注册成功') {
                    router.push({
                      pathname: '/user/register-result',
                    });
                  }
                });
              }
            });
          });
        } else if (role === "2") {

          this.setState({
            loading: true,
          }, () => {
            dispatch({
              type: 'register/teacherSignUp',
              payload: val,
              callback: (response) => {
                this.setState({
                  loading: false
                }, () => {
                  if (response.message === '注册成功') {
                    router.push({
                      pathname: '/user/register-result',
                    });
                  }
                });
              }
            });
          });

        }
      }
    });
  };

  checkConfirm = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('password')) {
      callback(formatMessage({ id: 'validation.password.twice' }));
    } else {
      callback();
    }
  };

  checkPassword = (rule, value, callback) => {
    const { visible, confirmDirty } = this.state;
    if (!value) {
      this.setState({
        help: formatMessage({ id: 'validation.password.required' }),
        visible: !!value,
      });
      callback('error');
    } else {
      this.setState({
        help: '',
      });
      if (!visible) {
        this.setState({
          visible: !!value,
        });
      }
      if (value.length < 6) {
        callback('error');
      } else {
        const { form } = this.props;
        if (value && confirmDirty) {
          form.validateFields(['confirm'], { force: true });
        }
        callback();
      }
    }
  };

  renderPasswordProgress = () => {
    const { form } = this.props;
    const value = form.getFieldValue('password');
    const passwordStatus = this.getPasswordStatus();
    return value && value.length ? (
      <div className={styles[`progress-${passwordStatus}`]}>
        <Progress
          status={passwordProgressMap[passwordStatus]}
          className={styles.progress}
          strokeWidth={6}
          percent={value.length * 10 > 100 ? 100 : value.length * 10}
          showInfo={false}
        />
      </div>
    ) : null;
  };

  handleSelect = (value) => {
    if (value === "1" ){
      this.setState({
        role: "1"
      })
    }
    if (value === "2") {
      this.setState({
        role: "2"
      })
    }
  };

  render() {
    const { form, submitting } = this.props;
    const { getFieldDecorator } = form;
    const { help, visible, loading } = this.state;
    return (
      <Spin tip="正在注册，请稍后..." spinning={loading}>
        <div className={styles.main}>

          <Select defaultValue="1" style={{ width: 328, height: 40, marginBottom: 16, marginTop: 30}} onChange={this.handleSelect}>
            <Select.Option value="1">学生注册</Select.Option>
            <Select.Option value="2">教师注册</Select.Option>
          </Select>

          <Form onSubmit={this.handleSubmit}>

            {/* 学号/工号 */}
            <FormItem>
              {getFieldDecorator('username', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'validation.username.required' }),
                  },
                ],
              })(
                <Input size="large" placeholder={formatMessage({ id: 'form.username.placeholder' })} />
              )}
            </FormItem>

            {/* 姓名 */}
            <FormItem>
              {getFieldDecorator('name', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'validation.name.required' }),
                  },
                ],
              })(
                <Input size="large" placeholder={formatMessage({ id: 'form.name.placeholder' })} />
              )}
            </FormItem>

            {/* 邮箱 */}
            <FormItem>
              {getFieldDecorator('email', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'validation.email.required' }),
                  },
                  {
                    type: 'email',
                    message: formatMessage({ id: 'validation.email.wrong-format' }),
                  },
                ],
              })(
                <Input size="large" placeholder={formatMessage({ id: 'form.email.placeholder' })} />
              )}
            </FormItem>

            {/* 密码 */}
            <FormItem help={help}>
              <Popover
                getPopupContainer={node => node.parentNode}
                content={
                  <div style={{ padding: '4px 0' }}>
                    {passwordStatusMap[this.getPasswordStatus()]}
                    {this.renderPasswordProgress()}
                    <div style={{ marginTop: 10 }}>
                      <FormattedMessage id="validation.password.strength.msg" />
                    </div>
                  </div>
                }
                overlayStyle={{ width: 240 }}
                placement="right"
                visible={visible}
              >
                {getFieldDecorator('password', {
                  rules: [
                    {
                      validator: this.checkPassword,
                    },
                  ],
                })(
                  <Input
                    size="large"
                    type="password"
                    placeholder={formatMessage({ id: 'form.password.placeholder' })}
                  />
                )}
              </Popover>
            </FormItem>

            {/* 再次输入密码 */}
            <FormItem>
              {getFieldDecorator('confirm', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'validation.confirm-password.required' }),
                  },
                  {
                    validator: this.checkConfirm,
                  },
                ],
              })(
                <Input
                  size="large"
                  type="password"
                  placeholder={formatMessage({ id: 'form.confirm-password.placeholder' })}
                />
              )}
            </FormItem>

            {/* 确定提交 */}
            <FormItem>
              <Button
                size="large"
                loading={submitting}
                className={styles.submit}
                type="primary"
                htmlType="submit"
              >
                <FormattedMessage id="app.register.register" />
              </Button>
              <Link className={styles.login} to="/User/Login">
                <FormattedMessage id="app.register.sign-in" />
              </Link>
            </FormItem>

          </Form>

        </div>
      </Spin>
    );
  }
}

export default Register;
