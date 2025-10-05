import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import ThemeToggle from './ThemeToggle';
import Icon from '../AppIcon';

const DarkModeTestPage = () => {
  const { theme } = useTheme();

  // Mock user data for testing
  const mockUser = {
    full_name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'victim',
    avatar_url: null,
    verified: true,
    stats: {
      totalAlerts: 12,
      responseTime: '2.1 min',
      trustScore: 85
    }
  };

  const getRoleConfig = (role) => {
    switch (role) {
      case 'victim':
        return {
          label: 'Help Seeker',
          icon: 'User',
          color: 'text-primary',
          bgColor: 'bg-primary/10'
        };
      case 'volunteer':
        return {
          label: 'Volunteer Helper',
          icon: 'Heart',
          color: 'text-success',
          bgColor: 'bg-success/10'
        };
      default:
        return {
          label: 'Community Member',
          icon: 'User',
          color: 'text-muted-foreground',
          bgColor: 'bg-muted'
        };
    }
  };

  const roleConfig = getRoleConfig(mockUser?.role);

  return (
    <div className="min-h-screen bg-background dark:bg-background">
      <header className="bg-card dark:bg-card border-b border-border dark:border-border px-6 py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center">
              <Icon name="Shield" className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground dark:text-foreground">ResqNet</h1>
              <p className="text-sm text-muted-foreground dark:text-muted-foreground">Dark Mode Test Page</p>
            </div>
          </div>
        </div>
      </header>

      <main className="pt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Profile Header with Dark Mode Toggle */}
          <div className="bg-card dark:bg-card rounded-lg border border-border dark:border-border p-6 mb-6">
            {/* Theme Toggle - Top Right */}
            <div className="flex justify-end mb-4">
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-muted-foreground dark:text-muted-foreground">
                  Theme
                </span>
                <ThemeToggle />
              </div>
            </div>
            
            <div className="flex flex-col items-center">
              {/* Profile Image */}
              <div className="relative mb-4">
                <div className="w-[120px] h-[120px] rounded-full overflow-hidden bg-muted dark:bg-muted border-4 border-white dark:border-card shadow-md dark:shadow-lg">
                  <img
                    src="https://static.vecteezy.com/system/resources/previews/046/798/040/original/red-user-account-profile-flat-icon-for-apps-and-websites-free-vector.jpg"
                    alt="User profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className={`absolute -bottom-1 -right-1 w-8 h-8 rounded-full ${roleConfig?.bgColor} flex items-center justify-center border-2 border-card dark:border-card`}>
                  <Icon 
                    name={roleConfig?.icon} 
                    size={16} 
                    className={roleConfig?.color} 
                  />
                </div>
              </div>

              {/* Profile Info */}
              <div className="text-center">
                <h1 className="text-2xl font-bold text-foreground dark:text-foreground mb-1">
                  {mockUser?.full_name}
                </h1>
                <p className="text-muted-foreground dark:text-muted-foreground mb-2">
                  {mockUser?.email}
                </p>
                <div className="flex items-center justify-center gap-2">
                  <div className={`px-3 py-1 rounded-full ${roleConfig?.bgColor}`}>
                    <span className={`text-sm font-medium ${roleConfig?.color}`}>
                      {roleConfig?.label}
                    </span>
                  </div>
                  {mockUser?.verified && (
                    <div className="flex items-center text-success dark:text-success">
                      <Icon name="CheckCircle" size={16} className="mr-1" />
                      <span className="text-sm font-medium">Verified</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Role Switch */}
              <div className="mt-4">
                <button
                  className="flex items-center px-4 py-2 bg-muted dark:bg-muted hover:bg-muted/80 dark:hover:bg-muted/80 rounded-lg transition-colors duration-200 text-foreground dark:text-foreground"
                >
                  <Icon 
                    name="Heart" 
                    size={16} 
                    className="mr-2" 
                  />
                  <span className="text-sm font-medium">
                    Become Volunteer
                  </span>
                </button>
              </div>

              {/* Stats */}
              <div className="flex gap-6 mt-4 pt-4 border-t border-border dark:border-border w-full justify-center">
                <div className="text-center">
                  <div className="text-lg font-bold text-foreground dark:text-foreground">
                    {mockUser?.stats?.totalAlerts}
                  </div>
                  <div className="text-xs text-muted-foreground dark:text-muted-foreground">
                    Alerts Sent
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-foreground dark:text-foreground">
                    {mockUser?.stats?.responseTime}
                  </div>
                  <div className="text-xs text-muted-foreground dark:text-muted-foreground">
                    Avg Response
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-success dark:text-success">
                    {mockUser?.stats?.trustScore}%
                  </div>
                  <div className="text-xs text-muted-foreground dark:text-muted-foreground">
                    Trust Score
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content Cards */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {/* Sample Card 1 */}
            <div className="bg-card dark:bg-card rounded-lg border border-border dark:border-border p-6">
              <h3 className="text-lg font-semibold text-foreground dark:text-foreground mb-4">
                Personal Information
              </h3>
              <div className="space-y-3">
                <div>
                  <label className="text-sm text-muted-foreground dark:text-muted-foreground">Full Name</label>
                  <p className="text-foreground dark:text-foreground font-medium">{mockUser.full_name}</p>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground dark:text-muted-foreground">Email</label>
                  <p className="text-foreground dark:text-foreground font-medium">{mockUser.email}</p>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground dark:text-muted-foreground">Role</label>
                  <p className="text-foreground dark:text-foreground font-medium capitalize">{mockUser.role}</p>
                </div>
              </div>
            </div>

            {/* Sample Card 2 */}
            <div className="bg-card dark:bg-card rounded-lg border border-border dark:border-border p-6">
              <h3 className="text-lg font-semibold text-foreground dark:text-foreground mb-4">
                Emergency Contacts
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-muted dark:bg-muted rounded-lg">
                  <Icon name="Phone" size={16} className="text-primary dark:text-primary" />
                  <div>
                    <p className="text-foreground dark:text-foreground font-medium">Jane Doe</p>
                    <p className="text-sm text-muted-foreground dark:text-muted-foreground">Spouse • +1 (555) 123-4567</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-muted dark:bg-muted rounded-lg">
                  <Icon name="Phone" size={16} className="text-secondary dark:text-secondary" />
                  <div>
                    <p className="text-foreground dark:text-foreground font-medium">Bob Smith</p>
                    <p className="text-sm text-muted-foreground dark:text-muted-foreground">Friend • +1 (555) 987-6543</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Dark Mode Info Panel */}
          <div className="bg-primary/5 dark:bg-primary/10 rounded-lg border border-primary/20 dark:border-primary/30 p-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center">
                <Icon name={theme === 'dark' ? 'Moon' : 'Sun'} size={24} className="text-primary dark:text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground dark:text-foreground mb-2">
                  Dark Mode {theme === 'dark' ? 'Enabled' : 'Disabled'} ✨
                </h3>
                <p className="text-muted-foreground dark:text-muted-foreground text-sm mb-4">
                  You're currently viewing the profile page in <strong>{theme}</strong> mode. 
                  The toggle switch in the top-right corner of the profile header allows you to switch between light and dark themes.
                  Your preference is automatically saved to localStorage and will persist across sessions.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-success/10 dark:bg-success/20 text-success dark:text-success text-sm rounded-full">
                    ✅ Theme Toggle Implemented
                  </span>
                  <span className="px-3 py-1 bg-success/10 dark:bg-success/20 text-success dark:text-success text-sm rounded-full">
                    ✅ localStorage Persistence
                  </span>
                  <span className="px-3 py-1 bg-success/10 dark:bg-success/20 text-success dark:text-success text-sm rounded-full">
                    ✅ Tailwind Dark Mode
                  </span>
                  <span className="px-3 py-1 bg-success/10 dark:bg-success/20 text-success dark:text-success text-sm rounded-full">
                    ✅ Sun/Moon Icons
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DarkModeTestPage;