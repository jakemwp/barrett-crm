export interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  type: 'Individual' | 'Business';
  membershipLevel: 'Basic' | 'Premium' | 'VIP' | 'Enterprise';
  storageLocation: string;
  email: string;
  phone: string;
  streetAddress: string;
  city: string;
  state: string;
  zipCode: string;
  storageSpots: number;
  showPandaDocForm: boolean;
  dateCreated: string;
  password: string;
  magicLink?: string;
  numRows: number;
  manualPrice?: number;
  createdAt: string;
  updatedAt: string;
}

export interface AuthorizedDriver {
  id: string;
  name: string;
  phone: string;
  email: string;
  licenseNumber: string;
  relationship: string;
}

export interface AuthorizedContact {
  id: string;
  name: string;
  phone: string;
  email: string;
  relationship: string;
  canDropoff: boolean;
  canPickup: boolean;
}

export interface Vehicle {
  id: string;
  customerId: string;
  authorizedDrivers: AuthorizedDriver[];
  year: number;
  make: string;
  model: string;
  vin: string;
  storageLocation: string;
  fairMarketValue: number;
  insuranceRiderRequired: boolean;
  insuranceRiderAmount?: number;
  licensePlate: string;
  registration: {
    number: string;
    expirationDate: string;
    state: string;
  };
  tirePressureDefault: {
    front: number;
    rear: number;
  };
  tirePressurePreferred: {
    front: number;
    rear: number;
  };
  maintenanceSchedule: {
    lastService?: string;
    nextService?: string;
    serviceInterval: number; // in months
    notes?: string;
  };
  authorizedContacts: AuthorizedContact[];
  odometer: number;
  image?: string;
  fuelLevel: number; // percentage 0-100
  batteryType: 'Standard' | 'AGM' | 'Lithium' | 'Gel' | 'Other';
  color?: string;
  createdAt: string;
  updatedAt: string;
}

export enum CheckStatus {
  CHECKED_IN = 'CHECKED_IN',
  CHECKED_OUT = 'CHECKED_OUT',
  IN_SERVICE = 'IN_SERVICE',
}

export enum CheckType {
  CHECK_IN = 'CHECK_IN',
  CHECK_OUT = 'CHECK_OUT',
}

export interface TirePressureReading {
  passengerFront: number;
  passengerRear: number;
  driverFront: number;
  driverRear: number;
}

export interface VehicleInspectionPhotos {
  // Basic photos
  driverPic?: string;
  passengerPic?: string;
  frontPic?: string;
  rearPic?: string;
  
  // Walk around and engine
  walkAroundVideo?: string;
  engineBayPics?: string[];
  
  // Front section
  hoodPics?: string[];
  grillePics?: string[];
  headlightPics?: string[];
  frontBumperPics?: string[];
  
  // Passenger side
  passengerSideFrontFenderPics?: string[];
  passengerSideFrontWheelPics?: string[];
  passengerSidePillarPics?: string[];
  passengerSideDoorPics?: string[];
  passengerSideDoorHandlePics?: string[];
  passengerSideRearFenderPics?: string[];
  passengerSideRearWheelPics?: string[];
  passengerSideMirrorPics?: string[];
  
  // Rear section
  trunkExteriorPics?: string[];
  trunkInteriorPics?: string[];
  rearLightPics?: string[];
  bumperPics?: string[];
  
  // Driver side
  driverSideRearFenderPics?: string[];
  driverSideRearWheelPics?: string[];
  driverSidePillarPics?: string[];
  driverSideDoorPics?: string[];
  driverSideDoorHandlePics?: string[];
  driverSideFrontFenderPics?: string[];
  driverSideFrontWheelPics?: string[];
  driverSideMirrorPics?: string[];
  
  // Top and roof
  roofPics?: string[];
  
  // Interior
  driverSideDoorTrimPics?: string[];
  driverSideSeatPics?: string[];
  driverSideFloorMatPics?: string[];
  dashboardPics?: string[]; // Include odometer & fuel level
  entertainmentCenterPics?: string[];
  centerConsoleInteriorPics?: string[];
  centerConsoleExteriorPics?: string[];
  passengerSideDoorTrimPics?: string[];
  passengerSideSeatPics?: string[];
  passengerSideFloorMatPics?: string[];
  gloveBoxInteriorPics?: string[];
  gloveBoxExteriorPics?: string[];
}

export interface CheckInOut {
  id: string;
  vehicleId: string;
  customerId: string;
  
  // Basic information
  date: string;
  type: CheckType;
  location: string;
  contact: string;
  status: CheckStatus;
  
  // Check-in/out times
  checkInDate?: string;
  checkOutDate?: string;
  
  // Vehicle condition at time of service
  fuelLevel?: number;
  mileage?: number;
  
  // Tire pressures
  tirePressure?: TirePressureReading;
  
  // Vehicle preparation
  carCover?: boolean;
  killSwitch?: boolean;
  startupDirections?: string;
  
  // Delivery information
  deliveryAddress?: string;
  
  // Documentation
  notes?: string;
  signature?: string; // Base64 encoded signature image
  
  // Photos and videos
  photos?: VehicleInspectionPhotos;
  
  // Service items
  serviceItems?: ServiceItem[];
  
  // Timestamps
  createdAt: string;
  updatedAt: string;
}

export interface ServiceItem {
  id: string;
  checkInOutId: string;
  description: string;
  cost: number;
  completed: boolean;
  completedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: 'Admin' | 'Manager' | 'Staff' | 'Viewer';
  avatar?: string;
  phone?: string;
  department?: string;
  lastLogin?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface UserSession {
  user: User;
  token: string;
  expiresAt: string;
}