import { Customer, Vehicle, CheckInOut, User, ServiceItem, AuthorizedDriver } from '../types';
import { generateId } from '../lib/utils';

// Storage keys for localStorage
const STORAGE_KEYS = {
  CUSTOMERS: 'barrett-crm-customers',
  VEHICLES: 'barrett-crm-vehicles', 
  CHECK_IN_OUTS: 'barrett-crm-checkinouts',
  USERS: 'barrett-crm-users'
};

// Helper functions for localStorage
const saveToStorage = (key: string, data: any) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.warn('Failed to save to localStorage:', error);
  }
};

const loadFromStorage = <T>(key: string, defaultValue: T): T => {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : defaultValue;
  } catch (error) {
    console.warn('Failed to load from localStorage:', error);
    return defaultValue;
  }
};

// Default data
const defaultCustomers: Customer[] = [
  {
    id: 'cust-1',
    firstName: 'Jason',
    lastName: 'Adang',
    type: 'Individual',
    membershipLevel: 'Premium',
    storageLocation: 'Moorpark',
    email: 'jason@adangenterprises.com',
    phone: '(805) 795-6808',
    streetAddress: '123 Main Street',
    city: 'Moorpark',
    state: 'CA',
    zipCode: '93021',
    storageSpots: 2,
    showPandaDocForm: true,
    dateCreated: '2023-01-15',
    password: 'jasonadang123',
    numRows: 1,
    manualPrice: 300,
    createdAt: '2023-01-15T10:35:00Z',
    updatedAt: '2023-12-10T14:35:00Z',
  },
  {
    id: 'cust-2',
    firstName: 'Chris',
    lastName: 'Antonsen',
    type: 'Individual',
    membershipLevel: 'VIP',
    storageLocation: 'Westlake Village',
    email: 'antonsenchris3@gmail.com',
    phone: '(818) 381-7105',
    streetAddress: '456 Oak Avenue',
    city: 'Westlake Village',
    state: 'CA',
    zipCode: '91362',
    storageSpots: 1,
    showPandaDocForm: false,
    dateCreated: '2023-02-20',
    password: 'chrisantonsen123',
    numRows: 1,
    manualPrice: 200,
    createdAt: '2023-02-20T14:50:00Z',
    updatedAt: '2023-11-05T09:50:00Z',
  },
  {
    id: 'cust-3',
    firstName: 'Kam',
    lastName: 'Assil',
    type: 'Business',
    membershipLevel: 'Enterprise',
    storageLocation: 'Moorpark',
    email: 'kamassil@gmail.com',
    phone: '(805) 405-2054',
    streetAddress: '5124 Oxley Place',
    city: 'Westlake Village',
    state: 'CA',
    zipCode: '91362',
    storageSpots: 3,
    showPandaDocForm: true,
    dateCreated: '2023-03-10',
    password: 'kamassil123',
    numRows: 2,
    manualPrice: 600,
    createdAt: '2023-03-10T09:20:00Z',
    updatedAt: '2024-01-20T13:20:00Z',
  },
  {
    id: 'cust-4',
    firstName: 'Dylan',
    lastName: 'Boztepe',
    type: 'Individual',
    membershipLevel: 'Basic',
    storageLocation: 'Moorpark',
    email: 'dylanboztepe@gmail.com',
    phone: '(805) 555-0123',
    streetAddress: '789 Pine Street',
    city: 'Moorpark',
    state: 'CA',
    zipCode: '93021',
    storageSpots: 1,
    showPandaDocForm: false,
    dateCreated: '2023-04-05',
    password: 'dylanboztepe123',
    numRows: 1,
    manualPrice: 75,
    createdAt: '2023-04-05T16:25:00Z',
    updatedAt: '2023-10-15T10:35:00Z',
  },
  {
    id: 'cust-5',
    firstName: 'Jeffrey',
    lastName: 'Brodsly',
    type: 'Individual',
    membershipLevel: 'VIP',
    storageLocation: 'Moorpark',
    email: 'jeffreybrodsly@gmail.com',
    phone: '(805) 555-0456',
    streetAddress: '321 Elm Drive',
    city: 'Moorpark',
    state: 'CA',
    zipCode: '93021',
    storageSpots: 2,
    showPandaDocForm: true,
    dateCreated: '2023-06-18',
    password: 'jeffreybrodsly123',
    numRows: 1,
    manualPrice: 400,
    createdAt: '2023-06-18T12:40:00Z',
    updatedAt: '2024-02-08T15:50:00Z',
  },
];

