import React, { Component } from 'react';
import { connect } from 'dva';
import { formatMessage, FormattedMessage } from 'umi/locale';
import Link from 'umi/link';
import { Alert, Button, message } from 'antd';
import Login from '@/components/Login';
import styles from './Login.less';

const { Tab, UserName, Password, Submit } = Login;

@connect(({ login, loading }) => ({
  login,
  submitting: loading.effects['login/login'],
}))
class LoginPage extends Component {
  state = {
    type: 'stuAccount',
  };

  onTabChange = type => {
    this.setState({ type });
  };

  handleSubmit = (err, values) => {
    const { type } = this.state;
    console.log("values");
    console.log(values);
    if (!err) {
      const { dispatch } = this.props;
      if (type === "stuAccount" && values.username.length === 12) {
        dispatch({
          type: 'login/login',
          payload: {
            ...values,
            type,
          },
        });
      }

      if (type === "stuAccount" && values.username.length !== 12) {
        message.error("请选择正确的端口进行登录");
      }

      if (type === "TeacherAccount" && values.username.length !== 5) {
        message.error("请选择正确的端口进行登录");
      }

      if (type === "TeacherAccount" && values.username.length === 5) {
        dispatch({
          type: 'login/login',
          payload: {
            ...values,
            type,
          },
        });
      }
    }
  };

  renderMessage = content => (
    <Alert style={{ marginBottom: 24 }} message={content} type="error" showIcon />
  );

  render() {
    const { login, submitting } = this.props;
    const { type } = this.state;
    return (
      <div className={styles.main}>
        <Login
          defaultActiveKey={type}
          onTabChange={this.onTabChange}
          onSubmit={this.handleSubmit}
          ref={form => {
            this.loginForm = form;
          }}
        >

          {/* 学生登录 */}
          <Tab key="stuAccount" tab={formatMessage({ id: 'app.login.tab-login-student' })}>
            {login.status === 'error' &&
              login.type === 'stuAccount' &&
              !submitting &&
              this.renderMessage(formatMessage({ id: 'app.login.message-invalid-credentials-stu' }))}
            <UserName
              name="username"
              placeholder={`${formatMessage({ id: 'app.login.stuNumber' })}: 请输入学生学号`}
              rules={[
                {
                  required: true,
                  message: formatMessage({ id: 'validation.stuNumber.required' }),
                },
              ]}
            />
            <Password
              name="password"
              placeholder={`${formatMessage({ id: 'app.login.stuPassword' })}: 请输入密码`}
              rules={[
                {
                  required: true,
                  message: formatMessage({ id: 'validation.stuPassword.required' }),
                },
              ]}
              onPressEnter={() => this.loginForm.validateFields(this.handleSubmit)}
            />
          </Tab>

          {/* 教师登录 */}
          <Tab key="TeacherAccount" tab={formatMessage({ id: 'app.login.tab-login-teacher' })}>
            {login.status === 'error' &&
            login.type === 'TeacherAccount' &&
            !submitting &&
            this.renderMessage(formatMessage({ id: 'app.login.message-invalid-credentials-tea' }))}
            <UserName
              name="username"
              placeholder={`${formatMessage({ id: 'app.login.teaNumber' })}: 请输入教师工号`}
              rules={[
                {
                  required: true,
                  message: formatMessage({ id: 'validation.teaNumber.required' }),
                },
              ]}
            />
            <Password
              name="password"
              placeholder={`${formatMessage({ id: 'app.login.teaPassword' })}: 请输入密码`}
              rules={[
                {
                  required: true,
                  message: formatMessage({ id: 'validation.teaPassword.required' }),
                },
              ]}
              onPressEnter={() => this.loginForm.validateFields(this.handleSubmit)}
            />
          </Tab>

          <div className={styles.other}>
            <Button>
              <Link className={styles.register} to="/user/register">
                <FormattedMessage id="app.login.signup" />
              </Link>
            </Button>
          </div>

          {/* 忘记密码 */}
          {/* <div>
            <a style={{ float: 'right' }} href="">
              <FormattedMessage id="app.login.forgot-password" />
            </a>
          </div> */}

          <Submit loading={submitting}>
            <FormattedMessage id="app.login.login" />
          </Submit>

        </Login>
      </div>
    );
  }
}

export default LoginPage;
