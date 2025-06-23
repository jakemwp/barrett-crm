/*
  # Populate database with real data from CSV files and mock data

  1. Clear existing data
  2. Insert customers from CSV data
  3. Insert vehicles from CSV data
  4. Insert authorized drivers and contacts
  5. Insert check-in/out records
  6. Insert service items
  7. Insert vehicle photos
  8. Insert users (admin and staff)

  This migration populates the database with real data from the Barrett Automotive Group
  client lists and vehicle inventories.
*/

-- Clear all existing data
TRUNCATE TABLE vehicle_photos CASCADE;
TRUNCATE TABLE service_items CASCADE;
TRUNCATE TABLE check_in_outs CASCADE;
TRUNCATE TABLE authorized_contacts CASCADE;
TRUNCATE TABLE authorized_drivers CASCADE;
TRUNCATE TABLE vehicles CASCADE;
TRUNCATE TABLE customers CASCADE;
TRUNCATE TABLE users CASCADE;

-- Insert customers from CSV data
INSERT INTO customers (
  first_name,
  last_name,
  type,
  membership_level,
  storage_location,
  email,
  phone,
  street_address,
  city,
  state,
  zip_code,
  storage_spots,
  show_panda_doc_form,
  date_created,
  password,
  num_rows,
  manual_price,
  created_at,
  updated_at
) VALUES
-- Individual Clients
('Jason', 'Adang', 'Individual', 'Premium', 'Moorpark', 'jason@adangenterprises.com', '(805) 795-6808', '821 Calle Pecos', 'Thousand Oaks', 'CA', '91360', 2, true, '2024-01-15', 'jasonadang123', 1, 300.00, now(), now()),
('Chris', 'Antonsen', 'Individual', 'Premium', 'Moorpark', 'antonsenchris3@gmail.com', '(818) 381-7105', '4565 Wolsey Court', 'Westlake Village', 'CA', '91361', 1, true, '2024-02-01', 'chrisantonsen123', 1, 200.00, now(), now()),
('Kam', 'Assil', 'Individual', 'Basic', 'Westlake Village', 'kamassil@gmail.com', '(805) 405-2054', '5124 Oxley Place', 'Westlake Village', 'CA', '91362', 1, false, '2024-03-10', 'kamassil123', 1, 150.00, now(), now()),
('Dylan', 'Boztepe', 'Individual', 'Basic', 'Moorpark', 'dylanboztepe1@gmail.com', '(310) 488-9198', '621 Rushing Creek Pl', 'Thousand Oaks', 'CA', '91360', 1, false, '2024-04-15', 'dylanboztepe123', 1, 150.00, now(), now()),
('Jeffrey', 'Brodsly', 'Individual', 'Premium', 'Moorpark', 'jeff@100group.com', '(805) 807-0195', '4263 Tierra Rejada Rd #213', 'Moorpark', 'CA', '93021', 1, true, '2024-05-20', 'jeffreybrodsly123', 1, 200.00, now(), now()),
('Jenson', 'Button', 'Individual', 'VIP', 'Westlake Village', 'jenson@radford.co', '(310) 854-9699', '2969 Calbourne Lane', 'Thousand Oaks', 'CA', '91361', 1, true, '2024-06-01', 'jensonbutton123', 1, 300.00, now(), now()),
('Daniel', 'Casson', 'Individual', 'Premium', 'Moorpark', 'dano4643@gmail.com', '(805) 207-6832', '11546 Willowood Ct', 'Moorpark', 'CA', '93021', 1, true, '2024-06-13', 'danielcasson123', 1, 200.00, now(), now()),
('Richard', 'Cobey', 'Individual', 'Basic', 'Moorpark', 'musicrc@gmail.com', '(818) 307-6515', '5739 Indian Point Drive', 'Simi Valley', 'CA', '93063', 1, false, '2024-08-26', 'richardcobey123', 1, 150.00, now(), now()),
('Assaf', 'Cohen', 'Individual', 'VIP', 'Moorpark', 'lp2mnp@gmail.com', '(818) 825-3764', '5724 Tenneyson Drive', 'Agoura Hills', 'CA', '91301', 3, true, '2024-08-01', 'assafcohen123', 2, 600.00, now(), now()),
('Rory', 'Cypers', 'Individual', 'Basic', 'Westlake Village', 'rorycypers@yahoo.com', '(310) 463-5620', '3816 Bowsprit Circle', 'Westlake Village', 'CA', '91361', 1, false, '2024-09-10', 'rorycypers123', 1, 150.00, now(), now()),
('David', 'Einstein', 'Individual', 'VIP', 'Moorpark', 'deinstein@skyreachsystems.com', '(310) 717-7087', '3925 Hitch Blvd.', 'Moorpark', 'CA', '93021', 1, true, '2024-12-01', 'davideinstein123', 1, 300.00, now(), now()),
('Alfred', 'English', 'Individual', 'Premium', 'Moorpark', 'alfred@sespecreekspirits.com', '(626) 676-0031', '701 Chapala Drive', 'Pacific Palisades', 'CA', '90272', 1, true, '2024-08-26', 'alfredenglish123', 1, 200.00, now(), now()),
('Demetrius', 'Forte', 'Individual', 'Basic', 'Westlake Village', 'gooman68.df@gmail.com', '(216) 235-6345', '123 Main Street', 'Cleveland', 'OH', '44101', 1, false, '2024-10-01', 'demetriusforte123', 1, 150.00, now(), now()),
('Donald', 'Friese', 'Individual', 'VIP', 'Moorpark', 'dj.friese@gmail.com', '(818) 554-2223', '22555 La Quilla Drive', 'Chatsworth', 'CA', '91311', 2, true, '2024-06-21', 'donaldfriese123', 1, 600.00, now(), now()),
('Joshua', 'Gamboa', 'Individual', 'Basic', 'Moorpark', 'joshuarobert100@gmail.com', '(818) 983-6207', '11323 Blythe St.', 'Sun Valley', 'CA', '91352', 1, false, '2024-06-21', 'joshuagamboa123', 1, 150.00, now(), now()),
('John', 'Garcia', 'Individual', 'Premium', 'Moorpark', 'john@johngarcia.org', '(310) 600-6464', '12009 Haven Crest St.', 'Moorpark', 'CA', '93021', 1, true, '2024-08-14', 'johngarcia123', 1, 200.00, now(), now()),
('Jon', 'Garland', 'Individual', 'Premium', 'Moorpark', 'gland20@aol.com', '(520) 241-4816', '1234 Heritage Pl', 'Westlake Village', 'CA', '91362', 3, true, '2024-12-01', 'jongarland123', 2, 450.00, now(), now()),
('Greg', 'Geyer', 'Individual', 'VIP', 'Moorpark', 'gregtgeyer@gmail.com', '(310) 463-2271', '1339 Falling Star Avenue', 'Westlake Village', 'CA', '91362', 2, true, '2024-08-26', 'greggeyer123', 1, 400.00, now(), now()),
('Richard', 'Herbert', 'Individual', 'VIP', 'Westlake Village', 'richard@helixrecruiting.com', '(801) 916-2930', '11950 Beach Club Way', 'Malibu', 'CA', '90265', 3, true, '2024-11-01', 'richardherbert123', 2, 600.00, now(), now()),
('Kenneth', 'Ingoldsby', 'Individual', 'VIP', 'Moorpark', 'kenslaw01@aim.com', '(818) 983-6207', '13636 Ventura Blvd #457', 'Sherman Oaks', 'CA', '91423', 1, true, '2024-04-04', 'kennethinglodsby123', 1, 300.00, now(), now()),
('Kurt', 'Johnson', 'Individual', 'Premium', 'Moorpark', 'kjohnson@hunterrainier.com', '(805) 551-6258', '2284 Stacy Ln.', 'Camarillo', 'CA', '93012', 1, true, '2024-01-01', 'kurtjohnson123', 1, 200.00, now(), now()),
('Paul', 'Johnson', 'Individual', 'VIP', 'Moorpark', 'paulj89@hotmail.com', '(818) 825-8611', '13536 Pacific Breeze Dr.', 'Santa Rosa Valley', 'CA', '93012', 2, true, '2024-06-01', 'pauljohnson123', 1, 400.00, now(), now()),
('Brian', 'Jones', 'Individual', 'VIP', 'Moorpark', 'brianjones81@earthlink.net', '(805) 241-1735', '13723 Nightsky Drive', 'Santa Rosa Valley', 'CA', '93012', 5, true, '2022-12-10', 'brianjones123', 3, 750.00, now(), now()),
('Denise', 'Kirtley', 'Individual', 'Basic', 'Westlake Village', 'denisepkirtley@gmail.com', '(310) 962-1827', '420 Upper Lake Road', 'Thousand Oaks', 'CA', '91361', 1, false, '2024-12-01', 'denisekirtley123', 1, 150.00, now(), now()),
('Matthew', 'Ludwick', 'Individual', 'Premium', 'Moorpark', 'matt@bighornprecision.com', '(406) 559-6579', '16 N Montana St', 'Butte', 'MT', '59701', 1, true, '2024-07-03', 'matthewludwick123', 1, 200.00, now(), now()),
('Kevin', 'Lydick', 'Individual', 'VIP', 'Moorpark', 'kevin@oakridgelandworks.com', '(805) 630-8377', '3106 Tanglewood Ct.', 'Thousand Oaks', 'CA', '91360', 3, true, '2024-09-01', 'kevinlydick123', 2, 600.00, now(), now()),
('Vincent', 'Malfa', 'Individual', 'Basic', 'Moorpark', 'vgm@tripledistilled.com', '(508) 859-0390', '710 Calle Cardo', 'Thousand Oaks', 'CA', '91360', 1, false, '2023-09-06', 'vincentmalfa123', 1, 150.00, now(), now()),
('Gerald', 'Mansell', 'Individual', 'Premium', 'Moorpark', 'gerrymansell@icloud.com', '(808) 375-7971', '604 N Kalaheo Ave', 'Kailua', 'HI', '96734', 1, true, '2024-12-17', 'geraldmansell123', 1, 200.00, now(), now()),
('Joseph', 'Matta', 'Individual', 'Premium', 'Moorpark', 'joe@hansonlab.com', '(805) 795-1300', '747 Calle Plano', 'Camarillo', 'CA', '93012', 1, true, '2023-12-27', 'josephmatta123', 1, 200.00, now(), now()),
('Greg', 'McNeal', 'Individual', 'Premium', 'Moorpark', 'gregory.mcneal.list@gmail.com', '(512) 413-3869', '29615 Kimberly Drive', 'Agoura Hills', 'CA', '91301', 1, true, '2024-06-01', 'gregmcneal123', 1, 200.00, now(), now()),
('Garrett', 'Pegler', 'Individual', 'Premium', 'Moorpark', 'garret@ghostshieldfilm.com', '(805) 427-5863', '1168 Tourmaline Dr.', 'Newbury Park', 'CA', '91320', 2, true, '2022-12-14', 'garrettpegler123', 1, 300.00, now(), now()),
('Steve', 'Pena', 'Individual', 'Premium', 'Moorpark', 'steve@penaemail.com', '(310) 601-8771', '2928 Shadow Brook Ln', 'Westlake Village', 'CA', '91361', 1, true, '2024-07-23', 'stevepena123', 1, 200.00, now(), now()),
('Tyrone', 'Pham', 'Individual', 'Basic', 'Moorpark', 'ecoliex@yahoo.com', '(626) 600-7023', '701 S Howard Ave. ste 106217', 'Tampa', 'FL', '33606', 1, false, '2022-06-19', 'tyronepham123', 1, 150.00, now(), now()),
('Thomas', 'Powers', 'Individual', 'Basic', 'Moorpark', 'tomepowers@gmail.com', '(805) 915-8120', '365 Jeremiah Drive Unit A', 'Simi Valley', 'CA', '93065', 1, false, '2024-06-01', 'thomaspowers123', 1, 150.00, now(), now()),
('Jeremy', 'Renstrom', 'Individual', 'Basic', 'Moorpark', 'jeremyrenstrom@yahoo.com', '(310) 422-5742', '21736 Roscoe Blvd #34', 'Canoga Park', 'CA', '91304', 1, false, '2024-09-09', 'jeremyrenstrom123', 1, 150.00, now(), now()),
('Josiah', 'Richards', 'Individual', 'Premium', 'Moorpark', 'josiah@illusory.io', '(647) 270-5442', '4500 Park Granada', 'Calabasas', 'CA', '91302', 1, true, '2024-03-08', 'josiahrichards123', 1, 200.00, now(), now()),
('Joey', 'Shap', 'Individual', 'Basic', 'Moorpark', 'joeyshap@gmail.com', '(805) 825-8462', '501 S. Reino Rd. #226', 'Newbury Park', 'CA', '91320', 1, false, '2024-06-01', 'joeyshap123', 1, 150.00, now(), now()),
('Andrew', 'Shore', 'Individual', 'Basic', 'Westlake Village', 'an.shore@yahoo.com', '(310) 890-3799', '1584 Fairmount Rd', 'Westlake Village', 'CA', '91362', 1, false, '2024-11-15', 'andrewshore123', 1, 150.00, now(), now()),
('Victoria', 'Shuken', 'Individual', 'VIP', 'Moorpark', 'tori_shuken@vistaauto.com', '(818) 207-9770', '12626 Andalusia Drive', 'Santa Rosa Valley', 'CA', '93012', 2, true, '2023-07-06', 'victoriashuken123', 1, 400.00, now(), now()),
('Tarnpreet', 'Singh', 'Individual', 'Premium', 'Moorpark', 'asingh2033@gmail.com', '(805) 377-2472', '5170 Edgar St', 'Oxnard', 'CA', '93033', 3, true, '2024-04-11', 'tarnpreetsingh123', 2, 450.00, now(), now()),
('Nico', 'Solomon', 'Individual', 'Premium', 'Moorpark', 'solonico@sbcglobal.net', '(805) 558-8678', '1634 River Wood Court', 'Simi Valley', 'CA', '93063', 1, true, '2024-08-21', 'nicosolomon123', 1, 200.00, now(), now()),
('Donovan', 'Tatum', 'Individual', 'Premium', 'Moorpark', 'donovan.tatum@caa.com', '(818) 648-3062', '637 S. Lucerne Blvd', 'Los Angeles', 'CA', '90005', 1, true, '2024-05-01', 'donovantatum123', 1, 200.00, now(), now()),
('Ryan', 'Telford', 'Individual', 'Premium', 'Moorpark', 'ryan.telford@amwins.com', '(818) 216-1792', '1408 Kingsboro Court', 'Westlake Village', 'CA', '91362', 1, true, '2023-02-01', 'ryantelford123', 1, 200.00, now(), now()),
('Deke', 'Williams', 'Individual', 'VIP', 'Moorpark', 'deke@wilmanco.com', '(805) 432-4459', '32069 Lobo Canyon Rd', 'Agoura Hills', 'CA', '91301', 6, true, '2024-07-26', 'dekewilliams123', 3, 900.00, now(), now()),
('Anthony', 'Virella', 'Individual', 'Enterprise', 'Westlake Village', 'avirella@yahoo.com', '(310) 622-5205', '5959 Murphy Way', 'Malibu', 'CA', '90265', 10, true, '2024-12-01', 'anthonyvirella123', 5, 1500.00, now(), now()),

