import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/ui/Header';
import Button from '../components/ui/Button';
import Icon from '../components/AppIcon';

const HelpSupport = () => {
  const navigate = useNavigate();

  const faqs = [
    {
      question: "How do I trigger an emergency alert?",
      answer: "Go to the Victim Dashboard and tap the red 'Emergency SOS' button."
    },
    {
      question: "Can volunteers track the victim in real-time?",
      answer: "Yes, once an alert is triggered, volunteers can view the victim's live location."
    },
    {
      question: "What should I do if my alert is not reaching volunteers?",
      answer: "Ensure your internet and location services are turned on."
    },
    {
      question: "How can I become a registered volunteer?",
      answer: "Sign up on the Volunteer Dashboard and verify your account."
    },
    {
      question: "How do I delete my account or update my profile?",
      answer: "Go to Profile → Edit or Delete Account option."
    }
  ];

  const supportLinks = [
    { name: "ResQNet Official Website", icon: "Globe", href: "#" },
    { name: "User Guide PDF", icon: "BookOpen", href: "#" },
    { name: "Emergency Demo Video", icon: "Play", href: "#" },
    { name: "Privacy Policy", icon: "FileText", href: "#" },
    { name: "Terms & Conditions", icon: "FileText", href: "#" }
  ];

  const emergencyContacts = [
    { name: "National Emergency Number (India)", number: "112", icon: "Phone" },
    { name: "Police", number: "100", icon: "Shield" },
    { name: "Fire Service", number: "101", icon: "Flame" },
    { name: "Ambulance", number: "108", icon: "Heart" },
    { name: "ResQNet App Emergency Support", number: "+91 98765 43210", icon: "Headphones" }
  ];

  return (
    <div className="min-h-screen bg-background dark:bg-background">
      <Header />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate(-1)}
                iconName="ArrowLeft"
                iconPosition="left"
                iconSize={16}
              >
                Back
              </Button>
            </div>
            <h1 className="text-3xl font-bold text-foreground dark:text-foreground mb-2">
              Help & Support
            </h1>
            <p className="text-muted-foreground dark:text-muted-foreground">
              Get help with ResQNet emergency services and find important contact information
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Contact Information */}
            <div className="bg-card dark:bg-card rounded-lg border border-border dark:border-border p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-primary/10 dark:bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon name="Phone" size={20} className="text-primary dark:text-primary" />
                </div>
                <h2 className="text-xl font-semibold text-foreground dark:text-foreground">
                  Contact Information
                </h2>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground dark:text-muted-foreground mb-2">
                    Support Email
                  </h3>
                  <div className="flex items-center gap-3 p-3 bg-muted/50 dark:bg-muted/50 rounded-lg">
                    <Icon name="Mail" size={18} className="text-primary dark:text-primary" />
                    <span className="text-foreground dark:text-foreground font-medium">
                      support@resqnet.org
                    </span>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-muted-foreground dark:text-muted-foreground mb-2">
                    Helpline (24x7)
                  </h3>
                  <div className="flex items-center gap-3 p-3 bg-muted/50 dark:bg-muted/50 rounded-lg">
                    <Icon name="Phone" size={18} className="text-primary dark:text-primary" />
                    <span className="text-foreground dark:text-foreground font-medium">
                      +91 98765 43210
                    </span>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-muted-foreground dark:text-muted-foreground mb-2">
                    Office Address
                  </h3>
                  <div className="flex items-start gap-3 p-3 bg-muted/50 dark:bg-muted/50 rounded-lg">
                    <Icon name="MapPin" size={18} className="text-primary dark:text-primary mt-0.5" />
                    <div>
                      <p className="text-foreground dark:text-foreground font-medium">
                        ResQNet Emergency Services
                      </p>
                      <p className="text-muted-foreground dark:text-muted-foreground text-sm mt-1">
                        2nd Floor, Innovate Hub<br />
                        Hyderabad, Telangana, India
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Emergency Contacts */}
            <div className="bg-card dark:bg-card rounded-lg border border-border dark:border-border p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center">
                  <Icon name="AlertTriangle" size={20} className="text-red-600 dark:text-red-400" />
                </div>
                <h2 className="text-xl font-semibold text-foreground dark:text-foreground">
                  Emergency Contacts
                </h2>
              </div>

              <div className="space-y-3">
                {emergencyContacts.map((contact, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted/30 dark:bg-muted/30 rounded-lg hover:bg-muted/50 dark:hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-3">
                      <Icon name={contact.icon} size={16} className="text-red-600 dark:text-red-400" />
                      <span className="text-foreground dark:text-foreground text-sm font-medium">
                        {contact.name}
                      </span>
                    </div>
                    <span className="text-red-600 dark:text-red-400 font-bold">
                      {contact.number}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* FAQs Section */}
          <div className="mt-8 bg-card dark:bg-card rounded-lg border border-border dark:border-border p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-primary/10 dark:bg-primary/10 rounded-lg flex items-center justify-center">
                <Icon name="HelpCircle" size={20} className="text-primary dark:text-primary" />
              </div>
              <h2 className="text-xl font-semibold text-foreground dark:text-foreground">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="border border-border dark:border-border rounded-lg p-4 hover:bg-muted/20 dark:hover:bg-muted/20 transition-colors">
                  <h3 className="font-medium text-foreground dark:text-foreground mb-2">
                    {faq.question}
                  </h3>
                  <p className="text-muted-foreground dark:text-muted-foreground text-sm leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Support Links */}
          <div className="mt-8 bg-card dark:bg-card rounded-lg border border-border dark:border-border p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-primary/10 dark:bg-primary/10 rounded-lg flex items-center justify-center">
                <Icon name="ExternalLink" size={20} className="text-primary dark:text-primary" />
              </div>
              <h2 className="text-xl font-semibold text-foreground dark:text-foreground">
                Support Links
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {supportLinks.map((link, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="justify-start h-auto p-4"
                  onClick={() => console.log(`Navigate to ${link.name}`)}
                  iconName={link.icon}
                  iconPosition="left"
                  iconSize={18}
                >
                  <div className="text-left">
                    <div className="font-medium">{link.name}</div>
                  </div>
                </Button>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-8 bg-card dark:bg-card rounded-lg border border-border dark:border-border p-6">
            <h3 className="text-lg font-semibold text-foreground dark:text-foreground mb-4">
              Need More Help?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button
                variant="default"
                onClick={() => window.location.href = 'mailto:support@resqnet.org'}
                iconName="Mail"
                iconPosition="left"
                iconSize={16}
                fullWidth
              >
                Email Support Team
              </Button>
              
              <Button
                variant="outline"
                onClick={() => window.location.href = 'tel:+919876543210'}
                iconName="Phone"
                iconPosition="left"
                iconSize={16}
                fullWidth
              >
                Call Support Helpline
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HelpSupport;