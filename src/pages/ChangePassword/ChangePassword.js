import React, { Component } from 'react';
import { connect } from 'dva';
import { formatMessage, FormattedMessage } from 'umi/locale';
import Link from 'umi/link';
import { Form, Input, Button, Popover, Progress, Spin } from 'antd';
import Result from '../../components/Result';
import styles from './ChangePassword.less';

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

@connect(({ changePassword, loading }) => ({
  changePassword,
  loading: loading.models.changePassword,
}))
@Form.create()
class Register extends Component {
  state = {
    confirmDirty: false,
    visible: false,
    help: '',
    loading: false,
    result: false,
    viewForm: true,
  };

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
      const val = {};
      val.oldPassword = values.oldPassword;
      val.newPassword = values.password;
      val.confirmPassword = values.confirm;

      console.log("val");
      console.log(val);

      this.setState({
        loading: true
      }, () => {
        dispatch({
          type: 'changePassword/revisePassword',
          payload: val,
          callback: (response) => {
            if (response.message === "成功修改密码") {
              this.setState({
                viewForm: false,
                result: true,
                loading: false
              })
            }
            if (response.message === "原密码错误，请重新输入") {
              this.setState({
                viewForm: false,
                result: false,
                loading: false
              })
            }
          }
        });
      });
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

  renderForm = () => {
    const { form, submitting } = this.props;
    const { getFieldDecorator } = form;
    const { help, visible } = this.state;
    return (
      <div className={styles.main}>

        <Form onSubmit={this.handleSubmit}>

          {/* 学号/工号 */}
          <FormItem>
            {getFieldDecorator('oldPassword', {
              rules: [
                {
                  required: true,
                  message: formatMessage({ id: 'validation.oldPassword.required' }),
                },
              ],
            })(
              <Input size="large" placeholder={formatMessage({ id: 'form.oldPassword.placeholder' })} />
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
                  placeholder={formatMessage({ id: 'form.newPassword.placeholder' })}
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
              确认修改
            </Button>
          </FormItem>

        </Form>

      </div>
    );
  };

  // 成功页面
  renderSuccess = () => {
    const actions = (
      <div>
        <div>
          <Button type="primary">
            <Link to={{ pathname: '/writingStandard/writingStandard'}}>
              返回首页
            </Link>
          </Button>
        </div>
      </div>
    );

    return (
      <div className={styles.result}>
        <Result
          type="success"
          title="修改密码成功"
          actions={actions}
          style={{ width: '100%' }}
        />
      </div>
    );
  };

  handleError = () => {
    this.setState({
      result: false,
      viewForm: true
    });
  };

  renderError = () => {
    const actions = (
      <div>
        <div>

          <Button type="primary">
            <Link to={{ pathname: '/writingStandard/writingStandard' }}>
              返回首页
            </Link>
          </Button>

          <Button onClick={() => {this.handleError()}}>
            重新修改
          </Button>

        </div>
      </div>
    );

    return (
      <div className={styles.result}>
        <Result
          type="error"
          title="修改密码失败, 原密码输入错误"
          actions={actions}
          style={{ width: '100%' }}
        />
      </div>
    );
  };

  handleResult = () => {
    const { result } = this.state;
    return (
      <div>
        {
          result ? this.renderSuccess() : this.renderError()
        }
      </div>
    )
  };

  render() {
    const { loading, viewForm } = this.state;
    return (
      <Spin tip="正在提交修改后的密码，请稍后..." spinning={loading}>
        <div className={styles.box}>
          { viewForm ? this.renderForm() : this.handleResult() }
        </div>
      </Spin>
    );
  }

}

export default Register;