-- Business Clients
('All Valley Washer Service', 'Inc.', 'Business', 'Basic', 'Moorpark', 'jim@allvalleywasher.com', '(818) 464-5264', '15008 Delano St.', 'Van Nuys', 'CA', '91411', 1, false, '2024-07-01', 'allvalleywasher123', 1, 150.00, now(), now()),
('Barrett', 'Whips', 'Business', 'Enterprise', 'Westlake Village', 'lindsay@barrettassociatesllc.com', '(805) 559-1028', '868 Patriot Drive Unit A', 'Moorpark', 'CA', '93021', 10, true, '2024-01-01', 'barrettwhips123', 5, 1500.00, now(), now()),
('C&H', 'Construction', 'Business', 'Premium', 'Moorpark', 'jeff@candhconstruction.net', '(805) 495-0679', '3315 Grande Vista Drive', 'Newbury Park', 'CA', '91320', 2, true, '2024-05-01', 'candhconstruction123', 1, 300.00, now(), now()),
('DHK', 'Plumbing', 'Business', 'Premium', 'Moorpark', 'Joe@dhkplumbing.com', '(562) 762-6176', '2105 West San Bernardino Road', 'West Covina', 'CA', '91790', 2, true, '2024-12-05', 'dhkplumbing123', 1, 300.00, now(), now()),
('Lotus', 'USA', 'Business', 'Basic', 'Moorpark', 'jane.lonsdale@lotuscars.com', '(805) 233-4987', '11988 Challenger Ct', 'Moorpark', 'CA', '93021', 1, false, '2024-06-18', 'lotususa123', 1, 150.00, now(), now()),
('Marmonte Cars', 'LLC', 'Business', 'Premium', 'Moorpark', 'sergio@migramer.com', '(310) 795-2001', '30130 Mullholland Hwy', 'Agoura', 'CA', '91301', 2, true, '2024-05-07', 'marmontecars123', 1, 300.00, now(), now()),
('Star Management', 'LLC', 'Business', 'Premium', 'Moorpark', 'kenneth.allen75@gmail.com', '(951) 425-8642', '730 E Durant Ave Suite 200', 'Aspen', 'CO', '81611', 3, true, '2024-02-01', 'starmanagement123', 2, 450.00, now(), now()),
('Thaxton & Associates', 'Inc', 'Business', 'Premium', 'Westlake Village', 'mike@thaxtonassociates.com', '(818) 633-9111', '11338 Moorpark St.', 'Studio City', 'CA', '91423', 4, true, '2024-05-21', 'thaxtonassociates123', 2, 600.00, now(), now()),
('The Chosen Group', 'Inc', 'Business', 'Basic', 'Moorpark', 'kacy@100group.com', '(805) 807-0195', '4263 Tierra Rejada Rd #213', 'Moorpark', 'CA', '93021', 1, false, '2024-06-01', 'thechosengroup123', 1, 150.00, now(), now()),
('Velocity Restorations', 'LLC', 'Business', 'Premium', 'Moorpark', 'chris@velocityrestorations.com', '(850) 776-8729', '15 E Quintette Rd', 'Cantonment', 'FL', '32533', 2, true, '2024-04-24', 'velocityrestorations123', 1, 300.00, now(), now());

