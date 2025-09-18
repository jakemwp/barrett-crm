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


const defaultCustomers: Customer[] =[
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
  }
]



const defaultVehicles: Vehicle[] =[
     {
    "id": "2",
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
    "id": "3",
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
    ],
  },
];

const defaultCustomers: Customer[] = [
  {
    id: '1',
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
    storageSpots: 1,
    showPandaDocForm: true,
    dateCreated: '2023-01-15',
    password: 'jasonadang123',
    numRows: 1,
    manualPrice: 150,
    createdAt: '2023-01-15T10:35:00Z',
    updatedAt: '2023-12-10T14:35:00Z',
  },
  {
    id: '2',
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
    zipCode: '91361',
    storageSpots: 2,
    showPandaDocForm: false,
    dateCreated: '2023-02-20',
    password: 'chrisantonsen123',
    numRows: 1,
    manualPrice: 300,
    createdAt: '2023-02-20T14:50:00Z',
    updatedAt: '2023-11-05T09:50:00Z',
  },
  {
    id: '3',
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
    manualPrice: 450,
    createdAt: '2023-03-10T09:20:00Z',
    updatedAt: '2024-01-20T13:20:00Z',
  },
  {
    id: '4',
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
    id: '5',
    firstName: 'Jeffrey',
    lastName: 'Brodsly',
    type: 'Individual',
    membershipLevel: 'Premium',
    storageLocation: 'Moorpark',
    email: 'jeffreybrodsly@gmail.com',
    phone: '(805) 555-0456',
    streetAddress: '321 Elm Drive',
    city: 'Moorpark',
    state: 'CA',
    zipCode: '93021',
    storageSpots: 1,
    showPandaDocForm: true,
    dateCreated: '2023-06-18',
    password: 'jeffreybrodsly123',
    numRows: 1,
    manualPrice: 150,
    createdAt: '2023-06-18T12:40:00Z',
    updatedAt: '2024-02-08T15:50:00Z',
  },
  {
    id: '6',
    firstName: 'Aram',
    lastName: 'Aghazarian',
    type: 'Individual',
    membershipLevel: 'Premium',
    storageLocation: 'Moorpark',
    email: 'aram@aghazarian.com',
    phone: '(818) 555-0789',
    streetAddress: '654 Cedar Lane',
    city: 'Moorpark',
    state: 'CA',
    zipCode: '93021',
    storageSpots: 1,
    showPandaDocForm: false,
    dateCreated: '2023-05-12',
    password: 'aramaghazarian123',
    numRows: 1,
    manualPrice: 150,
    createdAt: '2023-05-12T11:15:00Z',
    updatedAt: '2023-09-22T16:20:00Z',
  },
  {
    id: '7',
    firstName: 'Armen',
    lastName: 'Aghazarian',
    type: 'Individual',
    membershipLevel: 'VIP',
    storageLocation: 'Westlake Village',
    email: 'armen@aghazarian.com',
    phone: '(818) 555-0987',
    streetAddress: '987 Maple Court',
    city: 'Westlake Village',
    state: 'CA',
    zipCode: '91361',
    storageSpots: 2,
    showPandaDocForm: true,
    dateCreated: '2023-05-12',
    password: 'armenaghazarian123',
    numRows: 1,
    manualPrice: 400,
    createdAt: '2023-05-12T11:15:00Z',
    updatedAt: '2023-11-18T14:30:00Z',
  },
  {
    id: '8',
    firstName: 'Armen',
    lastName: 'Aghazarian',
    type: 'Individual',
    membershipLevel: 'VIP',
    storageLocation: 'Westlake Village',
    email: 'armen2@aghazarian.com',
    phone: '(818) 555-0988',
    streetAddress: '988 Birch Street',
    city: 'Westlake Village',
    state: 'CA',
    zipCode: '91361',
    storageSpots: 1,
    showPandaDocForm: false,
    dateCreated: '2023-05-15',
    password: 'armenaghazarian2123',
    numRows: 1,
    manualPrice: 200,
    createdAt: '2023-05-15T13:25:00Z',
    updatedAt: '2023-10-08T17:45:00Z',
  },
  {
    id: '9',
    firstName: 'Armen',
    lastName: 'Aghazarian',
    type: 'Individual',
    membershipLevel: 'Enterprise',
    storageLocation: 'Moorpark',
    email: 'armen3@aghazarian.com',
    phone: '(818) 555-0989',
    streetAddress: '989 Willow Drive',
    city: 'Moorpark',
    state: 'CA',
    zipCode: '93021',
    storageSpots: 3,
    showPandaDocForm: true,
    dateCreated: '2023-05-18',
    password: 'armenaghazarian3123',
    numRows: 2,
    manualPrice: 600,
    createdAt: '2023-05-18T15:40:00Z',
    updatedAt: '2024-01-12T12:10:00Z',
  },
  {
    id: '10',
    firstName: 'Armen',
    lastName: 'Aghazarian',
    type: 'Business',
    membershipLevel: 'Enterprise',
    storageLocation: 'Westlake Village',
    email: 'armen4@aghazarian.com',
    phone: '(818) 555-0990',
    streetAddress: '990 Sycamore Avenue',
    city: 'Westlake Village',
    state: 'CA',
    zipCode: '91361',
    storageSpots: 4,
    showPandaDocForm: false,
    dateCreated: '2023-05-20',
    password: 'armenaghazarian4123',
    numRows: 2,
    manualPrice: 800,
    createdAt: '2023-05-20T10:55:00Z',
    updatedAt: '2023-12-03T08:25:00Z',
  },
  {
    id: '11',
    firstName: 'Armen',
    lastName: 'Aghazarian',
    type: 'Individual',
    membershipLevel: 'Premium',
    storageLocation: 'Moorpark',
    email: 'armen5@aghazarian.com',
    phone: '(818) 555-0991',
    streetAddress: '991 Redwood Lane',
    city: 'Moorpark',
    state: 'CA',
    zipCode: '93021',
    storageSpots: 1,
    showPandaDocForm: true,
    dateCreated: '2023-05-22',
    password: 'armenaghazarian5123',
    numRows: 1,
    manualPrice: 150,
    createdAt: '2023-05-22T14:10:00Z',
    updatedAt: '2023-08-30T11:40:00Z',
  },
  {
    id: '12',
    firstName: 'Armen',
    lastName: 'Aghazarian',
    type: 'Individual',
    membershipLevel: 'VIP',
    storageLocation: 'Westlake Village',
    email: 'armen6@aghazarian.com',
    phone: '(818) 555-0992',
    streetAddress: '992 Aspen Way',
    city: 'Westlake Village',
    state: 'CA',
    zipCode: '91361',
    storageSpots: 2,
    showPandaDocForm: false,
    dateCreated: '2023-05-25',
    password: 'armenaghazarian6123',
    numRows: 1,
    manualPrice: 400,
    createdAt: '2023-05-25T09:30:00Z',
    updatedAt: '2023-12-15T16:55:00Z',
  },
  {
    id: '13',
    firstName: 'Armen',
    lastName: 'Aghazarian',
    type: 'Business',
    membershipLevel: 'Enterprise',
    storageLocation: 'Moorpark',
    email: 'armen7@aghazarian.com',
    phone: '(818) 555-0993',
    streetAddress: '993 Poplar Street',
    city: 'Moorpark',
    state: 'CA',
    zipCode: '93021',
    storageSpots: 5,
    showPandaDocForm: true,
    dateCreated: '2023-05-28',
    password: 'armenaghazarian7123',
    numRows: 3,
    manualPrice: 1000,
    createdAt: '2023-05-28T13:20:00Z',
    updatedAt: '2024-02-20T09:15:00Z',
  },
  {
    id: '14',
    firstName: 'Armen',
    lastName: 'Aghazarian',
    type: 'Individual',
    membershipLevel: 'Basic',
    storageLocation: 'Moorpark',
    email: 'armen8@aghazarian.com',
    phone: '(818) 555-0994',
    streetAddress: '994 Hickory Drive',
    city: 'Moorpark',
    state: 'CA',
    zipCode: '93021',
    storageSpots: 1,
    showPandaDocForm: false,
    dateCreated: '2023-06-01',
    password: 'armenaghazarian8123',
    numRows: 1,
    manualPrice: 75,
    createdAt: '2023-06-01T16:45:00Z',
    updatedAt: '2023-09-10T12:30:00Z',
  },
  {
    id: '15',
    firstName: 'Armen',
    lastName: 'Aghazarian',
    type: 'Individual',
    membershipLevel: 'Premium',
    storageLocation: 'Westlake Village',
    email: 'armen9@aghazarian.com',
    phone: '(818) 555-0995',
    streetAddress: '995 Walnut Avenue',
    city: 'Westlake Village',
    state: 'CA',
    zipCode: '91361',
    storageSpots: 1,
    showPandaDocForm: true,
    dateCreated: '2023-06-05',
    password: 'armenaghazarian9123',
    numRows: 1,
    manualPrice: 150,
    createdAt: '2023-06-05T11:20:00Z',
    updatedAt: '2023-11-25T14:50:00Z',
  },
  {
    id: '16',
    firstName: 'Armen',
    lastName: 'Aghazarian',
    type: 'Business',
    membershipLevel: 'Enterprise',
    storageLocation: 'Moorpark',
    email: 'armen10@aghazarian.com',
    phone: '(818) 555-0996',
    streetAddress: '996 Cherry Lane',
    city: 'Moorpark',
    state: 'CA',
    zipCode: '93021',
    storageSpots: 6,
    showPandaDocForm: false,
    dateCreated: '2023-06-08',
    password: 'armenaghazarian10123',
    numRows: 3,
    manualPrice: 1200,
    createdAt: '2023-06-08T08:35:00Z',
    updatedAt: '2024-01-05T10:20:00Z',
  },
  {
    id: '17',
    firstName: 'Armen',
    lastName: 'Aghazarian',
    type: 'Individual',
    membershipLevel: 'VIP',
    storageLocation: 'Westlake Village',
    email: 'armen11@aghazarian.com',
    phone: '(818) 555-0997',
    streetAddress: '997 Magnolia Court',
    city: 'Westlake Village',
    state: 'CA',
    zipCode: '91361',
    storageSpots: 2,
    showPandaDocForm: true,
    dateCreated: '2023-06-12',
    password: 'armenaghazarian11123',
    numRows: 1,
    manualPrice: 400,
    createdAt: '2023-06-12T15:50:00Z',
    updatedAt: '2023-12-28T13:40:00Z',
  },
  {
    id: '18',
    firstName: 'Armen',
    lastName: 'Aghazarian',
    type: 'Individual',
    membershipLevel: 'Basic',
    storageLocation: 'Moorpark',
    email: 'armen12@aghazarian.com',
    phone: '(818) 555-0998',
    streetAddress: '998 Dogwood Drive',
    city: 'Moorpark',
    state: 'CA',
    zipCode: '93021',
    storageSpots: 1,
    showPandaDocForm: false,
    dateCreated: '2023-06-15',
    password: 'armenaghazarian12123',
    numRows: 1,
    manualPrice: 75,
    createdAt: '2023-06-15T12:25:00Z',
    updatedAt: '2023-10-02T09:15:00Z',
  },
  {
    id: '19',
    firstName: 'Armen',
    lastName: 'Aghazarian',
    type: 'Individual',
    membershipLevel: 'Premium',
    storageLocation: 'Westlake Village',
    email: 'armen13@aghazarian.com',
    phone: '(818) 555-0999',
    streetAddress: '999 Spruce Street',
    city: 'Westlake Village',
    state: 'CA',
    zipCode: '91361',
    storageSpots: 1,
    showPandaDocForm: true,
    dateCreated: '2023-06-18',
    password: 'armenaghazarian13123',
    numRows: 1,
    manualPrice: 150,
    createdAt: '2023-06-18T14:40:00Z',
    updatedAt: '2023-11-08T11:25:00Z',
  },
  {
    id: '20',
    firstName: 'Armen',
    lastName: 'Aghazarian',
    type: 'Business',
    membershipLevel: 'Enterprise',
    storageLocation: 'Moorpark',
    email: 'armen14@aghazarian.com',
    phone: '(818) 555-1000',
    streetAddress: '1000 Fir Avenue',
    city: 'Moorpark',
    state: 'CA',
    zipCode: '93021',
    storageSpots: 8,
    showPandaDocForm: false,
    dateCreated: '2023-06-20',
    password: 'armenaghazarian14123',
    numRows: 4,
    manualPrice: 1600,
    createdAt: '2023-06-20T10:10:00Z',
    updatedAt: '2024-02-14T15:35:00Z',
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
  {
    id: 'user-5',
    firstName: 'Dylan',
    lastName: 'Boztepe',
    email: 'dylanboztepe@barrettautomotivegroup.com',
    password: 'BAG1337',
    role: 'Staff',
    avatar: null,
    phone: '(555) 456-7890',
    department: 'Operations',
    lastLogin: '2024-03-17T13:20:00Z',
    isActive: true,
    createdAt: '2023-03-01T00:00:00Z',
    updatedAt: '2024-03-17T13:20:00Z',
  },
  {
    id: 'user-6',
    firstName: 'Jeremy',
    lastName: 'Renstrom',
    email: 'jeremyr@barrettbuilding.com',
    password: 'BAG8958',
    role: 'Admin',
    avatar: null,
    phone: '(555) 456-7890',
    department: 'Operations',
    lastLogin: '2024-03-17T13:20:00Z',
    isActive: true,
    createdAt: '2023-03-01T00:00:00Z',
    updatedAt: '2024-03-17T13:20:00Z',
  },
  {
    id: 'user-7',
    firstName: 'Joshua',
    lastName: 'Gamboa',
    email: 'joshuagamboa@barrettautomotivegroup.com',
    password: 'BAG7306',
    role: 'Staff',
    avatar: null,
    phone: '(555) 456-7890',
    department: 'Operations',
    lastLogin: '2024-03-17T13:20:00Z',
    isActive: true,
    createdAt: '2023-03-01T00:00:00Z',
    updatedAt: '2024-03-17T13:20:00Z',
  },
  {
    id: 'user-8',
    firstName: 'Jared',
    lastName: 'Oropeza',
    email: 'jaredoropeza@barrettautomotivegroup.com',
    password: 'BAG7414',
    role: 'Staff',
    avatar: null,
    phone: '(555) 456-7890',
    department: 'Support',
    lastLogin: '2024-03-17T13:20:00Z',
    isActive: true,
    createdAt: '2023-03-01T00:00:00Z',
    updatedAt: '2024-03-17T13:20:00Z',
  }
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

export function addUser