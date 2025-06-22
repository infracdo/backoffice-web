import React from 'react';
import sideBarStore from '@zeep/zustand/app/sidebar';
import { Layout } from 'antd';
import useWindowSize from '@zeep/lib/hooks/useWindowSize';
import Sidebar from '../Sidebar/Sidebar';
import Topbar from '../Topbar/Topbar';
import AppRoutes from './AppRoutes';

import { AppContainer, AppGlobalStyles } from './App.styles';

const { Content } = Layout;
const styles = {
  layout: { flexDirection: 'row', overflowX: 'hidden' },
  content: {
    padding: '70px 0 0',
    flexShrink: '0',
    background: '#f1f3f6',
    position: 'relative',
  },
  footer: {
    background: '#ffffff',
    textAlign: 'center',
    borderTop: '1px solid #ededed',
  },
};

export default function MainApp() {
  const { toggleAll } = sideBarStore();
  const appHeight = sideBarStore().height;
  const { width, height } = useWindowSize();

  React.useEffect(() => {
    toggleAll(width, height);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width, height]);
  return (
    <AppContainer>
      <AppGlobalStyles />
      <Layout style={{ height: height }}>
        <Topbar />
        <Layout style={styles.layout}>
          <Sidebar />
          <Layout
            className="isoContentMainLayout"
            style={{
              height: appHeight,
            }}
          >
            <Content className="isomorphicContent" style={styles.content}>
              <AppRoutes />
            </Content>
            {/* <Footer style={styles.footer}>{siteConfig.footerText}</Footer>*/}
          </Layout>
        </Layout>
      </Layout>
    </AppContainer>
  );
}
