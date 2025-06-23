/*
  # Populate check in/out records

  1. Data Population
    - Create check-in/out records for vehicles
    - Set appropriate statuses based on "In or Out" from CSV
    - Generate realistic check-in dates and details

  2. Status Mapping
    - "In" vehicles are CHECKED_IN
    - "Out" vehicles are CHECKED_OUT
    - Some vehicles are marked as IN_SERVICE for demonstration
*/

-- Clear existing check in/out data
TRUNCATE TABLE check_in_outs CASCADE;

-- Insert check in/out data
INSERT INTO check_in_outs (
  vehicle_id,
  customer_id,
  date,
  type,
  location,
  contact,
  status,
  check_in_date,
  check_out_date,
  fuel_level,
  mileage,
  tire_pressure_passenger_front,
  tire_pressure_passenger_rear,
  tire_pressure_driver_front,
  tire_pressure_driver_rear,
  car_cover,
  kill_switch,
  startup_directions,
  notes,
  created_at,
  updated_at
) VALUES
-- Jason Adang vehicles - CHECKED_IN
((SELECT id FROM vehicles WHERE vin = '9112101858'), 
 (SELECT id FROM customers WHERE email = 'jason@adangenterprises.com'),
 '2025-04-21', 'CHECK_IN', 'Moorpark', 'Jason Adang', 'CHECKED_IN', 
 '2025-04-21T10:30:00Z', NULL, 75, 85000, 32, 30, 32, 30, true, false,
 'Turn key to position 2, wait for fuel pump, then start', 
 'Classic Porsche in excellent condition. Owner requests car cover at all times.',
 now(), now()),

((SELECT id FROM vehicles WHERE vin = 'JTHHX8BH2C1000028'), 
 (SELECT id FROM customers WHERE email = 'jason@adangenterprises.com'),
 '2025-04-21', 'CHECK_IN', 'Moorpark', 'Jason Adang', 'CHECKED_IN', 
 '2025-04-21T11:15:00Z', NULL, 85, 15000, 34, 32, 34, 32, true, true,
 'Press brake firmly before starting. Use premium fuel only.', 
 'Rare Lexus LFA. Extreme care required. Insurance rider in place.',
 now(), now()),

-- All Valley Washer Service - CHECKED_IN
((SELECT id FROM vehicles WHERE vin = '1C4RJXSJ3RW223940'), 
 (SELECT id FROM customers WHERE email = 'jim@allvalleywasher.com'),
 '2025-07-01', 'CHECK_IN', 'Moorpark', 'Jim Feinstein', 'CHECKED_IN', 
 '2025-07-01T09:45:00Z', NULL, 90, 5000, 35, 35, 35, 35, false, false,
 'Standard startup procedure', 
 'New Jeep Rubicon. Owner prefers no car cover.',
 now(), now()),

-- Chris Antonsen - CHECKED_IN
((SELECT id FROM vehicles WHERE vin = 'MBCPHBVG122'), 
 (SELECT id FROM customers WHERE email = 'antonsenchris3@gmail.com'),
 '2025-02-01', 'CHECK_IN', 'Moorpark', 'Chris Antonsen', 'CHECKED_IN', 
 '2025-02-01T14:30:00Z', NULL, 95, 100, 30, 30, 30, 30, true, false,
 'Boat - not applicable', 
 'Mastercraft boat. Stored on trailer. Keep covered.',
 now(), now()),

-- Barrett Whips - CHECKED_IN
((SELECT id FROM vehicles WHERE vin = 'WDBFA68F31F200029'), 
 (SELECT id FROM customers WHERE email = 'lindsay@barrettassociatesllc.com'),
 '2025-01-15', 'CHECK_IN', 'Moorpark', 'Lindsay Barrett', 'CHECKED_IN', 
 '2025-01-15T13:00:00Z', NULL, 60, 125000, 32, 30, 32, 30, true, false,
 'Standard startup procedure', 
 'Company vehicle. Regular maintenance required.',
 now(), now()),

-- Dylan Boztepe - CHECKED_OUT
((SELECT id FROM vehicles WHERE vin = 'WDDGF77X29f233516'), 
 (SELECT id FROM customers WHERE email = 'dylanboztepe1@gmail.com'),
 '2025-06-20', 'CHECK_OUT', 'Moorpark', 'Dylan Boztepe', 'CHECKED_OUT', 
 '2025-06-20T10:00:00Z', '2025-06-25T15:30:00Z', 45, 95000, 32, 30, 32, 30, false, false,
 'Standard startup procedure', 
 'Vehicle checked out for personal use.',
 now(), now()),

-- Jeffrey Brodsly - CHECKED_IN
((SELECT id FROM vehicles WHERE vin = 'SCA664S56DUX51683'), 
 (SELECT id FROM customers WHERE email = 'jeff@100group.com'),
 '2025-06-01', 'CHECK_IN', 'Moorpark', 'Jeffrey Brodsly', 'CHECKED_IN', 
 '2025-06-01T11:45:00Z', NULL, 80, 65000, 32, 30, 32, 30, true, false,
 'Press start button with foot on brake', 
 'Rolls Royce in excellent condition. Premium storage requested.',
 now(), now()),

