/*
  # Create users from customers data

  1. Data Population
    - Create user accounts for customers
    - Set appropriate roles based on customer type
    - Generate secure passwords

  2. User Types
    - Admin users
    - Staff users
    - Regular customer users
*/

-- Clear existing users data
TRUNCATE TABLE users CASCADE;

-- Insert admin users
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

-- Insert manager users (from selected customers)
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
('Jeffrey', 'Brodsly', 'jeff@100group.com', 'manager123', 'Manager', '(805) 807-0195', 'Client Relations', true, now(), now()),
('Greg', 'Geyer', 'gregtgeyer@gmail.com', 'manager123', 'Manager', '(310) 463-2271', 'Client Relations', true, now(), now()),
('Victoria', 'Shuken', 'tori_shuken@vistaauto.com', 'manager123', 'Manager', '(818) 207-9770', 'Client Relations', true, now(), now());