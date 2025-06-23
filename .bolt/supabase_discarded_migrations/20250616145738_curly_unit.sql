/*
  # Seed Initial Data

  1. Sample Data
    - Insert sample users for testing
    - Insert sample customers with different membership levels
    - Insert sample vehicles with complete details
    - Insert authorized drivers and contacts
    - Insert check-in/out records with service history
    - Insert service items and appointments

  2. Data Relationships
    - All foreign key relationships properly maintained
    - Realistic sample data for development and testing
*/

-- Insert sample users
INSERT INTO users (id, first_name, last_name, email, password, role, phone, department, is_active) VALUES
('550e8400-e29b-41d4-a716-446655440000', 'Admin', 'User', 'admin@autoservice.com', 'admin123', 'Admin', '(555) 123-4567', 'Management', true),
('550e8400-e29b-41d4-a716-446655440001', 'John', 'Manager', 'john.manager@autoservice.com', 'manager123', 'Manager', '(555) 234-5678', 'Operations', true),
('550e8400-e29b-41d4-a716-446655440002', 'Sarah', 'Staff', 'sarah.staff@autoservice.com', 'staff123', 'Staff', '(555) 345-6789', 'Service', true);

-- Insert sample customers
INSERT INTO customers (id, first_name, last_name, type, membership_level, storage_location, email, phone, street_address, city, state, zip_code, storage_spots, show_panda_doc_form, password, magic_link, num_rows, manual_price) VALUES
('c1234567-89ab-cdef-0123-456789abcdef', 'John', 'Doe', 'Individual', 'Premium', 'Building A - Section 1', 'john.doe@example.com', '(555) 123-4567', '123 Main St', 'Anytown', 'CA', '90210', 2, true, 'temp123', 'https://app.example.com/auth/magic/abc123', 1, 150.00),
('c2345678-9abc-def0-1234-56789abcdef0', 'Jane', 'Smith', 'Business', 'VIP', 'Building B - Section 3', 'jane.smith@example.com', '(555) 987-6543', '456 Oak Ave', 'Somewhere', 'NY', '10001', 4, false, 'secure456', 'https://app.example.com/auth/magic/def456', 2, 300.00),
('c3456789-abcd-ef01-2345-6789abcdef01', 'Robert', 'Johnson', 'Corporate', 'Enterprise', 'Building C - Section 2', 'robert.j@example.com', '(555) 789-0123', '789 Pine Rd', 'Elsewhere', 'TX', '75001', 8, true, 'corp789', null, 4, 600.00),
('c456789a-bcde-f012-3456-789abcdef012', 'Sarah', 'Williams', 'Individual', 'Basic', 'Building A - Section 4', 'sarah.w@example.com', '(555) 456-7890', '321 Maple Dr', 'Nowhere', 'FL', '33101', 1, false, 'basic321', 'https://app.example.com/auth/magic/ghi789', 1, 75.00),
('c56789ab-cdef-0123-4567-89abcdef0123', 'Michael', 'Brown', 'Business', 'Premium', 'Building B - Section 1', 'michael.b@example.com', '(555) 234-5678', '654 Cedar Ln', 'Someplace', 'IL', '60007', 3, true, 'business654', null, 2, 225.00);