-- Insert vehicles from CSV data
INSERT INTO vehicles (
  customer_id,
  year,
  make,
  model,
  vin,
  storage_location,
  fair_market_value,
  insurance_rider_required,
  insurance_rider_amount,
  license_plate,
  registration_number,
  registration_state,
  registration_expiration_date,
  tire_pressure_default_front,
  tire_pressure_default_rear,
  tire_pressure_preferred_front,
  tire_pressure_preferred_rear,
  last_service_date,
  next_service_date,
  service_interval,
  maintenance_notes,
  odometer,
  image,
  fuel_level,
  battery_type,
  color,
  created_at,
  updated_at
) VALUES
-- Jason Adang vehicles
((SELECT id FROM customers WHERE email = 'jason@adangenterprises.com'), 1972, 'Porsche', '911', '9112101858', 'Moorpark', 100000, false, NULL, 'ABC123', 'REG123456', 'CA', '2025-09-07', 32, 30, 34, 32, '2024-12-01', '2025-06-01', 6, 'Classic Porsche maintenance', 85000, 'https://images.pexels.com/photos/3954440/pexels-photo-3954440.jpeg', 75, 'Standard', 'Silver', now(), now()),
((SELECT id FROM customers WHERE email = 'jason@adangenterprises.com'), 2012, 'Lexus', 'LFA', 'JTHHX8BH2C1000028', 'Moorpark', 875000, true, 100000, 'LFA001', 'REG789012', 'CA', '2025-09-07', 34, 32, 36, 34, '2024-11-01', '2025-05-01', 6, 'Rare LFA - special handling required', 15000, 'https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg', 85, 'Lithium', 'White', now(), now()),
((SELECT id FROM customers WHERE email = 'jason@adangenterprises.com'), 2019, 'Porsche', 'GT2RS', 'WP0AE2A97KS155294', 'Moorpark', 450000, true, 50000, 'GT2RS1', 'REG456789', 'CA', '2025-09-07', 32, 30, 34, 32, '2024-10-01', '2025-04-01', 6, 'High performance vehicle', 8500, 'https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg', 90, 'Standard', 'Black', now(), now()),

-- All Valley Washer Service
((SELECT id FROM customers WHERE email = 'jim@allvalleywasher.com'), 2024, 'Jeep', 'Rubicon', '1C4RJXSJ3RW223940', 'Moorpark', 98000, false, NULL, 'JEEP24', 'REG234567', 'CA', '2025-12-30', 35, 35, 37, 37, NULL, '2025-07-01', 6, 'New vehicle', 5000, 'Standard', 'Red', now(), now()),

-- Chris Antonsen
((SELECT id FROM customers WHERE email = 'antonsenchris3@gmail.com'), 2022, 'Mastercraft', 'X24', 'MBCPHBVG122', 'Moorpark', 267000, false, NULL, 'BOAT22', 'BOAT123', 'CA', '2026-05-03', 30, 30, 30, 30, '2024-08-01', '2025-02-01', 6, 'Boat maintenance', 100, 'https://images.pexels.com/photos/1335077/pexels-photo-1335077.jpeg', 95, 'Standard', 'Blue', now(), now()),

-- Barrett Whips
((SELECT id FROM customers WHERE email = 'lindsay@barrettassociatesllc.com'), 2001, 'Mercedes', 'SL500', 'WDBFA68F31F200029', 'Moorpark', 12000, false, NULL, 'MERC01', 'REG345678', 'CA', '2025-09-30', 32, 30, 34, 32, '2024-06-01', '2024-12-01', 6, 'Company vehicle', 125000, 'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg', 60, 'Standard', 'Silver', now(), now()),

-- Dylan Boztepe
((SELECT id FROM customers WHERE email = 'dylanboztepe1@gmail.com'), 2009, 'Mercedes-AMG', 'C63', 'WDDGF77X29f233516', 'Moorpark', 22000, false, NULL, 'AMG09', 'REG567890', 'CA', '2025-06-26', 32, 30, 34, 32, '2024-05-01', '2024-11-01', 6, 'Regular maintenance', 95000, 'https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg', 45, 'AGM', 'Black', now(), now()),

-- Jeffrey Brodsly
((SELECT id FROM customers WHERE email = 'jeff@100group.com'), 2013, 'Rolls Royce', 'Ghost', 'SCA664S56DUX51683', 'Moorpark', 90000, false, NULL, 'ROLLS1', 'REG678901', 'CA', '2025-12-31', 32, 30, 34, 32, '2024-04-01', '2024-10-01', 6, 'Luxury vehicle maintenance', 65000, 'https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg', 80, 'AGM', 'White', now(), now()),

-- C&H Construction
((SELECT id FROM customers WHERE email = 'jeff@candhconstruction.net'), 2010, 'Harley Davidson', 'FLTRX', '1HD1KH438AB606132', 'Moorpark', 16000, false, NULL, 'HARLEY', 'BIKE123', 'CA', '2025-05-01', 30, 28, 32, 30, '2024-03-01', '2024-09-01', 6, 'Motorcycle maintenance', 45000, NULL, 70, 'Standard', 'Black', now(), now()),

-- Daniel Casson
((SELECT id FROM customers WHERE email = 'dano4643@gmail.com'), 2017, 'Ferrari', 'California', 'ZFF77XJAXH0227476', 'Moorpark', 150000, false, NULL, 'FERR17', 'REG789012', 'CA', '2026-06-18', 32, 30, 34, 32, '2024-04-01', '2024-10-01', 6, 'Ferrari maintenance', 25000, 'https://images.pexels.com/photos/3954440/pexels-photo-3954440.jpeg', 75, 'Standard', 'Red', now(), now()),

-- Richard Cobey
((SELECT id FROM customers WHERE email = 'musicrc@gmail.com'), 2014, 'Bentley', 'Continental Flying Spur', 'SCBEC9ZA5EC095631', 'Moorpark', 100000, false, NULL, 'BENT14', 'REG890123', 'CA', '2023-12-06', 32,30, 34, 32, '2023-11-01', '2024-05-01', 6, 'Luxury vehicle maintenance', 55000, 'https://images.pexels.com/photos/3954426/pexels-photo-3954426.jpeg', 70, 'AGM', 'Black', now(), now()),

