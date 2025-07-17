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
        role: 'Customer' as User['role'], // Add Customer role
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
export const customers: Customer[] =[
  {
    "id": "c1",
    "firstName": "Name",
    "lastName": " ",
    "type": "Individual",
    "membershipLevel": "Standard",
    "storageLocation": "Storage Location ",
    "email": "Email",
    "phone": "Phone Number",
    "streetAddress": "Address",
    "city": "City",
    "state": "State,",
    "zipCode": "Zip",
    "storageSpots": "Payment Information",
    "showPandaDocForm": false,
    "dateCreated": "2025-06-27",
    "password": "placeholder",
    "numRows": 1,
    "manualprice": null,
    "createdAt": "2025-06-27T10:30:00Z",
    "updatedAt": "2025-06-27T10:30:00Z"
  },
  {
    "id": "c2",
    "firstName": "Adang, Jason",
    "lastName": " ",
    "type": "Individual",
    "membershipLevel": "Standard",
    "storageLocation": "Moorpark",
    "email": "jason@adangenterprises.com",
    "phone": "(805) 795-6808",
    "streetAddress": "821 Calle Pecos",
    "city": "Thousan",
    "state": "Oaks,",
    "zipCode": "CA",
    "storageSpots": "2",
    "showPandaDocForm": false,
    "dateCreated": "2025-06-27",
    "password": "placeholder",
    "numRows": 1,
    "manualprice": null,
    "createdAt": "2025-06-27T10:30:00Z",
    "updatedAt": "2025-06-27T10:30:00Z"
  },
  {
    "id": "c3",
    "firstName": "All Valley Washer Service, Inc.",
    "lastName": " ",
    "type": "Individual",
    "membershipLevel": "Standard",
    "storageLocation": "Moorpark",
    "email": "jim@allvalleywasher.com",
    "phone": "818-464-5264",
    "streetAddress": "15008 Delano St.",
    "city": "Va",
    "state": "Nuys,",
    "zipCode": "CA",
    "storageSpots": "1",
    "showPandaDocForm": false,
    "dateCreated": "2025-06-27",
    "password": "placeholder",
    "numRows": 1,
    "manualprice": null,
    "createdAt": "2025-06-27T10:30:00Z",
    "updatedAt": "2025-06-27T10:30:00Z"
  }
]

// Create mock vehicles with comprehensive data

