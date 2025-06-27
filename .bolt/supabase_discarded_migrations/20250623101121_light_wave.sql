/*
  # Populate vehicles table with current data

  1. Data Population
    - Insert all vehicles from the Moorpark Vehicle List CSV
    - Map vehicle data to database schema
    - Set all storage locations to "Moorpark"
    - Handle different vehicle types and statuses

  2. Data Mapping
    - Parse vehicle information from CSV format
    - Set appropriate default values for missing fields
    - Map claimed values to fair_market_value
    - Set battery types and other vehicle specifications
*/

-- Clear existing vehicle data first
TRUNCATE TABLE vehicles CASCADE;

-- Insert vehicle data from CSV
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
  fuel_level,
  battery_type,
  color,
  created_at,
  updated_at
) VALUES
-- Jason Adang vehicles
((SELECT id FROM customers WHERE email = 'jason@adangenterprises.com'), 1972, 'Porsche', '911', '9112101858', 'Moorpark', 100000.00, false, null, 'PORS72', 'REG9112101858', 'CA', '2025-09-07', 32, 30, 34, 32, null, null, 6, null, 85000, 75, 'Standard', 'Silver', now(), now()),
((SELECT id FROM customers WHERE email = 'jason@adangenterprises.com'), 2012, 'Lexus', 'LFA', 'JTHHX8BH2C1000028', 'Moorpark', 875000.00, true, 100.00, 'LFA12', 'REGJTHHX8BH2C1000028', 'CA', '2025-09-07', 32, 30, 34, 32, null, null, 6, null, 15000, 85, 'Lithium', 'White', now(), now()),

-- All Valley Washer Service vehicles
((SELECT id FROM customers WHERE email = 'jim@allvalleywasher.com'), 2024, 'Jeep', 'Rubicon', '1C4RJXSJ3RW223940', 'Moorpark', 98000.00, false, null, 'JEEP24', 'REG1C4RJXSJ3RW223940', 'CA', '2025-12-30', 35, 35, 38, 38, null, null, 6, null, 5000, 90, 'Standard', 'Black', now(), now()),

-- Chris Antonsen vehicles
((SELECT id FROM customers WHERE email = 'antonsenchris3@gmail.com'), 2022, 'Mastercraft', 'X24', 'MBCPHBVG122', 'Moorpark', 267000.00, false, null, 'MAST22', 'REGMBCPHBVG122', 'CA', '2026-05-03', 30, 30, 32, 32, null, null, 12, 'Boat maintenance schedule', 100, 95, 'Standard', 'Blue', now(), now()),

-- Barrett Whips vehicles
((SELECT id FROM customers WHERE email = 'lindsay@barrettassociatesllc.com'), 2001, 'Mercedes', 'SL500', 'WDBFA68F31F200029', 'Moorpark', 12000.00, false, null, 'MERC01', 'REGWDBFA68F31F200029', 'CA', '2025-09-30', 32, 30, 34, 32, null, null, 6, null, 125000, 60, 'Standard', 'Silver', now(), now()),

-- Dylan Boztepe vehicles
((SELECT id FROM customers WHERE email = 'dylanboztepe1@gmail.com'), 2009, 'Mercedes-AMG', 'C63', 'WDDGF77X29f233516', 'Moorpark', 22000.00, false, null, 'AMG09', 'REGWDDGF77X29f233516', 'CA', '2025-06-26', 32, 30, 34, 32, null, null, 6, null, 95000, 45, 'Standard', 'Black', now(), now()),

-- Jeffrey Brodsly vehicles
((SELECT id FROM customers WHERE email = 'jeff@100group.com'), 2013, 'Rolls Royce', 'Ghost', 'SCA664S56DUX51683', 'Moorpark', 90000.00, false, null, 'ROLL13', 'REGSCA664S56DUX51683', 'CA', '2026-06-01', 32, 30, 34, 32, null, null, 6, null, 65000, 80, 'AGM', 'White', now(), now()),

-- C&H Construction vehicles
((SELECT id FROM customers WHERE email = 'jeff@candhconstruction.net'), 2010, 'Harley Davidson', 'FLTRX', '1HD1KH438AB606132', 'Moorpark', 16000.00, false, null, 'HARL10', 'REG1HD1KH438AB606132', 'CA', '2026-05-01', 30, 28, 32, 30, null, null, 12, 'Motorcycle maintenance', 45000, 85, 'Standard', 'Black', now(), now()),

