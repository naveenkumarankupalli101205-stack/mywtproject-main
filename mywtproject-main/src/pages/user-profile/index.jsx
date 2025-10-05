
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import ProfileHeader from './components/ProfileHeader';
import PersonalInfoForm from './components/PersonalInfoForm';
import EmergencyContactsSection from './components/EmergencyContactsSection';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import { getSession, getUserProfile, updateUserProfile, getEmergencyContacts, saveEmergencyContacts, deleteUserAccount } from '../../services/userService';
import { supabase } from '../../lib/supabase';

const UserProfile = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('personal');
  const [user, setUser] = useState(null);
  const [emergencyContacts, setEmergencyContacts] = useState([]);
  const [isSaving, setIsSaving] = useState(false);
  const [session, setSession] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fetchSession = async () => {
        const currentSession = await getSession();
        setSession(currentSession);
    };

    fetchSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      if (session?.user) {
        const profile = await getUserProfile(session.user.id);
        setUser(profile);
        const contacts = await getEmergencyContacts(session.user.id);
        setEmergencyContacts(contacts);
      }
    };

    fetchUserData();
  }, [session]);

  const tabs = [
    { id: 'personal', label: 'Personal Info', icon: 'User' },
    { id: 'contacts', label: 'Emergency Contacts', icon: 'Phone' },
  ];

  const handleRoleSwitch = async () => {
    setIsSaving(true);
    try {
      const newRole = user?.role === 'victim' ? 'volunteer' : 'victim';
      const updatedProfile = await updateUserProfile(user.id, { role: newRole });
      setUser(updatedProfile);
      
      // Navigate to appropriate dashboard
      setTimeout(() => {
        navigate(newRole === 'victim' ? '/victim-dashboard' : '/volunteer-dashboard');
      }, 1000);
    } catch (error) {
      console.error('Failed to switch role:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handlePersonalInfoSave = async (formData) => {
    setIsSaving(true);
    try {
        const { name, phone, address, ...rest } = formData;
        const updates = {
            full_name: name,
            phone,
            address,
        };
      const updatedProfile = await updateUserProfile(user.id, updates);
      setUser(updatedProfile);
    } catch (error) {
      console.error('Failed to save personal info:', error);
      throw error;
    } finally {
      setIsSaving(false);
    }
  };

  const handleEmergencyContactsSave = async (contacts) => {
    setIsSaving(true);
    try {
      const savedContacts = await saveEmergencyContacts(user.id, contacts);
      setEmergencyContacts(savedContacts);
    } catch (error) {
      console.error('Failed to save emergency contacts:', error);
      throw error;
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteAccount = async () => {
    setIsDeleting(true);
    try {
      const { success, error } = await deleteUserAccount();
      
      if (success) {
        navigate('/login-register');
      } else {
        console.error('Failed to delete account:', error);
        alert('Failed to delete account. Please try again or contact support.');
      }
    } catch (error) {
      console.error('Error deleting account:', error);
      alert('An error occurred while deleting your account. Please try again.');
    } finally {
      setIsDeleting(false);
      setShowDeleteConfirm(false);
    }
  };

  const renderTabContent = () => {
    if (!user) {
        return <div>Loading...</div>;
    }
    switch (activeTab) {
      case 'personal':
        return (
          <PersonalInfoForm
            user={user}
            onSave={handlePersonalInfoSave}
          />
        );
      case 'contacts':
        return (
          <EmergencyContactsSection
            contacts={emergencyContacts}
            onSave={handleEmergencyContactsSave}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background dark:bg-background">
      <Header 
        userRole={user?.role}
        emergencyStatus={false}
        onEmergencyAction={() => {}}
      />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Profile Header */}
          { user && <ProfileHeader
            user={user}
            onRoleSwitch={handleRoleSwitch}
            canSwitchRole={true}
          /> }

          {/* Navigation Tabs */}
          <div className="bg-card dark:bg-card rounded-lg border border-border dark:border-border mb-6">
            <div className="flex overflow-x-auto">
              {tabs?.map((tab) => (
                <button
                  key={tab?.id}
                  onClick={() => setActiveTab(tab?.id)}
                  className={`
                    flex items-center px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors duration-200
                    ${activeTab === tab?.id
                      ? 'border-primary text-primary dark:text-primary bg-primary/5 dark:bg-primary/5' :'border-transparent text-muted-foreground dark:text-muted-foreground hover:text-foreground dark:hover:text-foreground hover:border-muted dark:hover:border-muted'
                    }
                  `}
                >
                  <Icon name={tab?.icon} size={16} className="mr-2" />
                  {tab?.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="animate-fade-in">
            {renderTabContent()}
          </div>

          {/* Quick Actions */}
          <div className="mt-8 bg-card dark:bg-card rounded-lg border border-border dark:border-border p-6">
            <h3 className="text-lg font-semibold text-foreground dark:text-foreground mb-4">
              Quick Actions
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button
                variant="outline"
                onClick={() => navigate('/alert-history')}
                iconName="Clock"
                iconPosition="left"
                iconSize={16}
                fullWidth
              >
                View Alert History
              </Button>
              
              <Button
                variant="outline"
                onClick={() => navigate(user?.role === 'victim' ? '/victim-dashboard' : '/volunteer-dashboard')}
                iconName="Activity"
                iconPosition="left"
                iconSize={16}
                fullWidth
              >
                Go to Dashboard
              </Button>
              
              <Button
                variant="outline"
                onClick={() => navigate('/help-support')}
                iconName="HelpCircle"
                iconPosition="left"
                iconSize={16}
                fullWidth
                data-testid="get-help-support-btn"
              >
                Get Help & Support
              </Button>
            </div>
          </div>

          {/* Danger Zone */}
          <div className="mt-8 bg-card dark:bg-card rounded-lg border-2 border-red-600/20 dark:border-red-500/30 p-6">
            <h3 className="text-lg font-semibold text-red-600 dark:text-red-400 mb-2">
              Danger Zone
            </h3>
            <p className="text-sm text-muted-foreground dark:text-muted-foreground mb-4">
              Once you delete your account, there is no going back. Please be certain.
            </p>
            <Button
              variant="destructive"
              onClick={() => setShowDeleteConfirm(true)}
              iconName="Trash2"
              iconPosition="left"
              iconSize={16}
            >
              Delete Account
            </Button>
          </div>
        </div>
      </main>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 dark:bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-card dark:bg-card rounded-lg border border-border dark:border-border max-w-md w-full p-6 shadow-xl dark:shadow-2xl">
            <div className="flex items-start gap-4 mb-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                <Icon name="AlertTriangle" size={24} className="text-red-600 dark:text-red-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground dark:text-foreground mb-2">
                  Delete Account
                </h3>
                <p className="text-sm text-muted-foreground dark:text-muted-foreground">
                  Are you absolutely sure you want to delete your account? This action cannot be undone. 
                  All your data including:
                </p>
                <ul className="text-sm text-muted-foreground dark:text-muted-foreground mt-2 ml-4 list-disc">
                  <li>Profile information</li>
                  <li>Emergency contacts</li>
                  <li>Alert history</li>
                  <li>Response records</li>
                </ul>
                <p className="text-sm text-muted-foreground dark:text-muted-foreground mt-2">
                  will be permanently deleted.
                </p>
              </div>
            </div>
            
            <div className="flex gap-3 justify-end mt-6">
              <Button
                variant="outline"
                onClick={() => setShowDeleteConfirm(false)}
                disabled={isDeleting}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={handleDeleteAccount}
                disabled={isDeleting}
                iconName={isDeleting ? "Loader2" : "Trash2"}
                iconPosition="left"
                iconSize={16}
              >
                {isDeleting ? 'Deleting...' : 'Yes, Delete My Account'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