-- C&H Construction - CHECKED_IN
((SELECT id FROM vehicles WHERE vin = '1HD1KH438AB606132'), 
 (SELECT id FROM customers WHERE email = 'jeff@candhconstruction.net'),
 '2025-05-01', 'CHECK_IN', 'Moorpark', 'Jeff Jay', 'CHECKED_IN', 
 '2025-05-01T09:15:00Z', NULL, 70, 45000, 30, 28, 30, 28, false, false,
 'Motorcycle - standard startup', 
 'Harley Davidson motorcycle. Stored in small vehicle area.',
 now(), now()),

-- Daniel Casson - CHECKED_IN
((SELECT id FROM vehicles WHERE vin = 'ZFF77XJAXH0227476'), 
 (SELECT id FROM customers WHERE email = 'dano4643@gmail.com'),
 '2025-06-13', 'CHECK_IN', 'Moorpark', 'Daniel Casson', 'CHECKED_IN', 
 '2025-06-13T14:00:00Z', NULL, 75, 25000, 32, 30, 32, 30, true, false,
 'Press start button with foot on brake', 
 'Ferrari California. Owner requests notification before any movement.',
 now(), now()),

-- Richard Cobey - CHECKED_IN
((SELECT id FROM vehicles WHERE vin = 'SCBEC9ZA5EC095631'), 
 (SELECT id FROM customers WHERE email = 'musicrc@gmail.com'),
 '2024-08-26', 'CHECK_IN', 'Moorpark', 'Richard Cobey', 'CHECKED_IN', 
 '2024-08-26T10:30:00Z', NULL, 70, 55000, 32, 30, 32, 30, true, false,
 'Press start button with foot on brake', 
 'Bentley Continental Flying Spur. Insurance expired - needs renewal.',
 now(), now()),

-- Assaf Cohen vehicles - CHECKED_IN
((SELECT id FROM vehicles WHERE vin = 'BCNR33001214'), 
 (SELECT id FROM customers WHERE email = 'lp2mnp@gmail.com'),
 '2024-08-01', 'CHECK_IN', 'Moorpark', 'Assaf Cohen', 'CHECKED_IN', 
 '2024-08-01T11:00:00Z', NULL, 80, 75000, 32, 30, 32, 30, true, true,
 'JDM vehicle - right-hand drive. Turn key to position 2, wait for fuel pump, then start.', 
 'Rare Nissan Skyline R33 GTR. JDM import. Special handling required.',
 now(), now()),

((SELECT id FROM vehicles WHERE vin = 'BNR34005053'), 
 (SELECT id FROM customers WHERE email = 'lp2mnp@gmail.com'),
 '2024-08-01', 'CHECK_IN', 'Moorpark', 'Assaf Cohen', 'CHECKED_IN', 
 '2024-08-01T11:30:00Z', NULL, 85, 65000, 32, 30, 32, 30, true, true,
 'JDM vehicle - right-hand drive. Turn key to position 2, wait for fuel pump, then start.', 
 'Rare Nissan Skyline R34 GTR. JDM import. Special handling required.',
 now(), now()),

((SELECT id FROM vehicles WHERE vin = 'BNR32012884'), 
 (SELECT id FROM customers WHERE email = 'lp2mnp@gmail.com'),
 '2024-08-01', 'CHECK_IN', 'Moorpark', 'Sandy Cohen', 'CHECKED_IN', 
 '2024-08-01T12:00:00Z', NULL, 75, 85000, 32, 30, 32, 30, true, true,
 'JDM vehicle - right-hand drive. Turn key to position 2, wait for fuel pump, then start.', 
 'Rare Nissan Skyline R32 GTR. JDM import. Special handling required.',
 now(), now()),

-- DHK Plumbing vehicles - IN_SERVICE
((SELECT id FROM vehicles WHERE vin = 'ZHWBU47S57LA02518'), 
 (SELECT id FROM customers WHERE email = 'Joe@dhkplumbing.com'),
 '2024-12-05', 'CHECK_IN', 'Moorpark', 'Joe Dinka', 'IN_SERVICE', 
 '2024-12-05T09:00:00Z', NULL, 90, 35000, 32, 30, 32, 30, true, false,
 'Press start button with foot on brake', 
 'Lamborghini Murcielago. Currently undergoing scheduled maintenance.',
 now(), now()),

((SELECT id FROM vehicles WHERE vin = 'SCA2D68509UX16359'), 
 (SELECT id FROM customers WHERE email = 'Joe@dhkplumbing.com'),
 '2024-12-05', 'CHECK_IN', 'Moorpark', 'Joe Dinka', 'CHECKED_IN', 
 '2024-12-05T09:30:00Z', NULL, 85, 45000, 32, 30, 32, 30, true, false,
 'Press start button with foot on brake', 
 'Rolls Royce Phantom Drophead. Premium storage requested.',
 now(), now()),

