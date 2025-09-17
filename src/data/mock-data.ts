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
  },
  {
    "id": "4",
    "customerId": "c2",
    "authorizedDrivers": [],
    "year": "2019",
    "make": "Porsche",
    "model": "GT2RS",
    "vin": "WP0AE2A97KS155294",
    "storageLocation": "Moorpark",
    "fairMarketValue": 450000,
    "insuranceRiderRequired": true,
    "insuranceRiderAmount": 50,
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
    "id": "5",
    "customerId": "c3",
    "authorizedDrivers": [],
    "year": "2024",
    "make": "Jeep",
    "model": "Rubicon",
    "vin": "1C4RJXSJ3RW223940",
    "storageLocation": "Moorpark",
    "fairMarketValue": 98000,
    "insuranceRiderRequired": false,
    "insuranceRiderAmount": 0,
    "licensePlate": "7/1/2025",
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
    "id": "6",
    "customerId": "c4",
    "authorizedDrivers": [],
    "year": "2022",
    "make": "Mastercraft",
    "model": "X24",
    "vin": "MBCPHBVG122",
    "storageLocation": "Moorpark",
    "fairMarketValue": 267000,
    "insuranceRiderRequired": false,
    "insuranceRiderAmount": 0,
    "licensePlate": "2/1/2025",
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
    "id": "7",
    "customerId": "c6",
    "authorizedDrivers": [],
    "year": "1964",
    "make": "Pontiac",
    "model": "GTO",
    "vin": "824F34870",
    "storageLocation": "Moorpark",
    "fairMarketValue": 150000,
    "insuranceRiderRequired": false,
    "insuranceRiderAmount": 0,
    "licensePlate": "N/A",
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
    "id": "8",
    "customerId": "c6",
    "authorizedDrivers": [],
    "year": "2001",
    "make": "Mercedes",
    "model": "SL500",
    "vin": "WDBFA68F31F200029",
    "storageLocation": "Moorpark",
    "fairMarketValue": 12000,
    "insuranceRiderRequired": false,
    "insuranceRiderAmount": 0,
    "licensePlate": "N/A",
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
    "id": "9",
    "customerId": "c10",
    "authorizedDrivers": [],
    "year": "2009",
    "make": "Mercedes-AMG",
    "model": null,
    "vin": "WDDGF77X29f233516",
    "storageLocation": "Moorpark",
    "fairMarketValue": 22000,
    "insuranceRiderRequired": true,
    "insuranceRiderAmount": 0,
    "licensePlate": "6/20/2025",
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
    "id": "10",
    "customerId": "c12",
    "authorizedDrivers": [],
    "year": "2013",
    "make": "Rolls",
    "model": "Royce",
    "vin": "SCA664S56DUX51683",
    "storageLocation": "Moorpark",
    "fairMarketValue": 90000,
    "insuranceRiderRequired": false,
    "insuranceRiderAmount": 0,
    "licensePlate": "6/1/2025",
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
    "id": "11",
    "customerId": "c14",
    "authorizedDrivers": [],
    "year": "2010",
    "make": "Harley",
    "model": "Davidson",
    "vin": "1HD1KH438AB606132",
    "storageLocation": "Moorpark",
    "fairMarketValue": 16000,
    "insuranceRiderRequired": false,
    "insuranceRiderAmount": 0,
    "licensePlate": "5/1/2025",
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
    "id": "12",
    "customerId": "c15",
    "authorizedDrivers": [],
    "year": "2017",
    "make": "Ferrari",
    "model": "California",
    "vin": "ZFF77XJAXH0227476 ",
    "storageLocation": "Moorpark",
    "fairMarketValue": 150000,
    "insuranceRiderRequired": false,
    "insuranceRiderAmount": 0,
    "licensePlate": "6/13/2025",
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
    "id": "13",
    "customerId": "c16",
    "authorizedDrivers": [],
    "year": "2014",
    "make": "Bentley",
    "model": "Continental",
    "vin": "SCBEC9ZA5EC095631",
    "storageLocation": "Moorpark",
    "fairMarketValue": 100000,
    "insuranceRiderRequired": false,
    "insuranceRiderAmount": 0,
    "licensePlate": "8/26/2024",
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
    "id": "14",
    "customerId": "c17",
    "authorizedDrivers": [],
    "year": "2015",
    "make": "Nissan",
    "model": "R35",
    "vin": "JN1AR5EF3FM281610",
    "storageLocation": "Moorpark",
    "fairMarketValue": 150000,
    "insuranceRiderRequired": false,
    "insuranceRiderAmount": 0,
    "licensePlate": "8/1/2024",
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
    "id": "15",
    "customerId": "c17",
    "authorizedDrivers": [],
    "year": "1995",
    "make": "Nissan",
    "model": "Skyline",
    "vin": "BCNR33001214",
    "storageLocation": "Moorpark",
    "fairMarketValue": 120000,
    "insuranceRiderRequired": false,
    "insuranceRiderAmount": 0,
    "licensePlate": "8/1/2024",
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
    "id": "16",
    "customerId": "c17",
    "authorizedDrivers": [],
    "year": "1999",
    "make": "Nissan",
    "model": "Skyline",
    "vin": "BNR34005053",
    "storageLocation": "Moorpark",
    "fairMarketValue": 200000,
    "insuranceRiderRequired": false,
    "insuranceRiderAmount": 0,
    "licensePlate": "8/1/2024",
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
    "id": "17",
    "customerId": "c17",
    "authorizedDrivers": [],
    "year": "1990",
    "make": "Nissan",
    "model": "Skyline",
    "vin": "BNR32012884",
    "storageLocation": "Moorpark",
    "fairMarketValue": 100000,
    "insuranceRiderRequired": false,
    "insuranceRiderAmount": 0,
    "licensePlate": "8/1/2024",
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
    "id": "18",
    "customerId": "c20",
    "authorizedDrivers": [],
    "year": "2007",
    "make": "Lamborghini",
    "model": "Murcielago",
    "vin": "ZHWBU47S57LA02518",
    "storageLocation": "Moorpark",
    "fairMarketValue": 320000,
    "insuranceRiderRequired": false,
    "insuranceRiderAmount": 0,
    "licensePlate": "12/5/2024",
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
    "id": "19",
    "customerId": "c20",
    "authorizedDrivers": [],
    "year": "2009",
    "make": "Rolls",
    "model": "Royce",
    "vin": "SCA2D68509UX16359",
    "storageLocation": "Moorpark",
    "fairMarketValue": 60000,
    "insuranceRiderRequired": false,
    "insuranceRiderAmount": 0,
    "licensePlate": "12/5/2024",
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
    "id": "20",
    "customerId": "c21",
    "authorizedDrivers": [],
    "year": "2024",
    "make": "Ferrari",
    "model": "296",
    "vin": "ZFF01SMA9R0311081",
    "storageLocation": "Moorpark",
    "fairMarketValue": 459358,
    "insuranceRiderRequired": false,
    "insuranceRiderAmount": 0,
    "licensePlate": "12/1/2024",
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
    "id": "21",
    "customerId": "c22",
    "authorizedDrivers": [],
    "year": "2020",
    "make": "Winnebago",
    "model": "View",
    "vin": "W1X8E33Y3LN108451",
    "storageLocation": "Moorpark",
    "fairMarketValue": 190000,
    "insuranceRiderRequired": false,
    "insuranceRiderAmount": 0,
    "licensePlate": "8/26/2024",
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
    "id": "22",
    "customerId": "c23",
    "authorizedDrivers": [],
    "year": "Malibu",
    "make": "Wakesetter",
    "model": "MXZ",
    "vin": "MB2L5005K920",
    "storageLocation": "Moorpark",
    "fairMarketValue": 150000,
    "insuranceRiderRequired": false,
    "insuranceRiderAmount": 0,
    "licensePlate": "3/1/2025",
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
    "id": "23",
    "customerId": "c25",
    "authorizedDrivers": [],
    "year": "2015",
    "make": "Audi",
    "model": "R8",
    "vin": "WUAVNAFG8F7000901",
    "storageLocation": "Moorpark",
    "fairMarketValue": 100000,
    "insuranceRiderRequired": false,
    "insuranceRiderAmount": 0,
    "licensePlate": "6/21/2025",
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
    "id": "24",
    "customerId": "c25",
    "authorizedDrivers": [],
    "year": "2017",
    "make": "Rolls",
    "model": "Royce",
    "vin": "SCA666D59HU102684",
    "storageLocation": "Moorpark",
    "fairMarketValue": 350000,
    "insuranceRiderRequired": false,
    "insuranceRiderAmount": 0,
    "licensePlate": "6/21/2025",
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
    "id": "25",
    "customerId": "c25",
    "authorizedDrivers": [],
    "year": "2020",
    "make": "Jeep",
    "model": "Wrangler",
    "vin": "1C4HJXEN1LW139889",
    "storageLocation": "Moorpark",
    "fairMarketValue": 50000,
    "insuranceRiderRequired": false,
    "insuranceRiderAmount": 0,
    "licensePlate": "6/21/2025",
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
    "id": "26",
    "customerId": "c25",
    "authorizedDrivers": [],
    "year": "2023",
    "make": "Cadillac",
    "model": "Escalade",
    "vin": "1GYS4SK96PR424223",
    "storageLocation": "Moorpark",
    "fairMarketValue": 95000,
    "insuranceRiderRequired": false,
    "insuranceRiderAmount": 0,
    "licensePlate": "6/21/2025",
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
    "id": "27",
    "customerId": "c25",
    "authorizedDrivers": [],
    "year": "2024",
    "make": "McLaren",
    "model": "759S",
    "vin": "SBM14BCA2RW007915",
    "storageLocation": "Moorpark",
    "fairMarketValue": 450000,
    "insuranceRiderRequired": false,
    "insuranceRiderAmount": 0,
    "licensePlate": "6/21/2025",
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
    "id": "28",
    "customerId": "c25",
    "authorizedDrivers": [],
    "year": "2025",
    "make": "Porsche",
    "model": "GT3RS",
    "vin": "WP0AF2A9XSS279198",
    "storageLocation": "Moorpark",
    "fairMarketValue": 380000,
    "insuranceRiderRequired": false,
    "insuranceRiderAmount": 0,
    "licensePlate": "6/21/2025",
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
    "id": "29",
    "customerId": "c25",
    "authorizedDrivers": [],
    "year": "2022",
    "make": "Tesla",
    "model": "Model",
    "vin": "7SAXCBE63NF332797",
    "storageLocation": "Moorpark",
    "fairMarketValue": 80000,
    "insuranceRiderRequired": false,
    "insuranceRiderAmount": 0,
    "licensePlate": "6/21/2025",
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
    "id": "30",
    "customerId": "c26",
    "authorizedDrivers": [],
    "year": "2007",
    "make": "Mercedes-Benz",
    "model": null,
    "vin": "WDDDJ72X27A090604",
    "storageLocation": "Moorpark",
    "fairMarketValue": 0,
    "insuranceRiderRequired": false,
    "insuranceRiderAmount": 0,
    "licensePlate": "6/21/2025",
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
    "id": "31",
    "customerId": "c26",
    "authorizedDrivers": [],
    "year": "1982",
    "make": "Suzuki",
    "model": "Touring",
    "vin": "JS1GI51I6C2102966",
    "storageLocation": "Moorpark",
    "fairMarketValue": 400,
    "insuranceRiderRequired": false,
    "insuranceRiderAmount": 0,
    "licensePlate": "6/21/2025",
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
    "id": "32",
    "customerId": "c28",
    "authorizedDrivers": [],
    "year": "2003",
    "make": "Ferrari",
    "model": "360",
    "vin": "ZFFYU51A730132853",
    "storageLocation": "Moorpark",
    "fairMarketValue": 150000,
    "insuranceRiderRequired": false,
    "insuranceRiderAmount": 0,
    "licensePlate": "8/14/2024",
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
    "id": "33",
    "customerId": "c29",
    "authorizedDrivers": [],
    "year": "1962",
    "make": "Lincoln",
    "model": "Continental",
    "vin": "2Y82H414205",
    "storageLocation": "Moorpark",
    "fairMarketValue": 80000,
    "insuranceRiderRequired": false,
    "insuranceRiderAmount": 0,
    "licensePlate": "12/1/2024",
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
    "id": "34",
    "customerId": "c29",
    "authorizedDrivers": [],
    "year": "1985",
    "make": "Ferrari",
    "model": "308",
    "vin": "ZFFLA13S000059193",
    "storageLocation": "Moorpark",
    "fairMarketValue": 100000,
    "insuranceRiderRequired": false,
    "insuranceRiderAmount": 0,
    "licensePlate": "12/1/2024",
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
    "id": "35",
    "customerId": "c29",
    "authorizedDrivers": [],
    "year": "2005",
    "make": "Porsche",
    "model": "911",
    "vin": "WP0AB29995S740704",
    "storageLocation": "Moorpark",
    "fairMarketValue": 40000,
    "insuranceRiderRequired": false,
    "insuranceRiderAmount": 0,
    "licensePlate": "12/1/2024",
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
    "id": "36",
    "customerId": "c30",
    "authorizedDrivers": [],
    "year": "2014",
    "make": "Porsche",
    "model": "911",
    "vin": "WP0AD2A9XES167737",
    "storageLocation": "Moorpark",
    "fairMarketValue": 120000,
    "insuranceRiderRequired": false,
    "insuranceRiderAmount": 0,
    "licensePlate": "8/26/2024",
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
    "id": "37",
    "customerId": "c30",
    "authorizedDrivers": [],
    "year": "2022",
    "make": "Jeep",
    "model": "Grand",
    "vin": "1C4RJHDG8N8561212",
    "storageLocation": "Moorpark",
    "fairMarketValue": 65000,
    "insuranceRiderRequired": false,
    "insuranceRiderAmount": 0,
    "licensePlate": "8/29/2024",
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
    "id": "38",
    "customerId": "c30",
    "authorizedDrivers": [],
    "year": "2023",
    "make": "Ford",
    "model": "F150",
    "vin": "1FTFW1RG4PFB84493",
    "storageLocation": "Moorpark",
    "fairMarketValue": 100000,
    "insuranceRiderRequired": false,
    "insuranceRiderAmount": 0,
    "licensePlate": "8/30/2024",
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
    "id": "39",
    "customerId": "c30",
    "authorizedDrivers": [],
    "year": "2025",
    "make": "BMW",
    "model": "M8",
    "vin": "WBSGV0C05SCT93497",
    "storageLocation": "Moorpark",
    "fairMarketValue": 140000,
    "insuranceRiderRequired": false,
    "insuranceRiderAmount": 0,
    "licensePlate": "8/28/2024",
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
    "id": "40",
    "customerId": "c30",
    "authorizedDrivers": [],
    "year": "2025",
    "make": "Land",
    "model": "Rover",
    "vin": "SALKPBE95SA277675",
    "storageLocation": "Moorpark",
    "fairMarketValue": 120000,
    "insuranceRiderRequired": false,
    "insuranceRiderAmount": 0,
    "licensePlate": "8/27/2024",
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
    "id": "41",
    "customerId": "c30",
    "authorizedDrivers": [],
    "year": "2003",
    "make": "Harley-Davidson",
    "model": "Fat",
    "vin": "",
    "storageLocation": "Moorpark",
    "fairMarketValue": 0,
    "insuranceRiderRequired": false,
    "insuranceRiderAmount": 0,
    "licensePlate": "",
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
    "id": "42",
    "customerId": "c32",
    "authorizedDrivers": [],
    "year": "1989",
    "make": "Lamborghini",
    "model": "Countach",
    "vin": "ZA9CA05AXKLA12520",
    "storageLocation": "Moorpark",
    "fairMarketValue": 850000,
    "insuranceRiderRequired": false,
    "insuranceRiderAmount": 0,
    "licensePlate": "4/4/2025",
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
    "id": "43",
    "customerId": "c33",
    "authorizedDrivers": [],
    "year": "Malibu",
    "make": "Wakesetter",
    "model": "23LSV",
    "vin": "MB2S5847D515",
    "storageLocation": "Moorpark",
    "fairMarketValue": 85000,
    "insuranceRiderRequired": false,
    "insuranceRiderAmount": 0,
    "licensePlate": "1/1/2025",
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
    "id": "44",
    "customerId": "c34",
    "authorizedDrivers": [],
    "year": "2018",
    "make": "Dodge",
    "model": "Demon",
    "vin": "2C3CDZH95JH101819",
    "storageLocation": "Moorpark",
    "fairMarketValue": 125000,
    "insuranceRiderRequired": false,
    "insuranceRiderAmount": 0,
    "licensePlate": "6/1/2025",
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
    "id": "45",
    "customerId": "c34",
    "authorizedDrivers": [],
    "year": "2018",
    "make": "Porsche",
    "model": "GT2RS",
    "vin": "WPOAE2A94JS185349",
    "storageLocation": "Moorpark",
    "fairMarketValue": 410000,
    "insuranceRiderRequired": false,
    "insuranceRiderAmount": 0,
    "licensePlate": "6/1/2025",
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
    "id": "46",
    "customerId": "c34",
    "authorizedDrivers": [],
    "year": "2019",
    "make": "Ferrari",
    "model": "812",
    "vin": "ZFF83CLAXK0241486",
    "storageLocation": "Moorpark",
    "fairMarketValue": 430000,
    "insuranceRiderRequired": false,
    "insuranceRiderAmount": 0,
    "licensePlate": "6/1/2025",
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
    "id": "47",
    "customerId": "c34",
    "authorizedDrivers": [],
    "year": "2021",
    "make": "Ram",
    "model": "TRX",
    "vin": "1C6SRFU94MN764248",
    "storageLocation": "Moorpark",
    "fairMarketValue": 95000,
    "insuranceRiderRequired": false,
    "insuranceRiderAmount": 0,
    "licensePlate": "6/1/2025",
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
    "id": "48",
    "customerId": "c35",
    "authorizedDrivers": [],
    "year": "1932",
    "make": "Ford",
    "model": "RD",
    "vin": "1841802",
    "storageLocation": "Moorpark",
    "fairMarketValue": 69000,
    "insuranceRiderRequired": false,
    "insuranceRiderAmount": 0,
    "licensePlate": "12/10/2022",
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
    "id": "49",
    "customerId": "c35",
    "authorizedDrivers": [],
    "year": "1934",
    "make": "Ford",
    "model": "Pick-Up",
    "vin": "18760279",
    "storageLocation": "Moorpark",
    "fairMarketValue": 67000,
    "insuranceRiderRequired": false,
    "insuranceRiderAmount": 0,
    "licensePlate": "12/10/2022",
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
    "id": "50",
    "customerId": "c35",
    "authorizedDrivers": [],
    "year": "1939",
    "make": "Ford",
    "model": "Deluxe",
    "vin": "185140520",
    "storageLocation": "Moorpark",
    "fairMarketValue": 50000,
    "insuranceRiderRequired": false,
    "insuranceRiderAmount": 0,
    "licensePlate": "12/10/2022",
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
    "id": "51",
    "customerId": "c35",
    "authorizedDrivers": [],
    "year": "1940",
    "make": "Ford",
    "model": "Deluxe",
    "vin": "185013372",
    "storageLocation": "Moorpark",
    "fairMarketValue": 65000,
    "insuranceRiderRequired": false,
    "insuranceRiderAmount": 0,
    "licensePlate": "12/10/2022",
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
    "id": "52",
    "customerId": "c35",
    "authorizedDrivers": [],
    "year": "1941",
    "make": "Ford",
    "model": "11C",
    "vin": "9C5749",
    "storageLocation": "Moorpark",
    "fairMarketValue": 60000,
    "insuranceRiderRequired": false,
    "insuranceRiderAmount": 0,
    "licensePlate": "12/10/2022",
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
    "id": "53",
    "customerId": "c35",
    "authorizedDrivers": [],
    "year": "1951",
    "make": "Mercury",
    "model": "Monterey",
    "vin": "185140520",
    "storageLocation": "Moorpark",
    "fairMarketValue": 85000,
    "insuranceRiderRequired": false,
    "insuranceRiderAmount": 0,
    "licensePlate": "12/10/2022",
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
    "id": "54",
    "customerId": "c35",
    "authorizedDrivers": [],
    "year": "1964",
    "make": "Ford",
    "model": "Ranchero",
    "vin": "4R27F219491",
    "storageLocation": "Moorpark",
    "fairMarketValue": 50000,
    "insuranceRiderRequired": false,
    "insuranceRiderAmount": 0,
    "licensePlate": "12/10/2022",
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
    "id": "55",
    "customerId": "c35",
    "authorizedDrivers": [],
    "year": "1966",
    "make": "Chevrolet",
    "model": "C-10",
    "vin": "C1446Z153964",
    "storageLocation": "Moorpark",
    "fairMarketValue": 50000,
    "insuranceRiderRequired": false,
    "insuranceRiderAmount": 0,
    "licensePlate": "12/10/2022",
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
    "id": "56",
    "customerId": "c35",
    "authorizedDrivers": [],
    "year": "1988",
    "make": "Porsche",
    "model": "911",
    "vin": "WP0EB0911JS171065",
    "storageLocation": "Moorpark",
    "fairMarketValue": 800000,
    "insuranceRiderRequired": false,
    "insuranceRiderAmount": 0,
    "licensePlate": "12/10/2022",
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
    "id": "57",
    "customerId": "c35",
    "authorizedDrivers": [],
    "year": "2016",
    "make": "Dodge",
    "model": "Challenger",
    "vin": "2C3CDZC9XGH308450",
    "storageLocation": "Moorpark",
    "fairMarketValue": 120000,
    "insuranceRiderRequired": false,
    "insuranceRiderAmount": 0,
    "licensePlate": "5/6/2024",
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
    "id": "58",
    "customerId": "c35",
    "authorizedDrivers": [],
    "year": "Honda",
    "make": "350x",
    "model": "ATC",
    "vin": "JHSTE080XFM008615",
    "storageLocation": "Moorpark",
    "fairMarketValue": 8500,
    "insuranceRiderRequired": false,
    "insuranceRiderAmount": 0,
    "licensePlate": "12/10/2022",
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
    "id": "59",
    "customerId": "c37",
    "authorizedDrivers": [],
    "year": "2024",
    "make": "Lotus",
    "model": "Emira",
    "vin": "T131-GT4-C023",
    "storageLocation": "Moorpark",
    "fairMarketValue": 290450,
    "insuranceRiderRequired": false,
    "insuranceRiderAmount": 0,
    "licensePlate": "6/18/2025",
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
    "id": "60",
    "customerId": "c38",
    "authorizedDrivers": [],
    "year": "1994",
    "make": "Chevrolet",
    "model": "C1500",
    "vin": "1GCDC14Z1RZ124083",
    "storageLocation": "Moorpark",
    "fairMarketValue": 140000,
    "insuranceRiderRequired": false,
    "insuranceRiderAmount": 0,
    "licensePlate": "7/3/2024",
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
    "id": "61",
    "customerId": "c39",
    "authorizedDrivers": [],
    "year": "2017",
    "make": "BMW",
    "model": "M6",
    "vin": "WBS6E9C31HG437538",
    "storageLocation": "Moorpark",
    "fairMarketValue": 85000,
    "insuranceRiderRequired": false,
    "insuranceRiderAmount": 0,
    "licensePlate": "9/1/2024",
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
    "id": "62",
    "customerId": "c39",
    "authorizedDrivers": [],
    "year": "2022",
    "make": "Ford",
    "model": "Shelby",
    "vin": "1FA6P8SJ4N5502617",
    "storageLocation": "Moorpark",
    "fairMarketValue": 125000,
    "insuranceRiderRequired": false,
    "insuranceRiderAmount": 0,
    "licensePlate": "9/1/2024",
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
    "id": "63",
    "customerId": "c39",
    "authorizedDrivers": [],
    "year": "2024",
    "make": "Ford",
    "model": "Raptor",
    "vin": "1FTFW1RJ7RFB29647",
    "storageLocation": "Moorpark",
    "fairMarketValue": 60000,
    "insuranceRiderRequired": false,
    "insuranceRiderAmount": 0,
    "licensePlate": "9/1/2024",
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
    "id": "64",
    "customerId": "c39",
    "authorizedDrivers": [],
    "year": "2024",
    "make": "Ford",
    "model": "F-150",
    "vin": "1FTFW5L58RFB74129",
    "storageLocation": "Moorpark",
    "fairMarketValue": 138495,
    "insuranceRiderRequired": false,
    "insuranceRiderAmount": 0,
    "licensePlate": "9/1/2024",
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
    "id": "65",
    "customerId": "c40",
    "authorizedDrivers": [],
    "year": "1987",
    "make": "BMW",
    "model": "325is",
    "vin": "WBAAA2304H3112655",
    "storageLocation": "Moorpark",
    "fairMarketValue": 15000,
    "insuranceRiderRequired": false,
    "insuranceRiderAmount": 0,
    "licensePlate": "9/6/2023",
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
    "id": "66",
    "customerId": "c40",
    "authorizedDrivers": [],
    "year": "1995",
    "make": "BMW",
    "model": "M3",
    "vin": "WBSBF9326SEH08263",
    "storageLocation": "Moorpark",
    "fairMarketValue": 32000,
    "insuranceRiderRequired": false,
    "insuranceRiderAmount": 0,
    "licensePlate": "9/6/2023",
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
    "id": "67",
    "customerId": "c40",
    "authorizedDrivers": [],
    "year": "1999",
    "make": "Mazda",
    "model": "Miata",
    "vin": "JM1NB3539X0123052",
    "storageLocation": "Moorpark",
    "fairMarketValue": 15000,
    "insuranceRiderRequired": false,
    "insuranceRiderAmount": 0,
    "licensePlate": "9/6/2023",
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
    "id": "68",
    "customerId": "c40",
    "authorizedDrivers": [],
    "year": "2018",
    "make": "Porsche",
    "model": "911",
    "vin": "WP0AC2A91JS175934",
    "storageLocation": "Moorpark",
    "fairMarketValue": 205000,
    "insuranceRiderRequired": false,
    "insuranceRiderAmount": 0,
    "licensePlate": "9/6/2023",
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
    "id": "69",
    "customerId": "c41",
    "authorizedDrivers": [],
    "year": "2011",
    "make": "Porsche",
    "model": "997",
    "vin": "WP0AB2A9XBS721313",
    "storageLocation": "Moorpark",
    "fairMarketValue": 110000,
    "insuranceRiderRequired": false,
    "insuranceRiderAmount": 0,
    "licensePlate": "12/17/2024",
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
    "id": "70",
    "customerId": "c41",
    "authorizedDrivers": [],
    "year": "2020",
    "make": "Porsche",
    "model": "718",
    "vin": "WP0CC2A89LS240306",
    "storageLocation": "Moorpark",
    "fairMarketValue": 112000,
    "insuranceRiderRequired": false,
    "insuranceRiderAmount": 0,
    "licensePlate": "",
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
    "id": "71",
    "customerId": "c42",
    "authorizedDrivers": [],
    "year": "2003",
    "make": "Mazda",
    "model": "Miata",
    "vin": "JM1NB353030300663",
    "storageLocation": "Moorpark",
    "fairMarketValue": 45000,
    "insuranceRiderRequired": false,
    "insuranceRiderAmount": 0,
    "licensePlate": "5/7/2025",
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
    "id": "72",
    "customerId": "c43",
    "authorizedDrivers": [],
    "year": "2018",
    "make": "Porsche",
    "model": "911",
    "vin": "WP0AD2A96JS156695",
    "storageLocation": "Moorpark",
    "fairMarketValue": 190000,
    "insuranceRiderRequired": false,
    "insuranceRiderAmount": 0,
    "licensePlate": "12/27/2023",
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
    "id": "73",
    "customerId": "c43",
    "authorizedDrivers": [],
    "year": "2018",
    "make": "Porsche",
    "model": "GT3",
    "vin": "WP0AC2A98JS175154",
    "storageLocation": "Moorpark",
    "fairMarketValue": 200000,
    "insuranceRiderRequired": false,
    "insuranceRiderAmount": 0,
    "licensePlate": "12/27/2023",
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
    "id": "74",
    "customerId": "c44",
    "authorizedDrivers": [],
    "year": "1971",
    "make": "Ford",
    "model": "Bronco",
    "vin": "U15GLK08711",
    "storageLocation": "Moorpark",
    "fairMarketValue": 125000,
    "insuranceRiderRequired": false,
    "insuranceRiderAmount": 0,
    "licensePlate": "",
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
    "id": "75",
    "customerId": "c46",
    "authorizedDrivers": [],
    "year": "1969",
    "make": "Chevrolet",
    "model": "Camaro",
    "vin": "N592786",
    "storageLocation": "Moorpark",
    "fairMarketValue": 50000,
    "insuranceRiderRequired": false,
    "insuranceRiderAmount": 0,
    "licensePlate": "12/14/2022",
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
    "id": "76",
    "customerId": "c46",
    "authorizedDrivers": [],
    "year": "1979",
    "make": "Horizon",
    "model": "Pleasure",
    "vin": "HFB20103M78H",
    "storageLocation": "Moorpark",
    "fairMarketValue": 60000,
    "insuranceRiderRequired": false,
    "insuranceRiderAmount": 0,
    "licensePlate": "12/14/2022",
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
    "id": "77",
    "customerId": "c47",
    "authorizedDrivers": [],
    "year": "1968",
    "make": "Cadillac",
    "model": "DeVille",
    "vin": "F8103861",
    "storageLocation": "Moorpark",
    "fairMarketValue": 30000,
    "insuranceRiderRequired": false,
    "insuranceRiderAmount": 0,
    "licensePlate": "7/23/2024",
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
    "id": "78",
    "customerId": "c48",
    "authorizedDrivers": [],
    "year": "2017",
    "make": "Subaru",
    "model": "BRZ",
    "vin": "JF1ZCAC19H9605401",
    "storageLocation": "Moorpark",
    "fairMarketValue": 32000,
    "insuranceRiderRequired": false,
    "insuranceRiderAmount": 0,
    "licensePlate": "6/19/2022",
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
    "id": "79",
    "customerId": "c49",
    "authorizedDrivers": [],
    "year": "1992",
    "make": "Ford",
    "model": "F250",
    "vin": "1FTHX25M2NKA18100",
    "storageLocation": "Moorpark",
    "fairMarketValue": 8000,
    "insuranceRiderRequired": false,
    "insuranceRiderAmount": 0,
    "licensePlate": "6/1/2025",
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
    "id": "80",
    "customerId": "c51",
    "authorizedDrivers": [],
    "year": "2013",
    "make": "Infiniti",
    "model": "G37",
    "vin": "JN1CV6AP7DM725397",
    "storageLocation": "Moorpark",
    "fairMarketValue": 7750,
    "insuranceRiderRequired": false,
    "insuranceRiderAmount": 0,
    "licensePlate": "9/9/2024",
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
    "id": "81",
    "customerId": "c53",
    "authorizedDrivers": [],
    "year": "2018",
    "make": "BMW",
    "model": "530e",
    "vin": "WBAJA9C5XJB250474",
    "storageLocation": "Moorpark",
    "fairMarketValue": 30000,
    "insuranceRiderRequired": false,
    "insuranceRiderAmount": 0,
    "licensePlate": "3/8/2024",
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
    "id": "82",
    "customerId": "c54",
    "authorizedDrivers": [],
    "year": "1969",
    "make": "Chevrolet",
    "model": "Camaro",
    "vin": "124379N691257",
    "storageLocation": "Moorpark",
    "fairMarketValue": 50000,
    "insuranceRiderRequired": false,
    "insuranceRiderAmount": 0,
    "licensePlate": "6/1/2025",
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
    "id": "83",
    "customerId": "c54",
    "authorizedDrivers": [],
    "year": "1973",
    "make": "Chevy",
    "model": "Corvette",
    "vin": "1Z37T3S415681",
    "storageLocation": "Moorpark",
    "fairMarketValue": 30000,
    "insuranceRiderRequired": false,
    "insuranceRiderAmount": 0,
    "licensePlate": "6/1/2025",
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
    "id": "84",
    "customerId": "c56",
    "authorizedDrivers": [],
    "year": "Ferrari",
    "make": "488",
    "model": "Pista",
    "vin": "ZFF91HMA5L0253651",
    "storageLocation": "Moorpark",
    "fairMarketValue": 800000,
    "insuranceRiderRequired": false,
    "insuranceRiderAmount": 0,
    "licensePlate": "7/9/2023",
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
    "id": "85",
    "customerId": "c56",
    "authorizedDrivers": [],
    "year": "Ferrari",
    "make": "812",
    "model": "GTS",
    "vin": "ZFF97CMA2P0288588",
    "storageLocation": "Moorpark",
    "fairMarketValue": 700000,
    "insuranceRiderRequired": false,
    "insuranceRiderAmount": 0,
    "licensePlate": "7/14/2023",
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
    "id": "86",
    "customerId": "c56",
    "authorizedDrivers": [],
    "year": "Lexus",
    "make": "LFA",
    "model": null,
    "vin": "JTHHX8BH7C1000137",
    "storageLocation": "Moorpark",
    "fairMarketValue": 900000,
    "insuranceRiderRequired": false,
    "insuranceRiderAmount": 0,
    "licensePlate": "7/7/2023",
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
    "id": "87",
    "customerId": "c56",
    "authorizedDrivers": [],
    "year": "McLaren",
    "make": "Senna",
    "model": null,
    "vin": "SBM15ACAXKW800196",
    "storageLocation": "Moorpark",
    "fairMarketValue": 1400000,
    "insuranceRiderRequired": false,
    "insuranceRiderAmount": 0,
    "licensePlate": "7/10/2023",
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
    "id": "88",
    "customerId": "c56",
    "authorizedDrivers": [],
    "year": "Porsche",
    "make": "GT3",
    "model": "Touring",
    "vin": "WPOAC2A97PS270457",
    "storageLocation": "Moorpark",
    "fairMarketValue": 300000,
    "insuranceRiderRequired": false,
    "insuranceRiderAmount": 0,
    "licensePlate": "7/11/2023",
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
    "id": "89",
    "customerId": "c56",
    "authorizedDrivers": [],
    "year": "Porsche",
    "make": "GT3RS",
    "model": null,
    "vin": "WP0AF2A93KS165740",
    "storageLocation": "Moorpark",
    "fairMarketValue": 275000,
    "insuranceRiderRequired": false,
    "insuranceRiderAmount": 0,
    "licensePlate": "7/8/2023",
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
    "id": "90",
    "customerId": "c56",
    "authorizedDrivers": [],
    "year": "Porsche",
    "make": "GT3",
    "model": "RS",
    "vin": "WPOAF2A98PS278431",
    "storageLocation": "Moorpark",
    "fairMarketValue": 500000,
    "insuranceRiderRequired": false,
    "insuranceRiderAmount": 0,
    "licensePlate": "7/12/2023",
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
    "id": "91",
    "customerId": "c56",
    "authorizedDrivers": [],
    "year": "Ford",
    "make": "Bronco",
    "model": "Raptor",
    "vin": "1FMEE5JR7NLA52664",
    "storageLocation": "Moorpark",
    "fairMarketValue": 100000,
    "insuranceRiderRequired": false,
    "insuranceRiderAmount": 0,
    "licensePlate": "7/13/2023",
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
    "id": "92",
    "customerId": "c56",
    "authorizedDrivers": [],
    "year": "Ford",
    "make": "F-150",
    "model": "Raptor",
    "vin": "1FTFW1RG5NFA93648",
    "storageLocation": "Moorpark",
    "fairMarketValue": 85000,
    "insuranceRiderRequired": false,
    "insuranceRiderAmount": 0,
    "licensePlate": "7/15/2023",
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
    "id": "93",
    "customerId": "c56",
    "authorizedDrivers": [],
    "year": "Ford",
    "make": "Mustang",
    "model": "GT500",
    "vin": "1FA6P8SJ3N5501023",
    "storageLocation": "Moorpark",
    "fairMarketValue": 125000,
    "insuranceRiderRequired": false,
    "insuranceRiderAmount": 0,
    "licensePlate": "7/6/2023",
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
    "id": "94",
    "customerId": "c57",
    "authorizedDrivers": [],
    "year": "2008",
    "make": "BMW",
    "model": "M3",
    "vin": "WBSWD93558PY39566",
    "storageLocation": "Moorpark",
    "fairMarketValue": 45000,
    "insuranceRiderRequired": false,
    "insuranceRiderAmount": 0,
    "licensePlate": "4/11/2025",
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
    "id": "95",
    "customerId": "c57",
    "authorizedDrivers": [],
    "year": "2015",
    "make": "BMW",
    "model": "M5",
    "vin": "WBSFV9C52FD594804",
    "storageLocation": "Moorpark",
    "fairMarketValue": 45000,
    "insuranceRiderRequired": false,
    "insuranceRiderAmount": 0,
    "licensePlate": "4/11/2025",
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
    "id": "96",
    "customerId": "c57",
    "authorizedDrivers": [],
    "year": "2025",
    "make": "BMW",
    "model": "M3",
    "vin": "WBS13HJ07SFU77025",
    "storageLocation": "Moorpark",
    "fairMarketValue": 125000,
    "insuranceRiderRequired": false,
    "insuranceRiderAmount": 0,
    "licensePlate": "4/11/2025",
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
    "id": "97",
    "customerId": "c58",
    "authorizedDrivers": [],
    "year": "1963",
    "make": "Cadillac",
    "model": "Coupe",
    "vin": "63J030283",
    "storageLocation": "Moorpark",
    "fairMarketValue": 140000,
    "insuranceRiderRequired": false,
    "insuranceRiderAmount": 0,
    "licensePlate": "8/21/2024",
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
    "id": "98",
    "customerId": "c59",
    "authorizedDrivers": [],
    "year": "1963",
    "make": "Jaguar",
    "model": "E-Type",
    "vin": "878960",
    "storageLocation": "Moorpark",
    "fairMarketValue": 120585,
    "insuranceRiderRequired": false,
    "insuranceRiderAmount": 0,
    "licensePlate": "2/1/2025",
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
    "id": "99",
    "customerId": "c59",
    "authorizedDrivers": [],
    "year": "1964",
    "make": "Chevrolet",
    "model": "Corvette",
    "vin": "4.08675E+11",
    "storageLocation": "Moorpark",
    "fairMarketValue": 52690,
    "insuranceRiderRequired": false,
    "insuranceRiderAmount": 0,
    "licensePlate": "2/1/2025",
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
    "id": "100",
    "customerId": "c59",
    "authorizedDrivers": [],
    "year": "1966",
    "make": "Porsche",
    "model": "912",
    "vin": "753155",
    "storageLocation": "Moorpark",
    "fairMarketValue": 35890,
    "insuranceRiderRequired": false,
    "insuranceRiderAmount": 0,
    "licensePlate": "2/1/2025",
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
    "id": "101",
    "customerId": "c61",
    "authorizedDrivers": [],
    "year": "1977",
    "make": "Ford",
    "model": "Bronco",
    "vin": "U15GLY05378",
    "storageLocation": "Moorpark",
    "fairMarketValue": 65000,
    "insuranceRiderRequired": false,
    "insuranceRiderAmount": 0,
    "licensePlate": "5/1/2025",
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
    "id": "102",
    "customerId": "c62",
    "authorizedDrivers": [],
    "year": "1968",
    "make": "Ford",
    "model": "Bronco",
    "vin": "U15NLC65309",
    "storageLocation": "Moorpark",
    "fairMarketValue": 165000,
    "insuranceRiderRequired": false,
    "insuranceRiderAmount": 0,
    "licensePlate": "2/1/2023",
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
    "id": "103",
    "customerId": "c63",
    "authorizedDrivers": [],
    "year": "2023",
    "make": "Ford",
    "model": "F150",
    "vin": "1FTFW1E55PKE74267",
    "storageLocation": "Moorpark",
    "fairMarketValue": 158000,
    "insuranceRiderRequired": false,
    "insuranceRiderAmount": 0,
    "licensePlate": "5/21/2024",
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
    "id": "104",
    "customerId": "c64",
    "authorizedDrivers": [],
    "year": "2019",
    "make": "Mercedes",
    "model": "Sprinter",
    "vin": "WDAPF1CD6KP072139",
    "storageLocation": "Moorpark",
    "fairMarketValue": 150000,
    "insuranceRiderRequired": false,
    "insuranceRiderAmount": 0,
    "licensePlate": "6/1/2025",
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
    "id": "105",
    "customerId": "#N/A",
    "authorizedDrivers": [],
    "year": "1967",
    "make": "Ford",
    "model": "F100",
    "vin": "F10YNB14246",
    "storageLocation": "Moorpark",
    "fairMarketValue": 309900,
    "insuranceRiderRequired": false,
    "insuranceRiderAmount": 0,
    "licensePlate": "4/24/2025",
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
    "id": "106",
    "customerId": "#N/A",
    "authorizedDrivers": [],
    "year": "1967",
    "make": "Ford",
    "model": "F250",
    "vin": "F25HLM80324",
    "storageLocation": "Moorpark",
    "fairMarketValue": 349000,
    "insuranceRiderRequired": false,
    "insuranceRiderAmount": 0,
    "licensePlate": "4/24/2025",
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
    "id": "107",
    "customerId": "#N/A",
    "authorizedDrivers": [],
    "year": "1971",
    "make": "Ford",
    "model": "Bronco",
    "vin": "U15GLK10354",
    "storageLocation": "Moorpark",
    "fairMarketValue": 273700,
    "insuranceRiderRequired": false,
    "insuranceRiderAmount": 0,
    "licensePlate": "4/24/2025",
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
    "id": "108",
    "customerId": "#N/A",
    "authorizedDrivers": [],
    "year": "1973",
    "make": "Ford",
    "model": "Bronco",
    "vin": "U15GLQ47072",
    "storageLocation": "Moorpark",
    "fairMarketValue": 268000,
    "insuranceRiderRequired": false,
    "insuranceRiderAmount": 0,
    "licensePlate": "4/24/2025",
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
    "id": "109",
    "customerId": "c67",
    "authorizedDrivers": [],
    "year": "1967",
    "make": "Ford",
    "model": "Mustang",
    "vin": "Z67400F2A02902",
    "storageLocation": "Moorpark",
    "fairMarketValue": 350000,
    "insuranceRiderRequired": false,
    "insuranceRiderAmount": 0,
    "licensePlate": "7/26/2024",
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
    "id": "110",
    "customerId": "c67",
    "authorizedDrivers": [],
    "year": "Pop",
    "make": "Tent",
    "model": null,
    "vin": " N/A ",
    "storageLocation": "Moorpark",
    "fairMarketValue": 0,
    "insuranceRiderRequired": false,
    "insuranceRiderAmount": 0,
    "licensePlate": "N/A",
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
    "id": "111",
    "customerId": "c5",
    "authorizedDrivers": [],
    "year": "2014",
    "make": "Porsche",
    "model": "911",
    "vin": "WP0AD2A92ES167487",
    "storageLocation": "Westlake Village",
    "fairMarketValue": 90000,
    "insuranceRiderRequired": false,
    "insuranceRiderAmount": 0,
    "licensePlate": "",
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
    "id": "112",
    "customerId": "c6",
    "authorizedDrivers": [],
    "year": "1977",
    "make": "Porsche",
    "model": "911",
    "vin": "9307800351",
    "storageLocation": "Westlake Village",
    "fairMarketValue": 150000,
    "insuranceRiderRequired": false,
    "insuranceRiderAmount": 0,
    "licensePlate": "N/A",
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
    "id": "113",
    "customerId": "c6",
    "authorizedDrivers": [],
    "year": "1999",
    "make": "Ferrari",
    "model": "F355",
    "vin": "ZFFXR48A7X0116557",
    "storageLocation": "Westlake Village",
    "fairMarketValue": 400000,
    "insuranceRiderRequired": false,
    "insuranceRiderAmount": 0,
    "licensePlate": "N/A",
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
    "id": "115",
    "customerId": "c6",
    "authorizedDrivers": [],
    "year": "2017",
    "make": "Nissan",
    "model": "GTR",
    "vin": "JN1AREF0HM820784",
    "storageLocation": "Westlake Village",
    "fairMarketValue": 100000,
    "insuranceRiderRequired": false,
    "insuranceRiderAmount": 0,
    "licensePlate": "N/A",
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
    "id": "116",
    "customerId": "c6",
    "authorizedDrivers": [],
    "year": "2019",
    "make": "Porsche",
    "model": "911",
    "vin": "WP0AE2A97KS155070",
    "storageLocation": "Westlake Village",
    "fairMarketValue": 350000,
    "insuranceRiderRequired": false,
    "insuranceRiderAmount": 0,
    "licensePlate": "N/A",
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
    "id": "117",
    "customerId": "c6",
    "authorizedDrivers": [],
    "year": "2022",
    "make": "Ford",
    "model": "Mustang",
    "vin": "1FA6P8SJ5N5501122",
    "storageLocation": "Westlake Village",
    "fairMarketValue": 120000,
    "insuranceRiderRequired": false,
    "insuranceRiderAmount": 0,
    "licensePlate": "N/A",
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
    "id": "118",
    "customerId": "c6",
    "authorizedDrivers": [],
    "year": "2024",
    "make": "Porsche",
    "model": "718",
    "vin": "WP0CE2A80RK240536",
    "storageLocation": "Westlake Village",
    "fairMarketValue": 0,
    "insuranceRiderRequired": false,
    "insuranceRiderAmount": 0,
    "licensePlate": "",
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
    "id": "119",
    "customerId": "c13",
    "authorizedDrivers": [],
    "year": "1992",
    "make": "Porsche",
    "model": "911",
    "vin": "WP0AB2961NS420699",
    "storageLocation": "Westlake Village",
    "fairMarketValue": 1200000,
    "insuranceRiderRequired": false,
    "insuranceRiderAmount": 0,
    "licensePlate": "6/1/2025",
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
    "id": "120",
    "customerId": "c14",
    "authorizedDrivers": [],
    "year": "1996",
    "make": "Harley",
    "model": "Davidson",
    "vin": "1HD1BJL51TY028907",
    "storageLocation": "Westlake Village",
    "fairMarketValue": 12000,
    "insuranceRiderRequired": false,
    "insuranceRiderAmount": 0,
    "licensePlate": "5/1/2025",
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
    "id": "121",
    "customerId": "c18",
    "authorizedDrivers": [],
    "year": "2019",
    "make": "Aston",
    "model": "Martin",
    "vin": "SCFRMFEVXKGL07979",
    "storageLocation": "Westlake Village",
    "fairMarketValue": 140000,
    "insuranceRiderRequired": false,
    "insuranceRiderAmount": 0,
    "licensePlate": "6/1/2025",
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
    "id": "122",
    "customerId": "c31",
    "authorizedDrivers": [],
    "year": "1962",
    "make": "Chevrolet",
    "model": "Corvette",
    "vin": "20867S101404",
    "storageLocation": "Westlake Village",
    "fairMarketValue": 125000,
    "insuranceRiderRequired": false,
    "insuranceRiderAmount": 0,
    "licensePlate": "3/1/2025",
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
    "id": "123",
    "customerId": "c31",
    "authorizedDrivers": [],
    "year": "1966",
    "make": "Chevrolet",
    "model": "Corvette",
    "vin": "19467S1109086",
    "storageLocation": "Westlake Village",
    "fairMarketValue": 115000,
    "insuranceRiderRequired": false,
    "insuranceRiderAmount": 0,
    "licensePlate": "3/1/2025",
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
    "id": "124",
    "customerId": "c31",
    "authorizedDrivers": [],
    "year": "2012",
    "make": "Mercedes-Benz",
    "model": "SLS",
    "vin": "WDDRH7HA2CA009345",
    "storageLocation": "Westlake Village",
    "fairMarketValue": 250000,
    "insuranceRiderRequired": false,
    "insuranceRiderAmount": 0,
    "licensePlate": "3/1/2025",
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
    "id": "125",
    "customerId": "c31",
    "authorizedDrivers": [],
    "year": "2017",
    "make": "Mercedes-Benz",
    "model": "S63",
    "vin": "WDDXK7JB3H023771",
    "storageLocation": "Westlake Village",
    "fairMarketValue": 110000,
    "insuranceRiderRequired": false,
    "insuranceRiderAmount": 0,
    "licensePlate": "",
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
    "id": "126",
    "customerId": "c36",
    "authorizedDrivers": [],
    "year": "1989",
    "make": "Ferrari",
    "model": "Testarossa",
    "vin": "ZFFSG17A4K0082196",
    "storageLocation": "Westlake Village",
    "fairMarketValue": 152000,
    "insuranceRiderRequired": false,
    "insuranceRiderAmount": 0,
    "licensePlate": "7/24/2024",
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
    "id": "127",
    "customerId": "c42",
    "authorizedDrivers": [],
    "year": "2006",
    "make": "Lotus",
    "model": "Elise",
    "vin": "SCCVC11147HL80626",
    "storageLocation": "Westlake Village",
    "fairMarketValue": 60000,
    "insuranceRiderRequired": false,
    "insuranceRiderAmount": 0,
    "licensePlate": "5/7/2025",
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
    "id": "128",
    "customerId": "c55",
    "authorizedDrivers": [],
    "year": "1973",
    "make": "Porsche",
    "model": "911T",
    "vin": "9113102214",
    "storageLocation": "Westlake Village",
    "fairMarketValue": 80000,
    "insuranceRiderRequired": false,
    "insuranceRiderAmount": 0,
    "licensePlate": "5/7/2025",
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
    "id": "129",
    "customerId": "c55",
    "authorizedDrivers": [],
    "year": "2025",
    "make": "BMW",
    "model": "840i",
    "vin": "WBAGV2C01SCS49865",
    "storageLocation": "Westlake Village",
    "fairMarketValue": 85000,
    "insuranceRiderRequired": false,
    "insuranceRiderAmount": 0,
    "licensePlate": "5/7/2025",
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
    "id": "130",
    "customerId": "c55",
    "authorizedDrivers": [],
    "year": "2025",
    "make": "Porsche",
    "model": "718",
    "vin": "WP0AD2A86SK265442",
    "storageLocation": "Westlake Village",
    "fairMarketValue": 110000,
    "insuranceRiderRequired": false,
    "insuranceRiderAmount": 0,
    "licensePlate": "5/7/2025",
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
    "id": "131",
    "customerId": "c63",
    "authorizedDrivers": [],
    "year": "2016",
    "make": "Aston",
    "model": "Martin",
    "vin": "SCFLMCFU8GGJ02677",
    "storageLocation": "Westlake Village",
    "fairMarketValue": 140000,
    "insuranceRiderRequired": false,
    "insuranceRiderAmount": 0,
    "licensePlate": "",
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
    "id": "132",
    "customerId": "c63",
    "authorizedDrivers": [],
    "year": "2018",
    "make": "Ferrari",
    "model": "GT4",
    "vin": "ZFF82YNA2J0234642",
    "storageLocation": "Westlake Village",
    "fairMarketValue": 180000,
    "insuranceRiderRequired": false,
    "insuranceRiderAmount": 0,
    "licensePlate": "",
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
    "id": "133",
    "customerId": "c63",
    "authorizedDrivers": [],
    "year": "2019",
    "make": "Tesla",
    "model": "Model",
    "vin": "5YJXCDE4XKF205337",
    "storageLocation": "Westlake Village",
    "fairMarketValue": 120000,
    "insuranceRiderRequired": false,
    "insuranceRiderAmount": 0,
    "licensePlate": "",
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
    "id": "134",
    "customerId": "c63",
    "authorizedDrivers": [],
    "year": "2021",
    "make": "Porsche",
    "model": "Taycan",
    "vin": "WP0AC2Y1XMSA63933",
    "storageLocation": "Westlake Village",
    "fairMarketValue": 0,
    "insuranceRiderRequired": false,
    "insuranceRiderAmount": 0,
    "licensePlate": "",
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
    "id": "135",
    "customerId": "c63",
    "authorizedDrivers": [],
    "year": "2022",
    "make": "GMC",
    "model": "Hummer",
    "vin": "1GT40FDA9NU100783",
    "storageLocation": "Westlake Village",
    "fairMarketValue": 0,
    "insuranceRiderRequired": false,
    "insuranceRiderAmount": 0,
    "licensePlate": "",
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
    "id": "136",
    "customerId": "c63",
    "authorizedDrivers": [],
    "year": "2022",
    "make": "McLaren",
    "model": "GT",
    "vin": "SBM22GCA2NW002084",
    "storageLocation": "Westlake Village",
    "fairMarketValue": 215280,
    "insuranceRiderRequired": false,
    "insuranceRiderAmount": 0,
    "licensePlate": "",
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
    "id": "137",
    "customerId": "c63",
    "authorizedDrivers": [],
    "year": "2023",
    "make": "Audi",
    "model": "RS6",
    "vin": "WUA1CBF26PN903723",
    "storageLocation": "Westlake Village",
    "fairMarketValue": 0,
    "insuranceRiderRequired": false,
    "insuranceRiderAmount": 0,
    "licensePlate": "",
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
    "id": "138",
    "customerId": "c63",
    "authorizedDrivers": [],
    "year": "2023",
    "make": "BMW",
    "model": "IX",
    "vin": "WB533CF02PCM65736",
    "storageLocation": "Westlake Village",
    "fairMarketValue": 120000,
    "insuranceRiderRequired": false,
    "insuranceRiderAmount": 0,
    "licensePlate": "",
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
    "id": "139",
    "customerId": "c63",
    "authorizedDrivers": [],
    "year": "2024",
    "make": "Aston",
    "model": "Martin",
    "vin": "SD7VUJBW2RTV10377",
    "storageLocation": "Westlake Village",
    "fairMarketValue": 0,
    "insuranceRiderRequired": false,
    "insuranceRiderAmount": 0,
    "licensePlate": "",
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
    "id": "140",
    "customerId": "c63",
    "authorizedDrivers": [],
    "year": "2025",
    "make": "McLaren",
    "model": "Artura",
    "vin": "SBM16BEA5SW003158",
    "storageLocation": "Westlake Village",
    "fairMarketValue": 0,
    "insuranceRiderRequired": false,
    "insuranceRiderAmount": 0,
    "licensePlate": "",
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
    "id": "141",
    "customerId": "c66",
    "authorizedDrivers": [],
    "year": "2003",
    "make": "Porsche",
    "model": "911",
    "vin": "WP0AB29953S696133  ",
    "storageLocation": "Westlake Village",
    "fairMarketValue": 250000,
    "insuranceRiderRequired": false,
    "insuranceRiderAmount": 0,
    "licensePlate": "11/21/2022",
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
    "id": "142",
    "customerId": "c66",
    "authorizedDrivers": [],
    "year": "2005",
    "make": "Porsche",
    "model": "Carrera",
    "vin": "WP0CA29855L001164",
    "storageLocation": "Westlake Village",
    "fairMarketValue": 1500000,
    "insuranceRiderRequired": false,
    "insuranceRiderAmount": 0,
    "licensePlate": "11/21/2022",
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
    "id": "143",
    "customerId": "c66",
    "authorizedDrivers": [],
    "year": "2014",
    "make": "Ferrari",
    "model": "458",
    "vin": "ZFF67NFA8E0200880",
    "storageLocation": "Westlake Village",
    "fairMarketValue": 230000,
    "insuranceRiderRequired": false,
    "insuranceRiderAmount": 0,
    "licensePlate": "11/21/2022",
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
    "id": "144",
    "customerId": "c66",
    "authorizedDrivers": [],
    "year": "2014",
    "make": "Ferrari",
    "model": "LaFerrari",
    "vin": "ZFF76ZFA9E0204693",
    "storageLocation": "Westlake Village",
    "fairMarketValue": 4500000,
    "insuranceRiderRequired": false,
    "insuranceRiderAmount": 0,
    "licensePlate": "11/21/2022",
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
    "id": "145",
    "customerId": "c66",
    "authorizedDrivers": [],
    "year": "2015",
    "make": "Ferrari",
    "model": "458",
    "vin": "ZFF75VFA7F0211932",
    "storageLocation": "Westlake Village",
    "fairMarketValue": 600000,
    "insuranceRiderRequired": false,
    "insuranceRiderAmount": 0,
    "licensePlate": "11/21/2022",
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
    "id": "146",
    "customerId": "c66",
    "authorizedDrivers": [],
    "year": "2015",
    "make": "Porsche",
    "model": "918",
    "vin": "WP0CA2A19FS800130",
    "storageLocation": "Westlake Village",
    "fairMarketValue": 2500000,
    "insuranceRiderRequired": false,
    "insuranceRiderAmount": 0,
    "licensePlate": "11/21/2022",
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
    "id": "147",
    "customerId": "c66",
    "authorizedDrivers": [],
    "year": "2018",
    "make": "Porsche",
    "model": "GT2RS",
    "vin": "WP0AE2A93JS185505 ",
    "storageLocation": "Westlake Village",
    "fairMarketValue": 475000,
    "insuranceRiderRequired": false,
    "insuranceRiderAmount": 0,
    "licensePlate": "11/21/2022",
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
    "id": "148",
    "customerId": "c66",
    "authorizedDrivers": [],
    "year": "2019",
    "make": "Porsche",
    "model": "GT3RS",
    "vin": "WP0AF2A90KS164917 ",
    "storageLocation": "Westlake Village",
    "fairMarketValue": 290000,
    "insuranceRiderRequired": false,
    "insuranceRiderAmount": 0,
    "licensePlate": "11/21/2022",
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
    "id": "149",
    "customerId": "c66",
    "authorizedDrivers": [],
    "year": "2020",
    "make": "Ferrari",
    "model": "488",
    "vin": "ZFF90HLA3L0250266",
    "storageLocation": "Westlake Village",
    "fairMarketValue": 750000,
    "insuranceRiderRequired": false,
    "insuranceRiderAmount": 0,
    "licensePlate": "11/21/2022",
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
    "id": "150",
    "customerId": "c66",
    "authorizedDrivers": [],
    "year": "2020",
    "make": "Mercedes-AMG",
    "model": "G63",
    "vin": "W1NYC7HJ7LX347376",
    "storageLocation": "Westlake Village",
    "fairMarketValue": 200000,
    "insuranceRiderRequired": false,
    "insuranceRiderAmount": 0,
    "licensePlate": "11/21/2022",
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
    "id": "151",
    "customerId": "c66",
    "authorizedDrivers": [],
    "year": "2020",
    "make": "Porsche",
    "model": "Taycan",
    "vin": "WP0AC2Y12LSA71698",
    "storageLocation": "Westlake Village",
    "fairMarketValue": 0,
    "insuranceRiderRequired": false,
    "insuranceRiderAmount": 0,
    "licensePlate": "",
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
    "id": "152",
    "customerId": "c66",
    "authorizedDrivers": [],
    "year": "2021",
    "make": "Porsche",
    "model": "Turbo",
    "vin": "WP0AD2A99MS257928",
    "storageLocation": "Westlake Village",
    "fairMarketValue": 310000,
    "insuranceRiderRequired": false,
    "insuranceRiderAmount": 0,
    "licensePlate": "11/21/2022",
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
    "id": "153",
    "customerId": "c66",
    "authorizedDrivers": [],
    "year": "2022",
    "make": "Porsche",
    "model": "GT3",
    "vin": "WP0AC2A9XNS268280",
    "storageLocation": "Westlake Village",
    "fairMarketValue": 320000,
    "insuranceRiderRequired": false,
    "insuranceRiderAmount": 0,
    "licensePlate": "11/21/2022",
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
    "id": "154",
    "customerId": "c66",
    "authorizedDrivers": [],
    "year": "2023",
    "make": "BMW",
    "model": "M4",
    "vin": "WBS43AZ02PCM14805",
    "storageLocation": "Westlake Village",
    "fairMarketValue": 55000,
    "insuranceRiderRequired": false,
    "insuranceRiderAmount": 0,
    "licensePlate": "11/21/2022",
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
    "id": "155",
    "customerId": "c66",
    "authorizedDrivers": [],
    "year": "2023",
    "make": "Ferrari",
    "model": "296",
    "vin": "ZFF99SLA6P0297915",
    "storageLocation": "Westlake Village",
    "fairMarketValue": 440000,
    "insuranceRiderRequired": false,
    "insuranceRiderAmount": 0,
    "licensePlate": "11/21/2022",
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
    "id": "156",
    "customerId": "c66",
    "authorizedDrivers": [],
    "year": "2023",
    "make": "Ferrari",
    "model": "SF90",
    "vin": "ZFF96NMA2PO298472",
    "storageLocation": "Westlake Village",
    "fairMarketValue": 750000,
    "insuranceRiderRequired": false,
    "insuranceRiderAmount": 0,
    "licensePlate": "11/21/2022",
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
    "id": "157",
    "customerId": "c66",
    "authorizedDrivers": [],
    "year": "2024",
    "make": "Porsche",
    "model": "GT4RS",
    "vin": "WP0AE2A80RK274256",
    "storageLocation": "Westlake Village",
    "fairMarketValue": 200000,
    "insuranceRiderRequired": false,
    "insuranceRiderAmount": 0,
    "licensePlate": "11/21/2022",
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
    "id": "158",
    "customerId": "c67",
    "authorizedDrivers": [],
    "year": "1967",
    "make": "Ferrari",
    "model": "275",
    "vin": "275GTB49511",
    "storageLocation": "Westlake Village",
    "fairMarketValue": 2000000,
    "insuranceRiderRequired": false,
    "insuranceRiderAmount": 0,
    "licensePlate": "7/26/2024",
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
    "id": "159",
    "customerId": "c67",
    "authorizedDrivers": [],
    "year": "1970",
    "make": "Porsche",
    "model": "911",
    "vin": "9110301589",
    "storageLocation": "Westlake Village",
    "fairMarketValue": 150000,
    "insuranceRiderRequired": false,
    "insuranceRiderAmount": 0,
    "licensePlate": "7/26/2024",
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
    "id": "160",
    "customerId": "c67",
    "authorizedDrivers": [],
    "year": "1974",
    "make": "Ferrari",
    "model": "Dino",
    "vin": "8068",
    "storageLocation": "Westlake Village",
    "fairMarketValue": 400000,
    "insuranceRiderRequired": false,
    "insuranceRiderAmount": 0,
    "licensePlate": "7/26/2024",
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
    "id": "161",
    "customerId": "c67",
    "authorizedDrivers": [],
    "year": "1989",
    "make": "Porsche",
    "model": "911",
    "vin": "WP0EB0911KS170192",
    "storageLocation": "Westlake Village",
    "fairMarketValue": 80000,
    "insuranceRiderRequired": false,
    "insuranceRiderAmount": 0,
    "licensePlate": "7/26/2024",
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
    "id": "162",
    "customerId": "c67",
    "authorizedDrivers": [],
    "year": "1991",
    "make": "Jeep",
    "model": "Wrangler",
    "vin": "2J4FY29S9MJ139826",
    "storageLocation": "Westlake Village",
    "fairMarketValue": 20000,
    "insuranceRiderRequired": false,
    "insuranceRiderAmount": 0,
    "licensePlate": "7/26/2024",
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
    "id": "163",
    "customerId": "c67",
    "authorizedDrivers": [],
    "year": "1995",
    "make": "Ferrari",
    "model": "512M",
    "vin": "ZFFVG0A5S0100780",
    "storageLocation": "Westlake Village",
    "fairMarketValue": 650000,
    "insuranceRiderRequired": false,
    "insuranceRiderAmount": 0,
    "licensePlate": "7/26/2024",
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
    "id": "164",
    "customerId": "c67",
    "authorizedDrivers": [],
    "year": "2005",
    "make": "Ford",
    "model": "GT",
    "vin": "1FAFP90S45Y401321",
    "storageLocation": "Westlake Village",
    "fairMarketValue": 350000,
    "insuranceRiderRequired": false,
    "insuranceRiderAmount": 0,
    "licensePlate": "7/26/2024",
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
    "id": "165",
    "customerId": "c67",
    "authorizedDrivers": [],
    "year": "2009",
    "make": "Ferrari",
    "model": "430",
    "vin": "ZFFKW66A490166918",
    "storageLocation": "Westlake Village",
    "fairMarketValue": 0,
    "insuranceRiderRequired": false,
    "insuranceRiderAmount": 0,
    "licensePlate": "",
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
    "id": "166",
    "customerId": "c67",
    "authorizedDrivers": [],
    "year": "2015",
    "make": "Subaru",
    "model": "WRX",
    "vin": "JF1VA2L66F9805932",
    "storageLocation": "Westlake Village",
    "fairMarketValue": 50000,
    "insuranceRiderRequired": false,
    "insuranceRiderAmount": 0,
    "licensePlate": "7/26/2024",
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
    "id": "167",
    "customerId": "c67",
    "authorizedDrivers": [],
    "year": "2024",
    "make": "Porsche",
    "model": "Dakar",
    "vin": "WP0AB2A97RS225069",
    "storageLocation": "Westlake Village",
    "fairMarketValue": 250000,
    "insuranceRiderRequired": false,
    "insuranceRiderAmount": 0,
    "licensePlate": "",
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