-- Daniel Casson vehicles
((SELECT id FROM customers WHERE email = 'dano4643@gmail.com'), 2017, 'Ferrari', 'California', 'ZFF77XJAXH0227476', 'Moorpark', 150000.00, false, null, 'FERR17', 'REGZFF77XJAXH0227476', 'CA', '2026-06-18', 32, 30, 34, 32, null, null, 6, null, 25000, 75, 'Lithium', 'Red', now(), now()),

-- Richard Cobey vehicles
((SELECT id FROM customers WHERE email = 'musicrc@gmail.com'), 2014, 'Bentley', 'Continental Flying Spur', 'SCBEC9ZA5EC095631', 'Moorpark', 100000.00, false, null, 'BENT14', 'REGSCBEC9ZA5EC095631', 'CA', '2023-12-06', 32, 30, 34, 32, null, null, 6, null, 55000, 70, 'AGM', 'Black', now(), now()),

-- Assaf Cohen vehicles
((SELECT id FROM customers WHERE email = 'lp2mnp@gmail.com'), 1995, 'Nissan', 'Skyline R33 GTR', 'BCNR33001214', 'Moorpark', 120000.00, false, null, 'GTR95', 'REGBCNR33001214', 'CA', '2026-02-12', 32, 30, 34, 32, null, null, 6, null, 75000, 80, 'Standard', 'Silver', now(), now()),
((SELECT id FROM customers WHERE email = 'lp2mnp@gmail.com'), 1999, 'Nissan', 'Skyline R34 GTR', 'BNR34005053', 'Moorpark', 200000.00, false, null, 'GTR99', 'REGBNR34005053', 'CA', '2025-07-24', 32, 30, 34, 32, null, null, 6, null, 65000, 85, 'Standard', 'Blue', now(), now()),
((SELECT id FROM customers WHERE email = 'lp2mnp@gmail.com'), 1990, 'Nissan', 'Skyline R32 GTR', 'BNR32012884', 'Moorpark', 100000.00, false, null, 'GTR90', 'REGBNR32012884', 'CA', '2026-02-12', 32, 30, 34, 32, null, null, 6, null, 85000, 75, 'Standard', 'White', now(), now()),

-- DHK Plumbing vehicles
((SELECT id FROM customers WHERE email = 'Joe@dhkplumbing.com'), 2007, 'Lamborghini', 'Murcielago', 'ZHWBU47S57LA02518', 'Moorpark', 320000.00, false, null, 'LAMB07', 'REGZHWBU47S57LA02518', 'CA', '2025-12-05', 32, 30, 34, 32, null, null, 6, null, 35000, 90, 'Lithium', 'Yellow', now(), now()),
((SELECT id FROM customers WHERE email = 'Joe@dhkplumbing.com'), 2009, 'Rolls Royce', 'Phantom Drophead', 'SCA2D68509UX16359', 'Moorpark', 60000.00, false, null, 'PHAN09', 'REGSCA2D68509UX16359', 'CA', '2025-12-05', 32, 30, 34, 32, null, null, 6, null, 45000, 85, 'AGM', 'Black', now(), now()),

-- David Einstein vehicles
((SELECT id FROM customers WHERE email = 'deinstein@skyreachsystems.com'), 2024, 'Ferrari', '296 GTS', 'ZFF01SMA9R0311081', 'Moorpark', 459358.00, false, null, 'F296', 'REGZFF01SMA9R0311081', 'CA', '2025-11-08', 32, 30, 34, 32, null, null, 6, null, 2500, 95, 'Lithium', 'Red', now(), now()),

-- Alfred English vehicles
((SELECT id FROM customers WHERE email = 'alfred@sespecreekspirits.com'), 2020, 'Winnebago', 'View', 'W1X8E33Y3LN108451', 'Moorpark', 190000.00, false, null, 'WINN20', 'REGW1X8E33Y3LN108451', 'CA', '2024-04-15', 35, 35, 38, 38, null, null, 12, 'RV maintenance schedule', 25000, 80, 'Standard', 'White', now(), now()),