-- David Einstein vehicles - CHECKED_IN
((SELECT id FROM vehicles WHERE vin = 'ZFF01SMA9R0311081'), 
 (SELECT id FROM customers WHERE email = 'deinstein@skyreachsystems.com'),
 '2024-12-01', 'CHECK_IN', 'Moorpark', 'David Einstein', 'CHECKED_IN', 
 '2024-12-01T15:45:00Z', NULL, 95, 2500, 32, 30, 32, 30, true, false,
 'Press start button with foot on brake', 
 'New Ferrari 296 GTS. Premium handling required.',
 now(), now()),

-- Alfred English vehicles - CHECKED_IN
((SELECT id FROM vehicles WHERE vin = 'W1X8E33Y3LN108451'), 
 (SELECT id FROM customers WHERE email = 'alfred@sespecreekspirits.com'),
 '2024-08-26', 'CHECK_IN', 'Moorpark', 'Alfred English', 'CHECKED_IN', 
 '2024-08-26T13:15:00Z', NULL, 80, 25000, 35, 35, 35, 35, false, false,
 'Standard RV startup procedure', 
 'Winnebago View RV. Oversized vehicle storage. Insurance expired - needs renewal.',
 now(), now()),

-- Russ Ercolani vehicles - CHECKED_IN
((SELECT id FROM vehicles WHERE vin = 'MB2L5005K920'), 
 (SELECT id FROM customers WHERE email = 'russ.ercolani@gmail.com'),
 '2025-03-01', 'CHECK_IN', 'Moorpark', 'Russ Ercolani', 'CHECKED_IN', 
 '2025-03-01T10:00:00Z', NULL, 95, 50, 30, 30, 30, 30, true, false,
 'Boat - not applicable', 
 'Malibu Wakesetter boat. Stored on trailer. Keep covered.',
 now(), now()),

-- Joshua Gamboa vehicles - CHECKED_IN
((SELECT id FROM vehicles WHERE vin = 'WDDDJ72X27A090604'), 
 (SELECT id FROM customers WHERE email = 'joshuarobert100@gmail.com'),
 '2025-06-21', 'CHECK_IN', 'Moorpark', 'Joshua Gamboa', 'CHECKED_IN', 
 '2025-06-21T11:30:00Z', NULL, 60, 125000, 32, 30, 32, 30, false, false,
 'Standard startup procedure', 
 'Mercedes-Benz E-Class. Standard storage.',
 now(), now()),

((SELECT id FROM vehicles WHERE vin = 'JS1GI51I6C2102966'), 
 (SELECT id FROM customers WHERE email = 'joshuarobert100@gmail.com'),
 '2025-06-21', 'CHECK_IN', 'Moorpark', 'Joshua Gamboa', 'CHECKED_IN', 
 '2025-06-21T12:00:00Z', NULL, 70, 65000, 30, 28, 30, 28, false, false,
 'Motorcycle - standard startup', 
 'Suzuki Touring motorcycle. Stored in small vehicle area.',
 now(), now()),

-- John Garcia vehicles - CHECKED_IN
((SELECT id FROM vehicles WHERE vin = 'ZFFYU51A730132853'), 
 (SELECT id FROM customers WHERE email = 'john@johngarcia.org'),
 '2024-08-14', 'CHECK_IN', 'Moorpark', 'John Garcia', 'CHECKED_IN', 
 '2024-08-14T14:45:00Z', NULL, 80, 45000, 32, 30, 32, 30, true, false,
 'Press start button with foot on brake', 
 'Ferrari 360. Premium storage requested.',
 now(), now()),

-- Jon Garland vehicles - CHECKED_IN
((SELECT id FROM vehicles WHERE vin = '2Y82H414205'), 
 (SELECT id FROM customers WHERE email = 'gland20@aol.com'),
 '2024-12-01', 'CHECK_IN', 'Moorpark', 'Jon Garland', 'CHECKED_IN', 
 '2024-12-01T09:30:00Z', NULL, 65, 95000, 30, 28, 30, 28, true, false,
 'Classic car - turn key gently, may need multiple attempts', 
 'Classic Lincoln Continental. Special handling for classic vehicle.',
 now(), now()),

((SELECT id FROM vehicles WHERE vin = 'ZFFLA13S000059193'), 
 (SELECT id FROM customers WHERE email = 'gland20@aol.com'),
 '2024-12-01', 'CHECK_IN', 'Moorpark', 'Jon Garland', 'CHECKED_IN', 
 '2024-12-01T10:00:00Z', NULL, 75, 65000, 32, 30, 32, 30, true, false,
 'Turn key to position 2, wait for fuel pump, then start', 
 'Ferrari 308 GTS. Classic Ferrari in good condition.',
 now(), now()),

