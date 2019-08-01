import React, { PureComponent } from 'react';
import { FormattedMessage } from 'umi/locale';
import { Spin, Menu, Icon } from 'antd';
import HeaderDropdown from '../HeaderDropdown';
import styles from './index.less';

class GlobalHeaderRight extends PureComponent {

  render() {
    const {
      currentUser,
      onMenuClick,
      theme,
    } = this.props;

    const menu = (
      <Menu className={styles.menu} selectedKeys={[]} onClick={onMenuClick}>
        <Menu.Item key="userCenter">
          <Icon type="user" />
          <FormattedMessage id="menu.changePassword.changePassword" defaultMessage="changePassword changePassword" />
        </Menu.Item>
        <Menu.Item key="logout">
          <Icon type="logout" />
          <FormattedMessage id="menu.account.logout" defaultMessage="logout" />
        </Menu.Item>
      </Menu>
    );
    let className = styles.right;
    if (theme === 'dark') {
      className = `${styles.right}  ${styles.dark}`;
    }
    return (
      <div className={className}>
        {currentUser.name ? (
          <HeaderDropdown overlay={menu}>
            <span className={`${styles.action} ${styles.account}`}>
              <span style={{marginRight: 55}}>欢迎，{currentUser.name}</span>
            </span>
          </HeaderDropdown>
        ) : (
          <Spin size="small" style={{ marginLeft: 8, marginRight: 8 }} />
        )}
      </div>
    );
  }
}

export default GlobalHeaderRight
