/*
  # Insert demo users for testing

  This migration adds demo users with different roles for testing purposes.
*/

-- Insert demo users
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
-- Admin user
('Admin', 'User', 'admin@autoservice.com', 'admin123', 'Admin', '(555) 123-4567', 'Management', true, now(), now()),

-- Manager user
('John', 'Manager', 'john.manager@autoservice.com', 'manager123', 'Manager', '(555) 234-5678', 'Operations', true, now(), now()),

-- Staff user
('Sarah', 'Staff', 'sarah.staff@autoservice.com', 'staff123', 'Staff', '(555) 345-6789', 'Service', true, now(), now()),

-- Viewer user
('Guest', 'Viewer', 'guest.viewer@autoservice.com', 'viewer123', 'Viewer', '(555) 456-7890', 'Guest', true, now(), now());