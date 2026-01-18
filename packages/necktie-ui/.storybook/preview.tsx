import type { Preview } from '@storybook/react';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    docs: {
      toc: true,
    },
    backgrounds: {
      default: 'light',
      values: [
        {
          name: 'light',
          value: '#ffffff',
        },
        {
          name: 'dark',
          value: 'rgb(42, 46, 66)',
        },
        {
          name: 'brand-light',
          value: '#fff0f6',
        },
      ],
    },
  },
  globalTypes: {
    locale: {
      description: 'Internationalization locale',
      defaultValue: 'en',
      toolbar: {
        icon: 'globe',
        items: [
          { value: 'en', title: 'English' },
          { value: 'zh-HK', title: '繁體中文' },
        ],
        showName: true,
      },
    },
  },
  decorators: [
    (Story, context) => {
      const { locale } = context.globals;
      
      return (
        <div lang={locale} style={{ fontFamily: locale?.startsWith('zh') ? 'PingFang TC, Microsoft YaHei, sans-serif' : undefined }}>
          <Story />
        </div>
      );
    },
  ],
};

export default preview;