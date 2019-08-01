import React, { Fragment } from 'react';
import GlobalFooter from '@/components/GlobalFooter';
import styles from './UserLayout.less';
import thesisLogo from '../assets/thesisLogo.png';

const copyright = (
  <Fragment />
);

class UserLayout extends React.PureComponent {
  // @TODO title
  // getPageTitle() {
  //   const { routerData, location } = this.props;
  //   const { pathname } = location;
  //   let title = 'Ant Design Pro';
  //   if (routerData[pathname] && routerData[pathname].name) {
  //     title = `${routerData[pathname].name} - Ant Design Pro`;
  //   }
  //   return title;
  // }

  render() {
    const { children } = this.props;
    return (
      // @TODO <DocumentTitle title={this.getPageTitle()}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.top}>
            <div className={styles.header}>
              <img alt="logo" className={styles.logo} src={thesisLogo} />
              <span className={styles.logoTitle}>基于</span>
              <span className={styles.logoEg}>WEB</span>
              <span className={styles.logoTitle}>的论文修改与排版系统的设计与实现</span>
            </div>
            {/* <div className={styles.desc}>肇庆学院20152413131615科技3班陈景亮</div> */}
          </div>
          {children}
        </div>
        <GlobalFooter copyright={copyright} />
      </div>
    );
  }
}

export default UserLayout;
