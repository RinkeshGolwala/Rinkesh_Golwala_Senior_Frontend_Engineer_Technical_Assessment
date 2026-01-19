import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import Switch from '../src/components/Switch';

const meta = {
  title: 'Components/Switch',
  component: Switch,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A toggle switch component for binary choices. Perfect for language switching, settings, and feature toggles with accessible design and smooth animations.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    checked: {
      control: 'boolean',
      description: 'Whether the switch is checked/on',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the switch',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
    labelPosition: {
      control: 'select',
      options: ['left', 'right'],
      description: 'Position of the label relative to switch',
    },
    showStateLabels: {
      control: 'boolean',
      description: 'Show ON/OFF labels inside the switch track',
    },
    label: {
      control: 'text',
      description: 'Label text for the switch',
    },
    description: {
      control: 'text',
      description: 'Description text below the label',
    },
  },
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    id: 'default-switch',
    checked: false,
  },
};

export const Checked: Story = {
  args: {
    id: 'checked-switch',
    checked: true,
  },
};

export const WithLabel: Story = {
  args: {
    id: 'labeled-switch',
    checked: false,
    label: 'Enable notifications',
    description: 'Receive updates about your appointments',
  },
};

export const LanguageSwitch: Story = {
  args: {
    id: 'language-switch',
  },
  render: (args) => {
    const [isChineseMode, setIsChineseMode] = useState(false);

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '2rem',
          alignItems: 'center',
        }}
      >
        <Switch
          {...args}
          checked={isChineseMode}
          onChange={(checked) => setIsChineseMode(checked)}
          label={isChineseMode ? '語言模式' : 'Language Mode'}
          description={
            isChineseMode ? '切換至英文模式' : 'Switch to Chinese mode'
          }
          onLabel="中"
          offLabel="EN"
          showStateLabels
          variant="neutral"
          size="lg"
        />

        {/* Demo content that changes based on language */}
        <div
          style={{
            padding: '1.5rem',
            backgroundColor: '#f8f9fa',
            borderRadius: '8px',
            textAlign: 'center',
            minWidth: '300px',
          }}
        >
          <h3 style={{ margin: '0 0 1rem 0' }}>
            {isChineseMode ? '預約確認' : 'Appointment Confirmation'}
          </h3>
          <p style={{ margin: '0 0 1rem 0' }}>
            {isChineseMode
              ? '您的預約已成功確認。張醫生將於明天下午2點為您看診。'
              : 'Your appointment has been confirmed. Dr. Zhang will see you tomorrow at 2:00 PM.'}
          </p>
          <div
            style={{
              display: 'flex',
              gap: '0.5rem',
              justifyContent: 'center',
              fontFamily: isChineseMode
                ? 'system-ui, -apple-system, sans-serif'
                : 'inherit',
            }}
          >
            <button
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
              }}
            >
              {isChineseMode ? '重新安排' : 'Reschedule'}
            </button>
            <button
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: '#dc3545',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
              }}
            >
              {isChineseMode ? '取消預約' : 'Cancel'}
            </button>
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'A language toggle switch that demonstrates switching between English and Chinese content in real-time.',
      },
    },
  },
};