-- Russ Ercolani vehicles
((SELECT id FROM customers WHERE email = 'russ.ercolani@gmail.com'), 2024, 'Malibu', 'Wakesetter MXZ 24', 'MB2L5005K920', 'Moorpark', 150000.00, false, null, 'MALI24', 'REGMB2L5005K920', 'CA', '2025-06-11', 30, 30, 32, 32, null, null, 12, 'Boat maintenance', 50, 95, 'Standard', 'Blue', now(), now()),

-- Joshua Gamboa vehicles
((SELECT id FROM customers WHERE email = 'joshuarobert100@gmail.com'), 2007, 'Mercedes-Benz', 'E-Class', 'WDDDJ72X27A090604', 'Moorpark', 25000.00, false, null, 'MERC07', 'REGWDDDJ72X27A090604', 'CA', '2025-12-31', 32, 30, 34, 32, null, null, 6, null, 125000, 60, 'Standard', 'Silver', now(), now()),
((SELECT id FROM customers WHERE email = 'joshuarobert100@gmail.com'), 1982, 'Suzuki', 'Touring', 'JS1GI51I6C2102966', 'Moorpark', 8000.00, false, null, 'SUZU82', 'REGJS1GI51I6C2102966', 'CA', '2025-12-31', 30, 28, 32, 30, null, null, 12, 'Motorcycle maintenance', 65000, 70, 'Standard', 'Red', now(), now()),

-- John Garcia vehicles
((SELECT id FROM customers WHERE email = 'john@johngarcia.org'), 2003, 'Ferrari', '360', 'ZFFYU51A730132853', 'Moorpark', 150000.00, false, null, 'F360', 'REGZFFYU51A730132853', 'CA', '2025-06-10', 32, 30, 34, 32, null, null, 6, null, 45000, 80, 'Standard', 'Red', now(), now()),

-- Jon Garland vehicles
((SELECT id FROM customers WHERE email = 'gland20@aol.com'), 1962, 'Lincoln', 'Continental', '2Y82H414205', 'Moorpark', 80000.00, false, null, 'LINC62', 'REG2Y82H414205', 'CA', '2025-08-28', 30, 28, 32, 30, null, null, 12, 'Classic car maintenance', 95000, 65, 'Standard', 'Black', now(), now()),
((SELECT id FROM customers WHERE email = 'gland20@aol.com'), 1985, 'Ferrari', '308 GTS', 'ZFFLA13S000059193', 'Moorpark', 100000.00, false, null, 'F308', 'REGZFFLA13S000059193', 'CA', '2025-12-01', 32, 30, 34, 32, null, null, 6, null, 65000, 75, 'Standard', 'Red', now(), now()),
((SELECT id FROM customers WHERE email = 'gland20@aol.com'), 2005, 'Porsche', '911 Carrera S', 'WP0AB29995S740704', 'Moorpark', 40000.00, false, null, 'P911', 'REGWP0AB29995S740704', 'CA', '2025-12-01', 32, 30, 34, 32, null, null, 6, null, 85000, 80, 'Standard', 'Silver', now(), now()),

-- Greg Geyer vehicles
((SELECT id FROM customers WHERE email = 'gregtgeyer@gmail.com'), 2014, 'Porsche', '911 Turbo', 'WP0AD2A9XES167737', 'Moorpark', 120000.00, false, null, 'P911T', 'REGWP0AD2A9XES167737', 'CA', '2025-06-01', 32, 30, 34, 32, null, null, 6, null, 45000, 85, 'Standard', 'Black', now(), now()),
((SELECT id FROM customers WHERE email = 'gregtgeyer@gmail.com'), 2025, 'Land Rover', 'Range Rover', 'SALKPBE95SA277675', 'Moorpark', 120000.00, false, null, 'RANG25', 'REGSALKPBE95SA277675', 'CA', '2025-06-01', 35, 35, 38, 38, null, null, 6, null, 8000, 90, 'Standard', 'White', now(), now()),

-- Kenneth Ingoldsby vehicles
((SELECT id FROM customers WHERE email = 'kenslaw01@aim.com'), 1989, 'Lamborghini', 'Countach', 'ZA9CA05AXKLA12520', 'Moorpark', 850000.00, false, null, 'COUNT', 'REGZA9CA05AXKLA12520', 'CA', '2026-02-22', 32, 30, 34, 32, null, null, 12, 'Classic supercar maintenance', 25000, 85, 'Standard', 'Red', now(), now()),

