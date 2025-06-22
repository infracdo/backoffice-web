import React from 'react';
import { ConfigProvider } from 'antd';
import { IntlProvider } from 'react-intl';
import { ThemeProvider } from 'styled-components';
import themes from '@zeep/config/theme/theme.config';
import AppLocale from '@zeep/config/translation';

export default function AppProvider({ children }) {
  const currentAppLocale = AppLocale["en"];
  return (
    <ConfigProvider locale={currentAppLocale.antd}>
      <IntlProvider
        locale={currentAppLocale.locale}
        messages={currentAppLocale.messages}
      >
        <ThemeProvider theme={themes["defaultTheme"]}>{children}</ThemeProvider>
      </IntlProvider>
    </ConfigProvider>
  );
}