const defaultVehicles: Vehicle[] = [
  {
    id: 'veh-1',
    customerId: 'cust-1',
    authorizedDrivers: [
      {
        id: 'driver-1',
        name: 'Jason Adang',
        phone: '(805) 795-6808',
        licenseNumber: 'D1234567',
        relationship: 'Owner',
      },
    ],
    year: 2020,
    make: 'Toyota',
    model: 'Camry',
    vin: '1HGCM82633A123456',
    storageLocation: 'Moorpark',
    fairMarketValue: 28500,
    insuranceRiderRequired: true,
    insuranceRiderAmount: 30000,
    insuranceStatus: 'Active',
    insurancePolicyHolder: 'Jason Adang',
    insuranceStartDate: '2023-01-01',
    insuranceExpirationDate: '2024-12-31',
    insuranceProvider: 'State Farm',
    insurancePolicyNumber: 'SF123456789',
    licensePlate: 'ABC123',
    registration: {
      expirationDate: '2024-12-31',
      state: 'CA',
    },
    tirePressureDefault: {
      front: 32,
      rear: 30,
    },
    tirePressurePreferred: {
      front: 34,
      rear: 32,
    },
    hasPreferredPressure: true,
    odometer: 25000,
    image: 'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg',
    fuelLevel: 75,
    batteryType: 'Standard',
    proofOfOwnership: 'Vehicle Registration',
    color: 'Silver',
    createdAt: '2023-01-15T10:35:00Z',
    updatedAt: '2023-12-10T14:35:00Z',
  },
  {
    id: 'veh-2',
    customerId: 'cust-2',
    authorizedDrivers: [
      {
        id: 'driver-2',
        name: 'Chris Antonsen',
        phone: '(818) 381-7105',
        licenseNumber: 'NY987654',
        relationship: 'Owner',
      },
    ],
    year: 2019,
    make: 'Honda',
    model: 'Accord',
    vin: '2HGES16564H789012',
    storageLocation: 'Westlake Village',
    fairMarketValue: 24000,
    insuranceRiderRequired: false,
    licensePlate: 'XYZ789',
    registration: {
      expirationDate: '2024-08-15',
      state: 'NY',
    },
    tirePressureDefault: {
      front: 30,
      rear: 28,
    },
    tirePressurePreferred: {
      front: 32,
      rear: 30,
    },
    hasPreferredPressure: true,
    odometer: 32000,
    image: 'https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg',
    fuelLevel: 50,
    batteryType: 'AGM',
    proofOfOwnership: 'Vehicle Registration',
    color: 'Blue',
    createdAt: '2023-02-20T14:50:00Z',
    updatedAt: '2023-11-05T09:50:00Z',
  },
  {
    id: 'veh-3',
    customerId: 'cust-3',
    authorizedDrivers: [
      {
        id: 'driver-3',
        name: 'Kam Assil',
        phone: '(805) 405-2054',
        licenseNumber: 'TX789012',
        relationship: 'Owner',
      },
    ],
    year: 2021,
    make: 'Ford',
    model: 'F-150',
    vin: '1FTFW1ET4DFB12345',
    storageLocation: 'Moorpark',
    fairMarketValue: 45000,
    insuranceRiderRequired: true,
    insuranceRiderAmount: 50000,
    insuranceStatus: 'Active',
    insurancePolicyHolder: 'Kam Assil',
    insuranceStartDate: '2023-03-01',
    insuranceExpirationDate: '2024-12-31',
    insuranceProvider: 'Allstate',
    insurancePolicyNumber: 'AS987654321',
    licensePlate: 'DEF456',
    registration: {
      expirationDate: '2024-10-20',
      state: 'TX',
    },
    tirePressureDefault: {
      front: 35,
      rear: 35,
    },
    tirePressurePreferred: {
      front: 38,
      rear: 38,
    },
    hasPreferredPressure: true,
    odometer: 18000,
    image: 'https://images.pexels.com/photos/1335077/pexels-photo-1335077.jpeg',
    fuelLevel: 90,
    batteryType: 'Standard',
    proofOfOwnership: 'Vehicle Registration',
    color: 'Black',
    createdAt: '2023-03-10T09:20:00Z',
    updatedAt: '2024-01-20T13:20:00Z',
  },
  {
    id: 'veh-4',
    customerId: 'cust-4',
    authorizedDrivers: [
      {
        id: 'driver-4',
        name: 'Dylan Boztepe',
        phone: '(805) 555-0123',
        licenseNumber: 'FL345678',
        relationship: 'Owner',
      },
    ],
    year: 2018,
    make: 'Chevrolet',
    model: 'Equinox',
    vin: '3GNFK16338G345678',
    storageLocation: 'Moorpark',
    fairMarketValue: 18500,
    insuranceRiderRequired: false,
    licensePlate: 'GHI789',
    registration: {
      expirationDate: '2024-06-30',
      state: 'FL',
    },
    tirePressureDefault: {
      front: 30,
      rear: 30,
    },
    tirePressurePreferred: {
      front: 32,
      rear: 32,
    },
    hasPreferredPressure: false,
    odometer: 45000,
    fuelLevel: 25,
    batteryType: 'Standard',
    proofOfOwnership: 'Vehicle Registration',
    color: 'Red',
    createdAt: '2023-04-05T16:25:00Z',
    updatedAt: '2023-10-15T10:35:00Z',
  },
  {
    id: 'veh-5',
    customerId: 'cust-5',
    authorizedDrivers: [
      {
        id: 'driver-5',
        name: 'Jeffrey Brodsly',
        phone: '(805) 555-0456',
        licenseNumber: 'CA567890',
        relationship: 'Owner',
      },
    ],
    year: 2022,
    make: 'Nissan',
    model: 'Altima',
    vin: '1N4AL3AP3DC567890',
    storageLocation: 'Moorpark',
    fairMarketValue: 32000,
    insuranceRiderRequired: true,
    insuranceRiderAmount: 35000,
    insuranceStatus: 'Active',
    insurancePolicyHolder: 'Jeffrey Brodsly',
    insuranceStartDate: '2023-06-01',
    insuranceExpirationDate: '2024-12-31',
    insuranceProvider: 'Geico',
    insurancePolicyNumber: 'GE456789123',
    licensePlate: 'JKL012',
    registration: {
      expirationDate: '2025-02-28',
      state: 'CA',
    },
    tirePressureDefault: {
      front: 32,
      rear: 30,
    },
    tirePressurePreferred: {
      front: 34,
      rear: 32,
    },
    hasPreferredPressure: true,
    odometer: 8000,
    image: 'https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg',
    fuelLevel: 85,
    batteryType: 'Lithium',
    proofOfOwnership: 'Vehicle Registration',
    color: 'White',
    createdAt: '2023-06-18T12:40:00Z',
    updatedAt: '2024-02-08T15:50:00Z',
  },
];

