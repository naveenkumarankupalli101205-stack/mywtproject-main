
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const PersonalInfoForm = ({ user, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.full_name || '',
        email: user.email || '',
        phone: user.phone || '',
        address: user.address || '',
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await onSave(formData);
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to save personal info:', error);
      // Optionally, show an error message to the user
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    if (user) {
      setFormData({
        name: user.full_name || '',
        email: user.email || '',
        phone: user.phone || '',
        address: user.address || '',
      });
    }
    setIsEditing(false);
  };

  return (
    <div className="bg-card dark:bg-card rounded-lg border border-border dark:border-border p-6 animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-foreground dark:text-foreground">
          Personal Information
        </h3>
        {!isEditing && (
          <Button 
            variant="outline"
            onClick={() => setIsEditing(true)} 
            iconName="Edit" 
            iconPosition="left" 
            iconSize={14}
          >
            Edit Profile
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Full Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          disabled={!isEditing}
          placeholder="Enter your full name"
        />
        <Input
          label="Email Address"
          name="email"
          type="email"
          value={formData.email}
          disabled // Email is not editable
          placeholder="your.email@example.com"
          className="text-muted-foreground"
        />
        <Input
          label="Phone Number"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
          disabled={!isEditing}
          placeholder="(123) 456-7890"
        />
        <Input
          label="Address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          disabled={!isEditing}
          placeholder="123 Main St, City, State"
          className="md:col-span-2"
        />
      </div>

      {isEditing && (
        <div className="flex justify-end gap-4 mt-6">
          <Button variant="ghost" onClick={handleCancel} disabled={isSaving}>
            Cancel
          </Button>
          <Button 
            onClick={handleSave} 
            isLoading={isSaving}
            disabled={isSaving}
            iconName="Save" 
            iconPosition="left"
            iconSize={16}
          >
            {isSaving ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      )}
    </div>
  );
};

PersonalInfoForm.propTypes = {
  user: PropTypes.shape({
    full_name: PropTypes.string,
    email: PropTypes.string,
    phone: PropTypes.string,
    address: PropTypes.string,
  }),
  onSave: PropTypes.func.isRequired,
};

export default PersonalInfoForm;
