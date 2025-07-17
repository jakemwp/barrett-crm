import { 
  Customer, 
  Vehicle, 
  CheckInOut, 
  CheckStatus, 
  CheckType,
  ServiceItem,
  AuthorizedDriver,
  AuthorizedContact,
  TirePressureReading,
  VehicleInspectionPhotos,
  User
} from '../types';
import { generateId } from '../lib/utils';

// Create mock users
let usersData: User[] = [
  {
    id: 'u1',
    firstName: 'Admin',
    lastName: 'User',
    email: 'admin@autoservice.com',
    password: 'admin123',
    role: 'Admin',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150',
    phone: '(555) 123-4567',
    department: 'Management',
    lastLogin: '2024-03-18T10:30:00Z',
    isActive: true,
    createdAt: '2023-01-01T00:00:00Z',
    updatedAt: '2024-03-18T10:30:00Z',
  },
  {
    id: 'u2',
    firstName: 'John',
    lastName: 'Manager',
    email: 'john.manager@autoservice.com',
    password: 'manager123',
    role: 'Manager',
    phone: '(555) 234-5678',
    department: 'Operations',
    lastLogin: '2024-03-17T15:45:00Z',
    isActive: true,
    createdAt: '2023-02-15T00:00:00Z',
    updatedAt: '2024-03-17T15:45:00Z',
  },
  {
    id: 'u3',
    firstName: 'Sarah',
    lastName: 'Staff',
    email: 'sarah.staff@autoservice.com',
    password: 'staff123',
    role: 'Staff',
    phone: '(555) 345-6789',
    department: 'Service',
    lastLogin: '2024-03-18T09:15:00Z',
    isActive: true,
    createdAt: '2023-03-10T00:00:00Z',
    updatedAt: '2024-03-18T09:15:00Z',
  },
];

export const users: User[] = usersData;

// Current user session (in a real app, this would come from authentication)
export const currentUser: User = usersData[0]; // Admin user