-- Kurt Johnson vehicles
((SELECT id FROM customers WHERE email = 'kjohnson@hunterrainier.com'), 2023, 'Malibu', 'Wakesetter 23LSV', 'MB2S5847D515', 'Moorpark', 85000.00, false, null, 'WAKE23', 'REGMB2S5847D515', 'CA', '2026-01-01', 30, 30, 32, 32, null, null, 12, 'Boat maintenance', 75, 95, 'Standard', 'Blue', now(), now()),

-- Paul Johnson vehicles
((SELECT id FROM customers WHERE email = 'paulj89@hotmail.com'), 2018, 'Dodge', 'Demon', '2C3CDZH95JH101819', 'Moorpark', 125000.00, false, null, 'DEMO18', 'REG2C3CDZH95JH101819', 'CA', '2026-05-31', 32, 30, 34, 32, null, null, 6, null, 15000, 90, 'Standard', 'Black', now(), now()),
((SELECT id FROM customers WHERE email = 'paulj89@hotmail.com'), 2018, 'Porsche', 'GT2RS', 'WPOAE2A94JS185349', 'Moorpark', 410000.00, false, null, 'GT2RS', 'REGWPOAE2A94JS185349', 'CA', '2026-05-31', 32, 30, 34, 32, null, null, 6, null, 8500, 95, 'Lithium', 'White', now(), now()),

-- Brian Jones vehicles (multiple classic cars)
((SELECT id FROM customers WHERE email = 'brianjones81@earthlink.net'), 1932, 'Ford', 'RD', '1841802', 'Moorpark', 69000.00, false, null, 'FORD32', 'REG1841802', 'CA', '2024-04-20', 28, 26, 30, 28, null, null, 12, 'Classic car maintenance', 75000, 70, 'Standard', 'Black', now(), now()),
((SELECT id FROM customers WHERE email = 'brianjones81@earthlink.net'), 1939, 'Ford', 'Deluxe', '185140520', 'Moorpark', 50000.00, false, null, 'FORD39', 'REG185140520', 'CA', '2024-04-20', 28, 26, 30, 28, null, null, 12, 'Classic car maintenance', 85000, 65, 'Standard', 'Blue', now(), now()),
((SELECT id FROM customers WHERE email = 'brianjones81@earthlink.net'), 1941, 'Ford', '11C', '9C5749', 'Moorpark', 60000.00, false, null, 'FORD41', 'REG9C5749', 'CA', '2024-04-20', 28, 26, 30, 28, null, null, 12, 'Classic car maintenance', 65000, 60, 'Standard', 'Green', now(), now()),
((SELECT id FROM customers WHERE email = 'brianjones81@earthlink.net'), 2016, 'Dodge', 'Challenger Hellcat', '2C3CDZC9XGH308450', 'Moorpark', 120000.00, false, null, 'HELL16', 'REG2C3CDZC9XGH308450', 'CA', '2024-10-17', 32, 30, 34, 32, null, null, 6, null, 35000, 85, 'Standard', 'Orange', now(), now()),
((SELECT id FROM customers WHERE email = 'brianjones81@earthlink.net'), 1985, 'Honda', '350x ATC', 'JHSTE080XFM008615', 'Moorpark', 8500.00, false, null, 'ATC85', 'REGJHSTE080XFM008615', 'CA', '2024-04-20', 25, 25, 28, 28, null, null, 12, 'ATV maintenance', 15000, 80, 'Standard', 'Red', now(), now()),

-- Lotus USA vehicles
((SELECT id FROM customers WHERE email = 'jane.lonsdale@lotuscars.com'), 2024, 'Lotus', 'Emira GT4', 'T131-GT4-C023', 'Moorpark', 290450.00, false, null, 'LOTU24', 'REGT131-GT4-C023', 'CA', '2026-06-18', 32, 30, 34, 32, null, null, 6, null, 1500, 95, 'Lithium', 'Yellow', now(), now()),

-- Matthew Ludwick vehicles
((SELECT id FROM customers WHERE email = 'matt@bighornprecision.com'), 1994, 'Chevrolet', 'C1500', '1GCDC14Z1RZ124083', 'Moorpark', 140000.00, false, null, 'CHEV94', 'REG1GCDC14Z1RZ124083', 'CA', '2025-06-28', 32, 30, 34, 32, null, null, 6, null, 95000, 75, 'Standard', 'Red', now(), now()),

