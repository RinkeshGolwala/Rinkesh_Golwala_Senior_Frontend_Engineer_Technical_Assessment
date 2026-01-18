import type { Meta, StoryObj } from '@storybook/react';
import Modal from '../src/components/Modal';
import Button from '../src/components/Button';
import { useState } from 'react';

const meta = {
  title: 'Components/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Modal component for displaying content in an overlay. Includes accessibility features like focus trap, keyboard navigation, and portal mounting. Supports different sizes and styles for various use cases.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    open: {
      control: 'boolean',
      description: 'Whether modal is open',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl', 'full'],
      description: 'Size of the modal',
    },
    showCloseButton: {
      control: 'boolean',
      description: 'Whether to show close button',
    },
    closeOnBackdropClick: {
      control: 'boolean',
      description: 'Whether clicking backdrop closes modal',
    },
    closeOnEscape: {
      control: 'boolean',
      description: 'Whether pressing Escape closes modal',
    },
    title: {
      control: 'text',
      description: 'Modal title',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
  },
} satisfies Meta<typeof Modal>;

export default meta;

// Custom story type that excludes props handled by the wrapper
type Story = StoryObj<{
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  title?: React.ReactNode;
  showCloseButton?: boolean;
  closeOnBackdropClick?: boolean;
  closeOnEscape?: boolean;
  className?: string;
  loading?: boolean;
  variant?: 'default' | 'confirmation' | 'danger';
  buttonText?: string;
  children?: React.ReactNode;
}>;

// Wrapper component for interactive stories
const ModalWrapper = ({ 
  open = false, 
  children, 
  buttonText = 'Open Modal',
  ...modalProps 
}: {
  initialOpen?: boolean;
  children: React.ReactNode;
  buttonText?: string;
  [key: string]: any;
}) => {
  const [isOpen, setIsOpen] = useState(open);

  return (
    <>
      <Button 
        onClick={() => setIsOpen(true)}
        variant="primary"
        size="md"
      >
        {buttonText}
      </Button>
      <Modal
        {...modalProps}
        open={isOpen}
        onClose={() => setIsOpen(false)}
      >
        {children}
      </Modal>
    </>
  );
};

export const Default: Story = {
  render: (args) => (
    <ModalWrapper {...args}>
      <h2 style={{ margin: '0 0 1rem 0' }}>Modal Title</h2>
      <p>This is a basic modal with default settings. You can close it by clicking the close button, pressing Escape, or clicking outside.</p>
    </ModalWrapper>
  ),
  args: {
    size: 'md',
    showCloseButton: true,
    closeOnBackdropClick: true,
    closeOnEscape: true,
  },
};

export const WithTitle: Story = {
  render: (args) => (
    <ModalWrapper {...args}>
      <p>This modal has a title in the header area.</p>
      <p>The title is automatically used for accessibility labeling.</p>
    </ModalWrapper>
  ),
  args: {
    title: 'Modal with Title',
    size: 'md',
  },
};

export const SmallSize: Story = {
  render: (args) => (
    <ModalWrapper {...args} buttonText="Open Small Modal">
      <h2 style={{ margin: '0 0 1rem 0' }}>Confirm Action</h2>
      <p>Are you sure you want to delete this appointment?</p>
      <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
        <Button variant="secondary" size="sm">
          Cancel
        </Button>
        <Button variant="danger" size="sm">
          Delete
        </Button>
      </div>
    </ModalWrapper>
  ),
  args: {
    size: 'sm',
  },
};

export const LargeSize: Story = {
  render: (args) => (
    <ModalWrapper {...args} buttonText="Open Large Modal">
      <h2 style={{ margin: '0 0 1.5rem 0' }}>Doctor Profile</h2>
      <div style={{ display: 'flex', gap: '1.5rem' }}>
        <div style={{ 
          width: '120px', 
          height: '120px', 
          borderRadius: '50%', 
          backgroundColor: '#f8f9fa',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '3rem',
          flexShrink: 0
        }}>
          👨‍⚕️
        </div>
        <div style={{ flex: 1 }}>
          <h3 style={{ margin: '0 0 0.5rem 0' }}>Dr. John Smith</h3>
          <p style={{ margin: '0 0 1rem 0', color: 'var(--necktie-text-medium)' }}>Cardiologist</p>
          <p style={{ marginBottom: '1rem' }}>
            Dr. Smith is a board-certified cardiologist with over 15 years of experience 
            in treating heart conditions. He specializes in preventive cardiology and 
            cardiac rehabilitation.
          </p>
          <div style={{ marginBottom: '1rem' }}>
            <h4 style={{ margin: '0 0 0.5rem 0' }}>Specializations</h4>
            <ul style={{ margin: 0, paddingLeft: '1.2rem' }}>
              <li>Preventive Cardiology</li>
              <li>Cardiac Rehabilitation</li>
              <li>Heart Failure Management</li>
              <li>Hypertension Treatment</li>
            </ul>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <Button variant="primary" size="md">
              Book Appointment
            </Button>
            <Button variant="secondary" size="md">
              View Schedule
            </Button>
          </div>
        </div>
      </div>
    </ModalWrapper>
  ),
  args: {
    size: 'lg',
  },
};

