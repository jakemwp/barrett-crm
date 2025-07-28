export interface Customer {
  id: string;
  firstName: string | null;
  lastName: string | null;
  type: 'Individual' | 'Business';
  membershipLevel: 'Basic' | 'Premium' | 'VIP' | 'Enterprise' | 'Archived';
  storageLocation: string | null;
  email: string | null;
  phone: string | null;
  streetAddress: string | null;
  city: string | null;
  state: string | null;
  zipCode: string | null;
  storageSpots: number;
  showPandaDocForm: boolean;
  dateCreated: string;
  password: string | null;
  numRows: number;
  manualPrice?: number | null;
  createdAt: string;
  updatedAt: string;
}

export interface AuthorizedDriver {
  id: string;
  name: string;
  phone: string | null;
  email: string | null;
  licenseNumber: string | null;
  relationship: string | null;
}

export interface Vehicle {
  id: string;
  customerId: string;
  authorizedDrivers: AuthorizedDriver[];
  year: number | null;
  make: string | null;
  model: string | null;
  vin: string | null;
  storageLocation: string | null;
  fairMarketValue: number;
  insuranceRiderRequired: boolean;
  insuranceRiderAmount?: number | null;
  insuranceStatus?: string | null;
  insurancePolicyHolder?: string | null;
  insuranceStartDate?: string | null;
  insuranceExpirationDate?: string | null;
  insuranceProvider?: string | null;
  insurancePolicyNumber?: string | null;
  licensePlate: string | null;
  registration?: {
    expirationDate: string | null;
    state: string | null;
  };
  tirePressureDefault: {
    front: number;
    rear: number;
  };
  tirePressurePreferred: {
    front: number;
    rear: number;
  };
  hasPreferredPressure?: boolean;
  odometer: number | null;
  image?: string | null;
  fuelLevel: number; // percentage 0-100
  batteryType: 'Standard' | 'AGM' | 'Lithium' | 'Gel' | 'Other';
  proofOfOwnership: 'Vehicle Registration' | 'Temporary Operating Permit' | 'Proof of Insurance' | null;
  color?: string | null;
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
  passengerFront: number | null;
  passengerRear: number | null;
  driverFront: number | null;
  driverRear: number | null;
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
  interiorPics?: string[];
}

export interface CheckInOut {
  id: string;
  vehicleId: string;
  customerId: string;
  
  // Basic information
  date: string | null;
  type: CheckType | null;
  location: string | null;
  contact: string | null;
  status: CheckStatus;
  
  // Check-in/out times
  checkInDate?: string | null;
  checkOutDate?: string | null;
  
  // Vehicle condition at time of service
  fuelLevel?: number | null;
  mileage?: number | null;
  
  // Tire pressures
  tirePressure?: TirePressureReading | null;
  
  // Vehicle preparation
  carCover?: boolean;
  killSwitch?: boolean;
  startupDirections?: string | null;
  
  // Delivery information
  deliveryAddress?: string | null;
  
  // Documentation
  notes?: string | null;
  signature?: string | null;
  
  // Photos and videos
  photos?: VehicleInspectionPhotos | null;
  
  // Service items
  serviceItems?: ServiceItem[] | null;
  
  // Timestamps
  createdAt: string;
  updatedAt: string;
}

export interface ServiceItem {
  id: string;
  checkInOutId: string;
  description: string | null;
  cost: number;
  completed: boolean;
  completedAt?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: 'Admin' | 'Manager' | 'Staff' | 'Viewer' | 'Customer';
  avatar?: string | null;
  phone?: string | null;
  department?: string | null;
  lastLogin?: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  customerId?: string; // For customer users, reference to customer record
}

export interface UserSession {
  user: User;
  token: string;
  expiresAt: string;
}