-- Kevin Lydick vehicles
((SELECT id FROM customers WHERE email = 'kevin@oakridgelandworks.com'), 2017, 'BMW', 'M6', 'WBS6E9C31HG437538', 'Moorpark', 85000.00, false, null, 'BMW17', 'REGWBS6E9C31HG437538', 'CA', '2024-05-04', 32, 30, 34, 32, null, null, 6, null, 45000, 80, 'AGM', 'Black', now(), now()),
((SELECT id FROM customers WHERE email = 'kevin@oakridgelandworks.com'), 2022, 'Ford', 'Shelby GT500', '1FA6P8SJ4N5502617', 'Moorpark', 125000.00, false, null, 'GT500', 'REG1FA6P8SJ4N5502617', 'CA', '2024-05-04', 32, 30, 34, 32, null, null, 6, null, 12000, 90, 'Standard', 'White', now(), now()),
((SELECT id FROM customers WHERE email = 'kevin@oakridgelandworks.com'), 2024, 'Ford', 'Raptor R', '1FTFW1RJ7RFB29647', 'Moorpark', 60000.00, false, null, 'RAPT24', 'REG1FTFW1RJ7RFB29647', 'CA', '2025-09-01', 35, 35, 38, 38, null, null, 6, null, 5000, 95, 'Standard', 'Blue', now(), now()),

-- Vincent Malfa vehicles
((SELECT id FROM customers WHERE email = 'vgm@tripledistilled.com'), 1995, 'BMW', 'M3', 'WBSBF9326SEH08263', 'Moorpark', 32000.00, false, null, 'BMW95', 'REGWBSBF9326SEH08263', 'CA', '2024-04-01', 32, 30, 34, 32, null, null, 6, null, 125000, 70, 'Standard', 'Red', now(), now()),

-- Gerald Mansell vehicles
((SELECT id FROM customers WHERE email = 'gerrymansell@icloud.com'), 2011, 'Porsche', '997 GTS', 'WP0AB2A9XBS721313', 'Moorpark', 110000.00, false, null, 'P997', 'REGWP0AB2A9XBS721313', 'CA', '2024-12-21', 32, 30, 34, 32, null, null, 6, null, 65000, 85, 'Standard', 'Silver', now(), now()),
((SELECT id FROM customers WHERE email = 'gerrymansell@icloud.com'), 2020, 'Porsche', '718 Boxster Spyder', 'WP0CC2A89LS240306', 'Moorpark', 112000.00, false, null, 'BOX20', 'REGWP0CC2A89LS240306', 'CA', '2025-12-17', 32, 30, 34, 32, null, null, 6, null, 15000, 90, 'Standard', 'Yellow', now(), now()),

-- Marmonte Cars vehicles
((SELECT id FROM customers WHERE email = 'sergio@migramer.com'), 2003, 'Mazda', 'Miata MX-5', 'JM1NB353030300663', 'Moorpark', 45000.00, false, null, 'MIAT03', 'REGJM1NB353030300663', 'CA', '2026-05-07', 30, 28, 32, 30, null, null, 6, null, 85000, 75, 'Standard', 'Red', now(), now()),

-- Joseph Matta vehicles
((SELECT id FROM customers WHERE email = 'joe@hansonlab.com'), 2018, 'Porsche', '911 Turbo S', 'WP0AD2A96JS156695', 'Moorpark', 190000.00, false, null, 'TURBO', 'REGWP0AD2A96JS156695', 'CA', '2024-12-27', 32, 30, 34, 32, null, null, 6, null, 25000, 85, 'Standard', 'Black', now(), now()),

-- Greg McNeal vehicles
((SELECT id FROM customers WHERE email = 'gregory.mcneal.list@gmail.com'), 1971, 'Ford', 'Bronco', 'U15GLK08711', 'Moorpark', 125000.00, false, null, 'BRON71', 'REGU15GLK08711', 'CA', '2026-06-02', 32, 30, 34, 32, null, null, 6, null, 75000, 80, 'Standard', 'Orange', now(), now()),