export const BookingModal: Story = {
  render: (args) => (
    <ModalWrapper {...args} buttonText="Book Appointment">
      <h2 style={{ margin: '0 0 1.5rem 0' }}>Book Appointment</h2>
      <form style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
            Select Doctor
          </label>
          <select style={{ width: '100%', padding: '0.75rem', border: '1px solid #ccc', borderRadius: '4px' }}>
            <option>Dr. John Smith - Cardiologist</option>
            <option>Dr. Sarah Chen - Dermatologist</option>
            <option>Dr. Michael Brown - Ophthalmologist</option>
          </select>
        </div>
        
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
            Preferred Date
          </label>
          <input 
            type="date" 
            style={{ width: '100%', padding: '0.75rem', border: '1px solid #ccc', borderRadius: '4px' }}
            min={new Date().toISOString().split('T')[0]}
          />
        </div>
        
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
            Preferred Time
          </label>
          <select style={{ width: '100%', padding: '0.75rem', border: '1px solid #ccc', borderRadius: '4px' }}>
            <option>9:00 AM - 10:00 AM</option>
            <option>10:00 AM - 11:00 AM</option>
            <option>2:00 PM - 3:00 PM</option>
            <option>3:00 PM - 4:00 PM</option>
          </select>
        </div>
        
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
            Reason for Visit
          </label>
          <textarea 
            rows={3}
            style={{ width: '100%', padding: '0.75rem', border: '1px solid #ccc', borderRadius: '4px', resize: 'vertical' }}
            placeholder="Please describe your symptoms or reason for the appointment..."
          />
        </div>
        
        <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end', marginTop: '1rem' }}>
          <Button 
            type="button"
            variant="secondary"
            size="md"
          >
            Cancel
          </Button>
          <Button 
            type="submit"
            variant="primary"
            size="md"
          >
            Book Appointment
          </Button>
        </div>
      </form>
    </ModalWrapper>
  ),
  args: {
    size: 'md',
    title: 'Book New Appointment',
  },
};

export const ChineseModal: Story = {
  render: (args) => (
    <ModalWrapper {...args} buttonText="開啟預約對話框">
      <div style={{ fontFamily: '"PingFang SC", "Microsoft YaHei", sans-serif' }}>
        <h2 style={{ margin: '0 0 1.5rem 0' }}>預約醫生</h2>
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
            選擇醫生
          </label>
          <select style={{ width: '100%', padding: '0.75rem', border: '1px solid #ccc', borderRadius: '4px' }}>
            <option>陳醫生 - 心臟科</option>
            <option>李醫生 - 皮膚科</option>
            <option>王醫生 - 眼科</option>
          </select>
        </div>
        
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
            首選日期
          </label>
          <input 
            type="date" 
            style={{ width: '100%', padding: '0.75rem', border: '1px solid #ccc', borderRadius: '4px' }}
          />
        </div>
        
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
            首選時間
          </label>
          <select style={{ width: '100%', padding: '0.75rem', border: '1px solid #ccc', borderRadius: '4px' }}>
            <option>上午 9:00 - 10:00</option>
            <option>上午 10:00 - 11:00</option>
            <option>下午 2:00 - 3:00</option>
            <option>下午 3:00 - 4:00</option>
          </select>
        </div>
        
        <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
          <Button variant="secondary" size="md">
            取消
          </Button>
          <Button variant="primary" size="md">
            確認預約
          </Button>
        </div>
      </div>
    </ModalWrapper>
  ),
  args: {
    size: 'md',
    title: '醫生預約系統',
  },
};

export const NoCloseButton: Story = {
  render: (args) => (
    <ModalWrapper {...args} buttonText="Open Modal (No Close Button)">
      <h2 style={{ margin: '0 0 1rem 0' }}>Processing Payment</h2>
      <div style={{ textAlign: 'center', padding: '2rem 0' }}>
        <div style={{ 
          width: '60px', 
          height: '60px', 
          border: '4px solid #f3f3f3',
          borderTop: '4px solid var(--necktie-primary-color)',
          borderRadius: '50%',
          margin: '0 auto 1rem',
          animation: 'spin 1s linear infinite'
        }} />
        <p>Please wait while we process your payment...</p>
        <p style={{ color: 'var(--necktie-text-medium)', fontSize: '0.875rem' }}>
          This may take a few moments. Please do not close this window.
        </p>
      </div>
    </ModalWrapper>
  ),
  args: {
    size: 'md',
    showCloseButton: false,
    closeOnBackdropClick: false,
    closeOnEscape: false,
  },
};

export const MobileResponsive: Story = {
  render: (args) => (
    <ModalWrapper {...args}>
      <h2 style={{ margin: '0 0 1rem 0' }}>Mobile Optimized Modal</h2>
      <p>This modal is optimized for mobile devices with appropriate spacing and touch targets.</p>
      <div style={{ marginTop: '1.5rem' }}>
        <Button 
          variant="primary" 
          size="lg" 
          style={{
            width: '100%',
            marginBottom: '0.75rem'
          }}
        >
          Primary Action
        </Button>
        <Button 
          variant="secondary" 
          size="lg" 
          style={{
            width: '100%'
          }}
        >
          Secondary Action
        </Button>
      </div>
    </ModalWrapper>
  ),
  parameters: {
    viewport: {
      defaultViewport: 'iphone12',
    },
  },
  args: {
    size: 'md',
  },
};