((SELECT id FROM vehicles WHERE vin = 'WP0AB29995S740704'), 
 (SELECT id FROM customers WHERE email = 'gland20@aol.com'),
 '2024-12-01', 'CHECK_IN', 'Moorpark', 'Jon Garland', 'CHECKED_IN', 
 '2024-12-01T10:30:00Z', NULL, 80, 85000, 32, 30, 32, 30, true, false,
 'Press start button with foot on brake', 
 'Porsche 911 Carrera S. Standard storage.',
 now(), now()),

-- Greg Geyer vehicles - CHECKED_IN
((SELECT id FROM vehicles WHERE vin = 'WP0AD2A9XES167737'), 
 (SELECT id FROM customers WHERE email = 'gregtgeyer@gmail.com'),
 '2024-08-26', 'CHECK_IN', 'Moorpark', 'Greg Geyer', 'CHECKED_IN', 
 '2024-08-26T11:15:00Z', NULL, 85, 45000, 32, 30, 32, 30, true, false,
 'Press start button with foot on brake', 
 'Porsche 911 Turbo. Premium storage requested.',
 now(), now()),

((SELECT id FROM vehicles WHERE vin = 'SALKPBE95SA277675'), 
 (SELECT id FROM customers WHERE email = 'gregtgeyer@gmail.com'),
 '2024-08-27', 'CHECK_IN', 'Moorpark', 'Greg Geyer', 'CHECKED_IN', 
 '2024-08-27T14:00:00Z', NULL, 90, 8000, 35, 35, 35, 35, false, false,
 'Press start button with foot on brake', 
 'New Range Rover. Standard storage.',
 now(), now()),

-- Kenneth Ingoldsby vehicles - CHECKED_IN
((SELECT id FROM vehicles WHERE vin = 'ZA9CA05AXKLA12520'), 
 (SELECT id FROM customers WHERE email = 'kenslaw01@aim.com'),
 '2025-04-04', 'CHECK_IN', 'Moorpark', 'Kenneth Ingoldsby', 'CHECKED_IN', 
 '2025-04-04T10:00:00Z', NULL, 85, 25000, 32, 30, 32, 30, true, true,
 'Turn key to position 2, wait for fuel pump, then start. Clutch can be tricky.', 
 'Rare Lamborghini Countach. Extreme care required. Premium storage.',
 now(), now()),

-- Kurt Johnson vehicles - CHECKED_IN
((SELECT id FROM vehicles WHERE vin = 'MB2S5847D515'), 
 (SELECT id FROM customers WHERE email = 'kjohnson@hunterrainier.com'),
 '2025-01-01', 'CHECK_IN', 'Moorpark', 'Kurt Johnson', 'CHECKED_IN', 
 '2025-01-01T13:30:00Z', NULL, 95, 75, 30, 30, 30, 30, true, false,
 'Boat - not applicable', 
 'Malibu Wakesetter boat. Stored on trailer. Keep covered.',
 now(), now()),

-- Paul Johnson vehicles - CHECKED_IN
((SELECT id FROM vehicles WHERE vin = '2C3CDZH95JH101819'), 
 (SELECT id FROM customers WHERE email = 'paulj89@hotmail.com'),
 '2025-06-01', 'CHECK_IN', 'Moorpark', 'Paul Johnson', 'CHECKED_IN', 
 '2025-06-01T09:45:00Z', NULL, 90, 15000, 32, 30, 32, 30, true, false,
 'Press start button with foot on brake', 
 'Dodge Demon. High performance vehicle. Premium storage.',
 now(), now()),

((SELECT id FROM vehicles WHERE vin = 'WPOAE2A94JS185349'), 
 (SELECT id FROM customers WHERE email = 'paulj89@hotmail.com'),
 '2025-06-01', 'CHECK_IN', 'Moorpark', 'Paul Johnson', 'CHECKED_IN', 
 '2025-06-01T10:15:00Z', NULL, 95, 8500, 32, 30, 32, 30, true, false,
 'Press start button with foot on brake', 
 'Porsche GT2RS. Extreme care required. Premium storage.',
 now(), now()),

-- Brian Jones vehicles - CHECKED_IN
((SELECT id FROM vehicles WHERE vin = '1841802'), 
 (SELECT id FROM customers WHERE email = 'brianjones81@earthlink.net'),
 '2022-12-10', 'CHECK_IN', 'Moorpark', 'Brian Jones', 'CHECKED_IN', 
 '2022-12-10T09:00:00Z', NULL, 70, 75000, 28, 26, 28, 26, true, false,
 'Classic car - turn key gently, may need multiple attempts', 
 'Classic Ford RD. Special handling for classic vehicle.',
 now(), now()),

((SELECT id FROM vehicles WHERE vin = '185140520'), 
 (SELECT id FROM customers WHERE email = 'brianjones81@earthlink.net'),
 '2022-12-10', 'CHECK_IN', 'Moorpark', 'Brian Jones', 'CHECKED_IN', 
 '2022-12-10T09:30:00Z', NULL, 65, 85000, 28, 26, 28, 26, true, false,
 'Classic car - turn key gently, may need multiple attempts', 
 'Classic Ford Deluxe. Special handling for classic vehicle.',
 now(), now()),

