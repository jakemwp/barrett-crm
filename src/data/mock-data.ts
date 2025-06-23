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

// Create customers from complete CSV data
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
    firstName: 'All Valley Washer Service',
    lastName: 'Inc.',
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
    password: 'allvalley123',
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
    firstName: 'C&H',
    lastName: 'Construction',
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
    password: 'candh123',
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
    firstName: 'DHK',
    lastName: 'Plumbing',
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
    password: 'dhk123',
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
  },
  {
    id: 'c16',
    firstName: 'Alfred',
    lastName: 'English',
    type: 'Individual',
    membershipLevel: 'Basic',
    storageLocation: 'Moorpark',
    email: 'alfred@sespecreekspirits.com',
    phone: '(626) 676-0031',
    streetAddress: '701 Chapala Drive',
    city: 'Pacific Palisades',
    state: 'CA',
    zipCode: '90272',
    storageSpots: 1,
    showPandaDocForm: false,
    dateCreated: '2024-03-12',
    password: 'alfred123',
    numRows: 1,
    manualPrice: 75.00,
    createdAt: '2024-03-12T11:30:00Z',
    updatedAt: '2024-03-12T11:30:00Z',
  },
  {
    id: 'c17',
    firstName: 'Russ',
    lastName: 'Ercolani',
    type: 'Individual',
    membershipLevel: 'Basic',
    storageLocation: 'Moorpark',
    email: 'russ.ercolani@gmail.com',
    phone: '(805) 990-0475',
    streetAddress: '4229 Kingsview Rd.',
    city: 'Moorpark',
    state: 'CA',
    zipCode: '93021',
    storageSpots: 1,
    showPandaDocForm: false,
    dateCreated: '2024-03-18',
    password: 'russ123',
    numRows: 1,
    manualPrice: 75.00,
    createdAt: '2024-03-18T14:20:00Z',
    updatedAt: '2024-03-18T14:20:00Z',
  },
  {
    id: 'c18',
    firstName: 'Demetrius',
    lastName: 'Forte',
    type: 'Individual',
    membershipLevel: 'Basic',
    storageLocation: 'Westlake Village',
    email: 'gooman68.df@gmail.com',
    phone: '(216) 235-6345',
    streetAddress: 'Address Not Available',
    city: 'Unknown',
    state: 'CA',
    zipCode: '00000',
    storageSpots: 1,
    showPandaDocForm: false,
    dateCreated: '2024-03-25',
    password: 'demetrius123',
    numRows: 1,
    manualPrice: 75.00,
    createdAt: '2024-03-25T16:45:00Z',
    updatedAt: '2024-03-25T16:45:00Z',
  },
  {
    id: 'c19',
    firstName: 'Donald',
    lastName: 'Friese',
    type: 'Individual',
    membershipLevel: 'Basic',
    storageLocation: 'Moorpark',
    email: 'dj.friese@gmail.com',
    phone: '818-554-2223',
    streetAddress: '22555 La Quilla Drive',
    city: 'Chatsworth',
    state: 'CA',
    zipCode: '91311',
    storageSpots: 2,
    showPandaDocForm: false,
    dateCreated: '2024-04-02',
    password: 'donald123',
    numRows: 1,
    manualPrice: 150.00,
    createdAt: '2024-04-02T09:10:00Z',
    updatedAt: '2024-04-02T09:10:00Z',
  },
  {
    id: 'c20',
    firstName: 'Joshua',
    lastName: 'Gamboa',
    type: 'Individual',
    membershipLevel: 'Basic',
    storageLocation: 'Moorpark',
    email: 'joshuarobert100@gmail.com',
    phone: '818-983-6207',
    streetAddress: '11323 Blythe St.',
    city: 'Sun Valley',
    state: 'CA',
    zipCode: '91352',
    storageSpots: 1,
    showPandaDocForm: false,
    dateCreated: '2024-04-08',
    password: 'joshua123',
    numRows: 1,
    manualPrice: 75.00,
    createdAt: '2024-04-08T13:25:00Z',
    updatedAt: '2024-04-08T13:25:00Z',
  },
  {
    id: 'c21',
    firstName: 'John',
    lastName: 'Garcia',
    type: 'Individual',
    membershipLevel: 'Basic',
    storageLocation: 'Moorpark',
    email: 'john@johngarcia.org',
    phone: '(310) 600-6464',
    streetAddress: '12009 Haven Crest St.',
    city: 'Moorpark',
    state: 'CA',
    zipCode: '93021',
    storageSpots: 1,
    showPandaDocForm: false,
    dateCreated: '2024-04-15',
    password: 'john123',
    numRows: 1,
    manualPrice: 75.00,
    createdAt: '2024-04-15T10:40:00Z',
    updatedAt: '2024-04-15T10:40:00Z',
  },
  {
    id: 'c22',
    firstName: 'Jon',
    lastName: 'Garland',
    type: 'Individual',
    membershipLevel: 'Premium',
    storageLocation: 'Moorpark',
    email: 'gland20@aol.com',
    phone: '(520) 241-4816',
    streetAddress: '1234 Heritage Pl',
    city: 'Westlake Village',
    state: 'CA',
    zipCode: '91362',
    storageSpots: 3,
    showPandaDocForm: false,
    dateCreated: '2024-04-22',
    password: 'jon123',
    numRows: 2,
    manualPrice: 450.00,
    createdAt: '2024-04-22T15:15:00Z',
    updatedAt: '2024-04-22T15:15:00Z',
  },
  {
    id: 'c23',
    firstName: 'Greg',
    lastName: 'Geyer',
    type: 'Individual',
    membershipLevel: 'Basic',
    storageLocation: 'Moorpark',
    email: 'gregtgeyer@gmail.com',
    phone: '(310) 463-2271',
    streetAddress: '1339 Falling Star Avenue',
    city: 'Westlake Village',
    state: 'CA',
    zipCode: '91362',
    storageSpots: 2,
    showPandaDocForm: false,
    dateCreated: '2024-04-28',
    password: 'greg123',
    numRows: 1,
    manualPrice: 150.00,
    createdAt: '2024-04-28T11:50:00Z',
    updatedAt: '2024-04-28T11:50:00Z',
  },
  {
    id: 'c24',
    firstName: 'Richard',
    lastName: 'Herbert',
    type: 'Individual',
    membershipLevel: 'Premium',
    storageLocation: 'Westlake Village',
    email: 'richard@helixrecruiting.com',
    phone: '(801) 916-2930',
    streetAddress: '11950 Beach Club Way',
    city: 'Malibu',
    state: 'CA',
    zipCode: '90265',
    storageSpots: 3,
    showPandaDocForm: true,
    dateCreated: '2024-05-05',
    password: 'richard123',
    numRows: 2,
    manualPrice: 450.00,
    createdAt: '2024-05-05T14:30:00Z',
    updatedAt: '2024-05-05T14:30:00Z',
  },
  {
    id: 'c25',
    firstName: 'Kenneth',
    lastName: 'Ingoldsby',
    type: 'Individual',
    membershipLevel: 'Basic',
    storageLocation: 'Moorpark',
    email: 'kenslaw01@aim.com',
    phone: '818-983-6207',
    streetAddress: '13636 Ventura Blvd #457',
    city: 'Sherman Oaks',
    state: 'CA',
    zipCode: '91423',
    storageSpots: 1,
    showPandaDocForm: false,
    dateCreated: '2024-05-12',
    password: 'kenneth123',
    numRows: 1,
    manualPrice: 75.00,
    createdAt: '2024-05-12T09:20:00Z',
    updatedAt: '2024-05-12T09:20:00Z',
  },
  {
    id: 'c26',
    firstName: 'Kurt',
    lastName: 'Johnson',
    type: 'Individual',
    membershipLevel: 'Basic',
    storageLocation: 'Moorpark',
    email: 'kjohnson@hunterrainier.com',
    phone: '(805) 551-6258',
    streetAddress: '2284 Stacy Ln.',
    city: 'Camarillo',
    state: 'CA',
    zipCode: '93012',
    storageSpots: 1,
    showPandaDocForm: false,
    dateCreated: '2024-05-18',
    password: 'kurt123',
    numRows: 1,
    manualPrice: 75.00,
    createdAt: '2024-05-18T16:10:00Z',
    updatedAt: '2024-05-18T16:10:00Z',
  },
  {
    id: 'c27',
    firstName: 'Paul',
    lastName: 'Johnson',
    type: 'Individual',
    membershipLevel: 'Basic',
    storageLocation: 'Moorpark',
    email: 'paulj89@hotmail.com',
    phone: '(818) 825-8611',
    streetAddress: '13536 Pacific Breeze Dr.',
    city: 'Santa Rosa Valley',
    state: 'CA',
    zipCode: '93012',
    storageSpots: 2,
    showPandaDocForm: false,
    dateCreated: '2024-05-25',
    password: 'paul123',
    numRows: 1,
    manualPrice: 150.00,
    createdAt: '2024-05-25T12:45:00Z',
    updatedAt: '2024-05-25T12:45:00Z',
  },
  {
    id: 'c28',
    firstName: 'Brian',
    lastName: 'Jones',
    type: 'Individual',
    membershipLevel: 'VIP',
    storageLocation: 'Moorpark',
    email: 'brianjones81@earthlink.net',
    phone: '(805) 241-1735',
    streetAddress: '13723 Nightsky Drive',
    city: 'Santa Rosa Valley',
    state: 'CA',
    zipCode: '93012',
    storageSpots: 5,
    showPandaDocForm: true,
    dateCreated: '2024-06-01',
    password: 'brian123',
    numRows: 3,
    manualPrice: 1000.00,
    createdAt: '2024-06-01T08:30:00Z',
    updatedAt: '2024-06-01T08:30:00Z',
  },
  {
    id: 'c29',
    firstName: 'Denise',
    lastName: 'Kirtley',
    type: 'Individual',
    membershipLevel: 'Basic',
    storageLocation: 'Westlake Village',
    email: 'denisepkirtley@gmail.com',
    phone: '310-962-1827',
    streetAddress: '420 Upper Lake Road',
    city: 'Thousand Oaks',
    state: 'CA',
    zipCode: '91361',
    storageSpots: 1,
    showPandaDocForm: false,
    dateCreated: '2024-06-08',
    password: 'denise123',
    numRows: 1,
    manualPrice: 75.00,
    createdAt: '2024-06-08T14:15:00Z',
    updatedAt: '2024-06-08T14:15:00Z',
  },
  {
    id: 'c30',
    firstName: 'Lotus',
    lastName: 'USA',
    type: 'Business',
    membershipLevel: 'Basic',
    storageLocation: 'Moorpark',
    email: 'jane.lonsdale@lotuscars.com',
    phone: '805-233-4987',
    streetAddress: '11988 Challenger Ct',
    city: 'Moorpark',
    state: 'CA',
    zipCode: '93021',
    storageSpots: 1,
    showPandaDocForm: false,
    dateCreated: '2024-06-15',
    password: 'lotus123',
    numRows: 1,
    manualPrice: 75.00,
    createdAt: '2024-06-15T10:25:00Z',
    updatedAt: '2024-06-15T10:25:00Z',
  },
  {
    id: 'c31',
    firstName: 'Matthew',
    lastName: 'Ludwick',
    type: 'Individual',
    membershipLevel: 'Basic',
    storageLocation: 'Moorpark',
    email: 'matt@bighornprecision.com',
    phone: '(406) 559-6579',
    streetAddress: '16 N Montana St',
    city: 'Butte',
    state: 'MT',
    zipCode: '59701',
    storageSpots: 1,
    showPandaDocForm: false,
    dateCreated: '2024-06-22',
    password: 'matthew123',
    numRows: 1,
    manualPrice: 75.00,
    createdAt: '2024-06-22T13:40:00Z',
    updatedAt: '2024-06-22T13:40:00Z',
  },
  {
    id: 'c32',
    firstName: 'Kevin',
    lastName: 'Lydick',
    type: 'Individual',
    membershipLevel: 'Premium',
    storageLocation: 'Moorpark',
    email: 'kevin@oakridgelandworks.com',
    phone: '(805) 630-8377',
    streetAddress: '3106 Tanglewood Ct.',
    city: 'Thousand Oaks',
    state: 'CA',
    zipCode: '91360',
    storageSpots: 3,
    showPandaDocForm: false,
    dateCreated: '2024-06-28',
    password: 'kevin123',
    numRows: 2,
    manualPrice: 450.00,
    createdAt: '2024-06-28T15:55:00Z',
    updatedAt: '2024-06-28T15:55:00Z',
  },
  {
    id: 'c33',
    firstName: 'Vincent',
    lastName: 'Malfa',
    type: 'Individual',
    membershipLevel: 'Basic',
    storageLocation: 'Moorpark',
    email: 'vgm@tripledistilled.com',
    phone: '(508) 859-0390',
    streetAddress: '710 Calle Cardo',
    city: 'Thousand Oaks',
    state: 'CA',
    zipCode: '91360',
    storageSpots: 1,
    showPandaDocForm: false,
    dateCreated: '2024-07-05',
    password: 'vincent123',
    numRows: 1,
    manualPrice: 75.00,
    createdAt: '2024-07-05T11:10:00Z',
    updatedAt: '2024-07-05T11:10:00Z',
  },
  {
    id: 'c34',
    firstName: 'Gerald',
    lastName: 'Mansell',
    type: 'Individual',
    membershipLevel: 'Basic',
    storageLocation: 'Moorpark',
    email: 'gerrymansell@icloud.com',
    phone: '808-375-7971',
    streetAddress: '604 N Kalaheo Ave',
    city: 'Kailua',
    state: 'HI',
    zipCode: '96734',
    storageSpots: 1,
    showPandaDocForm: false,
    dateCreated: '2024-07-12',
    password: 'gerald123',
    numRows: 1,
    manualPrice: 75.00,
    createdAt: '2024-07-12T09:35:00Z',
    updatedAt: '2024-07-12T09:35:00Z',
  },
  {
    id: 'c35',
    firstName: 'Marmonte Cars',
    lastName: 'LLC',
    type: 'Business',
    membershipLevel: 'Basic',
    storageLocation: 'Moorpark',
    email: 'sergio@migramer.com',
    phone: '310-795-2001',
    streetAddress: '30130 Mullholland Hwy',
    city: 'Agoura',
    state: 'CA',
    zipCode: '91301',
    storageSpots: 2,
    showPandaDocForm: false,
    dateCreated: '2024-07-18',
    password: 'marmonte123',
    numRows: 1,
    manualPrice: 150.00,
    createdAt: '2024-07-18T14:20:00Z',
    updatedAt: '2024-07-18T14:20:00Z',
  },
  {
    id: 'c36',
    firstName: 'Joseph',
    lastName: 'Matta',
    type: 'Individual',
    membershipLevel: 'Basic',
    storageLocation: 'Moorpark',
    email: 'joe@hansonlab.com',
    phone: '(805) 795-1300',
    streetAddress: '747 Calle Plano',
    city: 'Camarillo',
    state: 'CA',
    zipCode: '93012',
    storageSpots: 1,
    showPandaDocForm: false,
    dateCreated: '2024-07-25',
    password: 'joseph123',
    numRows: 1,
    manualPrice: 75.00,
    createdAt: '2024-07-25T16:45:00Z',
    updatedAt: '2024-07-25T16:45:00Z',
  },
  {
    id: 'c37',
    firstName: 'Greg',
    lastName: 'McNeal',
    type: 'Individual',
    membershipLevel: 'Basic',
    storageLocation: 'Moorpark',
    email: 'gregory.mcneal.list@gmail.com',
    phone: '512-413-3869',
    streetAddress: '29615 Kimberly Drive',
    city: 'Agoura Hills',
    state: 'CA',
    zipCode: '91301',
    storageSpots: 1,
    showPandaDocForm: false,
    dateCreated: '2024-08-01',
    password: 'greg123',
    numRows: 1,
    manualPrice: 75.00,
    createdAt: '2024-08-01T12:30:00Z',
    updatedAt: '2024-08-01T12:30:00Z',
  },
  {
    id: 'c38',
    firstName: 'Garrett',
    lastName: 'Pegler',
    type: 'Individual',
    membershipLevel: 'Basic',
    storageLocation: 'Moorpark',
    email: 'garret@ghostshieldfilm.com',
    phone: '(805) 427-5863',
    streetAddress: '1168 Tourmaline Dr.',
    city: 'Newbury Park',
    state: 'CA',
    zipCode: '91320',
    storageSpots: 2,
    showPandaDocForm: false,
    dateCreated: '2024-08-08',
    password: 'garrett123',
    numRows: 1,
    manualPrice: 150.00,
    createdAt: '2024-08-08T10:15:00Z',
    updatedAt: '2024-08-08T10:15:00Z',
  },
  {
    id: 'c39',
    firstName: 'Steve',
    lastName: 'Pena',
    type: 'Individual',
    membershipLevel: 'Basic',
    storageLocation: 'Moorpark',
    email: 'steve@penaemail.com',
    phone: '(310) 601-8771',
    streetAddress: '2928 Shadow Brook Ln',
    city: 'Westlake Village',
    state: 'CA',
    zipCode: '91361',
    storageSpots: 1,
    showPandaDocForm: false,
    dateCreated: '2024-08-15',
    password: 'steve123',
    numRows: 1,
    manualPrice: 75.00,
    createdAt: '2024-08-15T13:50:00Z',
    updatedAt: '2024-08-15T13:50:00Z',
  },
  {
    id: 'c40',
    firstName: 'Tyrone',
    lastName: 'Pham',
    type: 'Individual',
    membershipLevel: 'Basic',
    storageLocation: 'Moorpark',
    email: 'ecoliex@yahoo.com',
    phone: '(626) 600-7023',
    streetAddress: '701 S Howard Ave. ste 106217',
    city: 'Tampa',
    state: 'FL',
    zipCode: '33606',
    storageSpots: 1,
    showPandaDocForm: false,
    dateCreated: '2024-08-22',
    password: 'tyrone123',
    numRows: 1,
    manualPrice: 75.00,
    createdAt: '2024-08-22T15:25:00Z',
    updatedAt: '2024-08-22T15:25:00Z',
  },
  {
    id: 'c41',
    firstName: 'Thomas',
    lastName: 'Powers',
    type: 'Individual',
    membershipLevel: 'Basic',
    storageLocation: 'Moorpark',
    email: 'tomepowers@gmail.com',
    phone: '805-915-8120',
    streetAddress: '365 Jeremiah Drive Unit A',
    city: 'Simi Valley',
    state: 'CA',
    zipCode: '93065',
    storageSpots: 1,
    showPandaDocForm: false,
    dateCreated: '2024-08-28',
    password: 'thomas123',
    numRows: 1,
    manualPrice: 75.00,
    createdAt: '2024-08-28T11:40:00Z',
    updatedAt: '2024-08-28T11:40:00Z',
  },
  {
    id: 'c42',
    firstName: 'Jeremy',
    lastName: 'Renstrom',
    type: 'Individual',
    membershipLevel: 'Basic',
    storageLocation: 'Moorpark',
    email: 'jeremyrenstrom@yahoo.com',
    phone: '310-422-5742',
    streetAddress: '21736 Roscoe Blvd #34',
    city: 'Canoga Park',
    state: 'CA',
    zipCode: '91304',
    storageSpots: 1,
    showPandaDocForm: false,
    dateCreated: '2024-09-05',
    password: 'jeremy123',
    numRows: 1,
    manualPrice: 75.00,
    createdAt: '2024-09-05T14:55:00Z',
    updatedAt: '2024-09-05T14:55:00Z',
  },
  {
    id: 'c43',
    firstName: 'Josiah',
    lastName: 'Richards',
    type: 'Individual',
    membershipLevel: 'Basic',
    storageLocation: 'Moorpark',
    email: 'josiah@illusory.io',
    phone: '(647) 270-5442',
    streetAddress: '4500 Park Granada',
    city: 'Calabasas',
    state: 'CA',
    zipCode: '91302',
    storageSpots: 1,
    showPandaDocForm: false,
    dateCreated: '2024-09-12',
    password: 'josiah123',
    numRows: 1,
    manualPrice: 75.00,
    createdAt: '2024-09-12T09:20:00Z',
    updatedAt: '2024-09-12T09:20:00Z',
  },
  {
    id: 'c44',
    firstName: 'Joey',
    lastName: 'Shap',
    type: 'Individual',
    membershipLevel: 'Basic',
    storageLocation: 'Moorpark',
    email: 'joeyshap@gmail.com',
    phone: '(805) 825-8462',
    streetAddress: '501 S. Reino Rd. #226',
    city: 'Newbury Park',
    state: 'CA',
    zipCode: '91320',
    storageSpots: 1,
    showPandaDocForm: false,
    dateCreated: '2024-09-18',
    password: 'joey123',
    numRows: 1,
    manualPrice: 75.00,
    createdAt: '2024-09-18T16:30:00Z',
    updatedAt: '2024-09-18T16:30:00Z',
  },
  {
    id: 'c45',
    firstName: 'Andrew',
    lastName: 'Shore',
    type: 'Individual',
    membershipLevel: 'Basic',
    storageLocation: 'Westlake Village',
    email: 'an.shore@yahoo.com',
    phone: '(310) 890-3799',
    streetAddress: '1584 Fairmount Rd',
    city: 'Westlake Village',
    state: 'CA',
    zipCode: '91362',
    storageSpots: 1,
    showPandaDocForm: false,
    dateCreated: '2024-09-25',
    password: 'andrew123',
    numRows: 1,
    manualPrice: 75.00,
    createdAt: '2024-09-25T12:45:00Z',
    updatedAt: '2024-09-25T12:45:00Z',
  },
  {
    id: 'c46',
    firstName: 'Victoria',
    lastName: 'Shuken',
    type: 'Individual',
    membershipLevel: 'Basic',
    storageLocation: 'Moorpark',
    email: 'tori_shuken@vistaauto.com',
    phone: '(818) 207-9770',
    streetAddress: '12626 Andalusia Drive',
    city: 'Santa Rosa Valley',
    state: 'CA',
    zipCode: '93012',
    storageSpots: 2,
    showPandaDocForm: false,
    dateCreated: '2024-10-02',
    password: 'victoria123',
    numRows: 1,
    manualPrice: 150.00,
    createdAt: '2024-10-02T10:10:00Z',
    updatedAt: '2024-10-02T10:10:00Z',
  },
  {
    id: 'c47',
    firstName: 'Tarnpreet',
    lastName: 'Singh',
    type: 'Individual',
    membershipLevel: 'Premium',
    storageLocation: 'Moorpark',
    email: 'asingh2033@gmail.com',
    phone: '805-377-2472',
    streetAddress: '5170 Edgar St',
    city: 'Oxnard',
    state: 'CA',
    zipCode: '93033',
    storageSpots: 3,
    showPandaDocForm: false,
    dateCreated: '2024-10-08',
    password: 'tarnpreet123',
    numRows: 2,
    manualPrice: 450.00,
    createdAt: '2024-10-08T14:35:00Z',
    updatedAt: '2024-10-08T14:35:00Z',
  },
  {
    id: 'c48',
    firstName: 'Nico',
    lastName: 'Solomon',
    type: 'Individual',
    membershipLevel: 'Basic',
    storageLocation: 'Moorpark',
    email: 'solonico@sbcglobal.net',
    phone: '(805) 558-8678',
    streetAddress: '1634 River Wood Court',
    city: 'Simi Valley',
    state: 'CA',
    zipCode: '93063',
    storageSpots: 1,
    showPandaDocForm: false,
    dateCreated: '2024-10-15',
    password: 'nico123',
    numRows: 1,
    manualPrice: 75.00,
    createdAt: '2024-10-15T11:20:00Z',
    updatedAt: '2024-10-15T11:20:00Z',
  },
  {
    id: 'c49',
    firstName: 'Star Management',
    lastName: '(Kenneth Allen)',
    type: 'Business',
    membershipLevel: 'Premium',
    storageLocation: 'Moorpark',
    email: 'kenneth.allen75@gmail.com',
    phone: '(951) 425-8642',
    streetAddress: '730 E Durant Ave Suite 200',
    city: 'Aspen',
    state: 'CO',
    zipCode: '81611',
    storageSpots: 3,
    showPandaDocForm: true,
    dateCreated: '2024-10-22',
    password: 'star123',
    numRows: 2,
    manualPrice: 450.00,
    createdAt: '2024-10-22T15:50:00Z',
    updatedAt: '2024-10-22T15:50:00Z',
  },
  {
    id: 'c50',
    firstName: 'Donovan',
    lastName: 'Tatum',
    type: 'Individual',
    membershipLevel: 'Basic',
    storageLocation: 'Moorpark',
    email: 'donovan.tatum@caa.com',
    phone: '(818) 648-3062',
    streetAddress: '637 S. Lucerne Blvd',
    city: 'Los Angeles',
    state: 'CA',
    zipCode: '90005',
    storageSpots: 1,
    showPandaDocForm: false,
    dateCreated: '2024-10-28',
    password: 'donovan123',
    numRows: 1,
    manualPrice: 75.00,
    createdAt: '2024-10-28T13:15:00Z',
    updatedAt: '2024-10-28T13:15:00Z',
  },
  {
    id: 'c51',
    firstName: 'Ryan',
    lastName: 'Telford',
    type: 'Individual',
    membershipLevel: 'Basic',
    storageLocation: 'Moorpark',
    email: 'ryan.telford@amwins.com',
    phone: '(818) 216-1792',
    streetAddress: '1408 Kingsboro Court',
    city: 'Westlake Village',
    state: 'CA',
    zipCode: '91362',
    storageSpots: 1,
    showPandaDocForm: false,
    dateCreated: '2024-11-05',
    password: 'ryan123',
    numRows: 1,
    manualPrice: 75.00,
    createdAt: '2024-11-05T09:40:00Z',
    updatedAt: '2024-11-05T09:40:00Z',
  },
  {
    id: 'c52',
    firstName: 'Thaxton & Associates',
    lastName: '(Mike Thaxton)',
    type: 'Business',
    membershipLevel: 'Premium',
    storageLocation: 'Westlake Village',
    email: 'mike@thaxtonassociates.com',
    phone: '(818) 633-9111',
    streetAddress: '11338 Moorpark St.',
    city: 'Studio City',
    state: 'CA',
    zipCode: '91423',
    storageSpots: 4,
    showPandaDocForm: true,
    dateCreated: '2024-11-12',
    password: 'thaxton123',
    numRows: 2,
    manualPrice: 600.00,
    createdAt: '2024-11-12T14:25:00Z',
    updatedAt: '2024-11-12T14:25:00Z',
  },
  {
    id: 'c53',
    firstName: 'The Chosen Group',
    lastName: 'Inc',
    type: 'Business',
    membershipLevel: 'Basic',
    storageLocation: 'Moorpark',
    email: 'kacy@100group.com',
    phone: '(805) 807-0195',
    streetAddress: '4263 Tierra Rejada Rd #213',
    city: 'Moorpark',
    state: 'CA',
    zipCode: '93021',
    storageSpots: 1,
    showPandaDocForm: false,
    dateCreated: '2024-11-18',
    password: 'chosen123',
    numRows: 1,
    manualPrice: 75.00,
    createdAt: '2024-11-18T16:10:00Z',
    updatedAt: '2024-11-18T16:10:00Z',
  },
  {
    id: 'c54',
    firstName: 'Velocity Restoration',
    lastName: 'LLC',
    type: 'Business',
    membershipLevel: 'Basic',
    storageLocation: 'Moorpark',
    email: 'chris@velocityrestorations.com',
    phone: '(850) 776-8729',
    streetAddress: '15 E Quintette Rd',
    city: 'Cantonment',
    state: 'FL',
    zipCode: '32533',
    storageSpots: 2,
    showPandaDocForm: false,
    dateCreated: '2024-11-25',
    password: 'velocity123',
    numRows: 1,
    manualPrice: 150.00,
    createdAt: '2024-11-25T12:55:00Z',
    updatedAt: '2024-11-25T12:55:00Z',
  },
  {
    id: 'c55',
    firstName: 'Anthony',
    lastName: 'Virella',
    type: 'Individual',
    membershipLevel: 'Enterprise',
    storageLocation: 'Westlake Village',
    email: 'avirella@yahoo.com',
    phone: '(310) 622-5205',
    streetAddress: '5959 Murphy Way',
    city: 'Malibu',
    state: 'CA',
    zipCode: '90265',
    storageSpots: 10,
    showPandaDocForm: true,
    dateCreated: '2024-12-02',
    password: 'anthony123',
    numRows: 5,
    manualPrice: 750.00,
    createdAt: '2024-12-02T10:30:00Z',
    updatedAt: '2024-12-02T10:30:00Z',
  },
  {
    id: 'c56',
    firstName: 'Deke',
    lastName: 'Williams',
    type: 'Individual',
    membershipLevel: 'VIP',
    storageLocation: 'Moorpark',
    email: 'deke@wilmanco.com',
    phone: '(805) 432-4459',
    streetAddress: '32069 Lobo Canyon Rd',
    city: 'Agoura Hills',
    state: 'CA',
    zipCode: '91301',
    storageSpots: 6,
    showPandaDocForm: true,
    dateCreated: '2024-12-08',
    password: 'deke123',
    numRows: 3,
    manualPrice: 1200.00,
    createdAt: '2024-12-08T15:45:00Z',
    updatedAt: '2024-12-08T15:45:00Z',
  }
];

