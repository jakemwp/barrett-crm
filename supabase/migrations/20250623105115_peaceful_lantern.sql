/*
  # Publish Data to Supabase

  1. Data Population
    - Insert vehicles data with proper foreign key relationships
    - Insert authorized drivers and contacts
    - Insert check-in/out records with service items
    - Insert vehicle photos
    - Skip user data population as requested
    - Use auto-generated UUIDs for all records

  2. Data Integrity
    - Ensure proper foreign key relationships
    - Maintain data consistency across tables
    - Use proper enum values
*/

-- Clear existing data (except users as requested)
TRUNCATE TABLE vehicle_photos CASCADE;
TRUNCATE TABLE service_items CASCADE;
TRUNCATE TABLE check_in_outs CASCADE;
TRUNCATE TABLE authorized_contacts CASCADE;
TRUNCATE TABLE authorized_drivers CASCADE;
TRUNCATE TABLE vehicles CASCADE;

-- Insert vehicles data
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
) 
SELECT 
  c.id as customer_id,
  2020 as year,
  'Toyota' as make,
  'Camry' as model,
  '1HGCM82633A123456' as vin,
  'Moorpark' as storage_location,
  28500 as fair_market_value,
  true as insurance_rider_required,
  30000 as insurance_rider_amount,
  'ABC123' as license_plate,
  'REG123456' as registration_number,
  'CA' as registration_state,
  '2024-12-31' as registration_expiration_date,
  32 as tire_pressure_default_front,
  30 as tire_pressure_default_rear,
  34 as tire_pressure_preferred_front,
  32 as tire_pressure_preferred_rear,
  '2023-12-10' as last_service_date,
  '2024-06-10' as next_service_date,
  6 as service_interval,
  'Oil change every 6 months' as maintenance_notes,
  25000 as odometer,
  'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg' as image,
  75 as fuel_level,
  'Standard' as battery_type,
  'Silver' as color,
  '2023-01-15T10:35:00Z' as created_at,
  '2023-12-10T14:35:00Z' as updated_at
FROM customers c 
WHERE c.first_name = 'Jason' AND c.last_name = 'Adang'
LIMIT 1;

INSERT INTO vehicles (
  customer_id,
  year,
  make,
  model,
  vin,
  storage_location,
  fair_market_value,
  insurance_rider_required,
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
) 
SELECT 
  c.id as customer_id,
  2019 as year,
  'Honda' as make,
  'Accord' as model,
  '2HGES16564H789012' as vin,
  'Westlake Village' as storage_location,
  24000 as fair_market_value,
  false as insurance_rider_required,
  'XYZ789' as license_plate,
  'REG789012' as registration_number,
  'NY' as registration_state,
  '2024-08-15' as registration_expiration_date,
  30 as tire_pressure_default_front,
  28 as tire_pressure_default_rear,
  32 as tire_pressure_preferred_front,
  30 as tire_pressure_preferred_rear,
  '2023-11-05' as last_service_date,
  '2024-05-05' as next_service_date,
  6 as service_interval,
  'Regular maintenance schedule' as maintenance_notes,
  32000 as odometer,
  'https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg' as image,
  50 as fuel_level,
  'AGM' as battery_type,
  'Blue' as color,
  '2023-02-20T14:50:00Z' as created_at,
  '2023-11-05T09:50:00Z' as updated_at
FROM customers c 
WHERE c.first_name = 'Chris' AND c.last_name = 'Antonsen'
LIMIT 1;

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
) 
SELECT 
  c.id as customer_id,
  2021 as year,
  'Ford' as make,
  'F-150' as model,
  '1FTFW1ET4DFB12345' as vin,
  'Moorpark' as storage_location,
  45000 as fair_market_value,
  true as insurance_rider_required,
  50000 as insurance_rider_amount,
  'DEF456' as license_plate,
  'REG456789' as registration_number,
  'TX' as registration_state,
  '2024-10-20' as registration_expiration_date,
  35 as tire_pressure_default_front,
  35 as tire_pressure_default_rear,
  38 as tire_pressure_preferred_front,
  38 as tire_pressure_preferred_rear,
  '2024-01-20' as last_service_date,
  '2024-07-20' as next_service_date,
  6 as service_interval,
  'Heavy duty maintenance schedule' as maintenance_notes,
  18000 as odometer,
  'https://images.pexels.com/photos/1335077/pexels-photo-1335077.jpeg' as image,
  90 as fuel_level,
  'Standard' as battery_type,
  'Black' as color,
  '2023-03-10T09:20:00Z' as created_at,
  '2024-01-20T13:20:00Z' as updated_at
