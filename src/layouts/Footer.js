import React, { Fragment } from 'react';
import { Layout } from 'antd';
import GlobalFooter from '@/components/GlobalFooter';

const { Footer } = Layout;
const FooterView = () => (
  <Footer style={{ padding: 0 }}>
    <GlobalFooter
      copyright={
        <Fragment>
          <span>肇庆学院　201524131316　15科技3班　陈景亮</span>
        </Fragment>
      }
    />
  </Footer>
);
export default FooterView;