((SELECT id FROM vehicles WHERE vin = '9C5749'), 
 (SELECT id FROM customers WHERE email = 'brianjones81@earthlink.net'),
 '2022-12-10', 'CHECK_IN', 'Moorpark', 'Brian Jones', 'CHECKED_IN', 
 '2022-12-10T10:00:00Z', NULL, 60, 65000, 28, 26, 28, 26, true, false,
 'Classic car - turn key gently, may need multiple attempts', 
 'Classic Ford 11C. Special handling for classic vehicle.',
 now(), now()),

((SELECT id FROM vehicles WHERE vin = '2C3CDZC9XGH308450'), 
 (SELECT id FROM customers WHERE email = 'brianjones81@earthlink.net'),
 '2024-05-06', 'CHECK_IN', 'Moorpark', 'Brian Jones', 'CHECKED_IN', 
 '2024-05-06T14:15:00Z', NULL, 85, 35000, 32, 30, 32, 30, true, false,
 'Press start button with foot on brake', 
 'Dodge Challenger Hellcat. High performance vehicle.',
 now(), now()),

((SELECT id FROM vehicles WHERE vin = 'JHSTE080XFM008615'), 
 (SELECT id FROM customers WHERE email = 'brianjones81@earthlink.net'),
 '2022-12-10', 'CHECK_IN', 'Moorpark', 'Brian Jones', 'CHECKED_IN', 
 '2022-12-10T10:30:00Z', NULL, 80, 15000, 25, 25, 25, 25, false, false,
 'ATV - standard startup', 
 'Honda 350x ATC. Stored in small vehicle area.',
 now(), now()),

-- Matthew Ludwick vehicles - CHECKED_IN
((SELECT id FROM vehicles WHERE vin = '1GCDC14Z1RZ124083'), 
 (SELECT id FROM customers WHERE email = 'matt@bighornprecision.com'),
 '2024-07-03', 'CHECK_IN', 'Moorpark', 'Matthew Ludwick', 'CHECKED_IN', 
 '2024-07-03T11:30:00Z', NULL, 75, 95000, 32, 30, 32, 30, false, false,
 'Standard startup procedure', 
 'Chevrolet C1500 truck. Standard storage.',
 now(), now()),

-- Kevin Lydick vehicles - CHECKED_IN
((SELECT id FROM vehicles WHERE vin = 'WBS6E9C31HG437538'), 
 (SELECT id FROM customers WHERE email = 'kevin@oakridgelandworks.com'),
 '2024-09-01', 'CHECK_IN', 'Moorpark', 'Kevin Lydick', 'CHECKED_IN', 
 '2024-09-01T10:00:00Z', NULL, 80, 45000, 32, 30, 32, 30, true, false,
 'Press start button with foot on brake', 
 'BMW M6. Premium storage. Insurance expired - needs renewal.',
 now(), now()),

((SELECT id FROM vehicles WHERE vin = '1FA6P8SJ4N5502617'), 
 (SELECT id FROM customers WHERE email = 'kevin@oakridgelandworks.com'),
 '2024-09-01', 'CHECK_IN', 'Moorpark', 'Kevin Lydick', 'CHECKED_IN', 
 '2024-09-01T10:30:00Z', NULL, 90, 12000, 32, 30, 32, 30, true, false,
 'Press start button with foot on brake', 
 'Ford Shelby GT500. High performance vehicle. Insurance expired - needs renewal.',
 now(), now()),

((SELECT id FROM vehicles WHERE vin = '1FTFW1RJ7RFB29647'), 
 (SELECT id FROM customers WHERE email = 'kevin@oakridgelandworks.com'),
 '2024-09-01', 'CHECK_IN', 'Moorpark', 'Kevin Lydick', 'CHECKED_IN', 
 '2024-09-01T11:00:00Z', NULL, 95, 5000, 35, 35, 35, 35, false, false,
 'Press start button with foot on brake', 
 'Ford Raptor R. High performance truck.',
 now(), now()),

((SELECT id FROM vehicles WHERE vin = '1FTFW5L58RFB74129'), 
 (SELECT id FROM customers WHERE email = 'kevin@oakridgelandworks.com'),
 '2024-09-01', 'CHECK_IN', 'Moorpark', 'Kevin Lydick', 'CHECKED_IN', 
 '2024-09-01T11:30:00Z', NULL, 95, 5000, 35, 35, 35, 35, false, false,
 'Press start button with foot on brake', 
 'Ford F-150 Supersnake. High performance truck.',
 now(), now()),

-- Vincent Malfa vehicles - CHECKED_IN
((SELECT id FROM vehicles WHERE vin = 'WBSBF9326SEH08263'), 
 (SELECT id FROM customers WHERE email = 'vgm@tripledistilled.com'),
 '2023-09-06', 'CHECK_IN', 'Moorpark', 'Vincent Malfa', 'CHECKED_IN', 
 '2023-09-06T13:45:00Z', NULL, 70, 125000, 32, 30, 32, 30, true, false,
 'Turn key to position 2, wait for fuel pump, then start', 
 'BMW M3. Insurance expired - needs renewal.',
 now(), now()),

