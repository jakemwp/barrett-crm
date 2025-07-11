import React, { useState, useRef } from 'react';
import { 
  FileText, 
  Car, 
  Building, 
  DollarSign, 
  Calendar, 
  User, 
  Pen,
  Download,
  Check,
  X
} from 'lucide-react';
import { Customer } from '../../types';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { formatCurrency, formatDate } from '../../lib/utils';

interface ServiceSignupModalProps {
  isOpen: boolean;
  onClose: () => void;
  customer: Customer;
  onSignatureComplete: (signatureData: ServiceAgreementData) => void;
}

interface ServiceAgreementData {
  numberOfCars: number;
  storageLocation: string;
  monthlyPrice: number;
  paymentPeriod: 'monthly' | 'quarterly' | 'annually';
  startDate: string;
  signature: string;
  signedAt: string;
  agreementTerms: string[];
}

export function ServiceSignupModal({ isOpen, onClose, customer, onSignatureComplete }: ServiceSignupModalProps) {
  const [formData, setFormData] = useState({
    numberOfCars: customer.storageSpots || 1,
    storageLocation: customer.storageLocation || '',
    monthlyPrice: customer.manualPrice || 150,
    paymentPeriod: 'monthly' as const,
    startDate: new Date().toISOString().split('T')[0],
  });
  
  const [currentStep, setCurrentStep] = useState<'details' | 'review' | 'signature' | 'complete'>('details');
  const [isDrawing, setIsDrawing] = useState(false);
  const [signature, setSignature] = useState<string>('');
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const calculateTotalPrice = () => {
    const multiplier = formData.paymentPeriod === 'monthly' ? 1 : 
                     formData.paymentPeriod === 'quarterly' ? 3 : 12;
    return formData.monthlyPrice * multiplier;
  };

  const getDiscountPercentage = () => {
    if (formData.paymentPeriod === 'quarterly') return 5;
    if (formData.paymentPeriod === 'annually') return 10;
    return 0;
  };

  const getDiscountedPrice = () => {
    const totalPrice = calculateTotalPrice();
    const discount = getDiscountPercentage();
    return totalPrice * (1 - discount / 100);
  };

  const agreementTerms = [
    'Vehicle storage services will be provided at the specified location',
    'Monthly payment is due on the same date each billing period',
    'Customer is responsible for maintaining valid insurance on stored vehicles',
    'Access to stored vehicles is available during business hours',
    'AutoService CRM reserves the right to inspect stored vehicles',
    'Customer must provide 30 days notice for service termination',
    'Late payment fees may apply for overdue accounts',
    'Customer agrees to maintain vehicles in good working condition',
  ];

  // Signature pad functions
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    ctx.beginPath();
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    const canvas = canvasRef.current;
    if (canvas) {
      setSignature(canvas.toDataURL());
    }
  };

  const clearSignature = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setSignature('');
  };

  const handleComplete = () => {
    if (!signature) return;
    
    const agreementData: ServiceAgreementData = {
      numberOfCars: formData.numberOfCars,
      storageLocation: formData.storageLocation,
      monthlyPrice: formData.monthlyPrice,
      paymentPeriod: formData.paymentPeriod,
      startDate: formData.startDate,
      signature,
      signedAt: new Date().toISOString(),
      agreementTerms,
    };
    
    onSignatureComplete(agreementData);
    setCurrentStep('complete');
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 'details':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Service Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Number of Cars"
                  type="number"
                  min="1"
                  value={formData.numberOfCars}
                  onChange={(e) => setFormData(prev => ({ ...prev, numberOfCars: parseInt(e.target.value) || 1 }))}
                />
                <Input
                  label="Storage Location"
                  value={formData.storageLocation}
                  onChange={(e) => setFormData(prev => ({ ...prev, storageLocation: e.target.value }))}
                />
                <Input
                  label="Monthly Price per Car"
                  type="number"
                  step="0.01"
                  value={formData.monthlyPrice}
                  onChange={(e) => setFormData(prev => ({ ...prev, monthlyPrice: parseFloat(e.target.value) || 0 }))}
                />
                <Select
                  label="Payment Period"
                  value={formData.paymentPeriod}
                  onChange={(e) => setFormData(prev => ({ ...prev, paymentPeriod: e.target.value as any }))}
                  options={[
                    { value: 'monthly', label: 'Monthly' },
                    { value: 'quarterly', label: 'Quarterly (5% discount)' },
                    { value: 'annually', label: 'Annually (10% discount)' },
                  ]}
                />
                <Input
                  label="Service Start Date"
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
                />
              </div>
            </div>

            {/* Price Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <DollarSign className="mr-2" size={20} />
                  Price Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Base Price ({formData.numberOfCars} car{formData.numberOfCars !== 1 ? 's' : ''})</span>
                  <span className="font-medium">{formatCurrency(formData.monthlyPrice * formData.numberOfCars)}/month</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Payment Period</span>
                  <Badge variant={formData.paymentPeriod === 'monthly' ? 'default' : 'success'}>
                    {formData.paymentPeriod.charAt(0).toUpperCase() + formData.paymentPeriod.slice(1)}
                  </Badge>
                </div>
                
                {getDiscountPercentage() > 0 && (
                  <div className="flex justify-between items-center text-green-600">
                    <span className="text-sm">Discount ({getDiscountPercentage()}%)</span>
                    <span className="font-medium">-{formatCurrency(calculateTotalPrice() - getDiscountedPrice())}</span>
                  </div>
                )}
                
                <div className="pt-3 border-t border-gray-200">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-gray-900">
                      Total {formData.paymentPeriod.charAt(0).toUpperCase() + formData.paymentPeriod.slice(1)} Payment
                    </span>
                    <span className="font-bold text-lg text-primary-600">
                      {formatCurrency(getDiscountedPrice())}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end space-x-3">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button variant="primary" onClick={() => setCurrentStep('review')}>
                Continue to Review
              </Button>
            </div>
          </div>
        );

      case 'review':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Review Service Agreement</h3>
              
              {/* Customer Information */}
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <User className="mr-2" size={20} />
                    Client Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-sm text-gray-600">Name:</span>
                      <p className="font-medium">{customer.firstName} {customer.lastName}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">Email:</span>
                      <p className="font-medium">{customer.email}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">Phone:</span>
                      <p className="font-medium">{customer.phone}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">Membership:</span>
                      <Badge variant={customer.membershipLevel === 'VIP' ? 'success' : 'default'}>
                        {customer.membershipLevel}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Service Details */}
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Car className="mr-2" size={20} />
                    Service Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-sm text-gray-600">Number of Cars:</span>
                      <p className="font-medium">{formData.numberOfCars}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">Storage Location:</span>
                      <p className="font-medium">{formData.storageLocation}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">Monthly Rate:</span>
                      <p className="font-medium">{formatCurrency(formData.monthlyPrice)} per car</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">Payment Period:</span>
                      <p className="font-medium">{formData.paymentPeriod.charAt(0).toUpperCase() + formData.paymentPeriod.slice(1)}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">Service Start Date:</span>
                      <p className="font-medium">{formatDate(formData.startDate)}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">Total Payment:</span>
                      <p className="font-bold text-lg text-primary-600">{formatCurrency(getDiscountedPrice())}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Terms and Conditions */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <FileText className="mr-2" size={20} />
                    Terms and Conditions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {agreementTerms.map((term, index) => (
                      <div key={index} className="flex items-start space-x-2">
                        <span className="text-sm text-gray-500 mt-0.5">{index + 1}.</span>
                        <span className="text-sm text-gray-700">{term}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setCurrentStep('details')}>
                Back to Details
              </Button>
              <Button variant="primary" onClick={() => setCurrentStep('signature')}>
                Proceed to Signature
              </Button>
            </div>
          </div>
        );

      case 'signature':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Digital Signature</h3>
              <p className="text-sm text-gray-600 mb-6">
                Please sign below to confirm your agreement to the service terms and pricing.
              </p>
              
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 bg-gray-50">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-medium text-gray-700">Signature Pad</span>
                  <Button variant="outline" size="sm" onClick={clearSignature}>
                    Clear
                  </Button>
                </div>
                
                <canvas
                  ref={canvasRef}
                  width={500}
                  height={200}
                  className="border border-gray-300 rounded bg-white cursor-crosshair w-full"
                  onMouseDown={startDrawing}
                  onMouseMove={draw}
                  onMouseUp={stopDrawing}
                  onMouseLeave={stopDrawing}
                />
                
                <p className="text-xs text-gray-500 mt-2">
                  Click and drag to sign. Use a mouse or touch device for best results.
                </p>
              </div>
              
              {signature && (
                <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Check className="h-5 w-5 text-green-600" />
                    <span className="text-sm font-medium text-green-800">Signature captured successfully</span>
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setCurrentStep('review')}>
                Back to Review
              </Button>
              <Button 
                variant="primary" 
                onClick={handleComplete}
                disabled={!signature}
                leftIcon={<Pen size={16} />}
              >
                Complete Agreement
              </Button>
            </div>
          </div>
        );

      case 'complete':
        return (
          <div className="text-center space-y-6">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <Check className="h-8 w-8 text-green-600" />
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Agreement Completed!</h3>
              <p className="text-gray-600">
                Your service agreement has been successfully signed and recorded.
              </p>
            </div>
            
            <Card>
              <CardContent className="p-4">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Agreement ID:</span>
                    <span className="font-mono">SA-{Date.now().toString().slice(-8)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Signed Date:</span>
                    <span>{formatDate(new Date().toISOString())}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Service Start:</span>
                    <span>{formatDate(formData.startDate)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Payment Amount:</span>
                    <span className="font-semibold">{formatCurrency(getDiscountedPrice())}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div className="flex justify-center space-x-3">
              <Button variant="outline" leftIcon={<Download size={16} />}>
                Download PDF
              </Button>
              <Button variant="primary" onClick={onClose}>
                Close
              </Button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Service Agreement Signature"
      size="xl"
    >
      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {[
            { key: 'details', label: 'Service Details', icon: <Car size={16} /> },
            { key: 'review', label: 'Review Agreement', icon: <FileText size={16} /> },
            { key: 'signature', label: 'Digital Signature', icon: <Pen size={16} /> },
            { key: 'complete', label: 'Complete', icon: <Check size={16} /> },
          ].map((step, index) => (
            <div key={step.key} className="flex items-center">
              <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${
                currentStep === step.key 
                  ? 'bg-primary-600 border-primary-600 text-white' 
                  : index < ['details', 'review', 'signature', 'complete'].indexOf(currentStep)
                    ? 'bg-green-600 border-green-600 text-white'
                    : 'border-gray-300 text-gray-400'
              }`}>
                {step.icon}
              </div>
              <span className={`ml-2 text-sm font-medium ${
                currentStep === step.key ? 'text-primary-600' : 'text-gray-500'
              }`}>
                {step.label}
              </span>
              {index < 3 && (
                <div className={`w-12 h-0.5 mx-4 ${
                  index < ['details', 'review', 'signature', 'complete'].indexOf(currentStep)
                    ? 'bg-green-600'
                    : 'bg-gray-300'
                }`} />
              )}
            </div>
          ))}
        </div>
      </div>

      {renderStepContent()}
    </Modal>
  );
}