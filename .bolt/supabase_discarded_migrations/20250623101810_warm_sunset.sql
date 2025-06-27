/*
  # Populate service items table

  1. Data Population
    - Add service items for vehicles in service
    - Create realistic service records with costs
    - Set completion status for services

  2. Service Types
    - Regular maintenance items
    - Repairs
    - Inspections
    - Special services
*/

-- Clear existing service items data
TRUNCATE TABLE service_items CASCADE;

-- Insert service items data
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
 now() - interval '30 days'),

-- Kenneth Ingoldsby Lamborghini Countach (rare classic)
((SELECT id FROM check_in_outs WHERE vehicle_id = (SELECT id FROM vehicles WHERE vin = 'ZA9CA05AXKLA12520')), 
 'Specialized Inspection', 
 299.99, 
 true, 
 now() - interval '45 days', 
 now() - interval '50 days', 
 now() - interval '45 days'),

((SELECT id FROM check_in_outs WHERE vehicle_id = (SELECT id FROM vehicles WHERE vin = 'ZA9CA05AXKLA12520')), 
 'Fuel System Cleaning', 
 399.99, 
 true, 
 now() - interval '45 days', 
 now() - interval '50 days', 
 now() - interval '45 days')),

((SELECT id FROM check_in_outs WHERE vehicle_id = (SELECT id FROM vehicles WHERE vin = 'ZA9CA05AXKLA12520')), 
 'Climate Control Service', 
 249.99, 
 true, 
 now() - interval '45 days', 
 now() - interval '50 days', 
 now() - interval '45 days')),

-- Paul Johnson Porsche GT2RS (high performance)
((SELECT id FROM check_in_outs WHERE vehicle_id = (SELECT id FROM vehicles WHERE vin = 'WPOAE2A94JS185349')), 
 'Performance Inspection', 
 249.99, 
 true, 
 now() - interval '60 days', 
 now() - interval '65 days', 
 now() - interval '60 days')),

((SELECT id FROM check_in_outs WHERE vehicle_id = (SELECT id FROM vehicles WHERE vin = 'WPOAE2A94JS185349')), 
 'Tire Rotation', 
 149.99, 
 true, 
 now() - interval '60 days', 
 now() - interval '65 days', 
 now() - interval '60 days')),

-- Brian Jones classic cars
((SELECT id FROM check_in_outs WHERE vehicle_id = (SELECT id FROM vehicles WHERE vin = '1841802')), 
 'Classic Car Maintenance', 
 349.99, 
 true, 
 now() - interval '90 days', 
 now() - interval '95 days', 
 now() - interval '90 days')),

((SELECT id FROM check_in_outs WHERE vehicle_id = (SELECT id FROM vehicles WHERE vin = '185140520')), 
 'Classic Car Maintenance', 
 349.99, 
 true, 
 now() - interval '90 days', 
 now() - interval '95 days', 
 now() - interval '90 days')),

((SELECT id FROM check_in_outs WHERE vehicle_id = (SELECT id FROM vehicles WHERE vin = '9C5749')), 
 'Classic Car Maintenance', 
 349.99, 
 true, 
 now() - interval '90 days', 
 now() - interval '95 days', 
 now() - interval '90 days')),

-- Boat maintenance
((SELECT id FROM check_in_outs WHERE vehicle_id = (SELECT id FROM vehicles WHERE vin = 'MB2L5005K920')), 
 'Boat Winterization', 
 499.99, 
 true, 
 now() - interval '120 days', 
 now() - interval '125 days', 
 now() - interval '120 days')),

((SELECT id FROM check_in_outs WHERE vehicle_id = (SELECT id FROM vehicles WHERE vin = 'MB2S5847D515')), 
 'Boat Maintenance Package', 
 599.99, 
 true, 
 now() - interval '120 days', 
 now() - interval '125 days', 
 now() - interval '120 days'));