export const vehicles: Vehicle[] = [
  {
    id: "v1",
    customerId: "c1",
    authorizedDrivers: [
      {
        id: "ad1",
        name: "Jason Adang",
        phone: "(805) 795-6808",
        email: "jason@adangenterprises.com",
        licenseNumber: "D1234567",
        relationship: "Owner"
      }
    ],
    year: 2020,
    make: "Toyota",
    model: "Camry",
    vin: "1HGCM82633A123456",
    storageLocation: "Moorpark",
    fairMarketValue: 28500,
    insuranceRiderRequired: true,
    insuranceRiderAmount: 30000,
    licensePlate: "ABC123",
    registration: {
      number: "REG123456",
      expirationDate: "2024-12-31",
      state: "CA"
    },
    tirePressureDefault: {
      front: 32,
      rear: 30
    },
    tirePressurePreferred: {
      front: 34,
      rear: 32
    },
    maintenanceSchedule: {
      lastService: "2023-12-10",
      nextService: "2024-06-10",
      serviceInterval: 6,
      notes: "Oil change every 6 months"
    },
    authorizedContacts: [],
    odometer: 25000,
    image: "https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg",
    fuelLevel: 75,
    batteryType: "Standard",
    proofOfOwnership: "Vehicle Registration",
    color: "Silver",
    createdAt: "2023-01-15T10:35:00Z",
    updatedAt: "2023-12-10T14:35:00Z"
  },
  {
    id: "v2",
    customerId: "c2",
    authorizedDrivers: [
      {
        id: "ad2",
        name: "Chris Antonsen",
        phone: "(818) 381-7105",
        email: "antonsenchris3@gmail.com",
        licenseNumber: "NY987654",
        relationship: "Owner"
      }
    ],
    year: 2019,
    make: "Honda",
    model: "Accord",
    vin: "2HGES16564H789012",
    storageLocation: "Westlake Village",
    fairMarketValue: 24000,
    insuranceRiderRequired: false,
    licensePlate: "XYZ789",
    registration: {
      number: "REG789012",
      expirationDate: "2024-08-15",
      state: "NY"
    },
    tirePressureDefault: {
      front: 30,
      rear: 28
    },
    tirePressurePreferred: {
      front: 32,
      rear: 30
    },
    maintenanceSchedule: {
      lastService: "2023-11-05",
      nextService: "2024-05-05",
      serviceInterval: 6,
      notes: "Regular maintenance schedule"
    },
    authorizedContacts: [],
    odometer: 32000,
    image: "https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg",
    fuelLevel: 50,
    batteryType: "AGM",
    proofOfOwnership: "Vehicle Registration",
    color: "Blue",
    createdAt: "2023-02-20T14:50:00Z",
    updatedAt: "2023-11-05T09:50:00Z"
  },
  {
    id: "v3",
    customerId: "c3",
    authorizedDrivers: [
      {
        id: "ad3",
        name: "Kam Assil",
        phone: "(805) 405-2054",
        email: "kamassil@gmail.com",
        licenseNumber: "TX789012",
        relationship: "Owner"
      }
    ],
    year: 2021,
    make: "Ford",
    model: "F-150",
    vin: "1FTFW1ET4DFB12345",
    storageLocation: "Moorpark",
    fairMarketValue: 45000,
    insuranceRiderRequired: true,
    insuranceRiderAmount: 50000,
    licensePlate: "DEF456",
    registration: {
      number: "REG456789",
      expirationDate: "2024-10-20",
      state: "TX"
    },
    tirePressureDefault: {
      front: 35,
      rear: 35
    },
    tirePressurePreferred: {
      front: 38,
      rear: 38
    },
    maintenanceSchedule: {
      lastService: "2024-01-20",
      nextService: "2024-07-20",
      serviceInterval: 6,
      notes: "Heavy duty maintenance schedule"
    },
    authorizedContacts: [],
    odometer: 18000,
    image: "https://images.pexels.com/photos/1335077/pexels-photo-1335077.jpeg",
    fuelLevel: 90,
    batteryType: "Standard",
    proofOfOwnership: "Vehicle Registration",
    color: "Black",
    createdAt: "2023-03-10T09:20:00Z",
    updatedAt: "2024-01-20T13:20:00Z"
  },
  {
    id: "v4",
    customerId: "c4",
    authorizedDrivers: [
      {
        id: "ad4",
        name: "Dylan Boztepe",
        phone: "(805) 555-0123",
        email: "dylanboztepe@gmail.com",
        licenseNumber: "FL345678",
        relationship: "Owner"
      }
    ],
    year: 2018,
    make: "Chevrolet",
    model: "Equinox",
    vin: "3GNFK16338G345678",
    storageLocation: "Moorpark",
    fairMarketValue: 18500,
    insuranceRiderRequired: false,
    licensePlate: "GHI789",
    registration: {
      number: "REG345678",
      expirationDate: "2024-06-30",
      state: "FL"
    },
    tirePressureDefault: {
      front: 30,
      rear: 30
    },
    tirePressurePreferred: {
      front: 32,
      rear: 32
    },
    maintenanceSchedule: {
      lastService: "2023-10-15",
      nextService: "2024-04-15",
      serviceInterval: 6,
      notes: "Standard maintenance"
    },
    authorizedContacts: [],
    odometer: 45000,
    fuelLevel: 25,
    batteryType: "Standard",
    proofOfOwnership: "Vehicle Registration",
    color: "Red",
    createdAt: "2023-04-05T16:25:00Z",
    updatedAt: "2023-10-15T10:35:00Z"
  },
  {
    id: "v5",
    customerId: "c5",
    authorizedDrivers: [
      {
        id: "ad5",
        name: "Jeffrey Brodsly",
        phone: "(805) 555-0456",
        email: "jeffrey.brodsly@email.com",
        licenseNumber: "CA567890",
        relationship: "Owner"
      }
    ],
    year: 2022,
    make: "Nissan",
    model: "Altima",
    vin: "1N4AL3AP3DC567890",
    storageLocation: "Moorpark",
    fairMarketValue: 32000,
    insuranceRiderRequired: true,
    insuranceRiderAmount: 35000,
    licensePlate: "JKL012",
    registration: {
      number: "REG567890",
      expirationDate: "2025-02-28",
      state: "CA"
    },
    tirePressureDefault: {
      front: 32,
      rear: 30
    },
    tirePressurePreferred: {
      front: 34,
      rear: 32
    },
    maintenanceSchedule: {
      lastService: "2024-02-08",
      nextService: "2024-08-08",
      serviceInterval: 6,
      notes: "New vehicle maintenance schedule"
    },
    authorizedContacts: [
      {
        id: "ac1",
        name: "Emergency Contact",
        phone: "(555) 777-8888",
        email: "emergency@example.com",
        relationship: "Emergency",
        canDropoff: false,
        canPickup: true
      }
    ],
    odometer: 8000,
    image: "https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg",
    fuelLevel: 85,
    batteryType: "Lithium",
    proofOfOwnership: "Vehicle Registration",
    color: "White",
    createdAt: "2023-06-18T12:40:00Z",
    updatedAt: "2024-02-08T15:50:00Z"
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