-- Insert sample vehicles
INSERT INTO vehicles (id, customer_id, year, make, model, vin, storage_location, fair_market_value, insurance_rider_required, insurance_rider_amount, license_plate, registration_number, registration_state, registration_expiration_date, last_service_date, next_service_date, service_interval, maintenance_notes, odometer, image, fuel_level, battery_type, color) VALUES
('v1234567-89ab-cdef-0123-456789abcdef', 'c1234567-89ab-cdef-0123-456789abcdef', 2020, 'Toyota', 'Camry', '1HGCM82633A123456', 'Building A - Section 1 - Spot 12', 28500, true, 30000, 'ABC123', 'REG123456', 'CA', '2024-12-31', '2023-12-10', '2024-06-10', 6, 'Oil change every 6 months', 25000, 'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg', 75, 'Standard', 'Silver'),
('v2345678-9abc-def0-1234-56789abcdef0', 'c2345678-9abc-def0-1234-56789abcdef0', 2019, 'Honda', 'Accord', '2HGES16564H789012', 'Building B - Section 3 - Spot 8', 24000, false, null, 'XYZ789', 'REG789012', 'NY', '2024-08-15', '2023-11-05', '2024-05-05', 6, 'Regular maintenance schedule', 32000, 'https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg', 50, 'AGM', 'Blue'),
('v3456789-abcd-ef01-2345-6789abcdef01', 'c3456789-abcd-ef01-2345-6789abcdef01', 2021, 'Ford', 'F-150', '1FTFW1ET4DFB12345', 'Building C - Section 2 - Spot 15', 45000, true, 50000, 'DEF456', 'REG456789', 'TX', '2024-10-20', '2024-01-20', '2024-07-20', 6, 'Heavy duty maintenance schedule', 18000, 'https://images.pexels.com/photos/1335077/pexels-photo-1335077.jpeg', 90, 'Standard', 'Black'),
('v456789a-bcde-f012-3456-789abcdef012', 'c456789a-bcde-f012-3456-789abcdef012', 2018, 'Chevrolet', 'Equinox', '3GNFK16338G345678', 'Building A - Section 4 - Spot 3', 18500, false, null, 'GHI789', 'REG345678', 'FL', '2024-06-30', '2023-10-15', '2024-04-15', 6, 'Standard maintenance', 45000, null, 25, 'Standard', 'Red'),
('v56789ab-cdef-0123-4567-89abcdef0123', 'c1234567-89ab-cdef-0123-456789abcdef', 2022, 'Nissan', 'Altima', '1N4AL3AP3DC567890', 'Building A - Section 1 - Spot 13', 32000, true, 35000, 'JKL012', 'REG567890', 'CA', '2025-02-28', '2024-02-08', '2024-08-08', 6, 'New vehicle maintenance schedule', 8000, 'https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg', 85, 'Lithium', 'White');

-- Insert authorized drivers
INSERT INTO authorized_drivers (vehicle_id, name, phone, email, license_number, relationship) VALUES
('v1234567-89ab-cdef-0123-456789abcdef', 'John Doe', '(555) 123-4567', 'john.doe@example.com', 'D1234567', 'Owner'),
('v1234567-89ab-cdef-0123-456789abcdef', 'Jane Doe', '(555) 123-4568', 'jane.doe@example.com', 'D7654321', 'Spouse'),
('v2345678-9abc-def0-1234-56789abcdef0', 'Jane Smith', '(555) 987-6543', 'jane.smith@example.com', 'NY987654', 'Owner'),
('v3456789-abcd-ef01-2345-6789abcdef01', 'Robert Johnson', '(555) 789-0123', 'robert.j@example.com', 'TX789012', 'Owner'),
('v3456789-abcd-ef01-2345-6789abcdef01', 'Corporate Driver 1', '(555) 789-0124', 'driver1@corp.com', 'TX789013', 'Employee'),
('v456789a-bcde-f012-3456-789abcdef012', 'Sarah Williams', '(555) 456-7890', 'sarah.w@example.com', 'FL456789', 'Owner'),
('v56789ab-cdef-0123-4567-89abcdef0123', 'John Doe', '(555) 123-4567', 'john.doe@example.com', 'D1234567', 'Owner');

-- Insert authorized contacts
INSERT INTO authorized_contacts (vehicle_id, name, phone, email, relationship, can_dropoff, can_pickup) VALUES
('v1234567-89ab-cdef-0123-456789abcdef', 'Mike Johnson', '(555) 111-2222', 'mike.j@example.com', 'Friend', true, false),
('v2345678-9abc-def0-1234-56789abcdef0', 'Bob Smith', '(555) 333-4444', 'bob.smith@example.com', 'Brother', true, true),
('v3456789-abcd-ef01-2345-6789abcdef01', 'Fleet Manager', '(555) 555-6666', 'fleet@corp.com', 'Fleet Manager', true, true),
('v56789ab-cdef-0123-4567-89abcdef0123', 'Emergency Contact', '(555) 777-8888', 'emergency@example.com', 'Emergency', false, true);