-- Assaf Cohen vehicles
((SELECT id FROM customers WHERE email = 'lp2mnp@gmail.com'), 2015, 'Nissan', 'R35 GTR', 'JN1AR5EF3FM281610', 'Moorpark', 150000, false, NULL, 'GTR15', 'REG901234', 'CA', '2025-06-20', 32, 30, 34, 32, '2024-02-01', '2024-08-01', 6, 'Performance vehicle maintenance', 65000, 'https://images.pexels.com/photos/3954426/pexels-photo-3954426.jpeg', 80, 'Standard', 'Blue', now(), now()),
((SELECT id FROM customers WHERE email = 'lp2mnp@gmail.com'), 1995, 'Nissan', 'Skyline R33 GTR', 'BCNR33001214', 'Moorpark', 120000, false, NULL, 'R33GTR', 'REG012345', 'CA', '2026-02-12', 32, 30, 34, 32, '2024-01-01', '2024-07-01', 6, 'JDM import - special maintenance', 75000, 'https://images.pexels.com/photos/3954426/pexels-photo-3954426.jpeg', 75, 'Standard', 'Blue', now(), now()),
((SELECT id FROM customers WHERE email = 'lp2mnp@gmail.com'), 1999, 'Nissan', 'Skyline R34 GTR', 'BNR34005053', 'Moorpark', 200000, false, NULL, 'R34GTR', 'REG123456', 'CA', '2025-07-24', 32, 30, 34, 32, '2024-01-15', '2024-07-15', 6, 'JDM import - special maintenance', 65000, 'https://images.pexels.com/photos/3954426/pexels-photo-3954426.jpeg', 85, 'Standard', 'Blue', now(), now()),
((SELECT id FROM customers WHERE email = 'lp2mnp@gmail.com'), 1990, 'Nissan', 'Skyline R32 GTR', 'BNR32012884', 'Moorpark', 100000, false, NULL, 'R32GTR', 'REG234567', 'CA', '2026-02-12', 32, 30, 34, 32, '2024-01-30', '2024-07-30', 6, 'JDM import - special maintenance', 85000, 'https://images.pexels.com/photos/3954426/pexels-photo-3954426.jpeg', 75, 'Standard', 'Gray', now(), now()),

-- DHK Plumbing
((SELECT id FROM customers WHERE email = 'Joe@dhkplumbing.com'), 2007, 'Lamborghini', 'Murcielago', 'ZHWBU47S57LA02518', 'Moorpark', 320000, false, NULL, 'LAMBO7', 'REG345678', 'CA', '2025-12-31', 32, 30, 34, 32, '2024-06-01', '2024-12-01', 6, 'Exotic vehicle maintenance', 35000, 'https://images.pexels.com/photos/3954426/pexels-photo-3954426.jpeg', 90, 'Standard', 'Yellow', now(), now()),
((SELECT id FROM customers WHERE email = 'Joe@dhkplumbing.com'), 2009, 'Rolls Royce', 'Phantom Drophead', 'SCA2D68509UX16359', 'Moorpark', 60000, false, NULL, 'ROLLS9', 'REG456789', 'CA', '2025-12-31', 32, 30, 34, 32, '2024-05-01', '2024-11-01', 6, 'Luxury vehicle maintenance', 45000, 'https://images.pexels.com/photos/3954426/pexels-photo-3954426.jpeg', 85, 'Standard', 'White', now(), now()),

-- David Einstein
((SELECT id FROM customers WHERE email = 'deinstein@skyreachsystems.com'), 2024, 'Ferrari', '296 GTS', 'ZFF01SMA9R0311081', 'Moorpark', 459358, false, NULL, 'FER296', 'REG567890', 'CA', '2025-11-08', 32, 30, 34, 32, NULL, '2025-06-01', 6, 'New Ferrari - special handling', 2500, 'https://images.pexels.com/photos/3954426/pexels-photo-3954426.jpeg', 95, 'Lithium', 'Red', now(), now()),

-- Alfred English
((SELECT id FROM customers WHERE email = 'alfred@sespecreekspirits.com'), 2020, 'Winnebago', 'View', 'W1X8E33Y3LN108451', 'Moorpark', 190000, false, NULL, 'WINNE1', 'REG678901', 'CA', '2024-04-15', 35, 35, 37, 37, '2023-10-01', '2024-04-01', 6, 'RV maintenance', 25000, NULL, 80, 'Standard', 'White', now(), now()),

-- Russ Ercolani
((SELECT id FROM customers WHERE email = 'russ.ercolani@gmail.com'), 2020, 'Malibu', 'Wakesetter MXZ 24', 'MB2L5005K920', 'Moorpark', 150000, false, NULL, 'BOAT20', 'BOAT456', 'CA', '2025-06-11', 30, 30, 30, 30, '2024-09-01', '2025-03-01', 6, 'Boat maintenance', 50, NULL, 95, 'Standard', 'Blue', now(), now()),

-- Donald Friese
((SELECT id FROM customers WHERE email = 'dj.friese@gmail.com'), 2015, 'Audi', 'R8', 'WUAVNAFG8F7000901', 'Moorpark', 100000, false, NULL, 'AUDI15', 'REG789012', 'CA', '2025-11-20', 32, 30, 34, 32, '2024-05-01', '2024-11-01', 6, 'Performance vehicle maintenance', 45000, 'https://images.pexels.com/photos/3954426/pexels-photo-3954426.jpeg', 85, 'Standard', 'Silver', now(), now()),
((SELECT id FROM customers WHERE email = 'dj.friese@gmail.com'), 2017, 'Rolls Royce', 'Dawn', 'SCA666D59HU102684', 'Moorpark', 350000, false, NULL, 'ROLLS7', 'REG890123', 'CA', '2025-11-20', 32, 30, 34, 32, '2024-04-01', '2024-10-01', 6, 'Luxury vehicle maintenance', 25000, 'https://images.pexels.com/photos/3954426/pexels-photo-3954426.jpeg', 90, 'AGM', 'White', now(), now()),

-- Joshua Gamboa
((SELECT id FROM customers WHERE email = 'joshuarobert100@gmail.com'), 2007, 'Mercedes-Benz', 'C-Class', 'WDDDJ72X27A090604', 'Moorpark', 15000, false, NULL, 'MERC07', 'REG901234', 'CA', '2025-06-21', 32, 30, 34, 32, '2024-03-01', '2024-09-01', 6, 'Regular maintenance', 125000, NULL, 60, 'Standard', 'Black', now(), now()),
((SELECT id FROM customers WHERE email = 'joshuarobert100@gmail.com'), 1982, 'Suzuki', 'Touring', 'JS1GI51I6C2102966', 'Moorpark', 400, false, NULL, 'BIKE82', 'BIKE789', 'CA', '2025-06-21', 25, 25, 27, 27, '2024-02-01', '2024-08-01', 6, 'Vintage motorcycle maintenance', 65000, NULL, 80, 'Standard', 'Red', now(), now()),

-- John Garcia
((SELECT id FROM customers WHERE email = 'john@johngarcia.org'), 2003, 'Ferrari', '360', 'ZFFYU51A730132853', 'Moorpark', 150000, false, NULL, 'FER360', 'REG012345', 'CA', '2025-06-10', 32, 30, 34, 32, '2024-02-01', '2024-08-01', 6, 'Ferrari maintenance', 45000, 'https://images.pexels.com/photos/3954440/pexels-photo-3954440.jpeg', 80, 'Standard', 'Red', now(), now()),

-- Jon Garland
((SELECT id FROM customers WHERE email = 'gland20@aol.com'), 1962, 'Lincoln', 'Continental', '2Y82H414205', 'Moorpark', 80000, false, NULL, 'LINC62', 'REG123456', 'CA', '2025-08-28', 28, 26, 30, 28, '2024-06-01', '2024-12-01', 6, 'Classic car maintenance', 95000, NULL, 65, 'Standard', 'Black', now(), now()),
((SELECT id FROM customers WHERE email = 'gland20@aol.com'), 1985, 'Ferrari', '308 GTS', 'ZFFLA13S000059193', 'Moorpark', 100000, false, NULL, 'FER308', 'REG234567', 'CA', '2025-12-31', 32, 30, 34, 32, '2024-06-15', '2024-12-15', 6, 'Classic Ferrari maintenance', 65000, 'https://images.pexels.com/photos/3954440/pexels-photo-3954440.jpeg', 75, 'Standard', 'Red', now(), now()),
((SELECT id FROM customers WHERE email = 'gland20@aol.com'), 2005, 'Porsche', '911 Carrerra S', 'WP0AB29995S740704', 'Moorpark', 40000, false, NULL, 'POR911', 'REG345678', 'CA', '2025-12-31', 32, 30, 34, 32, '2024-07-01', '2025-01-01', 6, 'Porsche maintenance', 85000, 'https://images.pexels.com/photos/3954440/pexels-photo-3954440.jpeg', 80, 'Standard', 'Silver', now(), now()),