// User management functions
export function addUser(userData: Omit<User, 'id' | 'createdAt' | 'updatedAt' | 'lastLogin'>): User {
  const newUser: User = {
    ...userData,
    id: generateId(),
    lastLogin: null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  
  usersData.push(newUser);
  return newUser;
}

export function updateUser(id: string, userData: Partial<User>): User | null {
  const userIndex = usersData.findIndex(user => user.id === id);
  if (userIndex === -1) return null;
  
  usersData[userIndex] = {
    ...usersData[userIndex],
    ...userData,
    updatedAt: new Date().toISOString(),
  };
  
  return usersData[userIndex];
}

export function deleteUser(id: string): boolean {
  const userIndex = usersData.findIndex(user => user.id === id);
  if (userIndex === -1) return false;
  
  usersData.splice(userIndex, 1);
  return true;
}

export function authenticateUser(email: string, password: string, userType: 'staff' | 'customer' = 'staff'): User | null {
  let user: User | null = null;
  
  if (userType === 'staff') {
    user = usersData.find(user => user.email === email && user.password === password);
  } else if (userType === 'customer') {
    // Find customer and create a user object for them
    const customer = customers.find(customer => customer.email === email && customer.password === password);
    if (customer) {
      user = {
        id: customer.id,
        firstName: customer.firstName || '',
        lastName: customer.lastName || '',
        email: customer.email || '',
        password: customer.password || '',
        role: 'Customer' as any, // Add Customer role
        phone: customer.phone,
        department: customer.storageLocation,
        lastLogin: null,
        isActive: true,
        createdAt: customer.createdAt,
        updatedAt: customer.updatedAt,
        customerId: customer.id, // Add reference to customer record
      };
    }
  }
  
  if (user) {
    // Update last login time
    user.lastLogin = new Date().toISOString();
    return user;
  }
  return null;
}

// Create customers from complete CSV data
export const customers: Customer[] = [
  {
    id: "c1",
    firstName: "Jason",
    lastName: "Adang",
    type: "Individual",
    membershipLevel: "Premium",
    storageLocation: "Moorpark",
    email: "jason@adangenterprises.com",
    phone: "(805) 795-6808",
    streetAddress: "821 Calle Pecos",
    city: "Thousand Oaks",
    state: "CA",
    zipCode: "91360",
    storageSpots: 2,
    showPandaDocForm: false,
    dateCreated: "2023-01-15",
    password: "customer123",
    numRows: 1,
    manualPrice: 300,
    createdAt: "2023-01-15T10:30:00Z",
    updatedAt: "2023-12-10T14:35:00Z"
  },
  {
    id: "c2",
    firstName: "Chris",
    lastName: "Antonsen",
    type: "Individual",
    membershipLevel: "VIP",
    storageLocation: "Westlake Village",
    email: "antonsenchris3@gmail.com",
    phone: "(818) 381-7105",
    streetAddress: "4565 Wolsey Court",
    city: "Westlake Village",
    state: "CA",
    zipCode: "91361",
    storageSpots: 1,
    showPandaDocForm: true,
    dateCreated: "2023-02-20",
    password: "customer123",
    numRows: 1,
    manualPrice: 200,
    createdAt: "2023-02-20T14:50:00Z",
    updatedAt: "2023-11-05T09:50:00Z"
  },
  {
    id: "c3",
    firstName: "Kam",
    lastName: "Assil",
    type: "Individual",
    membershipLevel: "Enterprise",
    storageLocation: "Moorpark",
    email: "kamassil@gmail.com",
    phone: "(805) 405-2054",
    streetAddress: "5124 Oxley Place",
    city: "Westlake Village",
    state: "CA",
    zipCode: "91362",
    storageSpots: 1,
    showPandaDocForm: false,
    dateCreated: "2023-03-10",
    password: "customer123",
    numRows: 1,
    manualPrice: 300,
    createdAt: "2023-03-10T09:20:00Z",
    updatedAt: "2024-01-20T13:20:00Z"
  },
  {
    id: "c4",
    firstName: "Dylan",
    lastName: "Boztepe",
    type: "Individual",
    membershipLevel: "Premium",
    storageLocation: "Moorpark",
    email: "dylanboztepe@gmail.com",
    phone: "(805) 555-0123",
    streetAddress: "1234 Main Street",
    city: "Moorpark",
    state: "CA",
    zipCode: "93021",
    storageSpots: 1,
    showPandaDocForm: false,
    dateCreated: "2023-04-05",
    password: "customer123",
    numRows: 1,
    manualPrice: 150,
    createdAt: "2023-04-05T16:25:00Z",
    updatedAt: "2023-10-15T10:35:00Z"
  },
  {
    id: "c5",
    firstName: "Jeffrey",
    lastName: "Brodsly",
    type: "Individual",
    membershipLevel: "VIP",
    storageLocation: "Moorpark",
    email: "jeffrey.brodsly@email.com",
    phone: "(805) 555-0456",
    streetAddress: "5678 Oak Avenue",
    city: "Moorpark",
    state: "CA",
    zipCode: "93021",
    storageSpots: 1,
    showPandaDocForm: true,
    dateCreated: "2023-06-18",
    password: "customer123",
    numRows: 1,
    manualPrice: 200,
    createdAt: "2023-06-18T12:40:00Z",
    updatedAt: "2024-02-08T15:50:00Z"
  }
]

// Create mock vehicles with comprehensive data

export const vehicles: Vehicle[] =[
  {
    "id": "c2",
    "customerId": "c2",
    "authorizedDrivers": [],
    "year": "1972",
    "make": "Porsche",
    "model": "911",
    "vin": "9112101858",
    "storageLocation": "Moorpark",
    "fairMarketValue": 100000,
    "insuranceRiderRequired": false,
    "insuranceRiderAmount": 0,
    "licensePlate": "4/21/2025",
    "registration": {
      "number": "REG123456",
      "expirationDate": "2024-12-31",
      "state": "CA"
    },
    "tirePressureDefault": {
      "front": 32,
      "rear": 32
    },
    "tirePressurePreferred": {
      "front": 32,
      "rear": 32
    },
    "maintenanceSchedule": [],
    "odometer": null,
    "fuelLevel": 100,
    "batteryType": "Standard",
    "color": "Placeholder",
    "createdAt": "2025-06-27T10:35:00Z",
    "updatedAt": "2025-06-27T14:35:00Z"
  },
  {
    "id": "c3",
    "customerId": "c2",
    "authorizedDrivers": [],
    "year": "2012",
    "make": "Lexus",
    "model": "LFA",
    "vin": "JTHHX8BH2C1000028",
    "storageLocation": "Moorpark",
    "fairMarketValue": 875000,
    "insuranceRiderRequired": true,
    "insuranceRiderAmount": 100,
    "licensePlate": "4/21/2025",
    "registration": {
      "number": "REG123456",
      "expirationDate": "2024-12-31",
      "state": "CA"
    },
    "tirePressureDefault": {
      "front": 32,
      "rear": 32
    },
    "tirePressurePreferred": {
      "front": 32,
      "rear": 32
    },
    "maintenanceSchedule": [],
    "odometer": null,
    "fuelLevel": 100,
    "batteryType": "Standard",
    "color": "Placeholder",
    "createdAt": "2025-06-27T10:35:00Z",
    "updatedAt": "2025-06-27T14:35:00Z"
  }
]

// Create mock service items
export const serviceItems: ServiceItem[] = [
  {
    id: 's1',
    checkInOutId: 'ci1',
    description: 'Oil Change',
    cost: 49.99,
    completed: true,
    completedAt: '2024-03-15T11:30:00Z',
    createdAt: '2024-03-15T09:30:00Z',
    updatedAt: '2024-03-15T11:30:00Z',
  },
  {
    id: 's2',
    checkInOutId: 'ci1',
    description: 'Tire Rotation',
    cost: 29.99,
    completed: true,
    completedAt: '2024-03-15T10:45:00Z',
    createdAt: '2024-03-15T09:30:00Z',
    updatedAt: '2024-03-15T10:45:00Z',
  },
  {
    id: 's3',
    checkInOutId: 'ci2',
    description: 'Brake Pad Replacement',
    cost: 249.99,
    completed: false,
    createdAt: '2024-03-17T14:15:00Z',
    updatedAt: '2024-03-17T14:15:00Z',
  },
  {
    id: 's4',
    checkInOutId: 'ci3',
    description: 'Air Filter Replacement',
    cost: 39.99,
    completed: true,
    completedAt: '2024-03-16T13:20:00Z',
    createdAt: '2024-03-16T12:00:00Z',
    updatedAt: '2024-03-16T13:20:00Z',
  },
  {
    id: 's5',
    checkInOutId: 'ci3',
    description: 'Wiper Blade Replacement',
    cost: 24.99,
    completed: true,
    completedAt: '2024-03-16T12:50:00Z',
    createdAt: '2024-03-16T12:00:00Z',
    updatedAt: '2024-03-16T12:50:00Z',
  },
];


// Create mock check-in/check-out records with comprehensive data
export const checkInOuts: CheckInOut[] = [
  {
    id: 'ci1',
    vehicleId: 'v1',
    customerId: 'c1',
    date: '2024-03-15',
    type: CheckType.CHECK_OUT,
    location: 'Moorpark',
    contact: 'Jason Adang',
    status: CheckStatus.CHECKED_OUT,
    checkInDate: '2024-03-15T09:30:00Z',
    checkOutDate: '2024-03-15T11:45:00Z',
    fuelLevel: 75,
    mileage: 25000,
    tirePressure: {
      passengerFront: 34,
      passengerRear: 32,
      driverFront: 34,
      driverRear: 32
    },
    carCover: true,
    killSwitch: false,
    startupDirections: 'Standard startup procedure',
    notes: 'Regular maintenance completed. Oil changed, tires rotated.',
    signature: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==',
    photos: {
      driverPic: 'https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg',
      frontPic: 'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg',
      rearPic: 'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg',
      dashboardPics: ['https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg'],
      engineBayPics: ['https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg'],
      walkAroundVideo: 'https://example.com/walkaround-video-1.mp4'
    },
    serviceItems: serviceItems.filter(item => item.checkInOutId === 'ci1'),
    createdAt: '2024-03-15T09:30:00Z',
    updatedAt: '2024-03-15T11:45:00Z',
  },
  {
    id: 'ci2',
    vehicleId: 'v3',
    customerId: 'c2',
    date: '2024-03-17',
    type: CheckType.CHECK_IN,
    location: 'Moorpark',
    contact: 'Jim Feinstein',
    status: CheckStatus.IN_SERVICE,
    checkInDate: '2024-03-17T14:00:00Z',
    fuelLevel: 50,
    mileage: 32000,
    tirePressure: {
      passengerFront: 32,
      passengerRear: 30,
      driverFront: 32,
      driverRear: 30
    },
    carCover: false,
    killSwitch: true,
    startupDirections: 'Press brake pedal before starting',
    notes: 'Customer reported squeaking noise when braking. Investigating brake system.',
    photos: {
      driverPic: 'https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg',
      frontPic: 'https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg',
      rearPic: 'https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg',
      dashboardPics: ['https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg'],
      frontBumperPics: ['https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg'],
      rearLightPics: ['https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg']
    },
    serviceItems: serviceItems.filter(item => item.checkInOutId === 'ci2'),
    createdAt: '2024-03-17T14:00:00Z',
    updatedAt: '2024-03-17T14:15:00Z',
  },
  {
    id: 'ci3',
    vehicleId: 'v4',
    customerId: 'c3',
    date: '2024-03-16',
    type: CheckType.CHECK_OUT,
    location: 'Moorpark',
    contact: 'Chris Antonsen',
    status: CheckStatus.CHECKED_OUT,
    checkInDate: '2024-03-16T12:00:00Z',
    checkOutDate: '2024-03-16T13:30:00Z',
    fuelLevel: 25,
    mileage: 45000,
    tirePressure: {
      passengerFront: 32,
      passengerRear: 32,
      driverFront: 32,
      driverRear: 32
    },
    carCover: true,
    killSwitch: false,
    deliveryAddress: '4565 Wolsey Court, Westlake Village, CA 91361',
    notes: 'Routine maintenance completed. Air filter and wiper blades replaced.',
    signature: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==',
    photos: {
      driverPic: 'https://images.pexels.com/photos/1335077/pexels-photo-1335077.jpeg',
      frontPic: 'https://images.pexels.com/photos/1335077/pexels-photo-1335077.jpeg',
      rearPic: 'https://images.pexels.com/photos/1335077/pexels-photo-1335077.jpeg',
      dashboardPics: ['https://images.pexels.com/photos/1335077/pexels-photo-1335077.jpeg'],
      engineBayPics: ['https://images.pexels.com/photos/1335077/pexels-photo-1335077.jpeg'],
      hoodPics: ['https://images.pexels.com/photos/1335077/pexels-photo-1335077.jpeg'],
      roofPics: ['https://images.pexels.com/photos/1335077/pexels-photo-1335077.jpeg']
    },
    serviceItems: serviceItems.filter(item => item.checkInOutId === 'ci3'),
    createdAt: '2024-03-16T12:00:00Z',
    updatedAt: '2024-03-16T13:30:00Z',
  },
];

export function getUserById(id: string): User | undefined {
  return users.find(user => user.id === id);
}


export function getCustomerById(id: string): Customer | undefined {
  return customers.find(customer => customer.id === id);
}

export function getVehicleById(id: string): Vehicle | undefined {
  return vehicles.find(vehicle => vehicle.id === id);
}

export function getVehiclesByCustomerId(customerId: string): Vehicle[] {
  return vehicles.filter(vehicle => vehicle.customerId === customerId);
}

export function getCheckInOutById(id: string): CheckInOut | undefined {
  return checkInOuts.find(record => record.id === id);
}

export function getActiveCheckIns(): CheckInOut[] {
  return checkInOuts.filter(
    record => record.status === CheckStatus.CHECKED_IN || 
              record.status === CheckStatus.IN_SERVICE
  );
}

export function addCustomer(customerData: Omit<Customer, 'id' | 'createdAt' | 'updatedAt'>): Customer {
  const now = new Date().toISOString();
  const newCustomer: Customer = {
    id: generateId(),
    ...customerData,
    createdAt: now,
    updatedAt: now,
  };
  
  customers.push(newCustomer);
  return newCustomer;
}

export function addVehicle(vehicleData: Omit<Vehicle, 'id' | 'createdAt' | 'updatedAt'>): Vehicle {
  const now = new Date().toISOString();
  const newVehicle: Vehicle = {
    id: generateId(),
    ...vehicleData,
    createdAt: now,
    updatedAt: now,
  };
  
  vehicles.push(newVehicle);
  return newVehicle;
}

export function addCheckInOut(checkData: Omit<CheckInOut, 'id' | 'serviceItems' | 'createdAt' | 'updatedAt'>): CheckInOut {
  const now = new Date().toISOString();
  const newCheckInOut: CheckInOut = {
    id: generateId(),
    ...checkData,
    serviceItems: [],
    createdAt: now,
    updatedAt: now,
  };
  
  checkInOuts.push(newCheckInOut);
  return newCheckInOut;
}