-- Insert sample check-in/out records
INSERT INTO check_in_outs (id, vehicle_id, customer_id, date, type, location, contact, status, check_in_date, check_out_date, fuel_level, mileage, tire_pressure_passenger_front, tire_pressure_passenger_rear, tire_pressure_driver_front, tire_pressure_driver_rear, car_cover, kill_switch, startup_directions, notes, signature) VALUES
('12345678-9abc-def0-1234-56789abcdef0', 'v1234567-89ab-cdef-0123-456789abcdef', 'c1234567-89ab-cdef-0123-456789abcdef', '2024-03-15', 'CHECK_OUT', 'Building A - Section 1', 'John Doe', 'CHECKED_OUT', '2024-03-15T09:30:00Z', '2024-03-15T11:45:00Z', 75, 25000, 34, 32, 34, 32, true, false, 'Standard startup procedure', 'Regular maintenance completed. Oil changed, tires rotated.', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg=='),
('23456789-abcd-ef01-2345-6789abcdef01', 'v2345678-9abc-def0-1234-56789abcdef0', 'c2345678-9abc-def0-1234-56789abcdef0', '2024-03-17', 'CHECK_IN', 'Building B - Section 3', 'Jane Smith', 'IN_SERVICE', '2024-03-17T14:00:00Z', null, 50, 32000, 32, 30, 32, 30, false, true, 'Press brake pedal before starting', 'Customer reported squeaking noise when braking. Investigating brake system.', null),
('3456789a-bcde-f012-3456-789abcdef012', 'v3456789-abcd-ef01-2345-6789abcdef01', 'c3456789-abcd-ef01-2345-6789abcdef01', '2024-03-16', 'CHECK_OUT', 'Building C - Section 2', 'Robert Johnson', 'CHECKED_OUT', '2024-03-16T12:00:00Z', '2024-03-16T13:30:00Z', 90, 18000, 38, 38, 38, 38, true, false, null, 'Routine maintenance completed. Air filter and wiper blades replaced.', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==');

-- Insert service items
INSERT INTO service_items (check_in_out_id, description, cost, completed, completed_at) VALUES
('12345678-9abc-def0-1234-56789abcdef0', 'Oil Change', 49.99, true, '2024-03-15T11:30:00Z'),
('12345678-9abc-def0-1234-56789abcdef0', 'Tire Rotation', 29.99, true, '2024-03-15T10:45:00Z'),
('23456789-abcd-ef01-2345-6789abcdef01', 'Brake Pad Replacement', 249.99, false, null),
('3456789a-bcde-f012-3456-789abcdef012', 'Air Filter Replacement', 39.99, true, '2024-03-16T13:20:00Z'),
('3456789a-bcde-f012-3456-789abcdef012', 'Wiper Blade Replacement', 24.99, true, '2024-03-16T12:50:00Z');

-- Insert sample appointments
INSERT INTO appointments (customer_id, vehicle_id, date, time, duration, reason, status, notes) VALUES
('c456789a-bcde-f012-3456-789abcdef012', 'v456789a-bcde-f012-3456-789abcdef012', '2024-03-25', '10:00', 60, 'Oil change and tire rotation', 'SCHEDULED', null),
('c56789ab-cdef-0123-4567-89abcdef0123', null, '2024-03-23', '14:30', 90, 'Engine check - vehicle making unusual noise', 'SCHEDULED', 'Customer will bring in 2018 BMW 3 Series'),
('c1234567-89ab-cdef-0123-456789abcdef', 'v56789ab-cdef-0123-4567-89abcdef0123', '2024-03-20', '09:15', 45, 'Inspection before road trip', 'COMPLETED', 'Everything checked out fine');