FROM customers c 
WHERE c.first_name = 'Kam' AND c.last_name = 'Assil'
LIMIT 1;

INSERT INTO vehicles (
  customer_id,
  year,
  make,
  model,
  vin,
  storage_location,
  fair_market_value,
  insurance_rider_required,
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
) 
SELECT 
  c.id as customer_id,
  2018 as year,
  'Chevrolet' as make,
  'Equinox' as model,
  '3GNFK16338G345678' as vin,
  'Moorpark' as storage_location,
  18500 as fair_market_value,
  false as insurance_rider_required,
  'GHI789' as license_plate,
  'REG345678' as registration_number,
  'FL' as registration_state,
  '2024-06-30' as registration_expiration_date,
  30 as tire_pressure_default_front,
  30 as tire_pressure_default_rear,
  32 as tire_pressure_preferred_front,
  32 as tire_pressure_preferred_rear,
  '2023-10-15' as last_service_date,
  '2024-04-15' as next_service_date,
  6 as service_interval,
  'Standard maintenance' as maintenance_notes,
  45000 as odometer,
  25 as fuel_level,
  'Standard' as battery_type,
  'Red' as color,
  '2023-04-05T16:25:00Z' as created_at,
  '2023-10-15T10:35:00Z' as updated_at
FROM customers c 
WHERE c.first_name = 'Dylan' AND c.last_name = 'Boztepe'
LIMIT 1;

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
) 
SELECT 
  c.id as customer_id,
  2022 as year,
  'Nissan' as make,
  'Altima' as model,
  '1N4AL3AP3DC567890' as vin,
  'Moorpark' as storage_location,
  32000 as fair_market_value,
  true as insurance_rider_required,
  35000 as insurance_rider_amount,
  'JKL012' as license_plate,
  'REG567890' as registration_number,
  'CA' as registration_state,
  '2025-02-28' as registration_expiration_date,
  32 as tire_pressure_default_front,
  30 as tire_pressure_default_rear,
  34 as tire_pressure_preferred_front,
  32 as tire_pressure_preferred_rear,
  '2024-02-08' as last_service_date,
  '2024-08-08' as next_service_date,
  6 as service_interval,
  'New vehicle maintenance schedule' as maintenance_notes,
  8000 as odometer,
  'https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg' as image,
  85 as fuel_level,
  'Lithium' as battery_type,
  'White' as color,
  '2023-06-18T12:40:00Z' as created_at,
  '2024-02-08T15:50:00Z' as updated_at
FROM customers c 
WHERE c.first_name = 'Jeffrey' AND c.last_name = 'Brodsly'
LIMIT 1;

-- Insert authorized drivers for vehicles
INSERT INTO authorized_drivers (vehicle_id, name, phone, email, license_number, relationship)
SELECT 
  v.id as vehicle_id,
  'Jason Adang' as name,
  '(805) 795-6808' as phone,
  'jason@adangenterprises.com' as email,
  'D1234567' as license_number,
  'Owner' as relationship
FROM vehicles v
JOIN customers c ON v.customer_id = c.id
WHERE c.first_name = 'Jason' AND c.last_name = 'Adang';

INSERT INTO authorized_drivers (vehicle_id, name, phone, email, license_number, relationship)
SELECT 
  v.id as vehicle_id,
  'Chris Antonsen' as name,
  '(818) 381-7105' as phone,
  'antonsenchris3@gmail.com' as email,
  'NY987654' as license_number,
  'Owner' as relationship
FROM vehicles v
JOIN customers c ON v.customer_id = c.id
WHERE c.first_name = 'Chris' AND c.last_name = 'Antonsen';

INSERT INTO authorized_drivers (vehicle_id, name, phone, email, license_number, relationship)
SELECT 
  v.id as vehicle_id,
  'Kam Assil' as name,
  '(805) 405-2054' as phone,
  'kamassil@gmail.com' as email,
  'TX789012' as license_number,
  'Owner' as relationship
FROM vehicles v
JOIN customers c ON v.customer_id = c.id
WHERE c.first_name = 'Kam' AND c.last_name = 'Assil';

-- Insert authorized contacts for vehicles
INSERT INTO authorized_contacts (vehicle_id, name, phone, email, relationship, can_dropoff, can_pickup)
SELECT 
  v.id as vehicle_id,
  'Emergency Contact' as name,
  '(555) 777-8888' as phone,
  'emergency@example.com' as email,
  'Emergency' as relationship,
  false as can_dropoff,
  true as can_pickup
