import React, { useState } from 'react';
import { 
  HelpCircle, 
  Book, 
  Users, 
  Car, 
  ClipboardCheck, 
  Settings,
  Search,
  ChevronDown,
  ChevronRight,
  Send,
  CheckCircle,
  AlertCircle,
  Bug,
  MessageSquare,
  Mail,
  Phone,
  ExternalLink
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { Textarea } from '../components/ui/TextArea';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

interface GuideSection {
  id: string;
  title: string;
  icon: React.ReactNode;
  description: string;
  steps: string[];
}

export function Help() {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);
  const [expandedGuide, setExpandedGuide] = useState<string | null>(null);
  const [bugReportForm, setBugReportForm] = useState({
    title: '',
    description: '',
    priority: 'medium',
    category: 'general',
    email: '',
    steps: '',
    expected: '',
    actual: '',
  });
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const guides: GuideSection[] = [
    {
      id: 'customers',
      title: 'Managing Customers',
      icon: <Users size={20} />,
      description: 'Learn how to add, edit, and manage customer information',
      steps: [
        'Navigate to the Customers page from the sidebar',
        'Click "Add Customer" to create a new customer record',
        'Fill in all required information including contact details and storage preferences',
        'Set the appropriate membership level (Basic, Premium, VIP, or Enterprise)',
        'Configure storage location and number of spots needed',
        'Save the customer record to complete the setup',
        'Use the search and filter options to find existing customers',
        'Click on any customer card to view detailed information and edit as needed'
      ]
    },
    {
      id: 'vehicles',
      title: 'Vehicle Management',
      icon: <Car size={20} />,
      description: 'How to add vehicles, manage details, and track maintenance',
      steps: [
        'Go to the Vehicles page and click "Add Vehicle"',
        'Select the vehicle owner from the customer dropdown',
        'Enter vehicle details: year, make, model, VIN, and license plate',
        'Set the fair market value and current odometer reading',
        'Configure tire pressure settings (default and preferred)',
        'Add authorized drivers with their contact information and license numbers',
        'Set up authorized contacts for drop-off and pick-up permissions',
        'Configure maintenance schedule and service intervals',
        'Add insurance information if required',
        'Save the vehicle record to complete setup'
      ]
    },
    {
      id: 'checkinout',
      title: 'Check-In/Out Process',
      icon: <ClipboardCheck size={20} />,
      description: 'Complete vehicle inspection and service documentation',
      steps: [
        'Start a new check-in from the Dashboard or Check In/Out page',
        'Select the customer and vehicle from the dropdowns',
        'Record current vehicle condition: fuel level, mileage, and tire pressures',
        'Take comprehensive photos following the inspection checklist',
        'Document any existing damage or issues in the notes section',
        'Capture customer signature for the check-in process',
        'Update status to "In Service" when work begins',
        'Add service items and costs as work is completed',
        'Complete check-out process with final photos and signature',
        'Generate and provide customer with service documentation'
      ]
    },
    {
      id: 'settings',
      title: 'System Settings',
      icon: <Settings size={20} />,
      description: 'Configure your account and system preferences',
      steps: [
        'Navigate to Settings from the sidebar menu',
        'Update your profile information including name and contact details',
        'Change your password using the security section',
        'Upload a profile photo if desired',
        'Configure notification preferences',
        'Set your department and role information',
        'Review account permissions and access levels',
        'Save changes to apply new settings'
      ]
    }
  ];

  const faqs: FAQItem[] = [
    {
      id: 'faq1',
      question: 'How do I add a new customer to the system?',
      answer: 'Navigate to the Customers page and click the "Add Customer" button. Fill in all required fields including contact information, storage preferences, and membership level. The system will automatically generate storage location suggestions based on the customer type and membership level.',
      category: 'customers'
    },
    {
      id: 'faq2',
      question: 'What information is required for vehicle check-in?',
      answer: 'For vehicle check-in, you need to record the current fuel level, odometer reading, tire pressures, and take comprehensive photos of the vehicle. You should also document any existing damage and capture the customer\'s signature to acknowledge the vehicle condition.',
      category: 'checkinout'
    },
    {
      id: 'faq3',
      question: 'How do I track vehicle maintenance schedules?',
      answer: 'Each vehicle has a maintenance schedule section where you can set the service interval (in months), record the last service date, and the system will automatically calculate the next service due date. You can also add maintenance notes for special instructions.',
      category: 'vehicles'
    },
    {
      id: 'faq4',
      question: 'Can I export customer or vehicle data?',
      answer: 'Yes, most pages have an "Export" button that allows you to download data in various formats. You can export customer lists, vehicle information, and service records for reporting or backup purposes.',
      category: 'general'
    },
    {
      id: 'faq5',
      question: 'How do I handle insurance requirements for vehicles?',
      answer: 'When adding or editing a vehicle, you can mark "Insurance Rider Required" and specify the required coverage amount. This information will be displayed on the vehicle details and can be used for insurance verification.',
      category: 'vehicles'
    },
    {
      id: 'faq6',
      question: 'What are the different membership levels?',
      answer: 'The system supports four membership levels: Basic (entry level), Premium (enhanced features), VIP (priority service), and Enterprise (corporate accounts). Each level can have different pricing and storage location assignments.',
      category: 'customers'
    }
  ];

  const filteredFAQs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleBugReportSubmit = async () => {
    setSubmitStatus('submitting');
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In a real app, this would send the bug report to your backend
      console.log('Bug report submitted:', bugReportForm);
      
      setSubmitStatus('success');
      setBugReportForm({
        title: '',
        description: '',
        priority: 'medium',
        category: 'general',
        email: '',
        steps: '',
        expected: '',
        actual: '',
      });
      
      // Reset success status after 5 seconds
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } catch (error) {
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus('idle'), 5000);
    }
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center">
            <HelpCircle className="mr-3" size={28} />
            Help & Support
          </h1>
          <p className="text-gray-600 mt-1">
            Get help using the system and report any issues you encounter
          </p>
        </div>
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => setExpandedGuide('customers')}>
          <CardContent className="p-6 text-center">
            <Users className="mx-auto h-12 w-12 text-primary-600 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900">Getting Started</h3>
            <p className="text-sm text-gray-600 mt-2">Learn the basics of customer and vehicle management</p>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => document.getElementById('faq-section')?.scrollIntoView({ behavior: 'smooth' })}>
          <CardContent className="p-6 text-center">
            <MessageSquare className="mx-auto h-12 w-12 text-secondary-600 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900">FAQ</h3>
            <p className="text-sm text-gray-600 mt-2">Find answers to commonly asked questions</p>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => document.getElementById('bug-report-section')?.scrollIntoView({ behavior: 'smooth' })}>
          <CardContent className="p-6 text-center">
            <Bug className="mx-auto h-12 w-12 text-error-600 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900">Report Issue</h3>
            <p className="text-sm text-gray-600 mt-2">Submit bug reports and feature requests</p>
          </CardContent>
        </Card>
      </div>

      {/* User Guides */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Book className="mr-2" size={20} />
            User Guides
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {guides.map((guide) => (
              <div key={guide.id} className="border border-gray-200 rounded-lg">
                <button
                  onClick={() => setExpandedGuide(expandedGuide === guide.id ? null : guide.id)}
                  className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <div className="text-primary-600">{guide.icon}</div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{guide.title}</h3>
                      <p className="text-sm text-gray-600">{guide.description}</p>
                    </div>
                  </div>
                  {expandedGuide === guide.id ? (
                    <ChevronDown size={20} className="text-gray-400" />
                  ) : (
                    <ChevronRight size={20} className="text-gray-400" />
                  )}
                </button>
                
                {expandedGuide === guide.id && (
                  <div className="px-4 pb-4 border-t border-gray-100">
                    <div className="mt-4">
                      <h4 className="font-medium text-gray-900 mb-3">Step-by-step instructions:</h4>
                      <ol className="space-y-2">
                        {guide.steps.map((step, index) => (
                          <li key={index} className="flex items-start space-x-3">
                            <span className="flex-shrink-0 w-6 h-6 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-sm font-medium">
                              {index + 1}
                            </span>
                            <span className="text-sm text-gray-700">{step}</span>
                          </li>
                        ))}
                      </ol>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* FAQ Section */}
      <Card id="faq-section">
        <CardHeader>
          <CardTitle className="flex items-center">
            <MessageSquare className="mr-2" size={20} />
            Frequently Asked Questions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <Input
                placeholder="Search FAQ..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          
          <div className="space-y-4">
            {filteredFAQs.map((faq) => (
              <div key={faq.id} className="border border-gray-200 rounded-lg">
                <button
                  onClick={() => setExpandedFAQ(expandedFAQ === faq.id ? null : faq.id)}
                  className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-start space-x-3">
                    <Badge variant="outline" className="text-xs mt-1">
                      {faq.category}
                    </Badge>
                    <h3 className="font-medium text-gray-900">{faq.question}</h3>
                  </div>
                  {expandedFAQ === faq.id ? (
                    <ChevronDown size={20} className="text-gray-400 flex-shrink-0" />
                  ) : (
                    <ChevronRight size={20} className="text-gray-400 flex-shrink-0" />
                  )}
                </button>
                
                {expandedFAQ === faq.id && (
                  <div className="px-4 pb-4 border-t border-gray-100">
                    <p className="text-sm text-gray-700 mt-4">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          {filteredFAQs.length === 0 && searchTerm && (
            <div className="text-center py-8">
              <MessageSquare className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No FAQ found</h3>
              <p className="mt-1 text-sm text-gray-500">
                Try adjusting your search terms or browse all questions above.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Bug Report Section */}
      <Card id="bug-report-section">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Bug className="mr-2" size={20} />
            Report a Bug or Issue
          </CardTitle>
        </CardHeader>
        <CardContent>
          {submitStatus === 'success' && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span className="text-sm font-medium text-green-800">
                  Bug report submitted successfully! We'll review it and get back to you soon.
                </span>
              </div>
            </div>
          )}
          
          {submitStatus === 'error' && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center space-x-2">
                <AlertCircle className="h-5 w-5 text-red-600" />
                <span className="text-sm font-medium text-red-800">
                  Failed to submit bug report. Please try again or contact support directly.
                </span>
              </div>
            </div>
          )}
          
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Bug Title *"
                value={bugReportForm.title}
                onChange={(e) => setBugReportForm(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Brief description of the issue"
              />
              <Input
                label="Your Email *"
                type="email"
                value={bugReportForm.email}
                onChange={(e) => setBugReportForm(prev => ({ ...prev, email: e.target.value }))}
                placeholder="your.email@example.com"
              />
              <Select
                label="Priority"
                value={bugReportForm.priority}
                onChange={(e) => setBugReportForm(prev => ({ ...prev, priority: e.target.value }))}
                options={[
                  { value: 'low', label: 'Low - Minor issue' },
                  { value: 'medium', label: 'Medium - Affects workflow' },
                  { value: 'high', label: 'High - Blocks important tasks' },
                  { value: 'critical', label: 'Critical - System unusable' },
                ]}
              />
              <Select
                label="Category"
                value={bugReportForm.category}
                onChange={(e) => setBugReportForm(prev => ({ ...prev, category: e.target.value }))}
                options={[
                  { value: 'general', label: 'General Issue' },
                  { value: 'customers', label: 'Customer Management' },
                  { value: 'vehicles', label: 'Vehicle Management' },
                  { value: 'checkinout', label: 'Check In/Out Process' },
                  { value: 'ui', label: 'User Interface' },
                  { value: 'performance', label: 'Performance' },
                  { value: 'feature', label: 'Feature Request' },
                ]}
              />
            </div>
            
            <Textarea
              label="Detailed Description *"
              value={bugReportForm.description}
              onChange={(e) => setBugReportForm(prev => ({ ...prev, description: e.target.value }))}
              rows={4}
              placeholder="Describe the issue in detail. What happened? When did it occur?"
            />
            
            <Textarea
              label="Steps to Reproduce"
              value={bugReportForm.steps}
              onChange={(e) => setBugReportForm(prev => ({ ...prev, steps: e.target.value }))}
              rows={3}
              placeholder="1. Go to... 2. Click on... 3. Enter... 4. See error"
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Textarea
                label="Expected Behavior"
                value={bugReportForm.expected}
                onChange={(e) => setBugReportForm(prev => ({ ...prev, expected: e.target.value }))}
                rows={3}
                placeholder="What did you expect to happen?"
              />
              <Textarea
                label="Actual Behavior"
                value={bugReportForm.actual}
                onChange={(e) => setBugReportForm(prev => ({ ...prev, actual: e.target.value }))}
                rows={3}
                placeholder="What actually happened instead?"
              />
            </div>
            
            <div className="flex justify-end">
              <Button
                variant="primary"
                onClick={handleBugReportSubmit}
                leftIcon={<Send size={16} />}
                isLoading={submitStatus === 'submitting'}
                disabled={!bugReportForm.title || !bugReportForm.description || !bugReportForm.email}
              >
                {submitStatus === 'submitting' ? 'Submitting...' : 'Submit Bug Report'}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contact Support */}
      <Card>
        <CardHeader>
          <CardTitle>Need More Help?</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start space-x-3">
              <Mail className="h-6 w-6 text-primary-600 mt-1" />
              <div>
                <h3 className="font-medium text-gray-900">Email Support</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Send us an email for detailed assistance
                </p>
                <a 
                  href="mailto:support@barrettautomotive.com" 
                  className="text-sm text-primary-600 hover:text-primary-800 flex items-center mt-2"
                >
                  support@barrettautomotive.com
                  <ExternalLink size={14} className="ml-1" />
                </a>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <Phone className="h-6 w-6 text-secondary-600 mt-1" />
              <div>
                <h3 className="font-medium text-gray-900">Phone Support</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Call us for immediate assistance
                </p>
                <a 
                  href="tel:+1-555-123-4567" 
                  className="text-sm text-secondary-600 hover:text-secondary-800 flex items-center mt-2"
                >
                  (555) 123-4567
                  <ExternalLink size={14} className="ml-1" />
                </a>
                <p className="text-xs text-gray-500 mt-1">
                  Monday - Friday, 9 AM - 5 PM EST
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}