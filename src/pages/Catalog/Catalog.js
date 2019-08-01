import React, { Component } from 'react';
import styles from './Catalog.less';
import catalog from '../../assets/catalog.png';

import PageHeaderWrapper from '../../components/PageHeaderWrapper/index';

class Catalog extends Component {

  state = {};

  render() {

    return (
      <PageHeaderWrapper title="目录图文介绍">

        <div className={styles.container}>

          <div className={styles.photoBox}>
            <img src={catalog} alt="catalog" />
          </div>

        </div>

      </PageHeaderWrapper>
    );
  }
}

export default Catalog;