-- Greg Geyer
((SELECT id FROM customers WHERE email = 'gregtgeyer@gmail.com'), 2014, 'Porsche', '911 Turbo', 'WP0AD2A9XES167737', 'Moorpark', 120000, false, NULL, 'POR14T', 'REG456789', 'CA', '2025-06-01', 32, 30, 34, 32, '2024-02-01', '2024-08-01', 6, 'Performance vehicle maintenance', 45000, 'https://images.pexels.com/photos/3954440/pexels-photo-3954440.jpeg', 85, 'Standard', 'Black', now(), now()),
((SELECT id FROM customers WHERE email = 'gregtgeyer@gmail.com'), 2025, 'Land Rover', 'Range Rover', 'SALKPBE95SA277675', 'Moorpark', 120000, false, NULL, 'RANGE5', 'REG567890', 'CA', '2025-06-01', 35, 35, 37, 37, '2024-06-01', '2024-12-01', 6, 'Luxury SUV maintenance', 8000, NULL, 90, 'AGM', 'Black', now(), now()),

-- Kenneth Ingoldsby
((SELECT id FROM customers WHERE email = 'kenslaw01@aim.com'), 1989, 'Lamborghini', 'Countach', 'ZA9CA05AXKLA12520', 'Moorpark', 850000, false, NULL, 'LAMBO9', 'REG678901', 'CA', '2026-02-22', 32, 30, 34, 32, '2024-04-01', '2024-10-01', 6, 'Rare classic - special handling', 25000, 'https://images.pexels.com/photos/3954426/pexels-photo-3954426.jpeg', 85, 'Standard', 'Red', now(), now()),

-- Kurt Johnson
((SELECT id FROM customers WHERE email = 'kjohnson@hunterrainier.com'), 2020, 'Malibu', 'Wakesetter 23LSV', 'MB2S5847D515', 'Moorpark', 85000, false, NULL, 'BOAT23', 'BOAT789', 'CA', '2025-12-31', 30, 30, 30, 30, '2024-06-01', '2024-12-01', 6, 'Boat maintenance', 75, NULL, 95, 'Standard', 'Blue', now(), now()),

-- Paul Johnson
((SELECT id FROM customers WHERE email = 'paulj89@hotmail.com'), 2018, 'Dodge', 'Demon', '2C3CDZH95JH101819', 'Moorpark', 125000, false, NULL, 'DEMON8', 'REG789012', 'CA', '2026-05-31', 32, 30, 34, 32, '2024-05-01', '2024-11-01', 6, 'High performance vehicle', 15000, NULL, 90, 'Standard', 'Black', now(), now()),
((SELECT id FROM customers WHERE email = 'paulj89@hotmail.com'), 2018, 'Porsche', 'GT2RS', 'WPOAE2A94JS185349', 'Moorpark', 410000, false, NULL, 'GT2RS8', 'REG890123', 'CA', '2026-05-31', 32, 30, 34, 32, '2024-04-01', '2024-10-01', 6, 'High performance vehicle', 8500, 'https://images.pexels.com/photos/3954440/pexels-photo-3954440.jpeg', 95, 'Standard', 'Silver', now(), now()),

-- Brian Jones
((SELECT id FROM customers WHERE email = 'brianjones81@earthlink.net'), 1932, 'Ford', 'RD', '1841802', 'Moorpark', 69000, false, NULL, 'FORD32', 'REG901234', 'CA', '2024-04-20', 28, 26, 30, 28, '2023-10-01', '2024-04-01', 6, 'Classic car maintenance', 75000, NULL, 70, 'Standard', 'Black', now(), now()),
((SELECT id FROM customers WHERE email = 'brianjones81@earthlink.net'), 1939, 'Ford', 'Deluxe', '185140520', 'Moorpark', 50000, false, NULL, 'FORD39', 'REG012345', 'CA', '2024-04-20', 28, 26, 30, 28, '2023-10-15', '2024-04-15', 6, 'Classic car maintenance', 85000, NULL, 65, 'Standard', 'Blue', now(), now()),
((SELECT id FROM customers WHERE email = 'brianjones81@earthlink.net'), 1941, 'Ford', '11C', '9C5749', 'Moorpark', 60000, false, NULL, 'FORD41', 'REG123456', 'CA', '2024-04-20', 28, 26, 30, 28, '2023-10-30', '2024-04-30', 6, 'Classic car maintenance', 65000, NULL, 60, 'Standard', 'Green', now(), now()),
((SELECT id FROM customers WHERE email = 'brianjones81@earthlink.net'), 2016, 'Dodge', 'Challenger Hellcat', '2C3CDZC9XGH308450', 'Moorpark', 120000, false, NULL, 'HELL16', 'REG234567', 'CA', '2024-10-17', 32, 30, 34, 32, '2024-04-01', '2024-10-01', 6, 'High performance vehicle', 35000, NULL, 85, 'Standard', 'Red', now(), now()),
((SELECT id FROM customers WHERE email = 'brianjones81@earthlink.net'), 1985, 'Honda', '350x ATC', 'JHSTE080XFM008615', 'Moorpark', 8500, false, NULL, 'ATC350', 'ATC123', 'CA', '2024-04-20', 25, 25, 27, 27, '2023-11-01', '2024-05-01', 6, 'ATV maintenance', 15000, NULL, 80, 'Standard', 'Red', now(), now()),

-- Lotus USA
((SELECT id FROM customers WHERE email = 'jane.lonsdale@lotuscars.com'), 2024, 'Lotus', 'Emira GT4', 'T131-GT4-C023', 'Moorpark', 290450, false, NULL, 'LOTUS4', 'REG345678', 'CA', '2025-06-18', 32, 30, 34, 32, NULL, '2025-06-18', 6, 'Race car - special handling', 2500, 'https://images.pexels.com/photos/3954426/pexels-photo-3954426.jpeg', 95, 'Lithium', 'Yellow', now(), now()),

-- Matthew Ludwick
((SELECT id FROM customers WHERE email = 'matt@bighornprecision.com'), 1994, 'Chevrolet', 'C1500', '1GCDC14Z1RZ124083', 'Moorpark', 140000, false, NULL, 'CHEVY4', 'REG456789', 'CA', '2025-06-28', 32, 30, 34, 32, '2024-01-03', '2024-07-03', 6, 'Truck maintenance', 95000, NULL, 75, 'Standard', 'Blue', now(), now()),

-- Kevin Lydick
((SELECT id FROM customers WHERE email = 'kevin@oakridgelandworks.com'), 2017, 'BMW', 'M6', 'WBS6E9C31HG437538', 'Moorpark', 85000, false, NULL, 'BMW17M', 'REG567890', 'CA', '2024-05-04', 32, 30, 34, 32, '2024-03-01', '2024-09-01', 6, 'Performance vehicle maintenance', 45000, 'https://images.pexels.com/photos/3954426/pexels-photo-3954426.jpeg', 80, 'Standard', 'Black', now(), now()),
((SELECT id FROM customers WHERE email = 'kevin@oakridgelandworks.com'), 2022, 'Ford', 'Shelby GT500', '1FA6P8SJ4N5502617', 'Moorpark', 125000, false, NULL, 'SHEL22', 'REG678901', 'CA', '2024-05-04', 32, 30, 34, 32, '2024-03-15', '2024-09-15', 6, 'High performance vehicle', 12000, 'https://images.pexels.com/photos/3954426/pexels-photo-3954426.jpeg', 90, 'Standard', 'Blue', now(), now()),
((SELECT id FROM customers WHERE email = 'kevin@oakridgelandworks.com'), 2024, 'Ford', 'Raptor R', '1FTFW1RJ7RFB29647', 'Moorpark', 60000, false, NULL, 'RAPTR4', 'REG789012', 'CA', '2025-12-31', 35, 35, 37, 37, '2024-05-01', '2024-11-01', 6, 'High performance truck', 5000, NULL, 95, 'Standard', 'Black', now(), now()),
((SELECT id FROM customers WHERE email = 'kevin@oakridgelandworks.com'), 2024, 'Ford', 'F-150 Supersnake', '1FTFW5L58RFB74129', 'Moorpark', 138495, false, NULL, 'SNAKE4', 'REG890123', 'CA', '2025-12-31', 35, 35, 37, 37, '2024-05-15', '2024-11-15', 6, 'High performance truck', 5000, NULL, 95, 'Standard', 'Blue', now(), now()),

-- Vincent Malfa
((SELECT id FROM customers WHERE email = 'vgm@tripledistilled.com'), 1987, 'BMW', '325is', 'WBAAA2304H3112655', 'Moorpark', 15000, false, NULL, 'BMW87I', 'REG901234', 'CA', '2024-09-06', 32, 30, 34, 32, '2023-09-06', '2024-03-06', 6, 'Classic BMW maintenance', 125000, NULL, 60, 'Standard', 'Red', now(), now()),
((SELECT id FROM customers WHERE email = 'vgm@tripledistilled.com'), 1995, 'BMW', 'M3', 'WBSBF9326SEH08263', 'Moorpark', 32000, false, NULL, 'BMW95M', 'REG012345', 'CA', '2024-04-01', 32, 30, 34, 32, '2023-10-06', '2024-04-06', 6, 'Classic BMW maintenance', 65000, NULL, 80, 'Standard', 'Black', now(), now()),

