/*
  # Populate vehicle photos table

  1. Data Population
    - Add placeholder photo records for vehicles
    - Link photos to check-in/out records
    - Set appropriate photo types

  2. Photo Types
    - Basic exterior photos (front, rear, sides)
    - Interior photos
    - Damage documentation
    - Condition verification
*/

-- Clear existing vehicle photos data
TRUNCATE TABLE vehicle_photos CASCADE;

-- Insert vehicle photos data
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
 now()),

-- Ferrari 296 GTS
((SELECT id FROM check_in_outs WHERE vehicle_id = (SELECT id FROM vehicles WHERE vin = 'ZFF01SMA9R0311081')), 
 'front', 
 'https://images.pexels.com/photos/3954426/pexels-photo-3954426.jpeg',
 now()),

((SELECT id FROM check_in_outs WHERE vehicle_id = (SELECT id FROM vehicles WHERE vin = 'ZFF01SMA9R0311081')), 
 'rear', 
 'https://images.pexels.com/photos/3954426/pexels-photo-3954426.jpeg',
 now()),

-- Classic cars
((SELECT id FROM check_in_outs WHERE vehicle_id = (SELECT id FROM vehicles WHERE vin = '1841802')), 
 'front', 
 'https://images.pexels.com/photos/3954426/pexels-photo-3954426.jpeg',
 now()),

((SELECT id FROM check_in_outs WHERE vehicle_id = (SELECT id FROM vehicles WHERE vin = '1841802')), 
 'rear', 
 'https://images.pexels.com/photos/3954426/pexels-photo-3954426.jpeg',
 now()),

-- Lamborghini Countach
((SELECT id FROM check_in_outs WHERE vehicle_id = (SELECT id FROM vehicles WHERE vin = 'ZA9CA05AXKLA12520')), 
 'front', 
 'https://images.pexels.com/photos/3954426/pexels-photo-3954426.jpeg',
 now()),

((SELECT id FROM check_in_outs WHERE vehicle_id = (SELECT id FROM vehicles WHERE vin = 'ZA9CA05AXKLA12520')), 
 'rear', 
 'https://images.pexels.com/photos/3954426/pexels-photo-3954426.jpeg',
 now()),

((SELECT id FROM check_in_outs WHERE vehicle_id = (SELECT id FROM vehicles WHERE vin = 'ZA9CA05AXKLA12520')), 
 'interior', 
 'https://images.pexels.com/photos/3954426/pexels-photo-3954426.jpeg',
 now()),

-- Boats
((SELECT id FROM check_in_outs WHERE vehicle_id = (SELECT id FROM vehicles WHERE vin = 'MB2L5005K920')), 
 'exterior', 
 'https://images.pexels.com/photos/3954426/pexels-photo-3954426.jpeg',
 now()),

((SELECT id FROM check_in_outs WHERE vehicle_id = (SELECT id FROM vehicles WHERE vin = 'MB2S5847D515')), 
 'exterior', 
 'https://images.pexels.com/photos/3954426/pexels-photo-3954426.jpeg',
 now()));