FROM vehicles v
JOIN customers c ON v.customer_id = c.id
WHERE c.first_name = 'Jeffrey' AND c.last_name = 'Brodsly';

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
  signature,
  created_at,
  updated_at
)
SELECT 
  v.id as vehicle_id,
  c.id as customer_id,
  '2024-03-15' as date,
  'CHECK_OUT' as type,
  'Moorpark' as location,
  'Jason Adang' as contact,
  'CHECKED_OUT' as status,
  '2024-03-15T09:30:00Z' as check_in_date,
  '2024-03-15T11:45:00Z' as check_out_date,
  75 as fuel_level,
  25000 as mileage,
  34 as tire_pressure_passenger_front,
  32 as tire_pressure_passenger_rear,
  34 as tire_pressure_driver_front,
  32 as tire_pressure_driver_rear,
  true as car_cover,
  false as kill_switch,
  'Standard startup procedure' as startup_directions,
  'Regular maintenance completed. Oil changed, tires rotated.' as notes,
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==' as signature,
  '2024-03-15T09:30:00Z' as created_at,
  '2024-03-15T11:45:00Z' as updated_at
FROM vehicles v
JOIN customers c ON v.customer_id = c.id
WHERE c.first_name = 'Jason' AND c.last_name = 'Adang'
LIMIT 1;

INSERT INTO check_in_outs (
  vehicle_id,
  customer_id,
  date,
  type,
  location,
  contact,
  status,
  check_in_date,
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
)
SELECT 
  v.id as vehicle_id,
  c.id as customer_id,
  '2024-03-17' as date,
  'CHECK_IN' as type,
  'Westlake Village' as location,
  'Chris Antonsen' as contact,
  'IN_SERVICE' as status,
  '2024-03-17T14:00:00Z' as check_in_date,
  50 as fuel_level,
  32000 as mileage,
  32 as tire_pressure_passenger_front,
  30 as tire_pressure_passenger_rear,
  32 as tire_pressure_driver_front,
  30 as tire_pressure_driver_rear,
  false as car_cover,
  true as kill_switch,
  'Press brake pedal before starting' as startup_directions,
  'Customer reported squeaking noise when braking. Investigating brake system.' as notes,
  '2024-03-17T14:00:00Z' as created_at,
  '2024-03-17T14:15:00Z' as updated_at
FROM vehicles v
JOIN customers c ON v.customer_id = c.id
WHERE c.first_name = 'Chris' AND c.last_name = 'Antonsen'
LIMIT 1;

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
  delivery_address,
  notes,
  signature,
  created_at,
  updated_at
)
SELECT 
  v.id as vehicle_id,
  c.id as customer_id,
  '2024-03-16' as date,
  'CHECK_OUT' as type,
  'Moorpark' as location,
  'Kam Assil' as contact,
  'CHECKED_OUT' as status,
  '2024-03-16T12:00:00Z' as check_in_date,
  '2024-03-16T13:30:00Z' as check_out_date,
  90 as fuel_level,
  18000 as mileage,
  38 as tire_pressure_passenger_front,
  38 as tire_pressure_passenger_rear,
  38 as tire_pressure_driver_front,
  38 as tire_pressure_driver_rear,
  true as car_cover,
  false as kill_switch,
  '5124 Oxley Place, Westlake Village, CA 91362' as delivery_address,
  'Routine maintenance completed. Air filter and wiper blades replaced.' as notes,
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==' as signature,
  '2024-03-16T12:00:00Z' as created_at,
  '2024-03-16T13:30:00Z' as updated_at
FROM vehicles v
JOIN customers c ON v.customer_id = c.id
WHERE c.first_name = 'Kam' AND c.last_name = 'Assil'
LIMIT 1;

-- Insert service items for check-in/out records
INSERT INTO service_items (check_in_out_id, description, cost, completed, completed_at, created_at, updated_at)
SELECT 
  cio.id as check_in_out_id,
  'Oil Change' as description,
  49.99 as cost,
  true as completed,
  '2024-03-15T11:30:00Z' as completed_at,
  '2024-03-15T09:30:00Z' as created_at,
  '2024-03-15T11:30:00Z' as updated_at
FROM check_in_outs cio
JOIN customers c ON cio.customer_id = c.id
WHERE c.first_name = 'Jason' AND c.last_name = 'Adang'
LIMIT 1;

INSERT INTO service_items (check_in_out_id, description, cost, completed, completed_at, created_at, updated_at)
SELECT 
  cio.id as check_in_out_id,
  'Tire Rotation' as description,
  29.99 as cost,
  true as completed,
  '2024-03-15T10:45:00Z' as completed_at,
  '2024-03-15T09:30:00Z' as created_at,
  '2024-03-15T10:45:00Z' as updated_at
FROM check_in_outs cio
JOIN customers c ON cio.customer_id = c.id
WHERE c.first_name = 'Jason' AND c.last_name = 'Adang'
LIMIT 1;

