import { 
  Customer, 
  Vehicle, 
  CheckInOut, 
  CheckStatus, 
  CheckType,
  ServiceItem,
  Appointment,
  AuthorizedDriver,
  AuthorizedContact,
  TirePressureReading,
  VehicleInspectionPhotos,
  User
} from '../types';
import { generateId } from '../lib/utils';

// Create mock users
export const users: User[] = [
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

// Current user session (in a real app, this would come from authentication)
export const currentUser: User = users[0]; // Admin user

// Create mock customers with extended data
export const customers: Customer[] = [
  {
    id: 'c1',
    firstName: 'John',
    lastName: 'Doe',
    type: 'Individual',
    membershipLevel: 'Premium',
    storageLocation: 'Building A - Section 1',
    email: 'john.doe@example.com',
    phone: '(555) 123-4567',
    streetAddress: '123 Main St',
    city: 'Anytown',
    state: 'CA',
    zipCode: '90210',
    storageSpots: 2,
    showPandaDocForm: true,
    dateCreated: '2023-01-15',
    password: 'temp123',
    magicLink: 'https://app.example.com/auth/magic/abc123',
    numRows: 1,
    manualPrice: 150.00,
    createdAt: '2023-01-15T10:30:00Z',
    updatedAt: '2023-01-15T10:30:00Z',
  },
  {
    id: 'c2',
    firstName: 'Jane',
    lastName: 'Smith',
    type: 'Business',
    membershipLevel: 'VIP',
    storageLocation: 'Building B - Section 3',
    email: 'jane.smith@example.com',
    phone: '(555) 987-6543',
    streetAddress: '456 Oak Ave',
    city: 'Somewhere',
    state: 'NY',
    zipCode: '10001',
    storageSpots: 4,
    showPandaDocForm: false,
    dateCreated: '2023-02-20',
    password: 'secure456',
    magicLink: 'https://app.example.com/auth/magic/def456',
    numRows: 2,
    manualPrice: 300.00,
    createdAt: '2023-02-20T14:45:00Z',
    updatedAt: '2023-02-20T14:45:00Z',
  },
  {
    id: 'c3',
    firstName: 'Robert',
    lastName: 'Johnson',
    type: 'Corporate',
    membershipLevel: 'Enterprise',
    storageLocation: 'Building C - Section 2',
    email: 'robert.j@example.com',
    phone: '(555) 789-0123',
    streetAddress: '789 Pine Rd',
    city: 'Elsewhere',
    state: 'TX',
    zipCode: '75001',
    storageSpots: 8,
    showPandaDocForm: true,
    dateCreated: '2023-03-10',
    password: 'corp789',
    numRows: 4,
    manualPrice: 600.00,
    createdAt: '2023-03-10T09:15:00Z',
    updatedAt: '2023-03-10T09:15:00Z',
  },
  {
    id: 'c4',
    firstName: 'Sarah',
    lastName: 'Williams',
    type: 'Individual',
    membershipLevel: 'Basic',
    storageLocation: 'Building A - Section 4',
    email: 'sarah.w@example.com',
    phone: '(555) 456-7890',
    streetAddress: '321 Maple Dr',
    city: 'Nowhere',
    state: 'FL',
    zipCode: '33101',
    storageSpots: 1,
    showPandaDocForm: false,
    dateCreated: '2023-04-05',
    password: 'basic321',
    magicLink: 'https://app.example.com/auth/magic/ghi789',
    numRows: 1,
    manualPrice: 75.00,
    createdAt: '2023-04-05T16:20:00Z',
    updatedAt: '2023-04-05T16:20:00Z',
  },
  {
    id: 'c5',
    firstName: 'Michael',
    lastName: 'Brown',
    type: 'Business',
    membershipLevel: 'Premium',
    storageLocation: 'Building B - Section 1',
    email: 'michael.b@example.com',
    phone: '(555) 234-5678',
    streetAddress: '654 Cedar Ln',
    city: 'Someplace',
    state: 'IL',
    zipCode: '60007',
    storageSpots: 3,
    showPandaDocForm: true,
    dateCreated: '2023-05-12',
    password: 'business654',
    numRows: 2,
    manualPrice: 225.00,
    createdAt: '2023-05-12T11:10:00Z',
    updatedAt: '2023-05-12T11:10:00Z',
  },
  {
    id: 'c6',
    firstName: 'Emily',
    lastName: 'Davis',
    type: 'Individual',
    membershipLevel: 'VIP',
    storageLocation: 'Building A - Section 2',
    email: 'emily.davis@example.com',
    phone: '(555) 345-6789',
    streetAddress: '987 Birch St',
    city: 'Hometown',
    state: 'WA',
    zipCode: '98001',
    storageSpots: 2,
    showPandaDocForm: true,
    dateCreated: '2023-06-18',
    password: 'vip987',
    magicLink: 'https://app.example.com/auth/magic/jkl012',
    numRows: 1,
    manualPrice: 200.00,
    createdAt: '2023-06-18T13:25:00Z',
    updatedAt: '2023-06-18T13:25:00Z',
  },
  {
    id: 'c7',
    firstName: 'David',
    lastName: 'Wilson',
    type: 'Corporate',
    membershipLevel: 'Enterprise',
    storageLocation: 'Building C - Section 1',
    email: 'david.wilson@corp.com',
    phone: '(555) 567-8901',
    streetAddress: '246 Elm Ave',
    city: 'Metropolis',
    state: 'OH',
    zipCode: '44101',
    storageSpots: 12,
    showPandaDocForm: false,
    dateCreated: '2023-07-22',
    password: 'enterprise246',
    numRows: 6,
    manualPrice: 900.00,
    createdAt: '2023-07-22T15:40:00Z',
    updatedAt: '2023-07-22T15:40:00Z',
  },
  {
    id: 'c8',
    firstName: 'Lisa',
    lastName: 'Anderson',
    type: 'Individual',
    membershipLevel: 'Basic',
    storageLocation: 'Building A - Section 3',
    email: 'lisa.anderson@example.com',
    phone: '(555) 678-9012',
    streetAddress: '135 Spruce Rd',
    city: 'Smalltown',
    state: 'MI',
    zipCode: '48001',
    storageSpots: 1,
    showPandaDocForm: true,
    dateCreated: '2023-08-14',
    password: 'basic135',
    magicLink: 'https://app.example.com/auth/magic/mno345',
    numRows: 1,
    createdAt: '2023-08-14T09:55:00Z',
    updatedAt: '2023-08-14T09:55:00Z',
  },
];

// Create mock vehicles with comprehensive data
export const vehicles: Vehicle[] = [
  {
    id: 'v1',
    customerId: 'c1',
    authorizedDrivers: [
      {
        id: 'ad1',
        name: 'John Doe',
        phone: '(555) 123-4567',
        email: 'john.doe@example.com',
        licenseNumber: 'D1234567',
        relationship: 'Owner'
      },
      {
        id: 'ad2',
        name: 'Jane Doe',
        phone: '(555) 123-4568',
        email: 'jane.doe@example.com',
        licenseNumber: 'D7654321',
        relationship: 'Spouse'
      }
    ],
    year: 2020,
    make: 'Toyota',
    model: 'Camry',
    vin: '1HGCM82633A123456',
    storageLocation: 'Building A - Section 1 - Spot 12',
    fairMarketValue: 28500,
    insuranceRiderRequired: true,
    insuranceRiderAmount: 30000,
    licensePlate: 'ABC123',
    registration: {
      number: 'REG123456',
      expirationDate: '2024-12-31',
      state: 'CA'
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
      lastService: '2023-12-10',
      nextService: '2024-06-10',
      serviceInterval: 6,
      notes: 'Oil change every 6 months'
    },
    authorizedContacts: [
      {
        id: 'ac1',
        name: 'Mike Johnson',
        phone: '(555) 111-2222',
        email: 'mike.j@example.com',
        relationship: 'Friend',
        canDropoff: true,
        canPickup: false
      }
    ],
    odometer: 25000,
    image: 'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg',
    fuelLevel: 75,
    batteryType: 'Standard',
    color: 'Silver',
    createdAt: '2023-01-15T10:35:00Z',
    updatedAt: '2023-12-10T14:35:00Z',
  },
  {
    id: 'v2',
    customerId: 'c2',
    authorizedDrivers: [
      {
        id: 'ad3',
        name: 'Jane Smith',
        phone: '(555) 987-6543',
        email: 'jane.smith@example.com',
        licenseNumber: 'NY987654',
        relationship: 'Owner'
      }
    ],
    year: 2019,
    make: 'Honda',
    model: 'Accord',
    vin: '2HGES16564H789012',
    storageLocation: 'Building B - Section 3 - Spot 8',
    fairMarketValue: 24000,
    insuranceRiderRequired: false,
    licensePlate: 'XYZ789',
    registration: {
      number: 'REG789012',
      expirationDate: '2024-08-15',
      state: 'NY'
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
      lastService: '2023-11-05',
      nextService: '2024-05-05',
      serviceInterval: 6,
      notes: 'Regular maintenance schedule'
    },
    authorizedContacts: [
      {
        id: 'ac2',
        name: 'Bob Smith',
        phone: '(555) 333-4444',
        email: 'bob.smith@example.com',
        relationship: 'Brother',
        canDropoff: true,
        canPickup: true
      }
    ],
    odometer: 32000,
    image: 'https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg',
    fuelLevel: 50,
    batteryType: 'AGM',
    color: 'Blue',
    createdAt: '2023-02-20T14:50:00Z',
    updatedAt: '2023-11-05T09:50:00Z',
  },
  {
    id: 'v3',
    customerId: 'c3',
    authorizedDrivers: [
      {
        id: 'ad4',
        name: 'Robert Johnson',
        phone: '(555) 789-0123',
        email: 'robert.j@example.com',
        licenseNumber: 'TX789012',
        relationship: 'Owner'
      },
      {
        id: 'ad5',
        name: 'Corporate Driver 1',
        phone: '(555) 789-0124',
        email: 'driver1@corp.com',
        licenseNumber: 'TX789013',
        relationship: 'Employee'
      }
    ],
    year: 2021,
    make: 'Ford',
    model: 'F-150',
    vin: '1FTFW1ET4DFB12345',
    storageLocation: 'Building C - Section 2 - Spot 15',
    fairMarketValue: 45000,
    insuranceRiderRequired: true,
    insuranceRiderAmount: 50000,
    licensePlate: 'DEF456',
    registration: {
      number: 'REG456789',
      expirationDate: '2024-10-20',
      state: 'TX'
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
      lastService: '2024-01-20',
      nextService: '2024-07-20',
      serviceInterval: 6,
      notes: 'Heavy duty maintenance schedule'
    },
    authorizedContacts: [
      {
        id: 'ac3',
        name: 'Fleet Manager',
        phone: '(555) 555-6666',
        email: 'fleet@corp.com',
        relationship: 'Fleet Manager',
        canDropoff: true,
        canPickup: true
      }
    ],
    odometer: 18000,
    image: 'https://images.pexels.com/photos/1335077/pexels-photo-1335077.jpeg',
    fuelLevel: 90,
    batteryType: 'Standard',
    color: 'Black',
    createdAt: '2023-03-10T09:20:00Z',
    updatedAt: '2024-01-20T13:20:00Z',
  },
  {
    id: 'v4',
    customerId: 'c4',
    authorizedDrivers: [
      {
        id: 'ad6',
        name: 'Sarah Williams',
        phone: '(555) 456-7890',
        email: 'sarah.w@example.com',
        licenseNumber: 'FL456789',
        relationship: 'Owner'
      }
    ],
    year: 2018,
    make: 'Chevrolet',
    model: 'Equinox',
    vin: '3GNFK16338G345678',
    storageLocation: 'Building A - Section 4 - Spot 3',
    fairMarketValue: 18500,
    insuranceRiderRequired: false,
    licensePlate: 'GHI789',
    registration: {
      number: 'REG345678',
      expirationDate: '2024-06-30',
      state: 'FL'
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
      lastService: '2023-10-15',
      nextService: '2024-04-15',
      serviceInterval: 6,
      notes: 'Standard maintenance'
    },
    authorizedContacts: [],
    odometer: 45000,
    fuelLevel: 25,
    batteryType: 'Standard',
    color: 'Red',
    createdAt: '2023-04-05T16:25:00Z',
    updatedAt: '2023-10-15T10:35:00Z',
  },
  {
    id: 'v5',
    customerId: 'c1',
    authorizedDrivers: [
      {
        id: 'ad7',
        name: 'John Doe',
        phone: '(555) 123-4567',
        email: 'john.doe@example.com',
        licenseNumber: 'D1234567',
        relationship: 'Owner'
      }
    ],
    year: 2022,
    make: 'Nissan',
    model: 'Altima',
    vin: '1N4AL3AP3DC567890',
    storageLocation: 'Building A - Section 1 - Spot 13',
    fairMarketValue: 32000,
    insuranceRiderRequired: true,
    insuranceRiderAmount: 35000,
    licensePlate: 'JKL012',
    registration: {
      number: 'REG567890',
      expirationDate: '2025-02-28',
      state: 'CA'
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
      lastService: '2024-02-08',
      nextService: '2024-08-08',
      serviceInterval: 6,
      notes: 'New vehicle maintenance schedule'
    },
    authorizedContacts: [
      {
        id: 'ac4',
        name: 'Emergency Contact',
        phone: '(555) 777-8888',
        email: 'emergency@example.com',
        relationship: 'Emergency',
        canDropoff: false,
        canPickup: true
      }
    ],
    odometer: 8000,
    image: 'https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg',
    fuelLevel: 85,
    batteryType: 'Lithium',
    color: 'White',
    createdAt: '2023-06-18T12:40:00Z',
    updatedAt: '2024-02-08T15:50:00Z',
  },
];

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
    location: 'Building A - Section 1',
    contact: 'John Doe',
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
    vehicleId: 'v2',
    customerId: 'c2',
    date: '2024-03-17',
    type: CheckType.CHECK_IN,
    location: 'Building B - Section 3',
    contact: 'Jane Smith',
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
    vehicleId: 'v3',
    customerId: 'c3',
    date: '2024-03-16',
    type: CheckType.CHECK_OUT,
    location: 'Building C - Section 2',
    contact: 'Robert Johnson',
    status: CheckStatus.CHECKED_OUT,
    checkInDate: '2024-03-16T12:00:00Z',
    checkOutDate: '2024-03-16T13:30:00Z',
    fuelLevel: 90,
    mileage: 18000,
    tirePressure: {
      passengerFront: 38,
      passengerRear: 38,
      driverFront: 38,
      driverRear: 38
    },
    carCover: true,
    killSwitch: false,
    deliveryAddress: '789 Pine Rd, Elsewhere, TX 75001',
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

// Create mock appointments
export const appointments: Appointment[] = [
  {
    id: 'a1',
    customerId: 'c4',
    vehicleId: 'v4',
    date: '2024-03-25',
    time: '10:00',
    duration: 60,
    reason: 'Oil change and tire rotation',
    status: 'SCHEDULED',
    createdAt: '2024-03-18T09:00:00Z',
    updatedAt: '2024-03-18T09:00:00Z',
  },
  {
    id: 'a2',
    customerId: 'c5',
    date: '2024-03-23',
    time: '14:30',
    duration: 90,
    reason: 'Engine check - vehicle making unusual noise',
    status: 'SCHEDULED',
    notes: 'Customer will bring in 2018 BMW 3 Series',
    createdAt: '2024-03-17T16:45:00Z',
    updatedAt: '2024-03-17T16:45:00Z',
  },
  {
    id: 'a3',
    customerId: 'c1',
    vehicleId: 'v5',
    date: '2024-03-20',
    time: '09:15',
    duration: 45,
    reason: 'Inspection before road trip',
    status: 'COMPLETED',
    notes: 'Everything checked out fine',
    createdAt: '2024-03-15T10:20:00Z',
    updatedAt: '2024-03-20T10:05:00Z',
  },
];

export function getUserById(id: string): User | undefined {
  return users.find(user => user.id === id);
}

export function updateUser(id: string, updates: Partial<User>): User | undefined {
  const userIndex = users.findIndex(user => user.id === id);
  if (userIndex === -1) return undefined;
  
  const updatedUser = {
    ...users[userIndex],
    ...updates,
    updatedAt: new Date().toISOString(),
  };
  
  users[userIndex] = updatedUser;
  return updatedUser;
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

export function addAppointment(appointmentData: Omit<Appointment, 'id' | 'createdAt' | 'updatedAt'>): Appointment {
  const now = new Date().toISOString();
  const newAppointment: Appointment = {
    id: generateId(),
    ...appointmentData,
    createdAt: now,
    updatedAt: now,
  };
  
  appointments.push(newAppointment);
  return newAppointment;
}