-- Gerald Mansell
((SELECT id FROM customers WHERE email = 'gerrymansell@icloud.com'), 2011, 'Porsche', '997 GTS', 'WP0AB2A9XBS721313', 'Moorpark', 110000, false, NULL, 'POR11G', 'REG123456', 'CA', '2024-12-21', 32, 30, 34, 32, '2024-06-17', '2024-12-17', 6, 'Porsche maintenance', 65000, 'https://images.pexels.com/photos/3954440/pexels-photo-3954440.jpeg', 85, 'Standard', 'Silver', now(), now()),
((SELECT id FROM customers WHERE email = 'gerrymansell@icloud.com'), 2020, 'Porsche', '718 Boxster Spyder', 'WP0CC2A89LS240306', 'Moorpark', 112000, false, NULL, 'POR20B', 'REG234567', 'CA', '2025-12-31', 32, 30, 34, 32, '2024-06-17', '2024-12-17', 6, 'Porsche maintenance', 15000, 'https://images.pexels.com/photos/3954440/pexels-photo-3954440.jpeg', 90, 'Standard', 'Red', now(), now()),

-- Marmonte Cars
((SELECT id FROM customers WHERE email = 'sergio@migramer.com'), 2003, 'Mazda', 'Miata MX-5', 'JM1NB353030300663', 'Moorpark', 45000, false, NULL, 'MIATA3', 'REG345678', 'CA', '2025-05-07', 30, 28, 32, 30, '2024-11-07', '2025-05-07', 6, 'Miata maintenance', 85000, NULL, 75, 'Standard', 'Red', now(), now()),

-- Joseph Matta
((SELECT id FROM customers WHERE email = 'joe@hansonlab.com'), 2018, 'Porsche', '911 Turbo S', 'WP0AD2A96JS156695', 'Moorpark', 190000, false, NULL, 'POR18T', 'REG456789', 'CA', '2024-12-27', 32, 30, 34, 32, '2023-12-27', '2024-06-27', 6, 'Performance vehicle maintenance', 25000, 'https://images.pexels.com/photos/3954440/pexels-photo-3954440.jpeg', 85, 'Standard', 'Black', now(), now()),

-- Greg McNeal
((SELECT id FROM customers WHERE email = 'gregory.mcneal.list@gmail.com'), 1971, 'Ford', 'Bronco', 'U15GLK08711', 'Moorpark', 125000, false, NULL, 'BRON71', 'REG567890', 'CA', '2026-06-02', 32, 30, 34, 32, '2024-06-02', '2024-12-02', 6, 'Classic Bronco maintenance', 75000, NULL, 80, 'Standard', 'Blue', now(), now()),

-- Garrett Pegler
((SELECT id FROM customers WHERE email = 'garret@ghostshieldfilm.com'), 1969, 'Chevrolet', 'Camaro', 'N592786', 'Moorpark', 50000, false, NULL, 'CAM69', 'REG678901', 'CA', '2024-05-13', 30, 28, 32, 30, '2023-11-14', '2024-05-14', 6, 'Classic car maintenance', 95000, NULL, 70, 'Standard', 'Blue', now(), now()),
((SELECT id FROM customers WHERE email = 'garret@ghostshieldfilm.com'), 1979, 'Horizon', 'Pleasure', 'HFB20103M78H', 'Moorpark', 60000, false, NULL, 'BOAT79', 'BOAT456', 'CA', '2024-12-14', 30, 30, 30, 30, '2023-12-14', '2024-06-14', 6, 'Boat maintenance', 500, NULL, 90, 'Standard', 'White', now(), now()),

-- Steve Pena
((SELECT id FROM customers WHERE email = 'steve@penaemail.com'), 1968, 'Cadillac', 'DeVille', 'F8103861', 'Moorpark', 30000, false, NULL, 'CAD68', 'REG789012', 'CA', '2025-08-17', 30, 28, 32, 30, '2024-01-23', '2024-07-23', 6, 'Classic car maintenance', 85000, NULL, 65, 'Standard', 'Black', now(), now()),

-- Tyrone Pham
((SELECT id FROM customers WHERE email = 'ecoliex@yahoo.com'), 2017, 'Subaru', 'BRZ', 'JF1ZCAC19H9605401', 'Moorpark', 32000, false, NULL, 'BRZ17', 'REG890123', 'CA', '2025-06-22', 32, 30, 34, 32, '2023-12-19', '2024-06-19', 6, 'Sports car maintenance', 45000, NULL, 80, 'Standard', 'Blue', now(), now()),

-- Thomas Powers
((SELECT id FROM customers WHERE email = 'tomepowers@gmail.com'), 1992, 'Ford', 'F250', '1FTHX25M2NKA18100', 'Moorpark', 8000, false, NULL, 'FORD92', 'REG901234', 'CA', '2025-06-01', 35, 35, 37, 37, '2024-06-01', '2024-12-01', 6, 'Truck maintenance', 185000, NULL, 70, 'Standard', 'White', now(), now()),

-- Jeremy Renstrom
((SELECT id FROM customers WHERE email = 'jeremyrenstrom@yahoo.com'), 2013, 'Infiniti', 'G37', 'JN1CV6AP7DM725397', 'Moorpark', 7750, false, NULL, 'INF13', 'REG012345', 'CA', '2025-09-29', 32, 30, 34, 32, '2024-03-09', '2024-09-09', 6, 'Regular maintenance', 95000, NULL, 75, 'Standard', 'Black', now(), now()),

-- Josiah Richards
((SELECT id FROM customers WHERE email = 'josiah@illusory.io'), 2018, 'BMW', '530e', 'WBAJA9C5XJB250474', 'Moorpark', 30000, false, NULL, 'BMW18', 'REG123456', 'CA', '2025-03-08', 32, 30, 34, 32, '2024-03-08', '2024-09-08', 6, 'Hybrid vehicle maintenance', 55000, NULL, 80, 'Lithium', 'Black', now(), now()),

-- Joey Shap
((SELECT id FROM customers WHERE email = 'joeyshap@gmail.com'), 1969, 'Chevrolet', 'Camaro SS', '124379N691257', 'Moorpark', 50000, false, NULL, 'CAM69S', 'REG234567', 'CA', '2024-08-25', 30, 28, 32, 30, '2023-12-01', '2024-06-01', 6, 'Classic car maintenance', 95000, NULL, 70, 'Standard', 'Blue', now(), now()),
((SELECT id FROM customers WHERE email = 'joeyshap@gmail.com'), 1973, 'Chevy', 'Corvette', '1Z37T3S415681', 'Moorpark', 30000, false, NULL, 'VETT73', 'REG345678', 'CA', '2025-06-01', 30, 28, 32, 30, '2024-06-01', '2024-12-01', 6, 'Classic car maintenance', 75000, NULL, 70, 'Standard', 'Red', now(), now()),

-- Victoria Shuken
((SELECT id FROM customers WHERE email = 'tori_shuken@vistaauto.com'), 2023, 'Porsche', 'GT3 Touring', 'WPOAC2A97PS270457', 'Moorpark', 300000, false, NULL, 'GT3T23', 'REG456789', 'CA', '2024-03-01', 32, 30, 34, 32, '2023-07-11', '2024-01-11', 6, 'Performance vehicle maintenance', 5000, 'https://images.pexels.com/photos/3954440/pexels-photo-3954440.jpeg', 95, 'Standard', 'Silver', now(), now()),
((SELECT id FROM customers WHERE email = 'tori_shuken@vistaauto.com'), 2022, 'Ford', 'F-150 Raptor', '1FTFW1RG5NFA93648', 'Moorpark', 85000, false, NULL, 'RAPT22', 'REG567890', 'CA', '2024-03-01', 35, 35, 37, 37, '2023-07-15', '2024-01-15', 6, 'Performance truck maintenance', 15000, NULL, 90, 'Standard', 'Black', now(), now()),

