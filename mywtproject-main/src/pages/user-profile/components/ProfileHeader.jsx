import React from 'react';
import Icon from '../../../components/AppIcon';
import ThemeToggle from '../../../components/ui/ThemeToggle';

const ProfileHeader = ({ 
  user, 
  onRoleSwitch = () => {}, 
  canSwitchRole = true 
}) => {
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

  const roleConfig = getRoleConfig(user?.role);

  return (
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
              src={user?.avatar_url || "https://static.vecteezy.com/system/resources/previews/046/798/040/original/red-user-account-profile-flat-icon-for-apps-and-websites-free-vector.jpg"}
              alt={"User profile"}
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
            {user?.full_name || 'Full Name Not Set'}
          </h1>
          <p className="text-muted-foreground dark:text-muted-foreground mb-2">
            {user?.email}
          </p>
          <div className="flex items-center justify-center gap-2">
            <div className={`px-3 py-1 rounded-full ${roleConfig?.bgColor}`}>
              <span className={`text-sm font-medium ${roleConfig?.color}`}>
                {roleConfig?.label}
              </span>
            </div>
            {user?.verified && (
              <div className="flex items-center text-success dark:text-success">
                <Icon name="CheckCircle" size={16} className="mr-1" />
                <span className="text-sm font-medium">Verified</span>
              </div>
            )}
          </div>
        </div>

        {/* Role Switch */}
        {canSwitchRole && (
          <div className="mt-4">
            <button
              onClick={onRoleSwitch}
              className="flex items-center px-4 py-2 bg-muted dark:bg-muted hover:bg-muted/80 dark:hover:bg-muted/80 rounded-lg transition-colors duration-200 text-foreground dark:text-foreground"
            >
              <Icon 
                name={user?.role === 'victim' ? 'Heart' : 'User'} 
                size={16} 
                className="mr-2" 
              />
              <span className="text-sm font-medium">
                {user?.role === 'victim' ? 'Become Volunteer' : 'Need Help'}
              </span>
            </button>
          </div>
        )}

        {/* Stats */}
        <div className="flex gap-6 mt-4 pt-4 border-t border-border dark:border-border w-full justify-center">
          <div className="text-center">
            <div className="text-lg font-bold text-foreground dark:text-foreground">
              {user?.stats?.totalAlerts || 0}
            </div>
            <div className="text-xs text-muted-foreground dark:text-muted-foreground">
              {user?.role === 'victim' ? 'Alerts Sent' : 'Responses'}
            </div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-foreground dark:text-foreground">
              {user?.stats?.responseTime || 'N/A'}
            </div>
            <div className="text-xs text-muted-foreground dark:text-muted-foreground">
              Avg Response
            </div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-success dark:text-success">
              {user?.stats?.trustScore || 0}%
            </div>
            <div className="text-xs text-muted-foreground dark:text-muted-foreground">
              Trust Score
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