const defaultCheckInOuts: CheckInOut[] = [
  {
    id: 'check-1',
    vehicleId: 'veh-1',
    customerId: 'cust-1',
    date: '2024-03-15',
    type: 'CHECK_OUT',
    location: 'Moorpark',
    contact: 'Jason Adang',
    status: 'CHECKED_OUT',
    checkInDate: '2024-03-15T09:30:00Z',
    checkOutDate: '2024-03-15T11:45:00Z',
    fuelLevel: 75,
    mileage: 25000,
    tirePressure: {
      passengerFront: 34,
      passengerRear: 32,
      driverFront: 34,
      driverRear: 32,
    },
    carCover: true,
    killSwitch: false,
    startupDirections: 'Standard startup procedure',
    deliveryAddress: null,
    notes: 'Regular maintenance completed. Oil changed, tires rotated.',
    signature: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==',
    photos: {
      driverPic: 'https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg',
      frontPic: 'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg',
      rearPic: 'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg',
      dashboardPics: ['https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg'],
      engineBayPics: ['https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg'],
      walkAroundVideo: 'https://example.com/walkaround-video-1.mp4',
    },
    serviceItems: [
      {
        id: 'service-1',
        checkInOutId: 'check-1',
        description: 'Oil Change',
        cost: 49.99,
        completed: true,
        completedAt: '2024-03-15T11:30:00Z',
        createdAt: '2024-03-15T09:30:00Z',
        updatedAt: '2024-03-15T11:30:00Z',
      },
      {
        id: 'service-2',
        checkInOutId: 'check-1',
        description: 'Tire Rotation',
        cost: 29.99,
        completed: true,
        completedAt: '2024-03-15T10:45:00Z',
        createdAt: '2024-03-15T09:30:00Z',
        updatedAt: '2024-03-15T10:45:00Z',
      },
    ],
    createdAt: '2024-03-15T09:30:00Z',
    updatedAt: '2024-03-15T11:45:00Z',
  },
  {
    id: 'check-2',
    vehicleId: 'veh-2',
    customerId: 'cust-2',
    date: '2024-03-17',
    type: 'CHECK_IN',
    location: 'Westlake Village',
    contact: 'Chris Antonsen',
    status: 'IN_SERVICE',
    checkInDate: '2024-03-17T14:00:00Z',
    checkOutDate: null,
    fuelLevel: 50,
    mileage: 32000,
    tirePressure: {
      passengerFront: 32,
      passengerRear: 30,
      driverFront: 32,
      driverRear: 30,
    },
    carCover: false,
    killSwitch: true,
    startupDirections: 'Press brake pedal before starting',
    deliveryAddress: null,
    notes: 'Customer reported squeaking noise when braking. Investigating brake system.',
    signature: null,
    photos: null,
    serviceItems: [
      {
        id: 'service-3',
        checkInOutId: 'check-2',
        description: 'Brake Pad Replacement',
        cost: 249.99,
        completed: false,
        completedAt: null,
        createdAt: '2024-03-17T14:15:00Z',
        updatedAt: '2024-03-17T14:15:00Z',
      },
    ],
    createdAt: '2024-03-17T14:00:00Z',
    updatedAt: '2024-03-17T14:15:00Z',
  },
  {
    id: 'check-3',
    vehicleId: 'veh-3',
    customerId: 'cust-3',
    date: '2024-03-16',
    type: 'CHECK_OUT',
    location: 'Moorpark',
    contact: 'Kam Assil',
    status: 'CHECKED_OUT',
    checkInDate: '2024-03-16T12:00:00Z',
    checkOutDate: '2024-03-16T13:30:00Z',
    fuelLevel: 90,
    mileage: 18000,
    tirePressure: {
      passengerFront: 38,
      passengerRear: 38,
      driverFront: 38,
      driverRear: 38,
    },
    carCover: true,
    killSwitch: false,
    startupDirections: null,
    deliveryAddress: '5124 Oxley Place, Westlake Village, CA 91362',
    notes: 'Routine maintenance completed. Air filter and wiper blades replaced.',
    signature: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==',
    photos: null,
    serviceItems: [
      {
        id: 'service-4',
        checkInOutId: 'check-3',
        description: 'Air Filter Replacement',
        cost: 39.99,
        completed: true,
        completedAt: '2024-03-16T13:20:00Z',
        createdAt: '2024-03-16T12:00:00Z',
        updatedAt: '2024-03-16T13:20:00Z',
      },
      {
        id: 'service-5',
        checkInOutId: 'check-3',
        description: 'Wiper Blade Replacement',
        cost: 24.99,
        completed: true,
        completedAt: '2024-03-16T12:50:00Z',
        createdAt: '2024-03-16T12:00:00Z',
        updatedAt: '2024-03-16T12:50:00Z',
      },
    ],
    createdAt: '2024-03-16T12:00:00Z',
    updatedAt: '2024-03-16T13:30:00Z',
  },
];