-- Tarnpreet Singh
((SELECT id FROM customers WHERE email = 'asingh2033@gmail.com'), 2008, 'BMW', 'M3', 'WBSWD93558PY39566', 'Moorpark', 45000, false, NULL, 'BMW08M', 'REG678901', 'CA', '2025-04-29', 32, 30, 34, 32, '2024-10-11', '2025-04-11', 6, 'Performance vehicle maintenance', 85000, NULL, 75, 'Standard', 'Blue', now(), now()),
((SELECT id FROM customers WHERE email = 'asingh2033@gmail.com'), 2015, 'BMW', 'M5', 'WBSFV9C52FD594804', 'Moorpark', 45000, false, NULL, 'BMW15M', 'REG789012', 'CA', '2025-06-23', 32, 30, 34, 32, '2024-10-11', '2025-04-11', 6, 'Performance vehicle maintenance', 65000, NULL, 80, 'Standard', 'Black', now(), now()),
((SELECT id FROM customers WHERE email = 'asingh2033@gmail.com'), 2025, 'BMW', 'M3', 'WBS13HJ07SFU77025', 'Moorpark', 125000, false, NULL, 'BMW25M', 'REG890123', 'CA', '2026-04-11', 32, 30, 34, 32, NULL, '2025-10-11', 6, 'New performance vehicle', 2500, NULL, 95, 'Lithium', 'Blue', now(), now()),

-- Nico Solomon
((SELECT id FROM customers WHERE email = 'solonico@sbcglobal.net'), 1963, 'Cadillac', 'Coupe DeVille', '63J030283', 'Moorpark', 140000, false, NULL, 'CAD63', 'REG901234', 'CA', '2024-02-13', 30, 28, 32, 30, '2023-08-21', '2024-02-21', 6, 'Classic car maintenance', 65000, NULL, 70, 'Standard', 'White', now(), now()),

-- Star Management
((SELECT id FROM customers WHERE email = 'kenneth.allen75@gmail.com'), 1963, 'Jaguar', 'E-Type Series 1', '878960', 'Moorpark', 120585, false, NULL, 'JAG63', 'REG012345', 'CA', '2026-01-31', 30, 28, 32, 30, '2024-08-01', '2025-02-01', 6, 'Classic car maintenance', 45000, NULL, 75, 'Standard', 'Green', now(), now()),
((SELECT id FROM customers WHERE email = 'kenneth.allen75@gmail.com'), 1964, 'Chevrolet', 'Corvette Convertible', '408675119205', 'Moorpark', 52690, false, NULL, 'VETT64', 'REG123456', 'CA', '2026-01-31', 30, 28, 32, 30, '2024-08-01', '2025-02-01', 6, 'Classic car maintenance', 55000, NULL, 70, 'Standard', 'Red', now(), now()),

-- Donovan Tatum
((SELECT id FROM customers WHERE email = 'donovan.tatum@caa.com'), 1977, 'Ford', 'Bronco', 'U15GLY05378', 'Moorpark', 65000, false, NULL, 'BRON77', 'REG234567', 'CA', '2024-04-05', 32, 30, 34, 32, '2024-11-01', '2025-05-01', 6, 'Classic Bronco maintenance', 85000, NULL, 75, 'Standard', 'Blue', now(), now()),

-- Thaxton & Associates
((SELECT id FROM customers WHERE email = 'mike@thaxtonassociates.com'), 2023, 'Ford', 'F150 Shelby', '1FTFW1E55PKE74267', 'Moorpark', 158000, false, NULL, 'SHEL23', 'REG345678', 'CA', '2025-05-21', 35, 35, 37, 37, '2024-05-21', '2024-11-21', 6, 'Performance truck maintenance', 8500, NULL, 90, 'Standard', 'Blue', now(), now()),

-- The Chosen Group
((SELECT id FROM customers WHERE email = 'kacy@100group.com'), 2019, 'Mercedes', 'Sprinter', 'WDAPF1CD6KP072139', 'Moorpark', 150000, false, NULL, 'SPRNT9', 'REG456789', 'CA', '2023-11-15', 35, 35, 37, 37, '2024-06-01', '2024-12-01', 6, 'Commercial vehicle maintenance', 45000, NULL, 85, 'Standard', 'White', now(), now()),

-- Deke Williams
((SELECT id FROM customers WHERE email = 'deke@wilmanco.com'), 1967, 'Ford', 'Mustang Shelby GT 500', 'Z67400F2A02902', 'Moorpark', 350000, false, NULL, 'SHEL67', 'REG567890', 'CA', '2024-08-21', 30, 28, 32, 30, '2024-01-26', '2024-07-26', 6, 'Classic Shelby maintenance', 45000, NULL, 80, 'Standard', 'Blue', now(), now());

-- Insert authorized drivers
INSERT INTO authorized_drivers (
  vehicle_id,
  name,
  phone,
  email,
  license_number,
  relationship,
  created_at
) VALUES
-- Jason Adang vehicles
((SELECT id FROM vehicles WHERE vin = '9112101858'), 
 'Jason Adang', 
 '(805) 795-6808', 
 'jason@adangenterprises.com', 
 'A1234567', 
 'Owner',
 now()),

((SELECT id FROM vehicles WHERE vin = 'JTHHX8BH2C1000028'), 
 'Jason Adang', 
 '(805) 795-6808', 
 'jason@adangenterprises.com', 
 'A1234567', 
 'Owner',
 now()),

-- All Valley Washer Service
((SELECT id FROM vehicles WHERE vin = '1C4RJXSJ3RW223940'), 
 'Jim Feinstein', 
 '(818) 464-5264', 
 'jim@allvalleywasher.com', 
 'F7654321', 
 'Owner',
 now()),

-- Chris Antonsen
((SELECT id FROM vehicles WHERE vin = 'MBCPHBVG122'), 
 'Chris Antonsen', 
 '(818) 381-7105', 
 'antonsenchris3@gmail.com', 
 'C2345678', 
 'Owner',
 now()),

-- Barrett Whips
((SELECT id FROM vehicles WHERE vin = 'WDBFA68F31F200029'), 
 'Lindsay Barrett', 
 '(805) 559-1028', 
 'lindsay@barrettassociatesllc.com', 
 'B8765432', 
 'Owner',
 now()),

((SELECT id FROM vehicles WHERE vin = 'WDBFA68F31F200029'), 
 'Kevin Barrett', 
 '(805) 559-1029', 
 'kevin@barrettbuilding.com', 
 'B8765433', 
 'Owner',
 now()),

-- Dylan Boztepe
((SELECT id FROM vehicles WHERE vin = 'WDDGF77X29f233516'), 
 'Dylan Boztepe', 
 '(310) 488-9198', 
 'dylanboztepe1@gmail.com', 
 'B9876543', 
 'Owner',
 now()),

-- Jeffrey Brodsly
((SELECT id FROM vehicles WHERE vin = 'SCA664S56DUX51683'), 
 'Jeffrey Brodsly', 
 '(805) 807-0195', 
 'jeff@100group.com', 
 'B1234567', 
 'Owner',
 now()),

-- Add more authorized drivers for other vehicles
-- DHK Plumbing
((SELECT id FROM vehicles WHERE vin = 'ZHWBU47S57LA02518'), 
 'Joe Dinka', 
 '(562) 762-6176', 
 'Joe@dhkplumbing.com', 
 'D7654321', 
 'Owner',
 now()),

((SELECT id FROM vehicles WHERE vin = 'SCA2D68509UX16359'), 
 'Joe Dinka', 
 '(562) 762-6176', 
 'Joe@dhkplumbing.com', 
 'D7654321', 
 'Owner',
 now()),

-- Assaf Cohen
((SELECT id FROM vehicles WHERE vin = 'BCNR33001214'), 
 'Assaf Cohen', 
 '(818) 825-3764', 
 'lp2mnp@gmail.com', 
 'C8765432', 
 'Owner',
 now()),

((SELECT id FROM vehicles WHERE vin = 'BNR34005053'), 
 'Assaf Cohen', 
 '(818) 825-3764', 
 'lp2mnp@gmail.com', 
 'C8765432', 
 'Owner',
 now()),

((SELECT id FROM vehicles WHERE vin = 'BNR32012884'), 
 'Sandy Cohen', 
 '(818) 825-3765', 
 'sandy.cohen@example.com', 
 'C8765433', 
 'Family',
 now());

-- Insert authorized contacts
INSERT INTO authorized_contacts (
  vehicle_id,
  name,
  phone,
  email,
  relationship,
  can_dropoff,
  can_pickup,
  created_at
) VALUES
-- Jason Adang vehicles
((SELECT id FROM vehicles WHERE vin = '9112101858'), 
 'Jason Adang Assistant', 
 '(805) 795-6809', 
 'assistant@adangenterprises.com', 
 'Assistant',
 true,
 true,
 now()),

