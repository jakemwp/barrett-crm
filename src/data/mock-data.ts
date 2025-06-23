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

// Create customers from CSV data
export const customers: Customer[] = [
  {
    id: 'c1',
    firstName: 'Jason',
    lastName: 'Adang',
    type: 'Individual',
    membershipLevel: 'Basic',
    storageLocation: 'Moorpark',
    email: 'jason@adangenterprises.com',
    phone: '(805) 795-6808',
    streetAddress: '821 Calle Pecos',
    city: 'Thousand Oaks',
    state: 'CA',
    zipCode: '91360',
    storageSpots: 2,
    showPandaDocForm: false,
    dateCreated: '2023-01-15',
    password: 'jason123',
    numRows: 1,
    manualPrice: 150.00,
    createdAt: '2023-01-15T10:30:00Z',
    updatedAt: '2023-01-15T10:30:00Z',
  },
  {
    id: 'c2',
    firstName: 'Jim',
    lastName: 'All Valley Washer Service',
    type: 'Business',
    membershipLevel: 'Basic',
    storageLocation: 'Moorpark',
    email: 'jim@allvalleywasher.com',
    phone: '818-464-5264',
    streetAddress: '15008 Delano St.',
    city: 'Van Nuys',
    state: 'CA',
    zipCode: '91411',
    storageSpots: 1,
    showPandaDocForm: false,
    dateCreated: '2023-02-20',
    password: 'jim123',
    numRows: 1,
    manualPrice: 75.00,
    createdAt: '2023-02-20T14:45:00Z',
    updatedAt: '2023-02-20T14:45:00Z',
  },
  {
    id: 'c3',
    firstName: 'Chris',
    lastName: 'Antonsen',
    type: 'Individual',
    membershipLevel: 'Basic',
    storageLocation: 'Moorpark',
    email: 'antonsenchris3@gmail.com',
    phone: '(818) 381-7105',
    streetAddress: '4565 Wolsey Court',
    city: 'Westlake Village',
    state: 'CA',
    zipCode: '91361',
    storageSpots: 1,
    showPandaDocForm: false,
    dateCreated: '2023-03-10',
    password: 'chris123',
    numRows: 1,
    manualPrice: 75.00,
    createdAt: '2023-03-10T09:15:00Z',
    updatedAt: '2023-03-10T09:15:00Z',
  },
  {
    id: 'c4',
    firstName: 'Kam',
    lastName: 'Assil',
    type: 'Individual',
    membershipLevel: 'Basic',
    storageLocation: 'Westlake Village',
    email: 'kamassil@gmail.com',
    phone: '(805) 405-2054',
    streetAddress: '5124 Oxley Place',
    city: 'Westlake Village',
    state: 'CA',
    zipCode: '91362',
    storageSpots: 1,
    showPandaDocForm: false,
    dateCreated: '2023-04-05',
    password: 'kam123',
    numRows: 1,
    manualPrice: 75.00,
    createdAt: '2023-04-05T16:20:00Z',
    updatedAt: '2023-04-05T16:20:00Z',
  },
  {
    id: 'c5',
    firstName: 'Barrett',
    lastName: 'Whips',
    type: 'Business',
    membershipLevel: 'Enterprise',
    storageLocation: 'Westlake Village',
    email: 'lindsay@barrettassociatesllc.com',
    phone: '805-559-1028',
    streetAddress: '868 Patriot Drive Unit A',
    city: 'Moorpark',
    state: 'CA',
    zipCode: '93021',
    storageSpots: 10,
    showPandaDocForm: true,
    dateCreated: '2023-05-12',
    password: 'barrett123',
    numRows: 5,
    manualPrice: 750.00,
    createdAt: '2023-05-12T11:10:00Z',
    updatedAt: '2023-05-12T11:10:00Z',
  },
  {
    id: 'c6',
    firstName: 'Dylan',
    lastName: 'Boztepe',
    type: 'Individual',
    membershipLevel: 'Basic',
    storageLocation: 'Moorpark',
    email: 'dylanboztepe1@gmail.com',
    phone: '(310) 488-9198',
    streetAddress: '621 Rushing Creek Pl',
    city: 'Thousand Oaks',
    state: 'CA',
    zipCode: '91360',
    storageSpots: 1,
    showPandaDocForm: false,
    dateCreated: '2023-06-18',
    password: 'dylan123',
    numRows: 1,
    manualPrice: 75.00,
    createdAt: '2023-06-18T13:25:00Z',
    updatedAt: '2023-06-18T13:25:00Z',
  },
  {
    id: 'c7',
    firstName: 'Jeffrey',
    lastName: 'Brodsly',
    type: 'Individual',
    membershipLevel: 'Basic',
    storageLocation: 'Moorpark',
    email: 'jeff@100group.com',
    phone: '(805) 807-0195',
    streetAddress: '4263 Tierra Rejada Rd #213',
    city: 'Moorpark',
    state: 'CA',
    zipCode: '93021',
    storageSpots: 1,
    showPandaDocForm: false,
    dateCreated: '2023-07-22',
    password: 'jeffrey123',
    numRows: 1,
    manualPrice: 75.00,
    createdAt: '2023-07-22T15:40:00Z',
    updatedAt: '2023-07-22T15:40:00Z',
  },
  {
    id: 'c8',
    firstName: 'Jenson',
    lastName: 'Button',
    type: 'Individual',
    membershipLevel: 'Premium',
    storageLocation: 'Westlake Village',
    email: 'jenson@radford.co',
    phone: '(310) 854-9699',
    streetAddress: '2969 Calbourne Lane',
    city: 'Thousand Oaks',
    state: 'CA',
    zipCode: '91361',
    storageSpots: 1,
    showPandaDocForm: true,
    dateCreated: '2023-08-14',
    password: 'jenson123',
    numRows: 1,
    manualPrice: 150.00,
    createdAt: '2023-08-14T09:55:00Z',
    updatedAt: '2023-08-14T09:55:00Z',
  },
  {
    id: 'c9',
    firstName: 'Jeff',
    lastName: 'C&H Construction',
    type: 'Business',
    membershipLevel: 'Basic',
    storageLocation: 'Moorpark',
    email: 'jeff@candhconstruction.net',
    phone: '(805) 495-0679',
    streetAddress: '3315 Grande Vista Drive',
    city: 'Newbury Park',
    state: 'CA',
    zipCode: '91320',
    storageSpots: 2,
    showPandaDocForm: false,
    dateCreated: '2023-09-05',
    password: 'jeff123',
    numRows: 1,
    manualPrice: 150.00,
    createdAt: '2023-09-05T12:30:00Z',
    updatedAt: '2023-09-05T12:30:00Z',
  },
  {
    id: 'c10',
    firstName: 'Daniel',
    lastName: 'Casson',
    type: 'Individual',
    membershipLevel: 'Basic',
    storageLocation: 'Moorpark',
    email: 'dano4643@gmail.com',
    phone: '805-207-6832',
    streetAddress: '11546 Willowood Ct',
    city: 'Moorpark',
    state: 'CA',
    zipCode: '93021',
    storageSpots: 1,
    showPandaDocForm: false,
    dateCreated: '2023-10-12',
    password: 'daniel123',
    numRows: 1,
    manualPrice: 75.00,
    createdAt: '2023-10-12T14:15:00Z',
    updatedAt: '2023-10-12T14:15:00Z',
  },
  {
    id: 'c11',
    firstName: 'Richard',
    lastName: 'Cobey',
    type: 'Individual',
    membershipLevel: 'Basic',
    storageLocation: 'Moorpark',
    email: 'musicrc@gmail.com',
    phone: '(818) 307-6515',
    streetAddress: '5739 Indian Point Drive',
    city: 'Simi Valley',
    state: 'CA',
    zipCode: '93063',
    storageSpots: 1,
    showPandaDocForm: false,
    dateCreated: '2023-11-08',
    password: 'richard123',
    numRows: 1,
    manualPrice: 75.00,
    createdAt: '2023-11-08T16:45:00Z',
    updatedAt: '2023-11-08T16:45:00Z',
  },
  {
    id: 'c12',
    firstName: 'Assaf',
    lastName: 'Cohen',
    type: 'Individual',
    membershipLevel: 'Premium',
    storageLocation: 'Moorpark',
    email: 'lp2mnp@gmail.com',
    phone: '(818) 825-3764',
    streetAddress: '5724 Tenneyson Drive',
    city: 'Agoura Hills',
    state: 'CA',
    zipCode: '91301',
    storageSpots: 3,
    showPandaDocForm: true,
    dateCreated: '2023-12-03',
    password: 'assaf123',
    numRows: 2,
    manualPrice: 450.00,
    createdAt: '2023-12-03T11:20:00Z',
    updatedAt: '2023-12-03T11:20:00Z',
  },
  {
    id: 'c13',
    firstName: 'Rory',
    lastName: 'Cypers',
    type: 'Individual',
    membershipLevel: 'Basic',
    storageLocation: 'Westlake Village',
    email: 'rorycypers@yahoo.com',
    phone: '310-463-5620',
    streetAddress: '3816 Bowsprit Circle',
    city: 'Westlake Village',
    state: 'CA',
    zipCode: '91361',
    storageSpots: 1,
    showPandaDocForm: false,
    dateCreated: '2024-01-15',
    password: 'rory123',
    numRows: 1,
    manualPrice: 75.00,
    createdAt: '2024-01-15T09:30:00Z',
    updatedAt: '2024-01-15T09:30:00Z',
  },
  {
    id: 'c14',
    firstName: 'Joe',
    lastName: 'DHK Plumbing',
    type: 'Business',
    membershipLevel: 'Basic',
    storageLocation: 'Moorpark',
    email: 'Joe@dhkplumbing.com',
    phone: '562-762-6176',
    streetAddress: '2105 West San Bernardino Road',
    city: 'West Covina',
    state: 'CA',
    zipCode: '91790',
    storageSpots: 2,
    showPandaDocForm: false,
    dateCreated: '2024-02-10',
    password: 'joe123',
    numRows: 1,
    manualPrice: 150.00,
    createdAt: '2024-02-10T13:45:00Z',
    updatedAt: '2024-02-10T13:45:00Z',
  },
  {
    id: 'c15',
    firstName: 'David',
    lastName: 'Einstein',
    type: 'Individual',
    membershipLevel: 'Basic',
    storageLocation: 'Moorpark',
    email: 'deinstein@skyreachsystems.com',
    phone: '310-717-7087',
    streetAddress: '3925 Hitch Blvd.',
    city: 'Moorpark',
    state: 'CA',
    zipCode: '93021',
    storageSpots: 1,
    showPandaDocForm: false,
    dateCreated: '2024-03-05',
    password: 'david123',
    numRows: 1,
    manualPrice: 75.00,
    createdAt: '2024-03-05T10:15:00Z',
    updatedAt: '2024-03-05T10:15:00Z',
  }
];