const defaultUsers: User[] = [
  {
    id: 'user-1',
    firstName: 'Admin',
    lastName: 'User',
    email: 'admin@autoservice.com',
    password: 'admin123',
    role: 'Admin',
    avatar: null,
    phone: '(555) 123-4567',
    department: 'Administration',
    lastLogin: '2024-03-20T10:30:00Z',
    isActive: true,
    createdAt: '2023-01-01T00:00:00Z',
    updatedAt: '2024-03-20T10:30:00Z',
  },
  {
    id: 'user-2',
    firstName: 'John',
    lastName: 'Manager',
    email: 'john.manager@autoservice.com',
    password: 'manager123',
    role: 'Manager',
    avatar: null,
    phone: '(555) 234-5678',
    department: 'Operations',
    lastLogin: '2024-03-19T15:45:00Z',
    isActive: true,
    createdAt: '2023-01-15T00:00:00Z',
    updatedAt: '2024-03-19T15:45:00Z',
  },
  {
    id: 'user-3',
    firstName: 'Sarah',
    lastName: 'Staff',
    email: 'sarah.staff@autoservice.com',
    password: 'staff123',
    role: 'Staff',
    avatar: null,
    phone: '(555) 345-6789',
    department: 'Service',
    lastLogin: '2024-03-18T09:15:00Z',
    isActive: true,
    createdAt: '2023-02-01T00:00:00Z',
    updatedAt: '2024-03-18T09:15:00Z',
  },
  {
    id: 'user-4',
    firstName: 'Viewer',
    lastName: 'User',
    email: 'viewer@autoservice.com',
    password: 'viewer123',
    role: 'Viewer',
    avatar: null,
    phone: '(555) 456-7890',
    department: 'Support',
    lastLogin: '2024-03-17T13:20:00Z',
    isActive: true,
    createdAt: '2023-03-01T00:00:00Z',
    updatedAt: '2024-03-17T13:20:00Z',
  },
  {
    id: 'customer-user-1',
    firstName: 'Jason',
    lastName: 'Adang',
    email: 'jason@adangenterprises.com',
    password: 'jasonadang123',
    role: 'Customer',
    avatar: null,
    phone: '(805) 795-6808',
    department: null,
    lastLogin: '2024-03-16T08:30:00Z',
    isActive: true,
    customerId: 'cust-1',
    createdAt: '2023-01-15T10:35:00Z',
    updatedAt: '2024-03-16T08:30:00Z',
  },
];