// Create mock vehicles with data from Moorpark Vehicle List
export const vehicles: Vehicle[] = [
  {
    id: 'v1',
    customerId: 'c1', // Jason Adang
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
    year: 1972,
    make: 'Porsche',
    model: '911',
    vin: '9112101858',
    storageLocation: 'Moorpark',
    fairMarketValue: 100000,
    insuranceRiderRequired: false,
    licensePlate: 'PRSH911',
    registration: {
      number: 'REG123456',
      expirationDate: '2025-09-07',
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
      lastService: '2024-04-21',
      nextService: '2024-10-21',
      serviceInterval: 6,
      notes: 'Classic car, handle with care'
    },
    authorizedContacts: [],
    odometer: 78500,
    image: 'https://images.pexels.com/photos/3954440/pexels-photo-3954440.jpeg',
    fuelLevel: 75,
    batteryType: 'Standard',
    color: 'Silver',
    createdAt: '2025-04-21T10:35:00Z',
    updatedAt: '2025-04-21T10:35:00Z',
  },
  {
    id: 'v2',
    customerId: 'c1', // Jason Adang
    authorizedDrivers: [
      {
        id: 'ad2',
        name: 'Jason Adang',
        phone: '(805) 795-6808',
        email: 'jason@adangenterprises.com',
        licenseNumber: 'D1234567',
        relationship: 'Owner'
      }
    ],
    year: 2012,
    make: 'Lexus',
    model: 'LFA',
    vin: 'JTHHX8BH2C1000028',
    storageLocation: 'Moorpark',
    fairMarketValue: 875000,
    insuranceRiderRequired: true,
    insuranceRiderAmount: 900000,
    licensePlate: 'LFA2012',
    registration: {
      number: 'REG789012',
      expirationDate: '2025-09-07',
      state: 'CA'
    },
    tirePressureDefault: {
      front: 32,
      rear: 32
    },
    tirePressurePreferred: {
      front: 35,
      rear: 35
    },
    maintenanceSchedule: {
      lastService: '2025-01-15',
      nextService: '2025-07-15',
      serviceInterval: 6,
      notes: 'Exotic vehicle, specialized service required'
    },
    authorizedContacts: [],
    odometer: 12500,
    image: 'https://images.pexels.com/photos/3954426/pexels-photo-3954426.jpeg',
    fuelLevel: 90,
    batteryType: 'Lithium',
    color: 'White',
    createdAt: '2025-04-21T11:30:00Z',
    updatedAt: '2025-04-21T11:30:00Z',
  },
  {
    id: 'v3',
    customerId: 'c2', // All Valley Washer Service
    authorizedDrivers: [
      {
        id: 'ad3',
        name: 'Jim Feinstein',
        phone: '818-464-5264',
        email: 'jim@allvalleywasher.com',
        licenseNumber: 'CA987654',
        relationship: 'Owner'
      }
    ],
    year: 2024,
    make: 'Jeep',
    model: 'Rubicon',
    vin: '1C4RJXSJ3RW223940',
    storageLocation: 'Moorpark',
    fairMarketValue: 98000,
    insuranceRiderRequired: false,
    licensePlate: 'JEEPRUB',
    registration: {
      number: 'REG345678',
      expirationDate: '2025-12-30',
      state: 'CA'
    },
    tirePressureDefault: {
      front: 35,
      rear: 35
    },
    tirePressurePreferred: {
      front: 37,
      rear: 37
    },
    maintenanceSchedule: {
      lastService: '2025-01-01',
      nextService: '2025-07-01',
      serviceInterval: 6,
      notes: 'Off-road vehicle, check undercarriage'
    },
    authorizedContacts: [],
    odometer: 5200,
    image: 'https://images.pexels.com/photos/12086531/pexels-photo-12086531.jpeg',
    fuelLevel: 85,
    batteryType: 'AGM',
    color: 'Black',
    createdAt: '2025-07-01T09:20:00Z',
    updatedAt: '2025-07-01T09:20:00Z',
  },
  {
    id: 'v4',
    customerId: 'c3', // Chris Antonsen
    authorizedDrivers: [
      {
        id: 'ad4',
        name: 'Chris Antonsen',
        phone: '(818) 381-7105',
        email: 'antonsenchris3@gmail.com',
        licenseNumber: 'CA456789',
        relationship: 'Owner'
      }
    ],
    year: 2022,
    make: 'Mastercraft',
    model: 'X24',
    vin: 'MBCPHBVG122',
    storageLocation: 'Moorpark',
    fairMarketValue: 267000,
    insuranceRiderRequired: false,
    licensePlate: 'BOAT123',
    registration: {
      number: 'REG567890',
      expirationDate: '2026-05-03',
      state: 'CA'
    },
    tirePressureDefault: {
      front: 0,
      rear: 0
    },
    tirePressurePreferred: {
      front: 0,
      rear: 0
    },
    maintenanceSchedule: {
      lastService: '2025-02-01',
      nextService: '2025-08-01',
      serviceInterval: 6,
      notes: 'Boat - requires specialized maintenance'
    },
    authorizedContacts: [],
    odometer: 0,
    image: 'https://images.pexels.com/photos/1295036/pexels-photo-1295036.jpeg',
    fuelLevel: 100,
    batteryType: 'Standard',
    color: 'Blue/White',
    createdAt: '2025-02-01T14:15:00Z',
    updatedAt: '2025-02-01T14:15:00Z',
  },
  {
    id: 'v5',
    customerId: 'c5', // Barrett Whips
    authorizedDrivers: [
      {
        id: 'ad5',
        name: 'Barrett Whips',
        phone: '805-559-1028',
        email: 'lindsay@barrettassociatesllc.com',
        licenseNumber: 'CA123456',
        relationship: 'Owner'
      }
    ],
    year: 2001,
    make: 'Mercedes',
    model: 'SL500',
    vin: 'WDBFA68F31F200029',
    storageLocation: 'Moorpark',
    fairMarketValue: 12000,
    insuranceRiderRequired: false,
    licensePlate: 'MERC500',
    registration: {
      number: 'REG123789',
      expirationDate: '2025-09-30',
      state: 'CA'
    },
    tirePressureDefault: {
      front: 32,
      rear: 32
    },
    tirePressurePreferred: {
      front: 34,
      rear: 34
    },
    maintenanceSchedule: {
      lastService: '2024-09-30',
      nextService: '2025-03-30',
      serviceInterval: 6,
      notes: 'Classic Mercedes, check for oil leaks'
    },
    authorizedContacts: [],
    odometer: 85000,
    image: 'https://images.pexels.com/photos/120049/pexels-photo-120049.jpeg',
    fuelLevel: 60,
    batteryType: 'Standard',
    color: 'Silver',
    createdAt: '2024-09-30T10:00:00Z',
    updatedAt: '2024-09-30T10:00:00Z',
  },
  {
    id: 'v6',
    customerId: 'c7', // Jeffrey Brodsly
    authorizedDrivers: [
      {
        id: 'ad6',
        name: 'Jeffrey Brodsly',
        phone: '(805) 807-0195',
        email: 'jeff@100group.com',
        licenseNumber: 'CA789012',
        relationship: 'Owner'
      }
    ],
    year: 2013,
    make: 'Rolls Royce',
    model: 'Ghost',
    vin: 'SCA664S56DUX51683',
    storageLocation: 'Moorpark',
    fairMarketValue: 90000,
    insuranceRiderRequired: true,
    insuranceRiderAmount: 100000,
    licensePlate: 'ROLLS13',
    registration: {
      number: 'REG456123',
      expirationDate: '2026-06-01',
      state: 'CA'
    },
    tirePressureDefault: {
      front: 36,
      rear: 36
    },
    tirePressurePreferred: {
      front: 38,
      rear: 38
    },
    maintenanceSchedule: {
      lastService: '2025-06-01',
      nextService: '2025-12-01',
      serviceInterval: 6,
      notes: 'Luxury vehicle, specialized service required'
    },
    authorizedContacts: [],
    odometer: 45000,
    image: 'https://images.pexels.com/photos/3764984/pexels-photo-3764984.jpeg',
    fuelLevel: 80,
    batteryType: 'AGM',
    color: 'Black',
    createdAt: '2025-06-01T11:30:00Z',
    updatedAt: '2025-06-01T11:30:00Z',
  },
  {
    id: 'v7',
    customerId: 'c9', // C&H Construction
    authorizedDrivers: [
      {
        id: 'ad7',
        name: 'Jeff Jay',
        phone: '(805) 495-0679',
        email: 'jeff@candhconstruction.net',
        licenseNumber: 'CA456123',
        relationship: 'Owner'
      }
    ],
    year: 2010,
    make: 'Harley Davidson',
    model: 'FLTRX',
    vin: '1HD1KH438AB606132',
    storageLocation: 'Moorpark',
    fairMarketValue: 16000,
    insuranceRiderRequired: false,
    licensePlate: 'HD2010',
    registration: {
      number: 'REG789456',
      expirationDate: '2026-05-01',
      state: 'CA'
    },
    tirePressureDefault: {
      front: 36,
      rear: 40
    },
    tirePressurePreferred: {
      front: 38,
      rear: 42
    },
    maintenanceSchedule: {
      lastService: '2025-05-01',
      nextService: '2025-11-01',
      serviceInterval: 6,
      notes: 'Motorcycle, check tire wear'
    },
    authorizedContacts: [],
    odometer: 15000,
    image: 'https://images.pexels.com/photos/2549941/pexels-photo-2549941.jpeg',
    fuelLevel: 70,
    batteryType: 'Standard',
    color: 'Black',
    createdAt: '2025-05-01T09:45:00Z',
    updatedAt: '2025-05-01T09:45:00Z',
  },
  {
    id: 'v8',
    customerId: 'c10', // Daniel Casson
    authorizedDrivers: [
      {
        id: 'ad8',
        name: 'Daniel Casson',
        phone: '805-207-6832',
        email: 'dano4643@gmail.com',
        licenseNumber: 'CA123789',
        relationship: 'Owner'
      }
    ],
    year: 2017,
    make: 'Ferrari',
    model: 'California',
    vin: 'ZFF77XJAXH0227476',
    storageLocation: 'Moorpark',
    fairMarketValue: 150000,
    insuranceRiderRequired: true,
    insuranceRiderAmount: 160000,
    licensePlate: 'FERR17',
    registration: {
      number: 'REG123456',
      expirationDate: '2026-06-18',
      state: 'CA'
    },
    tirePressureDefault: {
      front: 32,
      rear: 32
    },
    tirePressurePreferred: {
      front: 35,
      rear: 35
    },
    maintenanceSchedule: {
      lastService: '2025-06-13',
      nextService: '2025-12-13',
      serviceInterval: 6,
      notes: 'Exotic vehicle, specialized service required'
    },
    authorizedContacts: [],
    odometer: 22000,
    image: 'https://images.pexels.com/photos/337909/pexels-photo-337909.jpeg',
    fuelLevel: 85,
    batteryType: 'Lithium',
    color: 'Red',
    createdAt: '2025-06-13T13:20:00Z',
    updatedAt: '2025-06-13T13:20:00Z',
  },
  {
    id: 'v9',
    customerId: 'c11', // Richard Cobey
    authorizedDrivers: [
      {
        id: 'ad9',
        name: 'Richard Cobey',
        phone: '(818) 307-6515',
        email: 'musicrc@gmail.com',
        licenseNumber: 'CA456789',
        relationship: 'Owner'
      }
    ],
    year: 2014,
    make: 'Bentley',
    model: 'Continental Flying Spur',
    vin: 'SCBEC9ZA5EC095631',
    storageLocation: 'Moorpark',
    fairMarketValue: 100000,
    insuranceRiderRequired: true,
    insuranceRiderAmount: 110000,
    licensePlate: 'BENT14',
    registration: {
      number: 'REG789123',
      expirationDate: '2023-12-06',
      state: 'CA'
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
      lastService: '2024-08-26',
      nextService: '2025-02-26',
      serviceInterval: 6,
      notes: 'Luxury vehicle, specialized service required'
    },
    authorizedContacts: [],
    odometer: 35000,
    image: 'https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg',
    fuelLevel: 75,
    batteryType: 'AGM',
    color: 'Black',
    createdAt: '2024-08-26T14:10:00Z',
    updatedAt: '2024-08-26T14:10:00Z',
  },
  {
    id: 'v10',
    customerId: 'c12', // Assaf Cohen
    authorizedDrivers: [
      {
        id: 'ad10',
        name: 'Assaf Cohen',
        phone: '(818) 825-3764',
        email: 'lp2mnp@gmail.com',
        licenseNumber: 'CA123456',
        relationship: 'Owner'
      }
    ],
    year: 1995,
    make: 'Nissan',
    model: 'Skyline R33 GTR',
    vin: 'BCNR33001214',
    storageLocation: 'Moorpark',
    fairMarketValue: 120000,
    insuranceRiderRequired: true,
    insuranceRiderAmount: 130000,
    licensePlate: 'R33GTR',
    registration: {
      number: 'REG456789',
      expirationDate: '2026-02-12',
      state: 'CA'
    },
    tirePressureDefault: {
      front: 32,
      rear: 32
    },
    tirePressurePreferred: {
      front: 35,
      rear: 35
    },
    maintenanceSchedule: {
      lastService: '2024-08-01',
      nextService: '2025-02-01',
      serviceInterval: 6,
      notes: 'JDM import, specialized service required'
    },
    authorizedContacts: [],
    odometer: 65000,
    image: 'https://images.pexels.com/photos/12201188/pexels-photo-12201188.jpeg',
    fuelLevel: 80,
    batteryType: 'Standard',
    color: 'Blue',
    createdAt: '2024-08-01T10:15:00Z',
    updatedAt: '2024-08-01T10:15:00Z',
  },
  {
    id: 'v11',
    customerId: 'c12', // Assaf Cohen
    authorizedDrivers: [
      {
        id: 'ad11',
        name: 'Assaf Cohen',
        phone: '(818) 825-3764',
        email: 'lp2mnp@gmail.com',
        licenseNumber: 'CA123456',
        relationship: 'Owner'
      }
    ],
    year: 1999,
    make: 'Nissan',
    model: 'Skyline R34 GTR',
    vin: 'BNR34005053',
    storageLocation: 'Moorpark',
    fairMarketValue: 200000,
    insuranceRiderRequired: true,
    insuranceRiderAmount: 220000,
    licensePlate: 'R34GTR',
    registration: {
      number: 'REG789012',
      expirationDate: '2025-07-24',
      state: 'CA'
    },
    tirePressureDefault: {
      front: 32,
      rear: 32
    },
    tirePressurePreferred: {
      front: 35,
      rear: 35
    },
    maintenanceSchedule: {
      lastService: '2024-08-01',
      nextService: '2025-02-01',
      serviceInterval: 6,
      notes: 'JDM import, specialized service required'
    },
    authorizedContacts: [],
    odometer: 45000,
    image: 'https://images.pexels.com/photos/12201188/pexels-photo-12201188.jpeg',
    fuelLevel: 85,
    batteryType: 'Standard',
    color: 'Bayside Blue',
    createdAt: '2024-08-01T11:30:00Z',
    updatedAt: '2024-08-01T11:30:00Z',
  },
  {
    id: 'v12',
    customerId: 'c12', // Assaf Cohen
    authorizedDrivers: [
      {
        id: 'ad12',
        name: 'Sandy Cohen',
        phone: '(818) 825-3764',
        email: 'lp2mnp@gmail.com',
        licenseNumber: 'CA123456',
        relationship: 'Family'
      }
    ],
    year: 1990,
    make: 'Nissan',
    model: 'Skyline R32 GTR',
    vin: 'BNR32012884',
    storageLocation: 'Moorpark',
    fairMarketValue: 100000,
    insuranceRiderRequired: true,
    insuranceRiderAmount: 110000,
    licensePlate: 'R32GTR',
    registration: {
      number: 'REG123789',
      expirationDate: '2026-02-12',
      state: 'CA'
    },
    tirePressureDefault: {
      front: 32,
      rear: 32
    },
    tirePressurePreferred: {
      front: 35,
      rear: 35
    },
    maintenanceSchedule: {
      lastService: '2024-08-01',
      nextService: '2025-02-01',
      serviceInterval: 6,
      notes: 'JDM import, specialized service required'
    },
    authorizedContacts: [],
    odometer: 85000,
    image: 'https://images.pexels.com/photos/12201188/pexels-photo-12201188.jpeg',
    fuelLevel: 75,
    batteryType: 'Standard',
    color: 'Gunmetal Gray',
    createdAt: '2024-08-01T12:45:00Z',
    updatedAt: '2024-08-01T12:45:00Z',
  },
  {
    id: 'v13',
    customerId: 'c14', // DHK Plumbing
    authorizedDrivers: [
      {
        id: 'ad13',
        name: 'Joe Dinka',
        phone: '562-762-6176',
        email: 'Joe@dhkplumbing.com',
        licenseNumber: 'CA456123',
        relationship: 'Owner'
      }
    ],
    year: 2007,
    make: 'Lamborghini',
    model: 'Murcielago',
    vin: 'ZHWBU47S57LA02518',
    storageLocation: 'Moorpark',
    fairMarketValue: 320000,
    insuranceRiderRequired: true,
    insuranceRiderAmount: 350000,
    licensePlate: 'LAMBO07',
    registration: {
      number: 'REG456123',
      expirationDate: '2025-12-05',
      state: 'CA'
    },
    tirePressureDefault: {
      front: 32,
      rear: 32
    },
    tirePressurePreferred: {
      front: 35,
      rear: 35
    },
    maintenanceSchedule: {
      lastService: '2024-12-05',
      nextService: '2025-06-05',
      serviceInterval: 6,
      notes: 'Exotic vehicle, specialized service required'
    },
    authorizedContacts: [],
    odometer: 15000,
    image: 'https://images.pexels.com/photos/3954426/pexels-photo-3954426.jpeg',
    fuelLevel: 90,
    batteryType: 'AGM',
    color: 'Yellow',
    createdAt: '2024-12-05T09:30:00Z',
    updatedAt: '2024-12-05T09:30:00Z',
  },
  {
    id: 'v14',
    customerId: 'c14', // DHK Plumbing
    authorizedDrivers: [
      {
        id: 'ad14',
        name: 'Joe Dinka',
        phone: '562-762-6176',
        email: 'Joe@dhkplumbing.com',
        licenseNumber: 'CA456123',
        relationship: 'Owner'
      }
    ],
    year: 2009,
    make: 'Rolls Royce',
    model: 'Phantom Drophead',
    vin: 'SCA2D68509UX16359',
    storageLocation: 'Moorpark',
    fairMarketValue: 60000,
    insuranceRiderRequired: true,
    insuranceRiderAmount: 70000,
    licensePlate: 'ROLLS09',
    registration: {
      number: 'REG789456',
      expirationDate: '2025-12-05',
      state: 'CA'
    },
    tirePressureDefault: {
      front: 36,
      rear: 36
    },
    tirePressurePreferred: {
      front: 38,
      rear: 38
    },
    maintenanceSchedule: {
      lastService: '2024-12-05',
      nextService: '2025-06-05',
      serviceInterval: 6,
      notes: 'Luxury vehicle, specialized service required'
    },
    authorizedContacts: [],
    odometer: 25000,
    image: 'https://images.pexels.com/photos/3764984/pexels-photo-3764984.jpeg',
    fuelLevel: 85,
    batteryType: 'AGM',
    color: 'White',
    createdAt: '2024-12-05T10:45:00Z',
    updatedAt: '2024-12-05T10:45:00Z',
  },
  {
    id: 'v15',
    customerId: 'c15', // David Einstein
    authorizedDrivers: [
      {
        id: 'ad15',
        name: 'David Einstein',
        phone: '310-717-7087',
        email: 'deinstein@skyreachsystems.com',
        licenseNumber: 'CA789456',
        relationship: 'Owner'
      }
    ],
    year: 2024,
    make: 'Ferrari',
    model: '296 GTS',
    vin: 'ZFF01SMA9R0311081',
    storageLocation: 'Moorpark',
    fairMarketValue: 459358,
    insuranceRiderRequired: true,
    insuranceRiderAmount: 500000,
    licensePlate: 'FERR24',
    registration: {
      number: 'REG123456',
      expirationDate: '2025-11-08',
      state: 'CA'
    },
    tirePressureDefault: {
      front: 32,
      rear: 32
    },
    tirePressurePreferred: {
      front: 35,
      rear: 35
    },
    maintenanceSchedule: {
      lastService: '2024-12-01',
      nextService: '2025-06-01',
      serviceInterval: 6,
      notes: 'Exotic vehicle, specialized service required'
    },
    authorizedContacts: [],
    odometer: 3500,
    image: 'https://images.pexels.com/photos/337909/pexels-photo-337909.jpeg',
    fuelLevel: 95,
    batteryType: 'Lithium',
    color: 'Red',
    createdAt: '2024-12-01T11:15:00Z',
    updatedAt: '2024-12-01T11:15:00Z',
  },
  {
    id: 'v16',
    customerId: 'c16', // Alfred English
    authorizedDrivers: [
      {
        id: 'ad16',
        name: 'Alfred English',
        phone: '(626) 676-0031',
        email: 'alfred@sespecreekspirits.com',
        licenseNumber: 'CA123789',
        relationship: 'Owner'
      }
    ],
    year: 2020,
    make: 'Winnebago',
    model: 'View',
    vin: 'W1X8E33Y3LN108451',
    storageLocation: 'Moorpark',
    fairMarketValue: 190000,
    insuranceRiderRequired: true,
    insuranceRiderAmount: 200000,
    licensePlate: 'WINN20',
    registration: {
      number: 'REG456789',
      expirationDate: '2024-04-15',
      state: 'CA'
    },
    tirePressureDefault: {
      front: 65,
      rear: 80
    },
    tirePressurePreferred: {
      front: 70,
      rear: 85
    },
    maintenanceSchedule: {
      lastService: '2024-08-26',
      nextService: '2025-02-26',
      serviceInterval: 6,
      notes: 'RV, check generator and systems'
    },
    authorizedContacts: [],
    odometer: 25000,
    image: 'https://images.pexels.com/photos/2897531/pexels-photo-2897531.jpeg',
    fuelLevel: 80,
    batteryType: 'AGM',
    color: 'White',
    createdAt: '2024-08-26T13:20:00Z',
    updatedAt: '2024-08-26T13:20:00Z',
  },
  {
    id: 'v17',
    customerId: 'c17', // Russ Ercolani
    authorizedDrivers: [
      {
        id: 'ad17',
        name: 'Russ Ercolani',
        phone: '(805) 990-0475',
        email: 'russ.ercolani@gmail.com',
        licenseNumber: 'CA456123',
        relationship: 'Owner'
      }
    ],
    year: 2022,
    make: 'Malibu',
    model: 'Wakesetter MXZ 24',
    vin: 'MB2L5005K920',
    storageLocation: 'Moorpark',
    fairMarketValue: 150000,
    insuranceRiderRequired: true,
    insuranceRiderAmount: 160000,
    licensePlate: 'BOAT22',
    registration: {
      number: 'REG789123',
      expirationDate: '2025-06-11',
      state: 'CA'
    },
    tirePressureDefault: {
      front: 0,
      rear: 0
    },
    tirePressurePreferred: {
      front: 0,
      rear: 0
    },
    maintenanceSchedule: {
      lastService: '2025-03-01',
      nextService: '2025-09-01',
      serviceInterval: 6,
      notes: 'Boat - requires specialized maintenance'
    },
    authorizedContacts: [],
    odometer: 0,
    image: 'https://images.pexels.com/photos/1295036/pexels-photo-1295036.jpeg',
    fuelLevel: 90,
    batteryType: 'Standard',
    color: 'Blue/White',
    createdAt: '2025-03-01T09:45:00Z',
    updatedAt: '2025-03-01T09:45:00Z',
  },
  {
    id: 'v18',
    customerId: 'c21', // John Garcia
    authorizedDrivers: [
      {
        id: 'ad18',
        name: 'John Garcia',
        phone: '(310) 600-6464',
        email: 'john@johngarcia.org',
        licenseNumber: 'CA789123',
        relationship: 'Owner'
      }
    ],
    year: 2003,
    make: 'Ferrari',
    model: '360',
    vin: 'ZFFYU51A730132853',
    storageLocation: 'Moorpark',
    fairMarketValue: 150000,
    insuranceRiderRequired: true,
    insuranceRiderAmount: 160000,
    licensePlate: 'FERR03',
    registration: {
      number: 'REG123456',
      expirationDate: '2025-06-10',
      state: 'CA'
    },
    tirePressureDefault: {
      front: 32,
      rear: 32
    },
    tirePressurePreferred: {
      front: 35,
      rear: 35
    },
    maintenanceSchedule: {
      lastService: '2024-08-14',
      nextService: '2025-02-14',
      serviceInterval: 6,
      notes: 'Exotic vehicle, specialized service required'
    },
    authorizedContacts: [],
    odometer: 25000,
    image: 'https://images.pexels.com/photos/337909/pexels-photo-337909.jpeg',
    fuelLevel: 80,
    batteryType: 'Standard',
    color: 'Red',
    createdAt: '2024-08-14T10:30:00Z',
    updatedAt: '2024-08-14T10:30:00Z',
  },
  {
    id: 'v19',
    customerId: 'c22', // Jon Garland
    authorizedDrivers: [
      {
        id: 'ad19',
        name: 'Jon Garland',
        phone: '(520) 241-4816',
        email: 'gland20@aol.com',
        licenseNumber: 'CA123456',
        relationship: 'Owner'
      }
    ],
    year: 1962,
    make: 'Lincoln',
    model: 'Continental',
    vin: '2Y82H414205',
    storageLocation: 'Moorpark',
    fairMarketValue: 80000,
    insuranceRiderRequired: true,
    insuranceRiderAmount: 90000,
    licensePlate: 'LINC62',
    registration: {
      number: 'REG456789',
      expirationDate: '2025-08-28',
      state: 'CA'
    },
    tirePressureDefault: {
      front: 28,
      rear: 28
    },
    tirePressurePreferred: {
      front: 30,
      rear: 30
    },
    maintenanceSchedule: {
      lastService: '2024-12-01',
      nextService: '2025-06-01',
      serviceInterval: 6,
      notes: 'Classic car, handle with care'
    },
    authorizedContacts: [],
    odometer: 65000,
    image: 'https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg',
    fuelLevel: 70,
    batteryType: 'Standard',
    color: 'Black',
    createdAt: '2024-12-01T09:15:00Z',
    updatedAt: '2024-12-01T09:15:00Z',
  },
  {
    id: 'v20',
    customerId: 'c22', // Jon Garland
    authorizedDrivers: [
      {
        id: 'ad20',
        name: 'Jon Garland',
        phone: '(520) 241-4816',
        email: 'gland20@aol.com',
        licenseNumber: 'CA123456',
        relationship: 'Owner'
      }
    ],
    year: 1985,
    make: 'Ferrari',
    model: '308 GTS',
    vin: 'ZFFLA13S000059193',
    storageLocation: 'Moorpark',
    fairMarketValue: 100000,
    insuranceRiderRequired: true,
    insuranceRiderAmount: 110000,
    licensePlate: 'FERR85',
    registration: {
      number: 'REG789123',
      expirationDate: '2025-12-01',
      state: 'CA'
    },
    tirePressureDefault: {
      front: 32,
      rear: 32
    },
    tirePressurePreferred: {
      front: 35,
      rear: 35
    },
    maintenanceSchedule: {
      lastService: '2024-12-01',
      nextService: '2025-06-01',
      serviceInterval: 6,
      notes: 'Classic Ferrari, specialized service required'
    },
    authorizedContacts: [],
    odometer: 45000,
    image: 'https://images.pexels.com/photos/337909/pexels-photo-337909.jpeg',
    fuelLevel: 75,
    batteryType: 'Standard',
    color: 'Red',
    createdAt: '2024-12-01T10:30:00Z',
    updatedAt: '2024-12-01T10:30:00Z',
  },
  {
    id: 'v21',
    customerId: 'c22', // Jon Garland
    authorizedDrivers: [
      {
        id: 'ad21',
        name: 'Jon Garland',
        phone: '(520) 241-4816',
        email: 'gland20@aol.com',
        licenseNumber: 'CA123456',
        relationship: 'Owner'
      }
    ],
    year: 2005,
    make: 'Porsche',
    model: '911 Carrerra S',
    vin: 'WP0AB29995S740704',
    storageLocation: 'Moorpark',
    fairMarketValue: 40000,
    insuranceRiderRequired: true,
    insuranceRiderAmount: 50000,
    licensePlate: 'PRSH05',
    registration: {
      number: 'REG123789',
      expirationDate: '2025-12-01',
      state: 'CA'
    },
    tirePressureDefault: {
      front: 32,
      rear: 30
    },
    tirePressurePreferred: {
      front: 35,
      rear: 33
    },
    maintenanceSchedule: {
      lastService: '2024-12-01',
      nextService: '2025-06-01',
      serviceInterval: 6,
      notes: 'Sports car, check brakes and suspension'
    },
    authorizedContacts: [],
    odometer: 55000,
    image: 'https://images.pexels.com/photos/3954440/pexels-photo-3954440.jpeg',
    fuelLevel: 80,
    batteryType: 'Standard',
    color: 'Silver',
    createdAt: '2024-12-01T11:45:00Z',
    updatedAt: '2024-12-01T11:45:00Z',
  },
  {
    id: 'v22',
    customerId: 'c23', // Greg Geyer
    authorizedDrivers: [
      {
        id: 'ad22',
        name: 'Greg Geyer',
        phone: '(310) 463-2271',
        email: 'gregtgeyer@gmail.com',
        licenseNumber: 'CA456789',
        relationship: 'Owner'
      }
    ],
    year: 2014,
    make: 'Porsche',
    model: '911 Turbo',
    vin: 'WP0AD2A9XES167737',
    storageLocation: 'Moorpark',
    fairMarketValue: 120000,
    insuranceRiderRequired: true,
    insuranceRiderAmount: 130000,
    licensePlate: 'PRSH14',
    registration: {
      number: 'REG456123',
      expirationDate: '2025-06-01',
      state: 'CA'
    },
    tirePressureDefault: {
      front: 32,
      rear: 30
    },
    tirePressurePreferred: {
      front: 35,
      rear: 33
    },
    maintenanceSchedule: {
      lastService: '2024-08-26',
      nextService: '2025-02-26',
      serviceInterval: 6,
      notes: 'Sports car, check brakes and suspension'
    },
    authorizedContacts: [],
    odometer: 35000,
    image: 'https://images.pexels.com/photos/3954440/pexels-photo-3954440.jpeg',
    fuelLevel: 85,
    batteryType: 'Standard',
    color: 'Black',
    createdAt: '2024-08-26T09:30:00Z',
    updatedAt: '2024-08-26T09:30:00Z',
  },
  {
    id: 'v23',
    customerId: 'c23', // Greg Geyer
    authorizedDrivers: [
      {
        id: 'ad23',
        name: 'Greg Geyer',
        phone: '(310) 463-2271',
        email: 'gregtgeyer@gmail.com',
        licenseNumber: 'CA456789',
        relationship: 'Owner'
      }
    ],
    year: 2025,
    make: 'Land Rover',
    model: 'Range Rover',
    vin: 'SALKPBE95SA277675',
    storageLocation: 'Moorpark',
    fairMarketValue: 120000,
    insuranceRiderRequired: true,
    insuranceRiderAmount: 130000,
    licensePlate: 'RANGE25',
    registration: {
      number: 'REG789456',
      expirationDate: '2025-06-01',
      state: 'CA'
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
      lastService: '2024-08-27',
      nextService: '2025-02-27',
      serviceInterval: 6,
      notes: 'Luxury SUV, check air suspension'
    },
    authorizedContacts: [],
    odometer: 5000,
    image: 'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg',
    fuelLevel: 90,
    batteryType: 'AGM',
    color: 'Black',
    createdAt: '2024-08-27T10:45:00Z',
    updatedAt: '2024-08-27T10:45:00Z',
  },
  {
    id: 'v24',
    customerId: 'c25', // Kenneth Ingoldsby
    authorizedDrivers: [
      {
        id: 'ad24',
        name: 'Kenneth Ingoldsby',
        phone: '818-983-6207',
        email: 'kenslaw01@aim.com',
        licenseNumber: 'CA123789',
        relationship: 'Owner'
      }
    ],
    year: 1989,
    make: 'Lamborghini',
    model: 'Countach',
    vin: 'ZA9CA05AXKLA12520',
    storageLocation: 'Moorpark',
    fairMarketValue: 850000,
    insuranceRiderRequired: true,
    insuranceRiderAmount: 900000,
    licensePlate: 'LAMBO89',
    registration: {
      number: 'REG123456',
      expirationDate: '2026-02-22',
      state: 'CA'
    },
    tirePressureDefault: {
      front: 32,
      rear: 32
    },
    tirePressurePreferred: {
      front: 35,
      rear: 35
    },
    maintenanceSchedule: {
      lastService: '2025-04-04',
      nextService: '2025-10-04',
      serviceInterval: 6,
      notes: 'Exotic vehicle, specialized service required'
    },
    authorizedContacts: [],
    odometer: 15000,
    image: 'https://images.pexels.com/photos/3954426/pexels-photo-3954426.jpeg',
    fuelLevel: 85,
    batteryType: 'Standard',
    color: 'Red',
    createdAt: '2025-04-04T11:15:00Z',
    updatedAt: '2025-04-04T11:15:00Z',
  },
  {
    id: 'v25',
    customerId: 'c26', // Kurt Johnson
    authorizedDrivers: [
      {
        id: 'ad25',
        name: 'Kurt Johnson',
        phone: '(805) 551-6258',
        email: 'kjohnson@hunterrainier.com',
        licenseNumber: 'CA456123',
        relationship: 'Owner'
      }
    ],
    year: 2023,
    make: 'Malibu',
    model: 'Wakesetter 23LSV',
    vin: 'MB2S5847D515',
    storageLocation: 'Moorpark',
    fairMarketValue: 85000,
    insuranceRiderRequired: true,
    insuranceRiderAmount: 90000,
    licensePlate: 'BOAT23',
    registration: {
      number: 'REG789123',
      expirationDate: '2026-01-01',
      state: 'CA'
    },
    tirePressureDefault: {
      front: 0,
      rear: 0
    },
    tirePressurePreferred: {
      front: 0,
      rear: 0
    },
    maintenanceSchedule: {
      lastService: '2025-01-01',
      nextService: '2025-07-01',
      serviceInterval: 6,
      notes: 'Boat - requires specialized maintenance'
    },
    authorizedContacts: [],
    odometer: 0,
    image: 'https://images.pexels.com/photos/1295036/pexels-photo-1295036.jpeg',
    fuelLevel: 90,
    batteryType: 'Standard',
    color: 'Blue/White',
    createdAt: '2025-01-01T09:30:00Z',
    updatedAt: '2025-01-01T09:30:00Z',
  },
  {
    id: 'v26',
    customerId: 'c27', // Paul Johnson
    authorizedDrivers: [
      {
        id: 'ad26',
        name: 'Paul Johnson',
        phone: '(818) 825-8611',
        email: 'paulj89@hotmail.com',
        licenseNumber: 'CA789123',
        relationship: 'Owner'
      }
    ],
    year: 2018,
    make: 'Dodge',
    model: 'Demon',
    vin: '2C3CDZH95JH101819',
    storageLocation: 'Moorpark',
    fairMarketValue: 125000,
    insuranceRiderRequired: true,
    insuranceRiderAmount: 130000,
    licensePlate: 'DEMON18',
    registration: {
      number: 'REG123789',
      expirationDate: '2026-05-31',
      state: 'CA'
    },
    tirePressureDefault: {
      front: 32,
      rear: 32
    },
    tirePressurePreferred: {
      front: 35,
      rear: 35
    },
    maintenanceSchedule: {
      lastService: '2025-06-01',
      nextService: '2025-12-01',
      serviceInterval: 6,
      notes: 'High performance vehicle, check tires and brakes'
    },
    authorizedContacts: [],
    odometer: 12000,
    image: 'https://images.pexels.com/photos/3874337/pexels-photo-3874337.jpeg',
    fuelLevel: 85,
    batteryType: 'AGM',
    color: 'Black',
    createdAt: '2025-06-01T10:15:00Z',
    updatedAt: '2025-06-01T10:15:00Z',
  },
  {
    id: 'v27',
    customerId: 'c27', // Paul Johnson
    authorizedDrivers: [
      {
        id: 'ad27',
        name: 'Paul Johnson',
        phone: '(818) 825-8611',
        email: 'paulj89@hotmail.com',
        licenseNumber: 'CA789123',
        relationship: 'Owner'
      }
    ],
    year: 2018,
    make: 'Porsche',
    model: 'GT2RS',
    vin: 'WPOAE2A94JS185349',
    storageLocation: 'Moorpark',
    fairMarketValue: 410000,
    insuranceRiderRequired: true,
    insuranceRiderAmount: 450000,
    licensePlate: 'GT2RS18',
    registration: {
      number: 'REG456123',
      expirationDate: '2026-05-31',
      state: 'CA'
    },
    tirePressureDefault: {
      front: 32,
      rear: 30
    },
    tirePressurePreferred: {
      front: 35,
      rear: 33
    },
    maintenanceSchedule: {
      lastService: '2025-06-01',
      nextService: '2025-12-01',
      serviceInterval: 6,
      notes: 'Exotic vehicle, specialized service required'
    },
    authorizedContacts: [],
    odometer: 8000,
    image: 'https://images.pexels.com/photos/3954440/pexels-photo-3954440.jpeg',
    fuelLevel: 90,
    batteryType: 'Lithium',
    color: 'White',
    createdAt: '2025-06-01T11:30:00Z',
    updatedAt: '2025-06-01T11:30:00Z',
  },
  {
    id: 'v28',
    customerId: 'c28', // Brian Jones
    authorizedDrivers: [
      {
        id: 'ad28',
        name: 'Brian Jones',
        phone: '(805) 241-1735',
        email: 'brianjones81@earthlink.net',
        licenseNumber: 'CA123456',
        relationship: 'Owner'
      }
    ],
    year: 1932,
    make: 'Ford',
    model: 'RD',
    vin: '1841802',
    storageLocation: 'Moorpark',
    fairMarketValue: 69000,
    insuranceRiderRequired: true,
    insuranceRiderAmount: 75000,
    licensePlate: 'FORD32',
    registration: {
      number: 'REG789123',
      expirationDate: '2024-04-20',
      state: 'CA'
    },
    tirePressureDefault: {
      front: 28,
      rear: 28
    },
    tirePressurePreferred: {
      front: 30,
      rear: 30
    },
    maintenanceSchedule: {
      lastService: '2022-12-10',
      nextService: '2023-06-10',
      serviceInterval: 6,
      notes: 'Classic car, handle with care'
    },
    authorizedContacts: [],
    odometer: 12000,
    image: 'https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg',
    fuelLevel: 70,
    batteryType: 'Standard',
    color: 'Black',
    createdAt: '2022-12-10T09:15:00Z',
    updatedAt: '2022-12-10T09:15:00Z',
  },
  {
    id: 'v29',
    customerId: 'c28', // Brian Jones
    authorizedDrivers: [
      {
        id: 'ad29',
        name: 'Brian Jones',
        phone: '(805) 241-1735',
        email: 'brianjones81@earthlink.net',
        licenseNumber: 'CA123456',
        relationship: 'Owner'
      }
    ],
    year: 1939,
    make: 'Ford',
    model: 'Deluxe',
    vin: '185140520',
    storageLocation: 'Moorpark',
    fairMarketValue: 50000,
    insuranceRiderRequired: true,
    insuranceRiderAmount: 55000,
    licensePlate: 'FORD39',
    registration: {
      number: 'REG123456',
      expirationDate: '2024-04-20',
      state: 'CA'
    },
    tirePressureDefault: {
      front: 28,
      rear: 28
    },
    tirePressurePreferred: {
      front: 30,
      rear: 30
    },
    maintenanceSchedule: {
      lastService: '2022-12-10',
      nextService: '2023-06-10',
      serviceInterval: 6,
      notes: 'Classic car, handle with care'
    },
    authorizedContacts: [],
    odometer: 15000,
    image: 'https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg',
    fuelLevel: 65,
    batteryType: 'Standard',
    color: 'Blue',
    createdAt: '2022-12-10T10:30:00Z',
    updatedAt: '2022-12-10T10:30:00Z',
  },
  {
    id: 'v30',
    customerId: 'c28', // Brian Jones
    authorizedDrivers: [
      {
        id: 'ad30',
        name: 'Brian Jones',
        phone: '(805) 241-1735',
        email: 'brianjones81@earthlink.net',
        licenseNumber: 'CA123456',
        relationship: 'Owner'
      }
    ],
    year: 1941,
    make: 'Ford',
    model: '11C',
    vin: '9C5749',
    storageLocation: 'Moorpark',
    fairMarketValue: 60000,
    insuranceRiderRequired: true,
    insuranceRiderAmount: 65000,
    licensePlate: 'FORD41',
    registration: {
      number: 'REG456789',
      expirationDate: '2024-04-20',
      state: 'CA'
    },
    tirePressureDefault: {
      front: 28,
      rear: 28
    },
    tirePressurePreferred: {
      front: 30,
      rear: 30
    },
    maintenanceSchedule: {
      lastService: '2022-12-10',
      nextService: '2023-06-10',
      serviceInterval: 6,
      notes: 'Classic car, handle with care'
    },
    authorizedContacts: [],
    odometer: 10000,
    image: 'https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg',
    fuelLevel: 70,
    batteryType: 'Standard',
    color: 'Green',
    createdAt: '2022-12-10T11:45:00Z',
    updatedAt: '2022-12-10T11:45:00Z',
  },
  {
    id: 'v31',
    customerId: 'c28', // Brian Jones
    authorizedDrivers: [
      {
        id: 'ad31',
        name: 'Brian Jones',
        phone: '(805) 241-1735',
        email: 'brianjones81@earthlink.net',
        licenseNumber: 'CA123456',
        relationship: 'Owner'
      }
    ],
    year: 2016,
    make: 'Dodge',
    model: 'Challenger Hellcat',
    vin: '2C3CDZC9XGH308450',
    storageLocation: 'Moorpark',
    fairMarketValue: 120000,
    insuranceRiderRequired: true,
    insuranceRiderAmount: 130000,
    licensePlate: 'HELL16',
    registration: {
      number: 'REG789123',
      expirationDate: '2024-10-17',
      state: 'CA'
    },
    tirePressureDefault: {
      front: 32,
      rear: 32
    },
    tirePressurePreferred: {
      front: 35,
      rear: 35
    },
    maintenanceSchedule: {
      lastService: '2024-05-06',
      nextService: '2024-11-06',
      serviceInterval: 6,
      notes: 'High performance vehicle, check tires and brakes'
    },
    authorizedContacts: [],
    odometer: 25000,
    image: 'https://images.pexels.com/photos/3874337/pexels-photo-3874337.jpeg',
    fuelLevel: 80,
    batteryType: 'AGM',
    color: 'Black',
    createdAt: '2024-05-06T13:20:00Z',
    updatedAt: '2024-05-06T13:20:00Z',
  },
  {
    id: 'v32',
    customerId: 'c28', // Brian Jones
    authorizedDrivers: [
      {
        id: 'ad32',
        name: 'Brian Jones',
        phone: '(805) 241-1735',
        email: 'brianjones81@earthlink.net',
        licenseNumber: 'CA123456',
        relationship: 'Owner'
      }
    ],
    year: 1982,
    make: 'Honda',
    model: '350x ATC',
    vin: 'JHSTE080XFM008615',
    storageLocation: 'Moorpark',
    fairMarketValue: 8500,
    insuranceRiderRequired: false,
    licensePlate: 'ATC82',
    registration: {
      number: 'REG123789',
      expirationDate: '2024-04-20',
      state: 'CA'
    },
    tirePressureDefault: {
      front: 5,
      rear: 5
    },
    tirePressurePreferred: {
      front: 6,
      rear: 6
    },
    maintenanceSchedule: {
      lastService: '2022-12-10',
      nextService: '2023-06-10',
      serviceInterval: 6,
      notes: 'ATV, check tires and chain'
    },
    authorizedContacts: [],
    odometer: 5000,
    image: 'https://images.pexels.com/photos/2549941/pexels-photo-2549941.jpeg',
    fuelLevel: 75,
    batteryType: 'Standard',
    color: 'Red',
    createdAt: '2022-12-10T13:00:00Z',
    updatedAt: '2022-12-10T13:00:00Z',
  },
  {
    id: 'v33',
    customerId: 'c31', // Matthew Ludwick
    authorizedDrivers: [
      {
        id: 'ad33',
        name: 'Matthew Ludwick',
        phone: '(406) 559-6579',
        email: 'matt@bighornprecision.com',
        licenseNumber: 'MT123456',
        relationship: 'Owner'
      }
    ],
    year: 1994,
    make: 'Chevrolet',
    model: 'C1500',
    vin: '1GCDC14Z1RZ124083',
    storageLocation: 'Moorpark',
    fairMarketValue: 140000,
    insuranceRiderRequired: true,
    insuranceRiderAmount: 150000,
    licensePlate: 'CHEVY94',
    registration: {
      number: 'REG456123',
      expirationDate: '2025-06-28',
      state: 'MT'
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
      lastService: '2024-07-03',
      nextService: '2025-01-03',
      serviceInterval: 6,
      notes: 'Classic truck, check suspension'
    },
    authorizedContacts: [],
    odometer: 85000,
    image: 'https://images.pexels.com/photos/2533092/pexels-photo-2533092.jpeg',
    fuelLevel: 75,
    batteryType: 'Standard',
    color: 'Blue',
    createdAt: '2024-07-03T09:45:00Z',
    updatedAt: '2024-07-03T09:45:00Z',
  },
  {
    id: 'v34',
    customerId: 'c32', // Kevin Lydick
    authorizedDrivers: [
      {
        id: 'ad34',
        name: 'Kevin Lydick',
        phone: '(805) 630-8377',
        email: 'kevin@oakridgelandworks.com',
        licenseNumber: 'CA789456',
        relationship: 'Owner'
      }
    ],
    year: 2017,
    make: 'BMW',
    model: 'M6',
    vin: 'WBS6E9C31HG437538',
    storageLocation: 'Moorpark',
    fairMarketValue: 85000,
    insuranceRiderRequired: true,
    insuranceRiderAmount: 90000,
    licensePlate: 'BMW17',
    registration: {
      number: 'REG123789',
      expirationDate: '2024-05-04',
      state: 'CA'
    },
    tirePressureDefault: {
      front: 32,
      rear: 32
    },
    tirePressurePreferred: {
      front: 35,
      rear: 35
    },
    maintenanceSchedule: {
      lastService: '2024-09-01',
      nextService: '2025-03-01',
      serviceInterval: 6,
      notes: 'High performance vehicle, check brakes and suspension'
    },
    authorizedContacts: [],
    odometer: 45000,
    image: 'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg',
    fuelLevel: 80,
    batteryType: 'AGM',
    color: 'Black',
    createdAt: '2024-09-01T10:15:00Z',
    updatedAt: '2024-09-01T10:15:00Z',
  },
  {
    id: 'v35',
    customerId: 'c32', // Kevin Lydick
    authorizedDrivers: [
      {
        id: 'ad35',
        name: 'Kevin Lydick',
        phone: '(805) 630-8377',
        email: 'kevin@oakridgelandworks.com',
        licenseNumber: 'CA789456',
        relationship: 'Owner'
      }
    ],
    year: 2022,
    make: 'Ford',
    model: 'Shelby GT500',
    vin: '1FA6P8SJ4N5502617',
    storageLocation: 'Moorpark',
    fairMarketValue: 125000,
    insuranceRiderRequired: true,
    insuranceRiderAmount: 130000,
    licensePlate: 'SHELBY22',
    registration: {
      number: 'REG456789',
      expirationDate: '2024-05-04',
      state: 'CA'
    },
    tirePressureDefault: {
      front: 32,
      rear: 32
    },
    tirePressurePreferred: {
      front: 35,
      rear: 35
    },
    maintenanceSchedule: {
      lastService: '2024-09-01',
      nextService: '2025-03-01',
      serviceInterval: 6,
      notes: 'High performance vehicle, check tires and brakes'
    },
    authorizedContacts: [],
    odometer: 15000,
    image: 'https://images.pexels.com/photos/3874337/pexels-photo-3874337.jpeg',
    fuelLevel: 85,
    batteryType: 'AGM',
    color: 'Blue',
    createdAt: '2024-09-01T11:30:00Z',
    updatedAt: '2024-09-01T11:30:00Z',
  },
  {
    id: 'v36',
    customerId: 'c32', // Kevin Lydick
    authorizedDrivers: [
      {
        id: 'ad36',
        name: 'Kevin Lydick',
        phone: '(805) 630-8377',
        email: 'kevin@oakridgelandworks.com',
        licenseNumber: 'CA789456',
        relationship: 'Owner'
      }
    ],
    year: 2024,
    make: 'Ford',
    model: 'Raptor R',
    vin: '1FTFW1RJ7RFB29647',
    storageLocation: 'Moorpark',
    fairMarketValue: 60000,
    insuranceRiderRequired: true,
    insuranceRiderAmount: 65000,
    licensePlate: 'RAPTR24',
    registration: {
      number: 'REG789123',
      expirationDate: '2025-09-01',
      state: 'CA'
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
      lastService: '2024-09-01',
      nextService: '2025-03-01',
      serviceInterval: 6,
      notes: 'Off-road vehicle, check suspension and undercarriage'
    },
    authorizedContacts: [],
    odometer: 8000,
    image: 'https://images.pexels.com/photos/2533092/pexels-photo-2533092.jpeg',
    fuelLevel: 90,
    batteryType: 'AGM',
    color: 'Black',
    createdAt: '2024-09-01T12:45:00Z',
    updatedAt: '2024-09-01T12:45:00Z',
  },
  {
    id: 'v37',
    customerId: 'c32', // Kevin Lydick
    authorizedDrivers: [
      {
        id: 'ad37',
        name: 'Kevin Lydick',
        phone: '(805) 630-8377',
        email: 'kevin@oakridgelandworks.com',
        licenseNumber: 'CA789456',
        relationship: 'Owner'
      }
    ],
    year: 2024,
    make: 'Ford',
    model: 'F-150 Supersnake',
    vin: '1FTFW5L58RFB74129',
    storageLocation: 'Moorpark',
    fairMarketValue: 138495,
    insuranceRiderRequired: true,
    insuranceRiderAmount: 140000,
    licensePlate: 'SNAKE24',
    registration: {
      number: 'REG123456',
      expirationDate: '2025-09-01',
      state: 'CA'
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
      lastService: '2024-09-01',
      nextService: '2025-03-01',
      serviceInterval: 6,
      notes: 'High performance truck, check supercharger'
    },
    authorizedContacts: [],
    odometer: 5000,
    image: 'https://images.pexels.com/photos/2533092/pexels-photo-2533092.jpeg',
    fuelLevel: 85,
    batteryType: 'AGM',
    color: 'Blue',
    createdAt: '2024-09-01T14:00:00Z',
    updatedAt: '2024-09-01T14:00:00Z',
  },
  {
    id: 'v38',
    customerId: 'c33', // Vincent Malfa
    authorizedDrivers: [
      {
        id: 'ad38',
        name: 'Vincent Malfa',
        phone: '(508) 859-0390',
        email: 'vgm@tripledistilled.com',
        licenseNumber: 'CA123789',
        relationship: 'Owner'
      }
    ],
    year: 1995,
    make: 'BMW',
    model: 'M3',
    vin: 'WBSBF9326SEH08263',
    storageLocation: 'Moorpark',
    fairMarketValue: 32000,
    insuranceRiderRequired: true,
    insuranceRiderAmount: 35000,
    licensePlate: 'BMW95',
    registration: {
      number: 'REG456789',
      expirationDate: '2024-04-01',
      state: 'CA'
    },
    tirePressureDefault: {
      front: 32,
      rear: 32
    },
    tirePressurePreferred: {
      front: 35,
      rear: 35
    },
    maintenanceSchedule: {
      lastService: '2023-09-06',
      nextService: '2024-03-06',
      serviceInterval: 6,
      notes: 'Classic BMW, check cooling system'
    },
    authorizedContacts: [],
    odometer: 85000,
    image: 'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg',
    fuelLevel: 70,
    batteryType: 'Standard',
    color: 'Black',
    createdAt: '2023-09-06T10:30:00Z',
    updatedAt: '2023-09-06T10:30:00Z',
  },
  {
    id: 'v39',
    customerId: 'c34', // Gerald Mansell
    authorizedDrivers: [
      {
        id: 'ad39',
        name: 'Gerald Mansell',
        phone: '808-375-7971',
        email: 'gerrymansell@icloud.com',
        licenseNumber: 'HI123456',
        relationship: 'Owner'
      }
    ],
    year: 2011,
    make: 'Porsche',
    model: '997 GTS',
    vin: 'WP0AB2A9XBS721313',
    storageLocation: 'Moorpark',
    fairMarketValue: 110000,
    insuranceRiderRequired: true,
    insuranceRiderAmount: 120000,
    licensePlate: 'PRSH11',
    registration: {
      number: 'REG789123',
      expirationDate: '2024-12-21',
      state: 'HI'
    },
    tirePressureDefault: {
      front: 32,
      rear: 30
    },
    tirePressurePreferred: {
      front: 35,
      rear: 33
    },
    maintenanceSchedule: {
      lastService: '2024-12-17',
      nextService: '2025-06-17',
      serviceInterval: 6,
      notes: 'Sports car, check brakes and suspension'
    },
    authorizedContacts: [],
    odometer: 35000,
    image: 'https://images.pexels.com/photos/3954440/pexels-photo-3954440.jpeg',
    fuelLevel: 80,
    batteryType: 'Standard',
    color: 'Silver',
    createdAt: '2024-12-17T09:45:00Z',
    updatedAt: '2024-12-17T09:45:00Z',
  },
  {
    id: 'v40',
    customerId: 'c34', // Gerald Mansell
    authorizedDrivers: [
      {
        id: 'ad40',
        name: 'Gerald Mansell',
        phone: '808-375-7971',
        email: 'gerrymansell@icloud.com',
        licenseNumber: 'HI123456',
        relationship: 'Owner'
      }
    ],
    year: 2020,
    make: 'Porsche',
    model: '718 Boxster Spyder',
    vin: 'WP0CC2A89LS240306',
    storageLocation: 'Moorpark',
    fairMarketValue: 112000,
    insuranceRiderRequired: true,
    insuranceRiderAmount: 120000,
    licensePlate: 'SPYDR20',
    registration: {
      number: 'REG123456',
      expirationDate: '2025-12-17',
      state: 'HI'
    },
    tirePressureDefault: {
      front: 32,
      rear: 30
    },
    tirePressurePreferred: {
      front: 35,
      rear: 33
    },
    maintenanceSchedule: {
      lastService: '2024-12-17',
      nextService: '2025-06-17',
      serviceInterval: 6,
      notes: 'Sports car, check brakes and suspension'
    },
    authorizedContacts: [],
    odometer: 15000,
    image: 'https://images.pexels.com/photos/3954440/pexels-photo-3954440.jpeg',
    fuelLevel: 85,
    batteryType: 'Standard',
    color: 'Red',
    createdAt: '2024-12-17T11:00:00Z',
    updatedAt: '2024-12-17T11:00:00Z',
  },
  {
    id: 'v41',
    customerId: 'c35', // Marmonte Cars LLC
    authorizedDrivers: [
      {
        id: 'ad41',
        name: 'Sergio',
        phone: '310-795-2001',
        email: 'sergio@migramer.com',
        licenseNumber: 'CA456789',
        relationship: 'Owner'
      }
    ],
    year: 2003,
    make: 'Mazda',
    model: 'Miata MX-5',
    vin: 'JM1NB353030300663',
    storageLocation: 'Moorpark',
    fairMarketValue: 45000,
    insuranceRiderRequired: false,
    licensePlate: 'MIATA03',
    registration: {
      number: 'REG789123',
      expirationDate: '2026-05-07',
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
      lastService: '2025-05-07',
      nextService: '2025-11-07',
      serviceInterval: 6,
      notes: 'Convertible, check top mechanism'
    },
    authorizedContacts: [],
    odometer: 65000,
    image: 'https://images.pexels.com/photos/119435/pexels-photo-119435.jpeg',
    fuelLevel: 75,
    batteryType: 'Standard',
    color: 'Red',
    createdAt: '2025-05-07T09:30:00Z',
    updatedAt: '2025-05-07T09:30:00Z',
  },
  {
    id: 'v42',
    customerId: 'c36', // Joseph Matta
    authorizedDrivers: [
      {
        id: 'ad42',
        name: 'Joseph Matta',
        phone: '(805) 795-1300',
        email: 'joe@hansonlab.com',
        licenseNumber: 'CA123789',
        relationship: 'Owner'
      }
    ],
    year: 2018,
    make: 'Porsche',
    model: '911 Turbo S',
    vin: 'WP0AD2A96JS156695',
    storageLocation: 'Moorpark',
    fairMarketValue: 190000,
    insuranceRiderRequired: true,
    insuranceRiderAmount: 200000,
    licensePlate: 'TURBO18',
    registration: {
      number: 'REG456123',
      expirationDate: '2024-12-27',
      state: 'CA'
    },
    tirePressureDefault: {
      front: 32,
      rear: 30
    },
    tirePressurePreferred: {
      front: 35,
      rear: 33
    },
    maintenanceSchedule: {
      lastService: '2023-12-27',
      nextService: '2024-06-27',
      serviceInterval: 6,
      notes: 'High performance vehicle, check brakes and suspension'
    },
    authorizedContacts: [],
    odometer: 25000,
    image: 'https://images.pexels.com/photos/3954440/pexels-photo-3954440.jpeg',
    fuelLevel: 85,
    batteryType: 'Lithium',
    color: 'Silver',
    createdAt: '2023-12-27T10:15:00Z',
    updatedAt: '2023-12-27T10:15:00Z',
  },
  {
    id: 'v43',
    customerId: 'c37', // Greg McNeal
    authorizedDrivers: [
      {
        id: 'ad43',
        name: 'Greg McNeal',
        phone: '512-413-3869',
        email: 'gregory.mcneal.list@gmail.com',
        licenseNumber: 'CA456123',
        relationship: 'Owner'
      }
    ],
    year: 1971,
    make: 'Ford',
    model: 'Bronco',
    vin: 'U15GLK08711',
    storageLocation: 'Moorpark',
    fairMarketValue: 125000,
    insuranceRiderRequired: true,
    insuranceRiderAmount: 130000,
    licensePlate: 'BRNCO71',
    registration: {
      number: 'REG789123',
      expirationDate: '2026-06-02',
      state: 'CA'
    },
    tirePressureDefault: {
      front: 32,
      rear: 32
    },
    tirePressurePreferred: {
      front: 35,
      rear: 35
    },
    maintenanceSchedule: {
      lastService: '2025-06-02',
      nextService: '2025-12-02',
      serviceInterval: 6,
      notes: 'Classic SUV, check 4x4 system'
    },
    authorizedContacts: [],
    odometer: 45000,
    image: 'https://images.pexels.com/photos/2533092/pexels-photo-2533092.jpeg',
    fuelLevel: 80,
    batteryType: 'Standard',
    color: 'Blue',
    createdAt: '2025-06-02T09:30:00Z',
    updatedAt: '2025-06-02T09:30:00Z',
  },
  {
    id: 'v44',
    customerId: 'c38', // Garrett Pegler
    authorizedDrivers: [
      {
        id: 'ad44',
        name: 'Garrett Pegler',
        phone: '(805) 427-5863',
        email: 'garret@ghostshieldfilm.com',
        licenseNumber: 'CA789123',
        relationship: 'Owner'
      }
    ],
    year: 1969,
    make: 'Chevrolet',
    model: 'Camaro',
    vin: 'N592786',
    storageLocation: 'Moorpark',
    fairMarketValue: 50000,
    insuranceRiderRequired: true,
    insuranceRiderAmount: 55000,
    licensePlate: 'CAMRO69',
    registration: {
      number: 'REG123456',
      expirationDate: '2024-05-13',
      state: 'CA'
    },
    tirePressureDefault: {
      front: 28,
      rear: 28
    },
    tirePressurePreferred: {
      front: 30,
      rear: 30
    },
    maintenanceSchedule: {
      lastService: '2022-12-14',
      nextService: '2023-06-14',
      serviceInterval: 6,
      notes: 'Classic muscle car, check engine and transmission'
    },
    authorizedContacts: [],
    odometer: 55000,
    image: 'https://images.pexels.com/photos/3874337/pexels-photo-3874337.jpeg',
    fuelLevel: 75,
    batteryType: 'Standard',
    color: 'Blue',
    createdAt: '2022-12-14T09:45:00Z',
    updatedAt: '2022-12-14T09:45:00Z',
  },
  {
    id: 'v45',
    customerId: 'c38', // Garrett Pegler
    authorizedDrivers: [
      {
        id: 'ad45',
        name: 'Garrett Pegler',
        phone: '(805) 427-5863',
        email: 'garret@ghostshieldfilm.com',
        licenseNumber: 'CA789123',
        relationship: 'Owner'
      }
    ],
    year: 1979,
    make: 'Horizon',
    model: 'Pleasure',
    vin: 'HFB20103M78H',
    storageLocation: 'Moorpark',
    fairMarketValue: 60000,
    insuranceRiderRequired: true,
    insuranceRiderAmount: 65000,
    licensePlate: 'BOAT79',
    registration: {
      number: 'REG456789',
      expirationDate: '2023-12-14',
      state: 'CA'
    },
    tirePressureDefault: {
      front: 0,
      rear: 0
    },
    tirePressurePreferred: {
      front: 0,
      rear: 0
    },
    maintenanceSchedule: {
      lastService: '2022-12-14',
      nextService: '2023-06-14',
      serviceInterval: 6,
      notes: 'Boat - requires specialized maintenance'
    },
    authorizedContacts: [],
    odometer: 0,
    image: 'https://images.pexels.com/photos/1295036/pexels-photo-1295036.jpeg',
    fuelLevel: 85,
    batteryType: 'Standard',
    color: 'White',
    createdAt: '2022-12-14T11:00:00Z',
    updatedAt: '2022-12-14T11:00:00Z',
  },
  {
    id: 'v46',
    customerId: 'c39', // Steve Pena
    authorizedDrivers: [
      {
        id: 'ad46',
        name: 'Steve Pena',
        phone: '(310) 601-8771',
        email: 'steve@penaemail.com',
        licenseNumber: 'CA123456',
        relationship: 'Owner'
      }
    ],
    year: 1968,
    make: 'Cadillac',
    model: 'DeVille',
    vin: 'F8103861',
    storageLocation: 'Moorpark',
    fairMarketValue: 30000,
    insuranceRiderRequired: true,
    insuranceRiderAmount: 35000,
    licensePlate: 'CADDY68',
    registration: {
      number: 'REG789123',
      expirationDate: '2025-08-17',
      state: 'CA'
    },
    tirePressureDefault: {
      front: 28,
      rear: 28
    },
    tirePressurePreferred: {
      front: 30,
      rear: 30
    },
    maintenanceSchedule: {
      lastService: '2024-07-23',
      nextService: '2025-01-23',
      serviceInterval: 6,
      notes: 'Classic car, handle with care'
    },
    authorizedContacts: [],
    odometer: 75000,
    image: 'https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg',
    fuelLevel: 70,
    batteryType: 'Standard',
    color: 'Black',
    createdAt: '2024-07-23T10:30:00Z',
    updatedAt: '2024-07-23T10:30:00Z',
  },
  {
    id: 'v47',
    customerId: 'c40', // Tyrone Pham
    authorizedDrivers: [
      {
        id: 'ad47',
        name: 'Tyrone Pham',
        phone: '(626) 600-7023',
        email: 'ecoliex@yahoo.com',
        licenseNumber: 'FL123456',
        relationship: 'Owner'
      }
    ],
    year: 2017,
    make: 'Subaru',
    model: 'BRZ',
    vin: 'JF1ZCAC19H9605401',
    storageLocation: 'Moorpark',
    fairMarketValue: 32000,
    insuranceRiderRequired: false,
    licensePlate: 'BRZ17',
    registration: {
      number: 'REG123789',
      expirationDate: '2025-06-22',
      state: 'FL'
    },
    tirePressureDefault: {
      front: 32,
      rear: 32
    },
    tirePressurePreferred: {
      front: 35,
      rear: 35
    },
    maintenanceSchedule: {
      lastService: '2022-06-19',
      nextService: '2022-12-19',
      serviceInterval: 6,
      notes: 'Sports car, check brakes and suspension'
    },
    authorizedContacts: [],
    odometer: 35000,
    image: 'https://images.pexels.com/photos/119435/pexels-photo-119435.jpeg',
    fuelLevel: 80,
    batteryType: 'Standard',
    color: 'Blue',
    createdAt: '2022-06-19T09:30:00Z',
    updatedAt: '2022-06-19T09:30:00Z',
  },
  {
    id: 'v48',
    customerId: 'c41', // Thomas Powers
    authorizedDrivers: [
      {
        id: 'ad48',
        name: 'Thomas Powers',
        phone: '805-915-8120',
        email: 'tomepowers@gmail.com',
        licenseNumber: 'CA456789',
        relationship: 'Owner'
      }
    ],
    year: 1992,
    make: 'Ford',
    model: 'F250',
    vin: '1FTHX25M2NKA18100',
    storageLocation: 'Moorpark',
    fairMarketValue: 8000,
    insuranceRiderRequired: false,
    licensePlate: 'FORD92',
    registration: {
      number: 'REG789456',
      expirationDate: '2026-06-01',
      state: 'CA'
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
      lastService: '2025-06-01',
      nextService: '2025-12-01',
      serviceInterval: 6,
      notes: 'Classic truck, check suspension'
    },
    authorizedContacts: [],
    odometer: 150000,
    image: 'https://images.pexels.com/photos/2533092/pexels-photo-2533092.jpeg',
    fuelLevel: 70,
    batteryType: 'Standard',
    color: 'Blue',
    createdAt: '2025-06-01T09:45:00Z',
    updatedAt: '2025-06-01T09:45:00Z',
  },
  {
    id: 'v49',
    customerId: 'c42', // Jeremy Renstrom
    authorizedDrivers: [
      {
        id: 'ad49',
        name: 'Jeremy Renstrom',
        phone: '310-422-5742',
        email: 'jeremyrenstrom@yahoo.com',
        licenseNumber: 'CA123789',
        relationship: 'Owner'
      }
    ],
    year: 2013,
    make: 'Infiniti',
    model: 'G37',
    vin: 'JN1CV6AP7DM725397',
    storageLocation: 'Moorpark',
    fairMarketValue: 7750,
    insuranceRiderRequired: false,
    licensePlate: 'INFIN13',
    registration: {
      number: 'REG456123',
      expirationDate: '2025-09-29',
      state: 'CA'
    },
    tirePressureDefault: {
      front: 32,
      rear: 32
    },
    tirePressurePreferred: {
      front: 35,
      rear: 35
    },
    maintenanceSchedule: {
      lastService: '2024-09-09',
      nextService: '2025-03-09',
      serviceInterval: 6,
      notes: 'Check brakes and suspension'
    },
    authorizedContacts: [],
    odometer: 85000,
    image: 'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg',
    fuelLevel: 75,
    batteryType: 'Standard',
    color: 'Black',
    createdAt: '2024-09-09T10:30:00Z',
    updatedAt: '2024-09-09T10:30:00Z',
  },
  {
    id: 'v50',
    customerId: 'c43', // Josiah Richards
    authorizedDrivers: [
      {
        id: 'ad50',
        name: 'Josiah Richards',
        phone: '(647) 270-5442',
        email: 'josiah@illusory.io',
        licenseNumber: 'CA456123',
        relationship: 'Owner'
      }
    ],
    year: 2018,
    make: 'BMW',
    model: '530e',
    vin: 'WBAJA9C5XJB250474',
    storageLocation: 'Moorpark',
    fairMarketValue: 30000,
    insuranceRiderRequired: false,
    licensePlate: 'BMW18',
    registration: {
      number: 'REG789123',
      expirationDate: '2025-03-08',
      state: 'CA'
    },
    tirePressureDefault: {
      front: 32,
      rear: 32
    },
    tirePressurePreferred: {
      front: 35,
      rear: 35
    },
    maintenanceSchedule: {
      lastService: '2024-03-08',
      nextService: '2024-09-08',
      serviceInterval: 6,
      notes: 'Hybrid vehicle, check battery system'
    },
    authorizedContacts: [],
    odometer: 45000,
    image: 'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg',
    fuelLevel: 80,
    batteryType: 'Lithium',
    color: 'Black',
    createdAt: '2024-03-08T09:45:00Z',
    updatedAt: '2024-03-08T09:45:00Z',
  },
  {
    id: 'v51',
    customerId: 'c44', // Joey Shap
    authorizedDrivers: [
      {
        id: 'ad51',
        name: 'Joey Shap',
        phone: '(805) 825-8462',
        email: 'joeyshap@gmail.com',
        licenseNumber: 'CA789123',
        relationship: 'Owner'
      }
    ],
    year: 1973,
    make: 'Chevy',
    model: 'Corvette',
    vin: '1Z37T3S415681',
    storageLocation: 'Moorpark',
    fairMarketValue: 30000,
    insuranceRiderRequired: true,
    insuranceRiderAmount: 35000,
    licensePlate: 'VETTE73',
    registration: {
      number: 'REG123789',
      expirationDate: '2026-06-01',
      state: 'CA'
    },
    tirePressureDefault: {
      front: 28,
      rear: 28
    },
    tirePressurePreferred: {
      front: 30,
      rear: 30
    },
    maintenanceSchedule: {
      lastService: '2025-06-01',
      nextService: '2025-12-01',
      serviceInterval: 6,
      notes: 'Classic car, handle with care'
    },
    authorizedContacts: [],
    odometer: 65000,
    image: 'https://images.pexels.com/photos/3954440/pexels-photo-3954440.jpeg',
    fuelLevel: 70,
    batteryType: 'Standard',
    color: 'Red',
    createdAt: '2025-06-01T10:15:00Z',
    updatedAt: '2025-06-01T10:15:00Z',
  },
  {
    id: 'v52',
    customerId: 'c46', // Victoria Shuken
    authorizedDrivers: [
      {
        id: 'ad52',
        name: 'Victoria Shuken',
        phone: '(818) 207-9770',
        email: 'tori_shuken@vistaauto.com',
        licenseNumber: 'CA123456',
        relationship: 'Owner'
      }
    ],
    year: 2023,
    make: 'Porsche',
    model: 'GT3 Touring',
    vin: 'WPOAC2A97PS270457',
    storageLocation: 'Moorpark',
    fairMarketValue: 300000,
    insuranceRiderRequired: true,
    insuranceRiderAmount: 320000,
    licensePlate: 'GT3T23',
    registration: {
      number: 'REG456789',
      expirationDate: '2024-03-01',
      state: 'CA'
    },
    tirePressureDefault: {
      front: 32,
      rear: 30
    },
    tirePressurePreferred: {
      front: 35,
      rear: 33
    },
    maintenanceSchedule: {
      lastService: '2023-07-11',
      nextService: '2024-01-11',
      serviceInterval: 6,
      notes: 'High performance vehicle, check brakes and suspension'
    },
    authorizedContacts: [],
    odometer: 5000,
    image: 'https://images.pexels.com/photos/3954440/pexels-photo-3954440.jpeg',
    fuelLevel: 90,
    batteryType: 'Lithium',
    color: 'Silver',
    createdAt: '2023-07-11T09:30:00Z',
    updatedAt: '2023-07-11T09:30:00Z',
  },
  {
    id: 'v53',
    customerId: 'c46', // Victoria Shuken
    authorizedDrivers: [
      {
        id: 'ad53',
        name: 'Victoria Shuken',
        phone: '(818) 207-9770',
        email: 'tori_shuken@vistaauto.com',
        licenseNumber: 'CA123456',
        relationship: 'Owner'
      }
    ],
    year: 2023,
    make: 'Ford',
    model: 'F-150 Raptor',
    vin: '1FTFW1RG5NFA93648',
    storageLocation: 'Moorpark',
    fairMarketValue: 85000,
    insuranceRiderRequired: true,
    insuranceRiderAmount: 90000,
    licensePlate: 'RAPTR23',
    registration: {
      number: 'REG789123',
      expirationDate: '2024-03-01',
      state: 'CA'
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
      lastService: '2023-07-15',
      nextService: '2024-01-15',
      serviceInterval: 6,
      notes: 'Off-road vehicle, check suspension and undercarriage'
    },
    authorizedContacts: [],
    odometer: 15000,
    image: 'https://images.pexels.com/photos/2533092/pexels-photo-2533092.jpeg',
    fuelLevel: 85,
    batteryType: 'AGM',
    color: 'Black',
    createdAt: '2023-07-15T10:45:00Z',
    updatedAt: '2023-07-15T10:45:00Z',
  },
  {
    id: 'v54',
    customerId: 'c47', // Tarnpreet Singh
    authorizedDrivers: [
      {
        id: 'ad54',
        name: 'Tarnpreet Singh',
        phone: '805-377-2472',
        email: 'asingh2033@gmail.com',
        licenseNumber: 'CA456123',
        relationship: 'Owner'
      }
    ],
    year: 2008,
    make: 'BMW',
    model: 'M3',
    vin: 'WBSWD93558PY39566',
    storageLocation: 'Moorpark',
    fairMarketValue: 45000,
    insuranceRiderRequired: true,
    insuranceRiderAmount: 50000,
    licensePlate: 'BMW08',
    registration: {
      number: 'REG123789',
      expirationDate: '2025-04-29',
      state: 'CA'
    },
    tirePressureDefault: {
      front: 32,
      rear: 32
    },
    tirePressurePreferred: {
      front: 35,
      rear: 35
    },
    maintenanceSchedule: {
      lastService: '2025-04-11',
      nextService: '2025-10-11',
      serviceInterval: 6,
      notes: 'High performance vehicle, check brakes and suspension'
    },
    authorizedContacts: [],
    odometer: 65000,
    image: 'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg',
    fuelLevel: 80,
    batteryType: 'Standard',
    color: 'Black',
    createdAt: '2025-04-11T09:30:00Z',
    updatedAt: '2025-04-11T09:30:00Z',
  },
  {
    id: 'v55',
    customerId: 'c47', // Tarnpreet Singh
    authorizedDrivers: [
      {
        id: 'ad55',
        name: 'Tarnpreet Singh',
        phone: '805-377-2472',
        email: 'asingh2033@gmail.com',
        licenseNumber: 'CA456123',
        relationship: 'Owner'
      }
    ],
    year: 2015,
    make: 'BMW',
    model: 'M5',
    vin: 'WBSFV9C52FD594804',
    storageLocation: 'Moorpark',
    fairMarketValue: 45000,
    insuranceRiderRequired: true,
    insuranceRiderAmount: 50000,
    licensePlate: 'BMW15',
    registration: {
      number: 'REG456789',
      expirationDate: '2025-06-23',
      state: 'CA'
    },
    tirePressureDefault: {
      front: 32,
      rear: 32
    },
    tirePressurePreferred: {
      front: 35,
      rear: 35
    },
    maintenanceSchedule: {
      lastService: '2025-04-11',
      nextService: '2025-10-11',
      serviceInterval: 6,
      notes: 'High performance vehicle, check brakes and suspension'
    },
    authorizedContacts: [],
    odometer: 55000,
    image: 'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg',
    fuelLevel: 85,
    batteryType: 'AGM',
    color: 'Black',
    createdAt: '2025-04-11T10:45:00Z',
    updatedAt: '2025-04-11T10:45:00Z',
  },
  {
    id: 'v56',
    customerId: 'c47', // Tarnpreet Singh
    authorizedDrivers: [
      {
        id: 'ad56',
        name: 'Tarnpreet Singh',
        phone: '805-377-2472',
        email: 'asingh2033@gmail.com',
        licenseNumber: 'CA456123',
        relationship: 'Owner'
      }
    ],
    year: 2025,
    make: 'BMW',
    model: 'M3',
    vin: 'WBS13HJ07SFU77025',
    storageLocation: 'Moorpark',
    fairMarketValue: 125000,
    insuranceRiderRequired: true,
    insuranceRiderAmount: 130000,
    licensePlate: 'BMW25',
    registration: {
      number: 'REG789123',
      expirationDate: '2026-04-11',
      state: 'CA'
    },
    tirePressureDefault: {
      front: 32,
      rear: 32
    },
    tirePressurePreferred: {
      front: 35,
      rear: 35
    },
    maintenanceSchedule: {
      lastService: '2025-04-11',
      nextService: '2025-10-11',
      serviceInterval: 6,
      notes: 'High performance vehicle, check brakes and suspension'
    },
    authorizedContacts: [],
    odometer: 2500,
    image: 'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg',
    fuelLevel: 90,
    batteryType: 'Lithium',
    color: 'Blue',
    createdAt: '2025-04-11T12:00:00Z',
    updatedAt: '2025-04-11T12:00:00Z',
  },
  {
    id: 'v57',
    customerId: 'c48', // Nico Solomon
    authorizedDrivers: [
      {
        id: 'ad57',
        name: 'Nico Solomon',
        phone: '(805) 558-8678',
        email: 'solonico@sbcglobal.net',
        licenseNumber: 'CA123789',
        relationship: 'Owner'
      }
    ],
    year: 1963,
    make: 'Cadillac',
    model: 'Coupe DeVille',
    vin: '63J030283',
    storageLocation: 'Moorpark',
    fairMarketValue: 140000,
    insuranceRiderRequired: true,
    insuranceRiderAmount: 150000,
    licensePlate: 'CADDY63',
    registration: {
      number: 'REG456123',
      expirationDate: '2024-02-13',
      state: 'CA'
    },
    tirePressureDefault: {
      front: 28,
      rear: 28
    },
    tirePressurePreferred: {
      front: 30,
      rear: 30
    },
    maintenanceSchedule: {
      lastService: '2024-08-21',
      nextService: '2025-02-21',
      serviceInterval: 6,
      notes: 'Classic car, handle with care'
    },
    authorizedContacts: [],
    odometer: 45000,
    image: 'https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg',
    fuelLevel: 70,
    batteryType: 'Standard',
    color: 'White',
    createdAt: '2024-08-21T09:30:00Z',
    updatedAt: '2024-08-21T09:30:00Z',
  },
  {
    id: 'v58',
    customerId: 'c49', // Star Management
    authorizedDrivers: [
      {
        id: 'ad58',
        name: 'Kenneth Allen',
        phone: '(951) 425-8642',
        email: 'kenneth.allen75@gmail.com',
        licenseNumber: 'CO123456',
        relationship: 'Owner'
      }
    ],
    year: 1963,
    make: 'Jaguar',
    model: 'E-Type Series 1',
    vin: '878960',
    storageLocation: 'Moorpark',
    fairMarketValue: 120585,
    insuranceRiderRequired: true,
    insuranceRiderAmount: 130000,
    licensePlate: 'JAG63',
    registration: {
      number: 'REG789123',
      expirationDate: '2026-01-31',
      state: 'CO'
    },
    tirePressureDefault: {
      front: 28,
      rear: 28
    },
    tirePressurePreferred: {
      front: 30,
      rear: 30
    },
    maintenanceSchedule: {
      lastService: '2025-02-01',
      nextService: '2025-08-01',
      serviceInterval: 6,
      notes: 'Classic car, handle with care'
    },
    authorizedContacts: [],
    odometer: 35000,
    image: 'https://images.pexels.com/photos/3954440/pexels-photo-3954440.jpeg',
    fuelLevel: 75,
    batteryType: 'Standard',
    color: 'Green',
    createdAt: '2025-02-01T09:45:00Z',
    updatedAt: '2025-02-01T09:45:00Z',
  },
  {
    id: 'v59',
    customerId: 'c49', // Star Management
    authorizedDrivers: [
      {
        id: 'ad59',
        name: 'Kenneth Allen',
        phone: '(951) 425-8642',
        email: 'kenneth.allen75@gmail.com',
        licenseNumber: 'CO123456',
        relationship: 'Owner'
      }
    ],
    year: 1964,
    make: 'Chevrolet',
    model: 'Corvette Convertible',
    vin: '408675119205',
    storageLocation: 'Moorpark',
    fairMarketValue: 52690,
    insuranceRiderRequired: true,
    insuranceRiderAmount: 55000,
    licensePlate: 'VETTE64',
    registration: {
      number: 'REG123456',
      expirationDate: '2026-01-31',
      state: 'CO'
    },
    tirePressureDefault: {
      front: 28,
      rear: 28
    },
    tirePressurePreferred: {
      front: 30,
      rear: 30
    },
    maintenanceSchedule: {
      lastService: '2025-02-01',
      nextService: '2025-08-01',
      serviceInterval: 6,
      notes: 'Classic car, handle with care'
    },
    authorizedContacts: [],
    odometer: 45000,
    image: 'https://images.pexels.com/photos/3954440/pexels-photo-3954440.jpeg',
    fuelLevel: 70,
    batteryType: 'Standard',
    color: 'Red',
    createdAt: '2025-02-01T11:00:00Z',
    updatedAt: '2025-02-01T11:00:00Z',
  },
  {
    id: 'v60',
    customerId: 'c50', // Donovan Tatum
    authorizedDrivers: [
      {
        id: 'ad60',
        name: 'Donovan Tatum',
        phone: '(818) 648-3062',
        email: 'donovan.tatum@caa.com',
        licenseNumber: 'CA456789',
        relationship: 'Owner'
      }
    ],
    year: 1977,
    make: 'Ford',
    model: 'Bronco',
    vin: 'U15GLY05378',
    storageLocation: 'Moorpark',
    fairMarketValue: 65000,
    insuranceRiderRequired: true,
    insuranceRiderAmount: 70000,
    licensePlate: 'BRNCO77',
    registration: {
      number: 'REG789123',
      expirationDate: '2024-04-05',
      state: 'CA'
    },
    tirePressureDefault: {
      front: 32,
      rear: 32
    },
    tirePressurePreferred: {
      front: 35,
      rear: 35
    },
    maintenanceSchedule: {
      lastService: '2025-05-01',
      nextService: '2025-11-01',
      serviceInterval: 6,
      notes: 'Classic SUV, check 4x4 system'
    },
    authorizedContacts: [],
    odometer: 65000,
    image: 'https://images.pexels.com/photos/2533092/pexels-photo-2533092.jpeg',
    fuelLevel: 75,
    batteryType: 'Standard',
    color: 'Blue',
    createdAt: '2025-05-01T09:30:00Z',
    updatedAt: '2025-05-01T09:30:00Z',
  },
  {
    id: 'v61',
    customerId: 'c52', // Thaxton & Associates
    authorizedDrivers: [
      {
        id: 'ad61',
        name: 'Mike Thaxton',
        phone: '(818) 633-9111',
        email: 'mike@thaxtonassociates.com',
        licenseNumber: 'CA123789',
        relationship: 'Owner'
      }
    ],
    year: 2023,
    make: 'Ford',
    model: 'F150 Shelby',
    vin: '1FTFW1E55PKE74267',
    storageLocation: 'Moorpark',
    fairMarketValue: 158000,
    insuranceRiderRequired: true,
    insuranceRiderAmount: 160000,
    licensePlate: 'SHELBY23',
    registration: {
      number: 'REG456123',
      expirationDate: '2025-05-21',
      state: 'CA'
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
      lastService: '2024-05-21',
      nextService: '2024-11-21',
      serviceInterval: 6,
      notes: 'High performance truck, check supercharger'
    },
    authorizedContacts: [],
    odometer: 15000,
    image: 'https://images.pexels.com/photos/2533092/pexels-photo-2533092.jpeg',
    fuelLevel: 85,
    batteryType: 'AGM',
    color: 'Blue',
    createdAt: '2024-05-21T09:45:00Z',
    updatedAt: '2024-05-21T09:45:00Z',
  },
  {
    id: 'v62',
    customerId: 'c53', // The Chosen Group Inc
    authorizedDrivers: [
      {
        id: 'ad62',
        name: 'Kacy',
        phone: '(805) 807-0195',
        email: 'kacy@100group.com',
        licenseNumber: 'CA456789',
        relationship: 'Owner'
      }
    ],
    year: 2019,
    make: 'Mercedes',
    model: 'Sprinter',
    vin: 'WDAPF1CD6KP072139',
    storageLocation: 'Moorpark',
    fairMarketValue: 150000,
    insuranceRiderRequired: true,
    insuranceRiderAmount: 160000,
    licensePlate: 'SPRNT19',
    registration: {
      number: 'REG789123',
      expirationDate: '2023-11-15',
      state: 'CA'
    },
    tirePressureDefault: {
      front: 50,
      rear: 50
    },
    tirePressurePreferred: {
      front: 55,
      rear: 55
    },
    maintenanceSchedule: {
      lastService: '2025-06-01',
      nextService: '2025-12-01',
      serviceInterval: 6,
      notes: 'Commercial vehicle, check all systems'
    },
    authorizedContacts: [],
    odometer: 45000,
    image: 'https://images.pexels.com/photos/2897531/pexels-photo-2897531.jpeg',
    fuelLevel: 80,
    batteryType: 'AGM',
    color: 'White',
    createdAt: '2025-06-01T10:30:00Z',
    updatedAt: '2025-06-01T10:30:00Z',
  },
  {
    id: 'v63',
    customerId: 'c56', // Deke Williams
    authorizedDrivers: [
      {
        id: 'ad63',
        name: 'Deke Williams',
        phone: '(805) 432-4459',
        email: 'deke@wilmanco.com',
        licenseNumber: 'CA123456',
        relationship: 'Owner'
      }
    ],
    year: 1967,
    make: 'Ford',
    model: 'Mustang Shelby GT 500',
    vin: 'Z67400F2A02902',
    storageLocation: 'Moorpark',
    fairMarketValue: 350000,
    insuranceRiderRequired: true,
    insuranceRiderAmount: 400000,
    licensePlate: 'SHELBY67',
    registration: {
      number: 'REG123789',
      expirationDate: '2024-08-21',
      state: 'CA'
    },
    tirePressureDefault: {
      front: 28,
      rear: 28
    },
    tirePressurePreferred: {
      front: 30,
      rear: 30
    },
    maintenanceSchedule: {
      lastService: '2024-07-26',
      nextService: '2025-01-26',
      serviceInterval: 6,
      notes: 'Classic muscle car, handle with care'
    },
    authorizedContacts: [],
    odometer: 25000,
    image: 'https://images.pexels.com/photos/3874337/pexels-photo-3874337.jpeg',
    fuelLevel: 80,
    batteryType: 'Standard',
    color: 'Blue with White Stripes',
    createdAt: '2024-07-26T09:30:00Z',
    updatedAt: '2024-07-26T09:30:00Z',
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