// Create mock vehicles with comprehensive data
export const vehicles: Vehicle[] = [
  {
    id: 'v1',
    customerId: 'c1',
    authorizedDrivers: [
      {
        id: 'ad1',
        name: 'Jason Adang',
        phone: '(805) 795-6808',
        email: 'jason@adangenterprises.com',
        licenseNumber: 'D1234567',
        relationship: 'Owner'
      }
    ],
    year: 2020,
    make: 'Toyota',
    model: 'Camry',
    vin: '1HGCM82633A123456',
    storageLocation: 'Moorpark',
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
    authorizedContacts: [],
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
        id: 'ad2',
        name: 'Jim All Valley',
        phone: '818-464-5264',
        email: 'jim@allvalleywasher.com',
        licenseNumber: 'NY987654',
        relationship: 'Owner'
      }
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
      number: 'REG789012',
      expirationDate: '2024-08-15',
      state: 'CA'
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
    authorizedContacts: [],
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
        id: 'ad3',
        name: 'Chris Antonsen',
        phone: '(818) 381-7105',
        email: 'antonsenchris3@gmail.com',
        licenseNumber: 'CA456789',
        relationship: 'Owner'
      }
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
      number: 'REG345678',
      expirationDate: '2024-06-30',
      state: 'CA'
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
    id: 'v4',
    customerId: 'c8',
    authorizedDrivers: [
      {
        id: 'ad4',
        name: 'Jenson Button',
        phone: '(310) 854-9699',
        email: 'jenson@radford.co',
        licenseNumber: 'D1234567',
        relationship: 'Owner'
      }
    ],
    year: 2022,
    make: 'Nissan',
    model: 'Altima',
    vin: '1N4AL3AP3DC567890',
    storageLocation: 'Westlake Village',
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
    authorizedContacts: [],
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
    vehicleId: 'v2',
    customerId: 'c2',
    date: '2024-03-17',
    type: CheckType.CHECK_IN,
    location: 'Westlake Village',
    contact: 'Jim All Valley',
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