-- Garrett Pegler vehicles
((SELECT id FROM customers WHERE email = 'garret@ghostshieldfilm.com'), 1969, 'Chevrolet', 'Camaro', 'N592786', 'Moorpark', 50000.00, false, null, 'CAM69', 'REGN592786', 'CA', '2024-05-13', 30, 28, 32, 30, null, null, 12, 'Classic car maintenance', 95000, 70, 'Standard', 'Yellow', now(), now()),
((SELECT id FROM customers WHERE email = 'garret@ghostshieldfilm.com'), 1979, 'Horizon', 'Pleasure', 'HFB20103M78H', 'Moorpark', 60000.00, false, null, 'HORI79', 'REGHFB20103M78H', 'CA', '2023-12-14', 30, 30, 32, 32, null, null, 12, 'Boat maintenance', 500, 90, 'Standard', 'White', now(), now()),

-- Steve Pena vehicles
((SELECT id FROM customers WHERE email = 'steve@penaemail.com'), 1968, 'Cadillac', 'DeVille', 'F8103861', 'Moorpark', 30000.00, false, null, 'CAD68', 'REGF8103861', 'CA', '2025-08-17', 30, 28, 32, 30, null, null, 12, 'Classic car maintenance', 85000, 65, 'Standard', 'Gold', now(), now()),

-- Tyrone Pham vehicles
((SELECT id FROM customers WHERE email = 'ecoliex@yahoo.com'), 2017, 'Subaru', 'BRZ', 'JF1ZCAC19H9605401', 'Moorpark', 32000.00, false, null, 'BRZ17', 'REGJF1ZCAC19H9605401', 'CA', '2025-06-22', 32, 30, 34, 32, null, null, 6, null, 45000, 80, 'Standard', 'Blue', now(), now()),

-- Thomas Powers vehicles
((SELECT id FROM customers WHERE email = 'tomepowers@gmail.com'), 1992, 'Ford', 'F250', '1FTHX25M2NKA18100', 'Moorpark', 8000.00, false, null, 'F25092', 'REG1FTHX25M2NKA18100', 'CA', '2026-06-01', 35, 35, 38, 38, null, null, 6, null, 185000, 70, 'Standard', 'White', now(), now()),

-- Jeremy Renstrom vehicles
((SELECT id FROM customers WHERE email = 'jeremyrenstrom@yahoo.com'), 2013, 'Infiniti', 'G37', 'JN1CV6AP7DM725397', 'Moorpark', 7750.00, false, null, 'INF13', 'REGJN1CV6AP7DM725397', 'CA', '2025-09-29', 32, 30, 34, 32, null, null, 6, null, 95000, 75, 'Standard', 'Silver', now(), now()),

-- Josiah Richards vehicles
((SELECT id FROM customers WHERE email = 'josiah@illusory.io'), 2018, 'BMW', '530e', 'WBAJA9C5XJB250474', 'Moorpark', 30000.00, false, null, 'BMW18', 'REGWBAJA9C5XJB250474', 'CA', '2025-03-08', 32, 30, 34, 32, null, null, 6, null, 55000, 80, 'Standard', 'White', now(), now()),

-- Joey Shap vehicles
((SELECT id FROM customers WHERE email = 'joeyshap@gmail.com'), 1973, 'Chevrolet', 'Corvette', '1Z37T3S415681', 'Moorpark', 30000.00, false, null, 'CORV73', 'REG1Z37T3S415681', 'CA', '2026-06-01', 30, 28, 32, 30, null, null, 12, 'Classic car maintenance', 75000, 70, 'Standard', 'Red', now(), now()),

-- Victoria Shuken vehicles
((SELECT id FROM customers WHERE email = 'tori_shuken@vistaauto.com'), 2023, 'Porsche', 'GT3 Touring', 'WPOAC2A97PS270457', 'Moorpark', 300000.00, false, null, 'GT3T', 'REGWPOAC2A97PS270457', 'CA', '2024-03-01', 32, 30, 34, 32, null, null, 6, null, 5000, 95, 'Lithium', 'White', now(), now()),
((SELECT id FROM customers WHERE email = 'tori_shuken@vistaauto.com'), 2023, 'Ford', 'F-150 Raptor', '1FTFW1RG5NFA93648', 'Moorpark', 85000.00, false, null, 'RAPT23', 'REG1FTFW1RG5NFA93648', 'CA', '2024-03-01', 35, 35, 38, 38, null, null, 6, null, 15000, 90, 'Standard', 'Black', now(), now()),