INSERT INTO service_items (check_in_out_id, description, cost, completed, created_at, updated_at)
SELECT 
  cio.id as check_in_out_id,
  'Brake Pad Replacement' as description,
  249.99 as cost,
  false as completed,
  '2024-03-17T14:15:00Z' as created_at,
  '2024-03-17T14:15:00Z' as updated_at
FROM check_in_outs cio
JOIN customers c ON cio.customer_id = c.id
WHERE c.first_name = 'Chris' AND c.last_name = 'Antonsen'
LIMIT 1;

INSERT INTO service_items (check_in_out_id, description, cost, completed, completed_at, created_at, updated_at)
SELECT 
  cio.id as check_in_out_id,
  'Air Filter Replacement' as description,
  39.99 as cost,
  true as completed,
  '2024-03-16T13:20:00Z' as completed_at,
  '2024-03-16T12:00:00Z' as created_at,
  '2024-03-16T13:20:00Z' as updated_at
FROM check_in_outs cio
JOIN customers c ON cio.customer_id = c.id
WHERE c.first_name = 'Kam' AND c.last_name = 'Assil'
LIMIT 1;

INSERT INTO service_items (check_in_out_id, description, cost, completed, completed_at, created_at, updated_at)
SELECT 
  cio.id as check_in_out_id,
  'Wiper Blade Replacement' as description,
  24.99 as cost,
  true as completed,
  '2024-03-16T12:50:00Z' as completed_at,
  '2024-03-16T12:00:00Z' as created_at,
  '2024-03-16T12:50:00Z' as updated_at
FROM check_in_outs cio
JOIN customers c ON cio.customer_id = c.id
WHERE c.first_name = 'Kam' AND c.last_name = 'Assil'
LIMIT 1;

-- Insert vehicle photos for check-in/out records
INSERT INTO vehicle_photos (check_in_out_id, photo_type, photo_url, created_at)
SELECT 
  cio.id as check_in_out_id,
  'driverPic' as photo_type,
  'https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg' as photo_url,
  '2024-03-15T09:30:00Z' as created_at
FROM check_in_outs cio
JOIN customers c ON cio.customer_id = c.id
WHERE c.first_name = 'Jason' AND c.last_name = 'Adang'
LIMIT 1;

INSERT INTO vehicle_photos (check_in_out_id, photo_type, photo_url, created_at)
SELECT 
  cio.id as check_in_out_id,
  'frontPic' as photo_type,
  'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg' as photo_url,
  '2024-03-15T09:30:00Z' as created_at
FROM check_in_outs cio
JOIN customers c ON cio.customer_id = c.id
WHERE c.first_name = 'Jason' AND c.last_name = 'Adang'
LIMIT 1;

INSERT INTO vehicle_photos (check_in_out_id, photo_type, photo_url, created_at)
SELECT 
  cio.id as check_in_out_id,
  'rearPic' as photo_type,
  'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg' as photo_url,
  '2024-03-15T09:30:00Z' as created_at
FROM check_in_outs cio
JOIN customers c ON cio.customer_id = c.id
WHERE c.first_name = 'Jason' AND c.last_name = 'Adang'
LIMIT 1;

INSERT INTO vehicle_photos (check_in_out_id, photo_type, photo_url, created_at)
SELECT 
  cio.id as check_in_out_id,
  'dashboardPics' as photo_type,
  'https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg' as photo_url,
  '2024-03-15T09:30:00Z' as created_at
FROM check_in_outs cio
JOIN customers c ON cio.customer_id = c.id
WHERE c.first_name = 'Jason' AND c.last_name = 'Adang'
LIMIT 1;

INSERT INTO vehicle_photos (check_in_out_id, photo_type, photo_url, created_at)
SELECT 
  cio.id as check_in_out_id,
  'engineBayPics' as photo_type,
  'https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg' as photo_url,
  '2024-03-15T09:30:00Z' as created_at
FROM check_in_outs cio
JOIN customers c ON cio.customer_id = c.id
WHERE c.first_name = 'Jason' AND c.last_name = 'Adang'
LIMIT 1;

INSERT INTO vehicle_photos (check_in_out_id, photo_type, photo_url, created_at)
SELECT 
  cio.id as check_in_out_id,
  'walkAroundVideo' as photo_type,
  'https://example.com/walkaround-video-1.mp4' as photo_url,
  '2024-03-15T09:30:00Z' as created_at
FROM check_in_outs cio
JOIN customers c ON cio.customer_id = c.id
WHERE c.first_name = 'Jason' AND c.last_name = 'Adang'
LIMIT 1;