-- Gerald Mansell vehicles - CHECKED_IN
((SELECT id FROM vehicles WHERE vin = 'WP0AB2A9XBS721313'), 
 (SELECT id FROM customers WHERE email = 'gerrymansell@icloud.com'),
 '2024-12-17', 'CHECK_IN', 'Moorpark', 'Gerald Mansell', 'CHECKED_IN', 
 '2024-12-17T15:30:00Z', NULL, 85, 65000, 32, 30, 32, 30, true, false,
 'Press start button with foot on brake', 
 'Porsche 997 GTS. Premium storage.',
 now(), now()),

((SELECT id FROM vehicles WHERE vin = 'WP0CC2A89LS240306'), 
 (SELECT id FROM customers WHERE email = 'gerrymansell@icloud.com'),
 '2024-12-17', 'CHECK_IN', 'Moorpark', 'Gerald Mansell', 'CHECKED_IN', 
 '2024-12-17T16:00:00Z', NULL, 90, 15000, 32, 30, 32, 30, true, false,
 'Press start button with foot on brake', 
 'Porsche 718 Boxster Spyder. Premium storage.',
 now(), now()),

-- Marmonte Cars vehicles - CHECKED_IN
((SELECT id FROM vehicles WHERE vin = 'JM1NB353030300663'), 
 (SELECT id FROM customers WHERE email = 'sergio@migramer.com'),
 '2025-05-07', 'CHECK_IN', 'Moorpark', 'Sergio Gramer', 'CHECKED_IN', 
 '2025-05-07T11:15:00Z', NULL, 75, 85000, 30, 28, 30, 28, true, false,
 'Turn key to position 2, wait for fuel pump, then start', 
 'Mazda Miata MX-5. Standard storage.',
 now(), now()),

-- Joseph Matta vehicles - CHECKED_IN
((SELECT id FROM vehicles WHERE vin = 'WP0AD2A96JS156695'), 
 (SELECT id FROM customers WHERE email = 'joe@hansonlab.com'),
 '2023-12-27', 'CHECK_IN', 'Moorpark', 'Joseph Matta', 'CHECKED_IN', 
 '2023-12-27T10:45:00Z', NULL, 85, 25000, 32, 30, 32, 30, true, false,
 'Press start button with foot on brake', 
 'Porsche 911 Turbo S. Premium storage.',
 now(), now()),

-- Greg McNeal vehicles - CHECKED_IN
((SELECT id FROM vehicles WHERE vin = 'U15GLK08711'), 
 (SELECT id FROM customers WHERE email = 'gregory.mcneal.list@gmail.com'),
 '2025-06-02', 'CHECK_IN', 'Moorpark', 'Greg McNeal', 'CHECKED_IN', 
 '2025-06-02T14:30:00Z', NULL, 80, 75000, 32, 30, 32, 30, true, false,
 'Turn key to position 2, wait for fuel pump, then start', 
 'Classic Ford Bronco. Special handling for classic vehicle.',
 now(), now()),

-- Garrett Pegler vehicles - CHECKED_IN
((SELECT id FROM vehicles WHERE vin = 'N592786'), 
 (SELECT id FROM customers WHERE email = 'garret@ghostshieldfilm.com'),
 '2022-12-14', 'CHECK_IN', 'Moorpark', 'Garrett Pegler', 'CHECKED_IN', 
 '2022-12-14T09:30:00Z', NULL, 70, 95000, 30, 28, 30, 28, true, false,
 'Classic car - turn key gently, may need multiple attempts', 
 'Classic Chevrolet Camaro. Special handling for classic vehicle. Insurance expired - needs renewal.',
 now(), now()),

((SELECT id FROM vehicles WHERE vin = 'HFB20103M78H'), 
 (SELECT id FROM customers WHERE email = 'garret@ghostshieldfilm.com'),
 '2022-12-14', 'CHECK_IN', 'Moorpark', 'Garrett Pegler', 'CHECKED_IN', 
 '2022-12-14T10:00:00Z', NULL, 90, 500, 30, 30, 30, 30, true, false,
 'Boat - not applicable', 
 'Horizon Pleasure boat. Stored on trailer. Keep covered.',
 now(), now()),

-- Steve Pena vehicles - CHECKED_IN
((SELECT id FROM vehicles WHERE vin = 'F8103861'), 
 (SELECT id FROM customers WHERE email = 'steve@penaemail.com'),
 '2024-07-23', 'CHECK_IN', 'Moorpark', 'Steve Pena', 'CHECKED_IN', 
 '2024-07-23T11:30:00Z', NULL, 65, 85000, 30, 28, 30, 28, true, false,
 'Classic car - turn key gently, may need multiple attempts', 
 'Classic Cadillac DeVille. Special handling for classic vehicle.',
 now(), now()),

