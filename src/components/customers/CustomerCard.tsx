import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Building, Crown, Key, FileText, DollarSign } from 'lucide-react';
import { Customer } from '../../types';
import { Card, CardContent } from '../ui/Card';
import { Avatar } from '../ui/Avatar';
import { Badge } from '../ui/Badge';
import { getInitials, formatCurrency, formatDate } from '../../lib/utils';

interface CustomerCardProps {
  customer: Customer;
}

export function CustomerCard({ customer }: CustomerCardProps) {
  const initials = getInitials(customer.firstName, customer.lastName);
  
  const membershipColors = {
    'Basic': 'default',
    'Premium': 'warning',
    'VIP': 'success',
    'Enterprise': 'error',
    'Archived': 'outline'
  } as const;

  const typeColors = {
    'Individual': 'outline',
    'Business': 'default',
    'Corporate': 'error'
  } as const;
  
  return (
    <Card className="h-full hover:shadow-lg transition-all duration-200 hover:-translate-y-1">
      <CardContent className="p-6">
        <div className="flex items-start space-x-4 mb-4">
          <Avatar initials={initials} size="lg" />
          
          <div className="flex-1 min-w-0">
            <Link to={`/customers/${customer.id}`} className="block">
              <h3 className="text-lg font-semibold text-gray-900 truncate hover:text-primary-600 transition-colors">
                {customer.firstName} {customer.lastName}
              </h3>
            </Link>
            
            <div className="flex flex-wrap gap-2 mt-2">
              <Badge variant={typeColors[customer.type]} className="text-xs">
                {customer.type}
              </Badge>
              <Badge variant={membershipColors[customer.membershipLevel]} className="text-xs">
                {customer.membershipLevel}
              </Badge>
            </div>
          </div>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center text-sm text-gray-600">
            <Building size={16} className="flex-shrink-0 mr-2 text-gray-400" />
            <span className="truncate">{customer.storageLocation}</span>
          </div>
          
          <div className="flex items-center text-sm text-gray-600">
            <Phone size={16} className="flex-shrink-0 mr-2 text-gray-400" />
            <span>{customer.phone}</span>
          </div>
          
          <div className="flex items-center text-sm text-gray-600">
            <Mail size={16} className="flex-shrink-0 mr-2 text-gray-400" />
            <span className="truncate">{customer.email}</span>
          </div>
          
          <div className="flex items-center text-sm text-gray-600">
            <MapPin size={16} className="flex-shrink-0 mr-2 text-gray-400" />
            <span className="truncate">
              {customer.streetAddress}, {customer.city}, {customer.state} {customer.zipCode}
            </span>
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-500 text-xs uppercase font-medium">Storage Spots</p>
              <p className="font-semibold text-gray-900">{customer.storageSpots}</p>
            </div>
            <div>
              <p className="text-gray-500 text-xs uppercase font-medium">Rows</p>
              <p className="font-semibold text-gray-900">{customer.numRows}</p>
            </div>
          </div>
          
          {customer.manualPrice && (
            <div className="mt-3 flex items-center text-sm">
              <DollarSign size={16} className="flex-shrink-0 mr-1 text-green-600" />
              <span className="font-semibold text-green-600">
                {formatCurrency(customer.manualPrice)}/month
              </span>
            </div>
          )}
        </div>
        
        <div className="mt-4 pt-4 border-t border-gray-200 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {customer.showPandaDocForm && (
              <div className="flex items-center text-xs text-primary-600">
                <FileText size={14} className="mr-1" />
                <span>PandaDoc</span>
              </div>
            )}
            {customer.magicLink && (
              <div className="flex items-center text-xs text-secondary-600">
                <Key size={14} className="mr-1" />
                <span>Magic Link</span>
              </div>
            )}
          </div>
          
          <div className="text-xs text-gray-500">
            {formatDate(customer.dateCreated)}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}