-- Tarnpreet Singh vehicles
((SELECT id FROM customers WHERE email = 'asingh2033@gmail.com'), 2008, 'BMW', 'M3', 'WBSWD93558PY39566', 'Moorpark', 45000.00, false, null, 'M308', 'REGWBSWD93558PY39566', 'CA', '2025-04-29', 32, 30, 34, 32, null, null, 6, null, 85000, 75, 'Standard', 'Silver', now(), now()),
((SELECT id FROM customers WHERE email = 'asingh2033@gmail.com'), 2015, 'BMW', 'M5', 'WBSFV9C52FD594804', 'Moorpark', 45000.00, false, null, 'M515', 'REGWBSFV9C52FD594804', 'CA', '2025-06-23', 32, 30, 34, 32, null, null, 6, null, 65000, 80, 'AGM', 'Black', now(), now()),
((SELECT id FROM customers WHERE email = 'asingh2033@gmail.com'), 2025, 'BMW', 'M3', 'WBS13HJ07SFU77025', 'Moorpark', 125000.00, false, null, 'M325', 'REGWBS13HJ07SFU77025', 'CA', '2026-04-11', 32, 30, 34, 32, null, null, 6, null, 2500, 95, 'Lithium', 'White', now(), now()),

-- Nico Solomon vehicles
((SELECT id FROM customers WHERE email = 'solonico@sbcglobal.net'), 1963, 'Cadillac', 'Coupe DeVille', '63J030283', 'Moorpark', 140000.00, false, null, 'CAD63', 'REG63J030283', 'CA', '2024-02-13', 30, 28, 32, 30, null, null, 12, 'Classic car maintenance', 65000, 70, 'Standard', 'Black', now(), now()),

-- Star Management vehicles
((SELECT id FROM customers WHERE email = 'kenneth.allen75@gmail.com'), 1963, 'Jaguar', 'E-Type Series 1', '878960', 'Moorpark', 120585.00, false, null, 'JAG63', 'REG878960', 'CA', '2026-02-01', 30, 28, 32, 30, null, null, 12, 'Classic car maintenance', 45000, 75, 'Standard', 'Red', now(), now()),
((SELECT id FROM customers WHERE email = 'kenneth.allen75@gmail.com'), 1964, 'Chevrolet', 'Corvette Convertible', '408675119205', 'Moorpark', 52690.00, false, null, 'CORV64', 'REG408675119205', 'CA', '2026-02-01', 30, 28, 32, 30, null, null, 12, 'Classic car maintenance', 55000, 70, 'Standard', 'Blue', now(), now()),

-- Donovan Tatum vehicles
((SELECT id FROM customers WHERE email = 'donovan.tatum@caa.com'), 1977, 'Ford', 'Bronco', 'U15GLY05378', 'Moorpark', 65000.00, false, null, 'BRON77', 'REGU15GLY05378', 'CA', '2024-04-05', 32, 30, 34, 32, null, null, 6, null, 85000, 75, 'Standard', 'Orange', now(), now()),

-- Thaxton & Associates vehicles
((SELECT id FROM customers WHERE email = 'mike@thaxtonassociates.com'), 2023, 'Ford', 'F150 Shelby', '1FTFW1E55PKE74267', 'Moorpark', 158000.00, false, null, 'SHEL23', 'REG1FTFW1E55PKE74267', 'CA', '2025-05-21', 35, 35, 38, 38, null, null, 6, null, 8500, 90, 'Standard', 'Black', now(), now()),

-- The Chosen Group vehicles
((SELECT id FROM customers WHERE email = 'kacy@100group.com'), 2019, 'Mercedes', 'Sprinter', 'WDAPF1CD6KP072139', 'Moorpark', 150000.00, false, null, 'SPRI19', 'REGWDAPF1CD6KP072139', 'CA', '2023-11-15', 35, 35, 38, 38, null, null, 12, 'Commercial vehicle maintenance', 45000, 85, 'Standard', 'White', now(), now()),

-- Deke Williams vehicles
((SELECT id FROM customers WHERE email = 'deke@wilmanco.com'), 1967, 'Ford', 'Mustang Shelby GT 500', 'Z67400F2A02902', 'Moorpark', 350000.00, false, null, 'GT500', 'REGZ67400F2A02902', 'CA', '2024-08-21', 30, 28, 32, 30, null, null, 12, 'Classic muscle car maintenance', 45000, 80, 'Standard', 'Blue', now(), now());