-- Tyrone Pham vehicles - CHECKED_IN
((SELECT id FROM vehicles WHERE vin = 'JF1ZCAC19H9605401'), 
 (SELECT id FROM customers WHERE email = 'ecoliex@yahoo.com'),
 '2022-06-19', 'CHECK_IN', 'Moorpark', 'Tyrone Pham', 'CHECKED_IN', 
 '2022-06-19T13:15:00Z', NULL, 80, 45000, 32, 30, 32, 30, true, false,
 'Turn key to position 2, wait for fuel pump, then start', 
 'Subaru BRZ. Standard storage.',
 now(), now()),

-- Thomas Powers vehicles - CHECKED_IN
((SELECT id FROM vehicles WHERE vin = '1FTHX25M2NKA18100'), 
 (SELECT id FROM customers WHERE email = 'tomepowers@gmail.com'),
 '2025-06-01', 'CHECK_IN', 'Moorpark', 'Thomas Powers', 'CHECKED_IN', 
 '2025-06-01T15:00:00Z', NULL, 70, 185000, 35, 35, 35, 35, false, false,
 'Standard startup procedure', 
 'Ford F250 truck. Standard storage.',
 now(), now()),

-- Jeremy Renstrom vehicles - CHECKED_IN
((SELECT id FROM vehicles WHERE vin = 'JN1CV6AP7DM725397'), 
 (SELECT id FROM customers WHERE email = 'jeremyrenstrom@yahoo.com'),
 '2024-09-09', 'CHECK_IN', 'Moorpark', 'Jeremy Renstrom', 'CHECKED_IN', 
 '2024-09-09T10:15:00Z', NULL, 75, 95000, 32, 30, 32, 30, true, false,
 'Turn key to position 2, wait for fuel pump, then start', 
 'Infiniti G37. Standard storage.',
 now(), now()),

-- Josiah Richards vehicles - CHECKED_IN
((SELECT id FROM vehicles WHERE vin = 'WBAJA9C5XJB250474'), 
 (SELECT id FROM customers WHERE email = 'josiah@illusory.io'),
 '2024-03-08', 'CHECK_IN', 'Moorpark', 'Josiah Richards', 'CHECKED_IN', 
 '2024-03-08T14:45:00Z', NULL, 80, 55000, 32, 30, 32, 30, true, false,
 'Press start button with foot on brake', 
 'BMW 530e. Standard storage.',
 now(), now()),

-- Joey Shap vehicles - CHECKED_IN
((SELECT id FROM vehicles WHERE vin = '1Z37T3S415681'), 
 (SELECT id FROM customers WHERE email = 'joeyshap@gmail.com'),
 '2025-06-01', 'CHECK_IN', 'Moorpark', 'Joey Shap', 'CHECKED_IN', 
 '2025-06-01T11:45:00Z', NULL, 70, 75000, 30, 28, 30, 28, true, false,
 'Classic car - turn key gently, may need multiple attempts', 
 'Classic Chevrolet Corvette. Special handling for classic vehicle.',
 now(), now()),

-- Victoria Shuken vehicles - CHECKED_IN
((SELECT id FROM vehicles WHERE vin = 'WPOAC2A97PS270457'), 
 (SELECT id FROM customers WHERE email = 'tori_shuken@vistaauto.com'),
 '2023-07-11', 'CHECK_IN', 'Moorpark', 'Victoria Shuken', 'CHECKED_IN', 
 '2023-07-11T09:30:00Z', NULL, 95, 5000, 32, 30, 32, 30, true, false,
 'Press start button with foot on brake', 
 'Porsche GT3 Touring. Premium storage. Insurance expired - needs renewal.',
 now(), now()),

((SELECT id FROM vehicles WHERE vin = '1FTFW1RG5NFA93648'), 
 (SELECT id FROM customers WHERE email = 'tori_shuken@vistaauto.com'),
 '2023-07-15', 'CHECK_IN', 'Moorpark', 'Victoria Shuken', 'CHECKED_IN', 
 '2023-07-15T10:00:00Z', NULL, 90, 15000, 35, 35, 35, 35, false, false,
 'Press start button with foot on brake', 
 'Ford F-150 Raptor. Standard storage. Insurance expired - needs renewal.',
 now(), now()),

-- Tarnpreet Singh vehicles - CHECKED_IN
((SELECT id FROM vehicles WHERE vin = 'WBSWD93558PY39566'), 
 (SELECT id FROM customers WHERE email = 'asingh2033@gmail.com'),
 '2025-04-11', 'CHECK_IN', 'Moorpark', 'Tarnpreet Singh', 'CHECKED_IN', 
 '2025-04-11T13:30:00Z', NULL, 75, 85000, 32, 30, 32, 30, true, false,
 'Press start button with foot on brake', 
 'BMW M3. Standard storage.',
 now(), now()),

((SELECT id FROM vehicles WHERE vin = 'WBSFV9C52FD594804'), 
 (SELECT id FROM customers WHERE email = 'asingh2033@gmail.com'),
 '2025-04-11', 'CHECK_IN', 'Moorpark', 'Tarnpreet Singh', 'CHECKED_IN', 
 '2025-04-11T14:00:00Z', NULL, 80, 65000, 32, 30, 32, 30, true, false,
 'Press start button with foot on brake', 
 'BMW M5. Standard storage.',
 now(), now()),

