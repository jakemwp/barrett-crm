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
    firstName: 'Jeremy',
    lastName: 'Renstrom',
    email: 'jeremyr@barrettbuilding.com',
    password: 'BAG8958',
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
  },
  {
    "id": "c4",
    "firstName": "Antonsen, Chris",
    "lastName": " ",
    "type": "Individual",
    "membershipLevel": "Standard",
    "storageLocation": "Moorpark",
    "email": "antonsenchris3@gmail.com",
    "phone": "(818) 381-7105",
    "streetAddress": "4565 Wolsey Court",
    "city": "Westlak",
    "state": "Village,",
    "zipCode": "CA",
    "storageSpots": "1",
    "showPandaDocForm": false,
    "dateCreated": "2025-06-27",
    "password": "placeholder",
    "numRows": 1,
    "manualprice": null,
    "createdAt": "2025-06-27T10:30:00Z",
    "updatedAt": "2025-06-27T10:30:00Z"
  },
  {
    "id": "c5",
    "firstName": "Assil, Kam",
    "lastName": " ",
    "type": "Individual",
    "membershipLevel": "Standard",
    "storageLocation": "Westlake",
    "email": "kamassil@gmail.com",
    "phone": "(805) 405-2054",
    "streetAddress": "5124 Oxley Place",
    "city": "Westlak",
    "state": "Village,",
    "zipCode": "CA",
    "storageSpots": "1",
    "showPandaDocForm": false,
    "dateCreated": "2025-06-27",
    "password": "placeholder",
    "numRows": 1,
    "manualprice": null,
    "createdAt": "2025-06-27T10:30:00Z",
    "updatedAt": "2025-06-27T10:30:00Z"
  },
  {
    "id": "c6",
    "firstName": "Barrett Whips ",
    "lastName": " ",
    "type": "Individual",
    "membershipLevel": "Standard",
    "storageLocation": "Westlake",
    "email": "lindsay@barrettassociatesllc.com",
    "phone": "805-559-1028",
    "streetAddress": "868 Patriot Drive Unit A",
    "city": "Moorpark",
    "state": "CA",
    "zipCode": "93021",
    "storageSpots": "10",
    "showPandaDocForm": false,
    "dateCreated": "2025-06-27",
    "password": "placeholder",
    "numRows": 1,
    "manualprice": null,
    "createdAt": "2025-06-27T10:30:00Z",
    "updatedAt": "2025-06-27T10:30:00Z"
  },
  {
    "id": "c7",
    "firstName": "Barrett, Kevin",
    "lastName": " ",
    "type": "Individual",
    "membershipLevel": "Standard",
    "storageLocation": "N/A",
    "email": "kevin@barrettbuilding.com",
    "phone": "N/A",
    "streetAddress": "N/A",
    "city": "N/",
    "state": null,
    "zipCode": null,
    "storageSpots": "N/A",
    "showPandaDocForm": false,
    "dateCreated": "2025-06-27",
    "password": "placeholder",
    "numRows": 1,
    "manualprice": null,
    "createdAt": "2025-06-27T10:30:00Z",
    "updatedAt": "2025-06-27T10:30:00Z"
  },
  {
    "id": "c8",
    "firstName": "Biehl, Jake",
    "lastName": " ",
    "type": "Individual",
    "membershipLevel": "Standard",
    "storageLocation": "N/A",
    "email": "jb@dvi360.com",
    "phone": "N/A",
    "streetAddress": "N/A",
    "city": "N/",
    "state": null,
    "zipCode": null,
    "storageSpots": "N/A",
    "showPandaDocForm": false,
    "dateCreated": "2025-06-27",
    "password": "placeholder",
    "numRows": 1,
    "manualprice": null,
    "createdAt": "2025-06-27T10:30:00Z",
    "updatedAt": "2025-06-27T10:30:00Z"
  },
  {
    "id": "c9",
    "firstName": "Boerger, Aaron",
    "lastName": " ",
    "type": "Individual",
    "membershipLevel": "Standard",
    "storageLocation": "N/A",
    "email": "ab@dvi360.com",
    "phone": "N/A",
    "streetAddress": "N/A",
    "city": "N/",
    "state": null,
    "zipCode": null,
    "storageSpots": "N/A",
    "showPandaDocForm": false,
    "dateCreated": "2025-06-27",
    "password": "placeholder",
    "numRows": 1,
    "manualprice": null,
    "createdAt": "2025-06-27T10:30:00Z",
    "updatedAt": "2025-06-27T10:30:00Z"
  },
  {
    "id": "c10",
    "firstName": "Boztepe, Dylan",
    "lastName": " ",
    "type": "Individual",
    "membershipLevel": "Standard",
    "storageLocation": "N/A",
    "email": "dylanboztepe@barrettautomotivegroup.com",
    "phone": "(310)488-9198",
    "streetAddress": "N/A",
    "city": "N/",
    "state": null,
    "zipCode": null,
    "storageSpots": "N/A",
    "showPandaDocForm": false,
    "dateCreated": "2025-06-27",
    "password": "placeholder",
    "numRows": 1,
    "manualprice": null,
    "createdAt": "2025-06-27T10:30:00Z",
    "updatedAt": "2025-06-27T10:30:00Z"
  },
  {
    "id": "c11",
    "firstName": "Boztepe, Dylan",
    "lastName": " ",
    "type": "Individual",
    "membershipLevel": "Standard",
    "storageLocation": "Moorpark",
    "email": "dylanboztepe1@gmail.com",
    "phone": "(310)488-9198",
    "streetAddress": "621 Rushing Creek Pl",
    "city": "Thousan",
    "state": "Oaks,",
    "zipCode": "CA",
    "storageSpots": "1",
    "showPandaDocForm": false,
    "dateCreated": "2025-06-27",
    "password": "placeholder",
    "numRows": 1,
    "manualprice": null,
    "createdAt": "2025-06-27T10:30:00Z",
    "updatedAt": "2025-06-27T10:30:00Z"
  },
  {
    "id": "c12",
    "firstName": "Brodsly, Jeffrey",
    "lastName": " ",
    "type": "Individual",
    "membershipLevel": "Standard",
    "storageLocation": "Moorpark",
    "email": "jeff@100group.com",
    "phone": "(805) 807-0195",
    "streetAddress": "4263 Tierra Rejada Rd #213",
    "city": "Moorpark",
    "state": "CA",
    "zipCode": "93021",
    "storageSpots": "1",
    "showPandaDocForm": false,
    "dateCreated": "2025-06-27",
    "password": "placeholder",
    "numRows": 1,
    "manualprice": null,
    "createdAt": "2025-06-27T10:30:00Z",
    "updatedAt": "2025-06-27T10:30:00Z"
  },
  {
    "id": "c13",
    "firstName": "Button, Jenson",
    "lastName": " ",
    "type": "Individual",
    "membershipLevel": "Standard",
    "storageLocation": "Westlake",
    "email": "jenson@radford.co",
    "phone": "(310) 854-9699",
    "streetAddress": "2969 Calbourne Lane",
    "city": "Thousan",
    "state": "Oaks,",
    "zipCode": "CA",
    "storageSpots": "",
    "showPandaDocForm": false,
    "dateCreated": "2025-06-27",
    "password": "placeholder",
    "numRows": 1,
    "manualprice": null,
    "createdAt": "2025-06-27T10:30:00Z",
    "updatedAt": "2025-06-27T10:30:00Z"
  },
  {
    "id": "c14",
    "firstName": "C&H Construction ",
    "lastName": " ",
    "type": "Individual",
    "membershipLevel": "Standard",
    "storageLocation": "Moorpark & Westlake",
    "email": "jeff@candhconstruction.net",
    "phone": "(805) 495-0679",
    "streetAddress": "3315 Grande Vista Drive",
    "city": "Newbur",
    "state": "Park,",
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
    "id": "c15",
    "firstName": "Casson, Daniel",
    "lastName": " ",
    "type": "Individual",
    "membershipLevel": "Standard",
    "storageLocation": "Moorpark",
    "email": "dano4643@gmail.com",
    "phone": "805-207-6832",
    "streetAddress": "11546 Willowood Ct",
    "city": "Moorpark",
    "state": "CA",
    "zipCode": "93021",
    "storageSpots": "1",
    "showPandaDocForm": false,
    "dateCreated": "2025-06-27",
    "password": "placeholder",
    "numRows": 1,
    "manualprice": null,
    "createdAt": "2025-06-27T10:30:00Z",
    "updatedAt": "2025-06-27T10:30:00Z"
  },
  {
    "id": "c16",
    "firstName": "Cobey, Richard",
    "lastName": " ",
    "type": "Individual",
    "membershipLevel": "Standard",
    "storageLocation": "Moorpark",
    "email": "musicrc@gmail.com",
    "phone": "(818) 307-6515",
    "streetAddress": "5739 Indian Point Drive",
    "city": "Sim",
    "state": "Valley,",
    "zipCode": "CA",
    "storageSpots": "1",
    "showPandaDocForm": false,
    "dateCreated": "2025-06-27",
    "password": "placeholder",
    "numRows": 1,
    "manualprice": null,
    "createdAt": "2025-06-27T10:30:00Z",
    "updatedAt": "2025-06-27T10:30:00Z"
  },
  {
    "id": "c17",
    "firstName": "Cohen, Assaf",
    "lastName": " ",
    "type": "Individual",
    "membershipLevel": "Standard",
    "storageLocation": "Moorpark",
    "email": "lp2mnp@gmail.com",
    "phone": "(818) 825-3764",
    "streetAddress": "5724 Tenneyson Drive",
    "city": "Agour",
    "state": "Hills,",
    "zipCode": "CA",
    "storageSpots": "3",
    "showPandaDocForm": false,
    "dateCreated": "2025-06-27",
    "password": "placeholder",
    "numRows": 1,
    "manualprice": null,
    "createdAt": "2025-06-27T10:30:00Z",
    "updatedAt": "2025-06-27T10:30:00Z"
  },
  {
    "id": "c18",
    "firstName": "Cypers, Rory",
    "lastName": " ",
    "type": "Individual",
    "membershipLevel": "Standard",
    "storageLocation": "Westlake",
    "email": "rorycypers@yahoo.com",
    "phone": "310-463-5620",
    "streetAddress": "3816 Bowsprit Circle",
    "city": "Westlak",
    "state": "Village,",
    "zipCode": "CA",
    "storageSpots": "1",
    "showPandaDocForm": false,
    "dateCreated": "2025-06-27",
    "password": "placeholder",
    "numRows": 1,
    "manualprice": null,
    "createdAt": "2025-06-27T10:30:00Z",
    "updatedAt": "2025-06-27T10:30:00Z"
  },
  {
    "id": "c19",
    "firstName": "Dev Test",
    "lastName": " ",
    "type": "Individual",
    "membershipLevel": "Standard",
    "storageLocation": "N/A",
    "email": "dev2@dvi360.com",
    "phone": "",
    "streetAddress": "",
    "city": false,
    "state": null,
    "zipCode": null,
    "storageSpots": "",
    "showPandaDocForm": false,
    "dateCreated": "2025-06-27",
    "password": "placeholder",
    "numRows": 1,
    "manualprice": null,
    "createdAt": "2025-06-27T10:30:00Z",
    "updatedAt": "2025-06-27T10:30:00Z"
  },
  {
    "id": "c20",
    "firstName": "DHK Plumbing ",
    "lastName": " ",
    "type": "Individual",
    "membershipLevel": "Standard",
    "storageLocation": "Moorpark",
    "email": "Joe@dhkplumbing.com",
    "phone": "562-762-6176",
    "streetAddress": "2105 West San Bernardino Road",
    "city": "Wes",
    "state": "Covina,",
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
    "id": "c21",
    "firstName": "Einstein, David",
    "lastName": " ",
    "type": "Individual",
    "membershipLevel": "Standard",
    "storageLocation": "Moorpark",
    "email": "deinstein@skyreachsystems.com",
    "phone": "310-717-7087",
    "streetAddress": "3925 Hitch Blvd.",
    "city": "Moorpark",
    "state": "CA",
    "zipCode": "93021",
    "storageSpots": "1",
    "showPandaDocForm": false,
    "dateCreated": "2025-06-27",
    "password": "placeholder",
    "numRows": 1,
    "manualprice": null,
    "createdAt": "2025-06-27T10:30:00Z",
    "updatedAt": "2025-06-27T10:30:00Z"
  },
  {
    "id": "c22",
    "firstName": "English, Alfred",
    "lastName": " ",
    "type": "Individual",
    "membershipLevel": "Standard",
    "storageLocation": "Moorpark",
    "email": "alfred@sespecreekspirits.com",
    "phone": "(626) 676-0031",
    "streetAddress": "701 Chapala Drive",
    "city": "Pacifi",
    "state": "Palisades,",
    "zipCode": "CA",
    "storageSpots": "1",
    "showPandaDocForm": false,
    "dateCreated": "2025-06-27",
    "password": "placeholder",
    "numRows": 1,
    "manualprice": null,
    "createdAt": "2025-06-27T10:30:00Z",
    "updatedAt": "2025-06-27T10:30:00Z"
  },
  {
    "id": "c23",
    "firstName": "Ercolani, Russ",
    "lastName": " ",
    "type": "Individual",
    "membershipLevel": "Standard",
    "storageLocation": "Moorpark",
    "email": "russ.ercolani@gmail.com",
    "phone": "(805) 990-0475",
    "streetAddress": "4229 Kingsview Rd.",
    "city": "Moorpark",
    "state": "CA",
    "zipCode": "93021",
    "storageSpots": "1",
    "showPandaDocForm": false,
    "dateCreated": "2025-06-27",
    "password": "placeholder",
    "numRows": 1,
    "manualprice": null,
    "createdAt": "2025-06-27T10:30:00Z",
    "updatedAt": "2025-06-27T10:30:00Z"
  },
  {
    "id": "c24",
    "firstName": "Forte, Demetrius",
    "lastName": " ",
    "type": "Individual",
    "membershipLevel": "Standard",
    "storageLocation": "Westlake",
    "email": "gooman68.df@gmail.com",
    "phone": "(216) 235-6345",
    "streetAddress": "",
    "city": false,
    "state": null,
    "zipCode": null,
    "storageSpots": "N/A",
    "showPandaDocForm": false,
    "dateCreated": "2025-06-27",
    "password": "placeholder",
    "numRows": 1,
    "manualprice": null,
    "createdAt": "2025-06-27T10:30:00Z",
    "updatedAt": "2025-06-27T10:30:00Z"
  },
  {
    "id": "c25",
    "firstName": "Friese, Donald",
    "lastName": " ",
    "type": "Individual",
    "membershipLevel": "Standard",
    "storageLocation": "Moorpark",
    "email": "dj.friese@gmail.com",
    "phone": "818-554-2223",
    "streetAddress": "22555 La Quilla Drive",
    "city": "Chatsworth",
    "state": "CA",
    "zipCode": "91311",
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
    "id": "c26",
    "firstName": "Gamboa, Joshua",
    "lastName": " ",
    "type": "Individual",
    "membershipLevel": "Standard",
    "storageLocation": "Moorpark",
    "email": "joshuarobert100@gmail.com",
    "phone": "818-983-6207",
    "streetAddress": "11323 Blythe St.",
    "city": "Su",
    "state": "Valley,",
    "zipCode": "CA",
    "storageSpots": "1",
    "showPandaDocForm": false,
    "dateCreated": "2025-06-27",
    "password": "placeholder",
    "numRows": 1,
    "manualprice": null,
    "createdAt": "2025-06-27T10:30:00Z",
    "updatedAt": "2025-06-27T10:30:00Z"
  },
  {
    "id": "c27",
    "firstName": "Gamboa, Joshua",
    "lastName": " ",
    "type": "Individual",
    "membershipLevel": "Standard",
    "storageLocation": "N/A",
    "email": "joshuagamboa@barrettautomotivegroup.com",
    "phone": "N/A",
    "streetAddress": "N/A",
    "city": "N/",
    "state": null,
    "zipCode": null,
    "storageSpots": "N/A",
    "showPandaDocForm": false,
    "dateCreated": "2025-06-27",
    "password": "placeholder",
    "numRows": 1,
    "manualprice": null,
    "createdAt": "2025-06-27T10:30:00Z",
    "updatedAt": "2025-06-27T10:30:00Z"
  },
  {
    "id": "c28",
    "firstName": "Garcia, John",
    "lastName": " ",
    "type": "Individual",
    "membershipLevel": "Standard",
    "storageLocation": "Moorpark",
    "email": "john@johngarcia.org",
    "phone": "(310) 600-6464",
    "streetAddress": "12009 Haven Crest St.",
    "city": "Moorpark",
    "state": "CA",
    "zipCode": "93021",
    "storageSpots": "1",
    "showPandaDocForm": false,
    "dateCreated": "2025-06-27",
    "password": "placeholder",
    "numRows": 1,
    "manualprice": null,
    "createdAt": "2025-06-27T10:30:00Z",
    "updatedAt": "2025-06-27T10:30:00Z"
  },
  {
    "id": "c29",
    "firstName": "Garland, Jon",
    "lastName": " ",
    "type": "Individual",
    "membershipLevel": "Standard",
    "storageLocation": "Moorpark",
    "email": "gland20@aol.com",
    "phone": "(520) 241-4816",
    "streetAddress": "1234 Heritage Pl",
    "city": "Westlak",
    "state": "Village,",
    "zipCode": "CA",
    "storageSpots": "3",
    "showPandaDocForm": false,
    "dateCreated": "2025-06-27",
    "password": "placeholder",
    "numRows": 1,
    "manualprice": null,
    "createdAt": "2025-06-27T10:30:00Z",
    "updatedAt": "2025-06-27T10:30:00Z"
  },
  {
    "id": "c30",
    "firstName": "Geyer, Greg",
    "lastName": " ",
    "type": "Individual",
    "membershipLevel": "Standard",
    "storageLocation": "Moorpark",
    "email": "gregtgeyer@gmail.com",
    "phone": "(310) 463-2271",
    "streetAddress": "1339 Falling Star Avenue",
    "city": "Westlak",
    "state": "Village,",
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
    "id": "c31",
    "firstName": "Herbert, Richard",
    "lastName": " ",
    "type": "Individual",
    "membershipLevel": "Standard",
    "storageLocation": "Westlake",
    "email": "richard@helixrecruiting.com",
    "phone": "(801) 916-2930",
    "streetAddress": "11950 Beach Club Way",
    "city": "Malibu",
    "state": "CA",
    "zipCode": "90265",
    "storageSpots": "3",
    "showPandaDocForm": false,
    "dateCreated": "2025-06-27",
    "password": "placeholder",
    "numRows": 1,
    "manualprice": null,
    "createdAt": "2025-06-27T10:30:00Z",
    "updatedAt": "2025-06-27T10:30:00Z"
  },
  {
    "id": "c32",
    "firstName": "Ingoldsby, Kenneth",
    "lastName": " ",
    "type": "Individual",
    "membershipLevel": "Standard",
    "storageLocation": "Moorpark",
    "email": "kenslaw01@aim.com",
    "phone": "818-983-6207",
    "streetAddress": "13636 Ventura Blvd #457",
    "city": "Sherma",
    "state": "Oaks,",
    "zipCode": "CA",
    "storageSpots": "1",
    "showPandaDocForm": false,
    "dateCreated": "2025-06-27",
    "password": "placeholder",
    "numRows": 1,
    "manualprice": null,
    "createdAt": "2025-06-27T10:30:00Z",
    "updatedAt": "2025-06-27T10:30:00Z"
  },
  {
    "id": "c33",
    "firstName": "Johnson, Kurt",
    "lastName": " ",
    "type": "Individual",
    "membershipLevel": "Standard",
    "storageLocation": "Moorpark",
    "email": "kjohnson@hunterrainier.com",
    "phone": "(805) 551-6258",
    "streetAddress": "2284 Stacy Ln.",
    "city": "Camarillo",
    "state": "CA",
    "zipCode": "93012",
    "storageSpots": "1",
    "showPandaDocForm": false,
    "dateCreated": "2025-06-27",
    "password": "placeholder",
    "numRows": 1,
    "manualprice": null,
    "createdAt": "2025-06-27T10:30:00Z",
    "updatedAt": "2025-06-27T10:30:00Z"
  },
  {
    "id": "c34",
    "firstName": "Johnson, Paul",
    "lastName": " ",
    "type": "Individual",
    "membershipLevel": "Standard",
    "storageLocation": "Moorpark",
    "email": "paulj89@hotmail.com",
    "phone": "(818) 825 - 8611",
    "streetAddress": "13536 Pacific Breeze Dr.",
    "city": "Sant",
    "state": "Rosa",
    "zipCode": "Valley,",
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
    "id": "c35",
    "firstName": "Jones, Brian",
    "lastName": " ",
    "type": "Individual",
    "membershipLevel": "Standard",
    "storageLocation": "Moorpark",
    "email": "brianjones81@earthlink.net",
    "phone": "(805) 241-1735",
    "streetAddress": "13723 Nightsky Drive",
    "city": "Sant",
    "state": "Rosa",
    "zipCode": "Valley,",
    "storageSpots": "5",
    "showPandaDocForm": false,
    "dateCreated": "2025-06-27",
    "password": "placeholder",
    "numRows": 1,
    "manualprice": null,
    "createdAt": "2025-06-27T10:30:00Z",
    "updatedAt": "2025-06-27T10:30:00Z"
  },
  {
    "id": "c36",
    "firstName": "Kirtley, Denise",
    "lastName": " ",
    "type": "Individual",
    "membershipLevel": "Standard",
    "storageLocation": "Westlake",
    "email": "denisepkirtley@gmail.com",
    "phone": "310-962-1827",
    "streetAddress": "420 Upper Lake Road",
    "city": "Thousan",
    "state": "Oaks,",
    "zipCode": "CA",
    "storageSpots": "1",
    "showPandaDocForm": false,
    "dateCreated": "2025-06-27",
    "password": "placeholder",
    "numRows": 1,
    "manualprice": null,
    "createdAt": "2025-06-27T10:30:00Z",
    "updatedAt": "2025-06-27T10:30:00Z"
  },
  {
    "id": "c37",
    "firstName": "Lotus USA",
    "lastName": " ",
    "type": "Individual",
    "membershipLevel": "Standard",
    "storageLocation": "Moorpark",
    "email": "jane.lonsdale@lotuscars.com",
    "phone": "805-233-4987",
    "streetAddress": "11988 Challenger Ct",
    "city": "Moorpark",
    "state": "CA",
    "zipCode": "93021",
    "storageSpots": "1",
    "showPandaDocForm": false,
    "dateCreated": "2025-06-27",
    "password": "placeholder",
    "numRows": 1,
    "manualprice": null,
    "createdAt": "2025-06-27T10:30:00Z",
    "updatedAt": "2025-06-27T10:30:00Z"
  },
  {
    "id": "c38",
    "firstName": "Ludwick, Matthew",
    "lastName": " ",
    "type": "Individual",
    "membershipLevel": "Standard",
    "storageLocation": "Moorpark",
    "email": "matt@bighornprecision.com",
    "phone": "(406) 559-6579",
    "streetAddress": "16 N Montana St",
    "city": "Butte",
    "state": "MT",
    "zipCode": "59701",
    "storageSpots": "1",
    "showPandaDocForm": false,
    "dateCreated": "2025-06-27",
    "password": "placeholder",
    "numRows": 1,
    "manualprice": null,
    "createdAt": "2025-06-27T10:30:00Z",
    "updatedAt": "2025-06-27T10:30:00Z"
  },
  {
    "id": "c39",
    "firstName": "Lydick, Kevin",
    "lastName": " ",
    "type": "Individual",
    "membershipLevel": "Standard",
    "storageLocation": "Moorpark",
    "email": "kevin@oakridgelandworks.com",
    "phone": "(805) 630-8377",
    "streetAddress": "3106 Tanglewood Ct.",
    "city": "Thousan",
    "state": "Oaks,",
    "zipCode": "CA",
    "storageSpots": "3",
    "showPandaDocForm": false,
    "dateCreated": "2025-06-27",
    "password": "placeholder",
    "numRows": 1,
    "manualprice": null,
    "createdAt": "2025-06-27T10:30:00Z",
    "updatedAt": "2025-06-27T10:30:00Z"
  },
  {
    "id": "c40",
    "firstName": "Malfa, Vincent",
    "lastName": " ",
    "type": "Individual",
    "membershipLevel": "Standard",
    "storageLocation": "Moorpark",
    "email": "vgm@tripledistilled.com",
    "phone": "(508) 859-0390",
    "streetAddress": "710 Calle Cardo",
    "city": "Thousan",
    "state": "Oaks,",
    "zipCode": "CA",
    "storageSpots": "1",
    "showPandaDocForm": false,
    "dateCreated": "2025-06-27",
    "password": "placeholder",
    "numRows": 1,
    "manualprice": null,
    "createdAt": "2025-06-27T10:30:00Z",
    "updatedAt": "2025-06-27T10:30:00Z"
  },
  {
    "id": "c41",
    "firstName": "Mansell, Gerald",
    "lastName": " ",
    "type": "Individual",
    "membershipLevel": "Standard",
    "storageLocation": "Moorpark",
    "email": "gerrymansell@icloud.com",
    "phone": "808-375-7971",
    "streetAddress": "604 N Kalaheo Ave",
    "city": "Kailua",
    "state": "HI",
    "zipCode": "96734",
    "storageSpots": "1",
    "showPandaDocForm": false,
    "dateCreated": "2025-06-27",
    "password": "placeholder",
    "numRows": 1,
    "manualprice": null,
    "createdAt": "2025-06-27T10:30:00Z",
    "updatedAt": "2025-06-27T10:30:00Z"
  },
  {
    "id": "c42",
    "firstName": "Marmonte Cars, LLC",
    "lastName": " ",
    "type": "Individual",
    "membershipLevel": "Standard",
    "storageLocation": "Moorpark",
    "email": "sergio@migramer.com",
    "phone": "310-795-2001",
    "streetAddress": "30130 Mullholland Hwy",
    "city": "Agoura",
    "state": "CA",
    "zipCode": "91301",
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
    "id": "c43",
    "firstName": "Matta, Joseph",
    "lastName": " ",
    "type": "Individual",
    "membershipLevel": "Standard",
    "storageLocation": "Moorpark",
    "email": "joe@hansonlab.com",
    "phone": "(805) 795-1300",
    "streetAddress": "747 Calle Plano",
    "city": "Camarillo",
    "state": "CA",
    "zipCode": "93012",
    "storageSpots": "1",
    "showPandaDocForm": false,
    "dateCreated": "2025-06-27",
    "password": "placeholder",
    "numRows": 1,
    "manualprice": null,
    "createdAt": "2025-06-27T10:30:00Z",
    "updatedAt": "2025-06-27T10:30:00Z"
  },
  {
    "id": "c44",
    "firstName": "McNeal, Greg",
    "lastName": " ",
    "type": "Individual",
    "membershipLevel": "Standard",
    "storageLocation": "Moorpark",
    "email": "gregory.mcneal.list@gmail.com",
    "phone": "512-413-3869",
    "streetAddress": "29615 Kimberly Drive",
    "city": "Agour",
    "state": "Hills,",
    "zipCode": "CA",
    "storageSpots": "1",
    "showPandaDocForm": false,
    "dateCreated": "2025-06-27",
    "password": "placeholder",
    "numRows": 1,
    "manualprice": null,
    "createdAt": "2025-06-27T10:30:00Z",
    "updatedAt": "2025-06-27T10:30:00Z"
  },
  {
    "id": "c45",
    "firstName": "Oropeza, Jared",
    "lastName": " ",
    "type": "Individual",
    "membershipLevel": "Standard",
    "storageLocation": "N/A",
    "email": "jaredoropeza@barrettautomotivegroup.com",
    "phone": "(805)279-2975",
    "streetAddress": "N/A",
    "city": "N/",
    "state": null,
    "zipCode": null,
    "storageSpots": "N/A",
    "showPandaDocForm": false,
    "dateCreated": "2025-06-27",
    "password": "placeholder",
    "numRows": 1,
    "manualprice": null,
    "createdAt": "2025-06-27T10:30:00Z",
    "updatedAt": "2025-06-27T10:30:00Z"
  },
  {
    "id": "c46",
    "firstName": "Pegler, Garrett",
    "lastName": " ",
    "type": "Individual",
    "membershipLevel": "Standard",
    "storageLocation": "Moorpark",
    "email": "garret@ghostshieldfilm.com",
    "phone": "(805) 427-5863",
    "streetAddress": "1168 Tourmaline Dr.",
    "city": "Newbur",
    "state": "Park,",
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
    "id": "c47",
    "firstName": "Pena, Steve",
    "lastName": " ",
    "type": "Individual",
    "membershipLevel": "Standard",
    "storageLocation": "Moorpark",
    "email": "steve@penaemail.com",
    "phone": "(310) 601-8771",
    "streetAddress": "2928 Shadow Brook Ln",
    "city": "Westlak",
    "state": "Village,",
    "zipCode": "CA",
    "storageSpots": "1",
    "showPandaDocForm": false,
    "dateCreated": "2025-06-27",
    "password": "placeholder",
    "numRows": 1,
    "manualprice": null,
    "createdAt": "2025-06-27T10:30:00Z",
    "updatedAt": "2025-06-27T10:30:00Z"
  },
  {
    "id": "c48",
    "firstName": "Pham, Tyrone",
    "lastName": " ",
    "type": "Individual",
    "membershipLevel": "Standard",
    "storageLocation": "Moorpark",
    "email": "ecoliex@yahoo.com",
    "phone": "(626) 600-7023",
    "streetAddress": "701 S Howard Ave. ste 106217",
    "city": "Tampa",
    "state": "FL",
    "zipCode": "33606",
    "storageSpots": "1",
    "showPandaDocForm": false,
    "dateCreated": "2025-06-27",
    "password": "placeholder",
    "numRows": 1,
    "manualprice": null,
    "createdAt": "2025-06-27T10:30:00Z",
    "updatedAt": "2025-06-27T10:30:00Z"
  },
  {
    "id": "c49",
    "firstName": "Powers, Thomas",
    "lastName": " ",
    "type": "Individual",
    "membershipLevel": "Standard",
    "storageLocation": "Moorpark",
    "email": "tomepowers@gmail.com",
    "phone": "805-915-8120",
    "streetAddress": "365 Jeremiah Drive Unit A",
    "city": "Sim",
    "state": "Valley,",
    "zipCode": "CA",
    "storageSpots": "1",
    "showPandaDocForm": false,
    "dateCreated": "2025-06-27",
    "password": "placeholder",
    "numRows": 1,
    "manualprice": null,
    "createdAt": "2025-06-27T10:30:00Z",
    "updatedAt": "2025-06-27T10:30:00Z"
  },
  {
    "id": "c50",
    "firstName": "Powers, Thomas",
    "lastName": " ",
    "type": "Individual",
    "membershipLevel": "Standard",
    "storageLocation": "N/A",
    "email": "thomasp@barrettbuilding.com",
    "phone": "N/A",
    "streetAddress": "N/A",
    "city": "N/",
    "state": null,
    "zipCode": null,
    "storageSpots": "N/A",
    "showPandaDocForm": false,
    "dateCreated": "2025-06-27",
    "password": "placeholder",
    "numRows": 1,
    "manualprice": null,
    "createdAt": "2025-06-27T10:30:00Z",
    "updatedAt": "2025-06-27T10:30:00Z"
  },
  {
    "id": "c51",
    "firstName": "Renstrom, Jeremy",
    "lastName": " ",
    "type": "Individual",
    "membershipLevel": "Standard",
    "storageLocation": "Moorpark",
    "email": "jeremyrenstrom@yahoo.com",
    "phone": "310-422-5742",
    "streetAddress": "21736 Roscoe Blvd #34",
    "city": "Canog",
    "state": "Park,",
    "zipCode": "CA",
    "storageSpots": "1",
    "showPandaDocForm": false,
    "dateCreated": "2025-06-27",
    "password": "placeholder",
    "numRows": 1,
    "manualprice": null,
    "createdAt": "2025-06-27T10:30:00Z",
    "updatedAt": "2025-06-27T10:30:00Z"
  },
  {
    "id": "c52",
    "firstName": "Renstrom, Jeremy",
    "lastName": " ",
    "type": "Individual",
    "membershipLevel": "Standard",
    "storageLocation": "N/A",
    "email": "jeremyr@barrettbuilding.com",
    "phone": "N/A",
    "streetAddress": "N/A",
    "city": "N/",
    "state": null,
    "zipCode": null,
    "storageSpots": "N/A",
    "showPandaDocForm": false,
    "dateCreated": "2025-06-27",
    "password": "placeholder",
    "numRows": 1,
    "manualprice": null,
    "createdAt": "2025-06-27T10:30:00Z",
    "updatedAt": "2025-06-27T10:30:00Z"
  },
  {
    "id": "c53",
    "firstName": "Richards, Josiah",
    "lastName": " ",
    "type": "Individual",
    "membershipLevel": "Standard",
    "storageLocation": "Moorpark",
    "email": "josiah@illusory.io",
    "phone": "(647) 270-5442",
    "streetAddress": "4500 Park Granada",
    "city": "Calabasas",
    "state": "CA",
    "zipCode": "91302",
    "storageSpots": "1",
    "showPandaDocForm": false,
    "dateCreated": "2025-06-27",
    "password": "placeholder",
    "numRows": 1,
    "manualprice": null,
    "createdAt": "2025-06-27T10:30:00Z",
    "updatedAt": "2025-06-27T10:30:00Z"
  },
  {
    "id": "c54",
    "firstName": "Shap, Joey",
    "lastName": " ",
    "type": "Individual",
    "membershipLevel": "Standard",
    "storageLocation": "Moorpark",
    "email": "joeyshap@gmail.com",
    "phone": "(805) 825-8462",
    "streetAddress": "501 S. Reino Rd. #226",
    "city": "Newbur",
    "state": "Park,",
    "zipCode": "CA",
    "storageSpots": "1",
    "showPandaDocForm": false,
    "dateCreated": "2025-06-27",
    "password": "placeholder",
    "numRows": 1,
    "manualprice": null,
    "createdAt": "2025-06-27T10:30:00Z",
    "updatedAt": "2025-06-27T10:30:00Z"
  },
  {
    "id": "c55",
    "firstName": "Shore, Andrew",
    "lastName": " ",
    "type": "Individual",
    "membershipLevel": "Standard",
    "storageLocation": "Westlake",
    "email": "an.shore@yahoo.com",
    "phone": "(310) 890-3799",
    "streetAddress": "1584 Fairmount Rd",
    "city": "Westlak",
    "state": "Village,",
    "zipCode": "CA",
    "storageSpots": "1",
    "showPandaDocForm": false,
    "dateCreated": "2025-06-27",
    "password": "placeholder",
    "numRows": 1,
    "manualprice": null,
    "createdAt": "2025-06-27T10:30:00Z",
    "updatedAt": "2025-06-27T10:30:00Z"
  },
  {
    "id": "c56",
    "firstName": "Shuken, Victoria",
    "lastName": " ",
    "type": "Individual",
    "membershipLevel": "Standard",
    "storageLocation": "Moorpark",
    "email": "tori_shuken@vistaauto.com",
    "phone": "(818) 207-9770",
    "streetAddress": "12626 Andalusia Drive",
    "city": "Sant",
    "state": "Rosa",
    "zipCode": "Valley,",
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
    "id": "c57",
    "firstName": "Singh, Tarnpreet",
    "lastName": " ",
    "type": "Individual",
    "membershipLevel": "Standard",
    "storageLocation": "Moorpark",
    "email": "asingh2033@gmail.com",
    "phone": "805-377-2472",
    "streetAddress": "5170 Edgar St",
    "city": "Oxnard",
    "state": "CA",
    "zipCode": "93033",
    "storageSpots": "3",
    "showPandaDocForm": false,
    "dateCreated": "2025-06-27",
    "password": "placeholder",
    "numRows": 1,
    "manualprice": null,
    "createdAt": "2025-06-27T10:30:00Z",
    "updatedAt": "2025-06-27T10:30:00Z"
  },
  {
    "id": "c58",
    "firstName": "Solomon, Nico",
    "lastName": " ",
    "type": "Individual",
    "membershipLevel": "Standard",
    "storageLocation": "Moorpark",
    "email": "solonico@sbcglobal.net",
    "phone": "(805) 558-8678",
    "streetAddress": "1634 River Wood Court",
    "city": "Sim",
    "state": "Valley,",
    "zipCode": "CA",
    "storageSpots": "1",
    "showPandaDocForm": false,
    "dateCreated": "2025-06-27",
    "password": "placeholder",
    "numRows": 1,
    "manualprice": null,
    "createdAt": "2025-06-27T10:30:00Z",
    "updatedAt": "2025-06-27T10:30:00Z"
  },
  {
    "id": "c59",
    "firstName": "Star Management (Kenneth Allen)",
    "lastName": " ",
    "type": "Individual",
    "membershipLevel": "Standard",
    "storageLocation": "Moorpark",
    "email": "kenneth.allen75@gmail.com",
    "phone": "(951) 425-8642",
    "streetAddress": "730 E Durant Ave Suite 200",
    "city": "Aspen",
    "state": "CO",
    "zipCode": "81611",
    "storageSpots": "3",
    "showPandaDocForm": false,
    "dateCreated": "2025-06-27",
    "password": "placeholder",
    "numRows": 1,
    "manualprice": null,
    "createdAt": "2025-06-27T10:30:00Z",
    "updatedAt": "2025-06-27T10:30:00Z"
  },
  {
    "id": "c60",
    "firstName": "Swink, Lindsay",
    "lastName": " ",
    "type": "Individual",
    "membershipLevel": "Standard",
    "storageLocation": "N/A",
    "email": "lindsay@barrettbuilding.com",
    "phone": "N/A",
    "streetAddress": "N/A",
    "city": "N/",
    "state": null,
    "zipCode": null,
    "storageSpots": "N/A",
    "showPandaDocForm": false,
    "dateCreated": "2025-06-27",
    "password": "placeholder",
    "numRows": 1,
    "manualprice": null,
    "createdAt": "2025-06-27T10:30:00Z",
    "updatedAt": "2025-06-27T10:30:00Z"
  },
  {
    "id": "c61",
    "firstName": "Tatum, Donovan",
    "lastName": " ",
    "type": "Individual",
    "membershipLevel": "Standard",
    "storageLocation": "Moorpark",
    "email": "donovan.tatum@caa.com",
    "phone": "(818) 648-3062",
    "streetAddress": "637 S. Lucerne Blvd",
    "city": "Lo",
    "state": "Angeles,",
    "zipCode": "CA",
    "storageSpots": "1",
    "showPandaDocForm": false,
    "dateCreated": "2025-06-27",
    "password": "placeholder",
    "numRows": 1,
    "manualprice": null,
    "createdAt": "2025-06-27T10:30:00Z",
    "updatedAt": "2025-06-27T10:30:00Z"
  },
  {
    "id": "c62",
    "firstName": "Telford, Ryan",
    "lastName": " ",
    "type": "Individual",
    "membershipLevel": "Standard",
    "storageLocation": "Moorpark",
    "email": "ryan.telford@amwins.com",
    "phone": "(818) 216-1792",
    "streetAddress": "1408 Kingsboro Court",
    "city": "Westlak",
    "state": "Village,",
    "zipCode": "CA",
    "storageSpots": "1",
    "showPandaDocForm": false,
    "dateCreated": "2025-06-27",
    "password": "placeholder",
    "numRows": 1,
    "manualprice": null,
    "createdAt": "2025-06-27T10:30:00Z",
    "updatedAt": "2025-06-27T10:30:00Z"
  },
  {
    "id": "c63",
    "firstName": "Thaxton & Associates (Mike Thaxton)",
    "lastName": " ",
    "type": "Individual",
    "membershipLevel": "Standard",
    "storageLocation": "Westlake",
    "email": "mike@thaxtonassociates.com",
    "phone": "(818) 633-9111",
    "streetAddress": "11338 Moorpark St.",
    "city": "Studi",
    "state": "City,",
    "zipCode": "CA",
    "storageSpots": "4",
    "showPandaDocForm": false,
    "dateCreated": "2025-06-27",
    "password": "placeholder",
    "numRows": 1,
    "manualprice": null,
    "createdAt": "2025-06-27T10:30:00Z",
    "updatedAt": "2025-06-27T10:30:00Z"
  },
  {
    "id": "c64",
    "firstName": "The Chosen Group Inc",
    "lastName": " ",
    "type": "Individual",
    "membershipLevel": "Standard",
    "storageLocation": "Moorpark",
    "email": "kacy@100group.com",
    "phone": "(805) 807-0195",
    "streetAddress": "4263 Tierra Rejada Rd #213",
    "city": "Moorpark",
    "state": "CA",
    "zipCode": "93021",
    "storageSpots": "1",
    "showPandaDocForm": false,
    "dateCreated": "2025-06-27",
    "password": "placeholder",
    "numRows": 1,
    "manualprice": null,
    "createdAt": "2025-06-27T10:30:00Z",
    "updatedAt": "2025-06-27T10:30:00Z"
  },
  {
    "id": "c65",
    "firstName": "Velocity Restoration LLC",
    "lastName": " ",
    "type": "Individual",
    "membershipLevel": "Standard",
    "storageLocation": "Moorpark",
    "email": "chris@velocityrestorations.com",
    "phone": "(850) 776-8729",
    "streetAddress": "15 E Quintette Rd",
    "city": "Cantonment",
    "state": "FL",
    "zipCode": "32533",
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
    "id": "c66",
    "firstName": "Virella, Anthony",
    "lastName": " ",
    "type": "Individual",
    "membershipLevel": "Standard",
    "storageLocation": "Westlake",
    "email": "avirella@yahoo.com",
    "phone": "(310) 622-5205",
    "streetAddress": "5959 Murphy Way",
    "city": "Malibu",
    "state": "CA",
    "zipCode": "90265",
    "storageSpots": "10",
    "showPandaDocForm": false,
    "dateCreated": "2025-06-27",
    "password": "placeholder",
    "numRows": 1,
    "manualprice": null,
    "createdAt": "2025-06-27T10:30:00Z",
    "updatedAt": "2025-06-27T10:30:00Z"
  },
  {
    "id": "c67",
    "firstName": "Williams, Deke",
    "lastName": " ",
    "type": "Individual",
    "membershipLevel": "Standard",
    "storageLocation": "Moorpark & Westlake",
    "email": "deke@wilmanco.com",
    "phone": "(805) 432-4459",
    "streetAddress": "32069 Lobo Canyon Rd",
    "city": "Agour",
    "state": "Hills,",
    "zipCode": "CA",
    "storageSpots": "6",
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

export const vehicles: Vehicle[] =[
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