-- DHK Plumbing
((SELECT id FROM vehicles WHERE vin = 'ZHWBU47S57LA02518'), 
 'DHK Service Manager', 
 '(562) 762-6177', 
 'service@dhkplumbing.com', 
 'Employee',
 true,
 true,
 now()),

-- Assaf Cohen
((SELECT id FROM vehicles WHERE vin = 'BCNR33001214'), 
 'Boost Collection Manager', 
 '(818) 825-3766', 
 'manager@boostcollection.com', 
 'Employee',
 true,
 true,
 now()),

-- Brian Jones
((SELECT id FROM vehicles WHERE vin = '1841802'), 
 'Classic Car Specialist', 
 '(805) 241-1736', 
 'specialist@classiccarservice.com', 
 'Service',
 true,
 false,
 now());

-- Insert check-in/out records
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

-- DHK Plumbing vehicles - IN_SERVICE
((SELECT id FROM vehicles WHERE vin = 'ZHWBU47S57LA02518'), 
 (SELECT id FROM customers WHERE email = 'Joe@dhkplumbing.com'),
 '2024-12-05', 'CHECK_IN', 'Moorpark', 'Joe Dinka', 'IN_SERVICE', 
 '2024-12-05T09:00:00Z', NULL, 90, 35000, 32, 30, 32, 30, true, false,
 'Press start button with foot on brake', 
 'Lamborghini Murcielago. Currently undergoing scheduled maintenance.',
 now(), now());

-- Insert service items
INSERT INTO service_items (
  check_in_out_id,
  description,
  cost,
  completed,
  completed_at,
  created_at,
  updated_at
) VALUES
-- DHK Plumbing Lamborghini (in service)
((SELECT id FROM check_in_outs WHERE vehicle_id = (SELECT id FROM vehicles WHERE vin = 'ZHWBU47S57LA02518')), 
 'Oil Change - Synthetic', 
 299.99, 
 true, 
 now() - interval '2 days', 
 now() - interval '5 days', 
 now() - interval '2 days'),

((SELECT id FROM check_in_outs WHERE vehicle_id = (SELECT id FROM vehicles WHERE vin = 'ZHWBU47S57LA02518')), 
 'Brake Pad Replacement - Front', 
 1299.99, 
 true, 
 now() - interval '1 day', 
 now() - interval '5 days', 
 now() - interval '1 day'),

((SELECT id FROM check_in_outs WHERE vehicle_id = (SELECT id FROM vehicles WHERE vin = 'ZHWBU47S57LA02518')), 
 'Wheel Alignment', 
 249.99, 
 false, 
 NULL, 
 now() - interval '5 days', 
 now() - interval '5 days'),

((SELECT id FROM check_in_outs WHERE vehicle_id = (SELECT id FROM vehicles WHERE vin = 'ZHWBU47S57LA02518')), 
 'Air Filter Replacement', 
 129.99, 
 false, 
 NULL, 
 now() - interval '5 days', 
 now() - interval '5 days'),

-- Jason Adang Lexus LFA (premium vehicle)
((SELECT id FROM check_in_outs WHERE vehicle_id = (SELECT id FROM vehicles WHERE vin = 'JTHHX8BH2C1000028')), 
 'Detailed Inspection', 
 199.99, 
 true, 
 now() - interval '30 days', 
 now() - interval '35 days', 
 now() - interval '30 days'),

((SELECT id FROM check_in_outs WHERE vehicle_id = (SELECT id FROM vehicles WHERE vin = 'JTHHX8BH2C1000028')), 
 'Battery Maintenance', 
 149.99, 
 true, 
 now() - interval '30 days', 
 now() - interval '35 days', 
 now() - interval '30 days');

-- Insert vehicle photos
INSERT INTO vehicle_photos (
  check_in_out_id,
  photo_type,
  photo_url,
  created_at
) VALUES
-- Jason Adang Porsche 911
((SELECT id FROM check_in_outs WHERE vehicle_id = (SELECT id FROM vehicles WHERE vin = '9112101858')), 
 'front', 
 'https://images.pexels.com/photos/3954440/pexels-photo-3954440.jpeg',
 now()),

((SELECT id FROM check_in_outs WHERE vehicle_id = (SELECT id FROM vehicles WHERE vin = '9112101858')), 
 'rear', 
 'https://images.pexels.com/photos/3954451/pexels-photo-3954451.jpeg',
 now()),

((SELECT id FROM check_in_outs WHERE vehicle_id = (SELECT id FROM vehicles WHERE vin = '9112101858')), 
 'driver_side', 
 'https://images.pexels.com/photos/3954426/pexels-photo-3954426.jpeg',
 now()),

-- Jason Adang Lexus LFA
((SELECT id FROM check_in_outs WHERE vehicle_id = (SELECT id FROM vehicles WHERE vin = 'JTHHX8BH2C1000028')), 
 'front', 
 'https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg',
 now()),

((SELECT id FROM check_in_outs WHERE vehicle_id = (SELECT id FROM vehicles WHERE vin = 'JTHHX8BH2C1000028')), 
 'rear', 
 'https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg',
 now()),

((SELECT id FROM check_in_outs WHERE vehicle_id = (SELECT id FROM vehicles WHERE vin = 'JTHHX8BH2C1000028')), 
 'interior', 
 'https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg',
 now()),

-- DHK Plumbing Lamborghini (in service)
((SELECT id FROM check_in_outs WHERE vehicle_id = (SELECT id FROM vehicles WHERE vin = 'ZHWBU47S57LA02518')), 
 'front', 
 'https://images.pexels.com/photos/3954426/pexels-photo-3954426.jpeg',
 now()),

((SELECT id FROM check_in_outs WHERE vehicle_id = (SELECT id FROM vehicles WHERE vin = 'ZHWBU47S57LA02518')), 
 'rear', 
 'https://images.pexels.com/photos/3954426/pexels-photo-3954426.jpeg',
 now()),

((SELECT id FROM check_in_outs WHERE vehicle_id = (SELECT id FROM vehicles WHERE vin = 'ZHWBU47S57LA02518')), 
 'engine', 
 'https://images.pexels.com/photos/3954426/pexels-photo-3954426.jpeg',
 now());

-- Insert users
INSERT INTO users (
  first_name,
  last_name,
  email,
  password,
  role,
  phone,
  department,
  is_active,
  created_at,
  updated_at
) VALUES
-- Admin users
('Admin', 'User', 'admin@autoservice.com', 'admin123', 'Admin', '(555) 123-4567', 'Management', true, now(), now()),
('John', 'Manager', 'john.manager@autoservice.com', 'manager123', 'Manager', '(555) 234-5678', 'Operations', true, now(), now()),
('Sarah', 'Staff', 'sarah.staff@autoservice.com', 'staff123', 'Staff', '(555) 345-6789', 'Service', true, now(), now()),

-- Barrett Automotive staff
('Kevin', 'Barrett', 'kevin@barrettbuilding.com', 'admin123', 'Admin', '(805) 559-1028', 'Management', true, now(), now()),
('Jake', 'Biehl', 'jb@dvi360.com', 'admin123', 'Admin', '(805) 555-1234', 'IT', true, now(), now()),
('Aaron', 'Boerger', 'ab@dvi360.com', 'admin123', 'Admin', '(805) 555-2345', 'IT', true, now(), now()),
('Jeremy', 'Renstrom', 'jeremyr@barrettbuilding.com', 'admin123', 'Admin', '(310) 422-5742', 'Operations', true, now(), now()),
('Lindsay', 'Swink', 'lindsay@barrettbuilding.com', 'admin123', 'Admin', '(805) 559-1028', 'Administration', true, now(), now()),
('Dev', 'Test', 'dev2@dvi360.com', 'admin123', 'Admin', '(805) 555-3456', 'Development', true, now(), now()),

-- Staff users
('Dylan', 'Boztepe', 'dylanboztepe@barrettautomotivegroup.com', 'staff123', 'Staff', '(310) 488-9198', 'Service', true, now(), now()),
('Joshua', 'Gamboa', 'joshuagamboa@barrettautomotivegroup.com', 'staff123', 'Staff', '(818) 983-6207', 'Service', true, now(), now()),
('Jared', 'Oropeza', 'jaredoropeza@barrettautomotivegroup.com', 'staff123', 'Staff', '(805) 279-2975', 'Service', true, now(), now()),
('Thomas', 'Powers', 'thomasp@barrettbuilding.com', 'staff123', 'Staff', '(805) 915-8120', 'Maintenance', true, now(), now());