((SELECT id FROM vehicles WHERE vin = 'WBS13HJ07SFU77025'), 
 (SELECT id FROM customers WHERE email = 'asingh2033@gmail.com'),
 '2025-04-11', 'CHECK_IN', 'Moorpark', 'Tarnpreet Singh', 'CHECKED_IN', 
 '2025-04-11T14:30:00Z', NULL, 95, 2500, 32, 30, 32, 30, true, false,
 'Press start button with foot on brake', 
 'New BMW M3. Premium storage.',
 now(), now()),

-- Nico Solomon vehicles - CHECKED_IN
((SELECT id FROM vehicles WHERE vin = '63J030283'), 
 (SELECT id FROM customers WHERE email = 'solonico@sbcglobal.net'),
 '2024-08-21', 'CHECK_IN', 'Moorpark', 'Nico Solomon', 'CHECKED_IN', 
 '2024-08-21T10:30:00Z', NULL, 70, 65000, 30, 28, 30, 28, true, false,
 'Classic car - turn key gently, may need multiple attempts', 
 'Classic Cadillac Coupe DeVille. Special handling for classic vehicle. Insurance expired - needs renewal.',
 now(), now()),

-- Star Management vehicles - CHECKED_IN
((SELECT id FROM vehicles WHERE vin = '878960'), 
 (SELECT id FROM customers WHERE email = 'kenneth.allen75@gmail.com'),
 '2025-02-01', 'CHECK_IN', 'Moorpark', 'Kenneth Allen', 'CHECKED_IN', 
 '2025-02-01T11:15:00Z', NULL, 75, 45000, 30, 28, 30, 28, true, false,
 'Classic car - turn key gently, may need multiple attempts', 
 'Classic Jaguar E-Type. Special handling for classic vehicle.',
 now(), now()),

((SELECT id FROM vehicles WHERE vin = '408675119205'), 
 (SELECT id FROM customers WHERE email = 'kenneth.allen75@gmail.com'),
 '2025-02-01', 'CHECK_IN', 'Moorpark', 'Kenneth Allen', 'CHECKED_IN', 
 '2025-02-01T11:45:00Z', NULL, 70, 55000, 30, 28, 30, 28, true, false,
 'Classic car - turn key gently, may need multiple attempts', 
 'Classic Corvette Convertible. Special handling for classic vehicle.',
 now(), now()),

-- Donovan Tatum vehicles - CHECKED_IN
((SELECT id FROM vehicles WHERE vin = 'U15GLY05378'), 
 (SELECT id FROM customers WHERE email = 'donovan.tatum@caa.com'),
 '2025-05-01', 'CHECK_IN', 'Moorpark', 'Donovan Tatum', 'CHECKED_IN', 
 '2025-05-01T13:00:00Z', NULL, 75, 85000, 32, 30, 32, 30, true, false,
 'Turn key to position 2, wait for fuel pump, then start', 
 'Classic Ford Bronco. Special handling for classic vehicle. Insurance expired - needs renewal.',
 now(), now()),

-- Thaxton & Associates vehicles - CHECKED_IN
((SELECT id FROM vehicles WHERE vin = '1FTFW1E55PKE74267'), 
 (SELECT id FROM customers WHERE email = 'mike@thaxtonassociates.com'),
 '2024-05-21', 'CHECK_IN', 'Moorpark', 'Mike Thaxton', 'CHECKED_IN', 
 '2024-05-21T14:15:00Z', NULL, 90, 8500, 35, 35, 35, 35, false, false,
 'Press start button with foot on brake', 
 'Ford F150 Shelby. High performance truck.',
 now(), now()),

-- The Chosen Group vehicles - CHECKED_IN
((SELECT id FROM vehicles WHERE vin = 'WDAPF1CD6KP072139'), 
 (SELECT id FROM customers WHERE email = 'kacy@100group.com'),
 '2025-06-01', 'CHECK_IN', 'Moorpark', 'Kacy Chosen', 'CHECKED_IN', 
 '2025-06-01T15:30:00Z', NULL, 85, 45000, 35, 35, 35, 35, false, false,
 'Standard startup procedure', 
 'Mercedes Sprinter. Oversized vehicle storage. Insurance expired - needs renewal.',
 now(), now()),

-- Deke Williams vehicles - CHECKED_IN
((SELECT id FROM vehicles WHERE vin = 'Z67400F2A02902'), 
 (SELECT id FROM customers WHERE email = 'deke@wilmanco.com'),
 '2024-07-26', 'CHECK_IN', 'Moorpark', 'Deke Williams', 'CHECKED_IN', 
 '2024-07-26T09:15:00Z', NULL, 80, 45000, 30, 28, 30, 28, true, false,
 'Classic car - turn key gently, may need multiple attempts', 
 'Classic Mustang Shelby GT 500. Special handling for classic vehicle.',
 now(), now());