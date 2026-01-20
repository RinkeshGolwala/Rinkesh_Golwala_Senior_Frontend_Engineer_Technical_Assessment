import clsx from 'clsx';
import React, { useState } from 'react';
import './Layout.scss';

export interface RouteConfig {
  id: string;
  title: string;
  url?: string;
  className?: string;
}

export interface NavigationConfig {
  routes: RouteConfig[];
  onRouteClick: (route: RouteConfig) => void;
}

export interface LayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Main content */
  children?: React.ReactNode;
  /** User's name for initials in avatar */
  userName?: string;
  /** Currently active route ID */
  activeRouteId?: string;
  /** Navigation configuration */
  navigation: NavigationConfig;
  /** User avatar click handler */
  onUserMenuClick?: () => void;
  /** Additional header actions (e.g., language switcher) */
  headerActions?: React.ReactNode;
}

const Layout = React.forwardRef<HTMLDivElement, LayoutProps>(
  (
    {
      children,
      userName = 'User',
      activeRouteId,
      navigation,
      onUserMenuClick,
      headerActions,
      className,
      ...props
    },
    ref
  ) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Generate user initials from name
    const getUserInitials = (name: string): string => {
      return name
        .split(' ')
        .map((word) => word.charAt(0).toUpperCase())
        .join('')
        .substring(0, 2);
    };

    const handleMobileMenuToggle = () => {
      setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const handleRouteClick = (route: RouteConfig) => {
      setIsMobileMenuOpen(false); // Close mobile menu on navigation
      navigation.onRouteClick(route);
    };

    return (
      <div
        ref={ref}
        className={clsx(
          'necktie-layout',
          {
            'necktie-layout--mobile-menu-open': isMobileMenuOpen,
          },
          className
        )}
        {...props}
      >
        {/* Header with Navigation */}
        <header className="necktie-layout__header">
          <div className="necktie-layout__header-container">
            {/* Logo/Brand */}
            <div className="necktie-layout__logo">
              <h1>Doctor Booking</h1>
            </div>

            {/* Desktop Navigation */}
            <nav className="necktie-layout__nav necktie-layout__nav--desktop">
              <ul className="necktie-layout__nav-list">
                {navigation.routes.map((route) => (
                  <li key={route.id} className="necktie-layout__nav-item">
                    <button
                      className={clsx(
                        'necktie-layout__nav-link',
                        {
                          'necktie-layout__nav-link--active':
                            activeRouteId === route.id,
                        },
                        route.className
                      )}
                      onClick={() => handleRouteClick(route)}
                    >
                      {route.title}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>

            {/* User Avatar and Mobile Menu Button */}
            <div className="necktie-layout__header-actions">
              {/* Additional Header Actions */}
              {headerActions}

              {/* User Avatar */}
              <button
                className="necktie-layout__user-avatar"
                onClick={onUserMenuClick}
                aria-label="User menu"
              >
                <span className="necktie-layout__user-initials">
                  {getUserInitials(userName)}
                </span>
              </button>

              {/* Mobile Menu Button */}
              <button
                className="necktie-layout__mobile-menu-button"
                onClick={handleMobileMenuToggle}
                aria-label="Toggle menu"
                aria-expanded={isMobileMenuOpen}
              >
                <span className="necktie-layout__hamburger">
                  <span></span>
                  <span></span>
                  <span></span>
                </span>
              </button>
            </div>
          </div>
        </header>

        {/* Mobile Navigation Drawer */}
        <nav className="necktie-layout__nav necktie-layout__nav--mobile">
          <div
            className="necktie-layout__mobile-nav-overlay"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="necktie-layout__mobile-nav-drawer">
            <ul className="necktie-layout__nav-list">
              {navigation.routes.map((route) => (
                <li key={route.id} className="necktie-layout__nav-item">
                  <button
                    className={clsx(
                      'necktie-layout__nav-link',
                      {
                        'necktie-layout__nav-link--active':
                          activeRouteId === route.id,
                      },
                      route.className
                    )}
                    onClick={() => handleRouteClick(route)}
                  >
                    {route.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        {/* Main Content */}
        <main className="necktie-layout__main">
          <div className="necktie-layout__content">{children}</div>
        </main>
      </div>
    );
  }
);

Layout.displayName = 'Layout';

export default Layout;