// Load data from localStorage or use defaults
export let customers: Customer[] = loadFromStorage(STORAGE_KEYS.CUSTOMERS, defaultCustomers);
export let vehicles: Vehicle[] = loadFromStorage(STORAGE_KEYS.VEHICLES, defaultVehicles);
export let checkInOuts: CheckInOut[] = loadFromStorage(STORAGE_KEYS.CHECK_IN_OUTS, defaultCheckInOuts);
export let users: User[] = loadFromStorage(STORAGE_KEYS.USERS, defaultUsers);

// Customer functions
export function getCustomerById(id: string): Customer | undefined {
  return customers.find(customer => customer.id === id);
}

export function addCustomer(customerData: Omit<Customer, 'id' | 'createdAt' | 'updatedAt'>): Customer {
  const newCustomer: Customer = {
    ...customerData,
    id: generateId(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  
  customers.push(newCustomer);
  saveToStorage(STORAGE_KEYS.CUSTOMERS, customers);
  return newCustomer;
}

export function updateCustomer(id: string, updates: Partial<Customer>): Customer | null {
  const index = customers.findIndex(customer => customer.id === id);
  if (index === -1) return null;
  
  customers[index] = {
    ...customers[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  };
  
  saveToStorage(STORAGE_KEYS.CUSTOMERS, customers);
  return customers[index];
}

export function deleteCustomer(id: string): boolean {
  const index = customers.findIndex(customer => customer.id === id);
  if (index === -1) return false;
  
  customers.splice(index, 1);
  saveToStorage(STORAGE_KEYS.CUSTOMERS, customers);
  return true;
}

// Vehicle functions
export function getVehicleById(id: string): Vehicle | undefined {
  return vehicles.find(vehicle => vehicle.id === id);
}

export function getVehiclesByCustomerId(customerId: string): Vehicle[] {
  return vehicles.filter(vehicle => vehicle.customerId === customerId);
}

export function addVehicle(vehicleData: Omit<Vehicle, 'id' | 'createdAt' | 'updatedAt'>): Vehicle {
  const newVehicle: Vehicle = {
    ...vehicleData,
    id: generateId(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  
  vehicles.push(newVehicle);
  saveToStorage(STORAGE_KEYS.VEHICLES, vehicles);
  return newVehicle;
}

export function updateVehicle(id: string, updates: Partial<Vehicle>): Vehicle | null {
  const index = vehicles.findIndex(vehicle => vehicle.id === id);
  if (index === -1) return null;
  
  vehicles[index] = {
    ...vehicles[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  };
  
  saveToStorage(STORAGE_KEYS.VEHICLES, vehicles);
  return vehicles[index];
}

export function deleteVehicle(id: string): boolean {
  const index = vehicles.findIndex(vehicle => vehicle.id === id);
  if (index === -1) return false;
  
  vehicles.splice(index, 1);
  saveToStorage(STORAGE_KEYS.VEHICLES, vehicles);
  return true;
}

// Check In/Out functions
export function getCheckInOutById(id: string): CheckInOut | undefined {
  return checkInOuts.find(record => record.id === id);
}

export function addCheckInOut(checkInOutData: Omit<CheckInOut, 'id' | 'createdAt' | 'updatedAt'>): CheckInOut {
  const newCheckInOut: CheckInOut = {
    ...checkInOutData,
    id: generateId(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  
  checkInOuts.push(newCheckInOut);
  saveToStorage(STORAGE_KEYS.CHECK_IN_OUTS, checkInOuts);
  console.log('Added new check-in/out record:', newCheckInOut);
  console.log('Total records now:', checkInOuts.length);
  return newCheckInOut;
}

export function updateCheckInOut(id: string, updates: Partial<CheckInOut>): CheckInOut | null {
  const index = checkInOuts.findIndex(record => record.id === id);
  if (index === -1) return null;
  
  checkInOuts[index] = {
    ...checkInOuts[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  };
  
  saveToStorage(STORAGE_KEYS.CHECK_IN_OUTS, checkInOuts);
  return checkInOuts[index];
}

export function deleteCheckInOut(id: string): boolean {
  const index = checkInOuts.findIndex(record => record.id === id);
  if (index === -1) return false;
  
  checkInOuts.splice(index, 1);
  saveToStorage(STORAGE_KEYS.CHECK_IN_OUTS, checkInOuts);
  return true;
}

// User functions
export function getUserById(id: string): User | undefined {
  return users.find(user => user.id === id);
}

export function addUser(userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): User {
  const newUser: User = {
    ...userData,
    id: generateId(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  
  users.push(newUser);
  saveToStorage(STORAGE_KEYS.USERS, users);
  return newUser;
}

export function updateUser(id: string, updates: Partial<User>): User | null {
  const index = users.findIndex(user => user.id === id);
  if (index === -1) return null;
  
  users[index] = {
    ...users[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  };
  
  saveToStorage(STORAGE_KEYS.USERS, users);
  return users[index];
}

export function deleteUser(id: string): boolean {
  const index = users.findIndex(user => user.id === id);
  if (index === -1) return false;
  
  users.splice(index, 1);
  saveToStorage(STORAGE_KEYS.USERS, users);
  return true;
}

export function authenticateUser(email: string, password: string, userType: 'staff' | 'customer' = 'staff'): User | null {
  const user = users.find(u => u.email === email && u.password === password);
  
  if (!user) return null;
  
  // Check user type matches
  if (userType === 'customer' && user.role !== 'Customer') return null;
  if (userType === 'staff' && user.role === 'Customer') return null;
  
  // Update last login
  updateUser(user.id, { lastLogin: new Date().toISOString() });
  
  return user;
}

// Initialize data on module load
console.log('Mock data initialized with localStorage persistence');
console.log('Customers:', customers.length);
console.log('Vehicles:', vehicles.length);
console.log('Check-in/out records:', checkInOuts.length);
console.log('Users:', users.length);