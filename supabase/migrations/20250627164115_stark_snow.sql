/*
  # Update CRM data to match mock data file

  1. New Tables
    - Ensure all tables match the mock data structure
    - Update existing tables with proper fields
    - Add any missing tables

  2. Security
    - Maintain RLS policies
    - Ensure proper access controls
*/

-- First, let's ensure we have all the required enum types
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'user_role') THEN
    CREATE TYPE user_role AS ENUM ('Admin', 'Manager', 'Staff', 'Viewer');
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'customer_type') THEN
    CREATE TYPE customer_type AS ENUM ('Individual', 'Business');
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'membership_level') THEN
    CREATE TYPE membership_level AS ENUM ('Premium', 'VIP', 'Enterprise', 'Standard');
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'battery_type') THEN
    CREATE TYPE battery_type AS ENUM ('Standard', 'AGM', 'Lithium', 'Gel', 'Other');
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'check_status') THEN
    CREATE TYPE check_status AS ENUM ('CHECKED_IN', 'IN_SERVICE', 'CHECKED_OUT');
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'check_type') THEN
    CREATE TYPE check_type AS ENUM ('CHECK_IN', 'CHECK_OUT');
  END IF;
END $$;

-- Create or update the users table
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name text NOT NULL,
  last_name text NOT NULL,
  email text UNIQUE NOT NULL,
  password text NOT NULL,
  role user_role DEFAULT 'Staff',
  avatar text,
  phone text,
  department text,
  last_login timestamptz,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create or update the customers table
CREATE TABLE IF NOT EXISTS customers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name text NOT NULL,
  last_name text,
  type customer_type DEFAULT 'Individual',
  membership_level membership_level DEFAULT 'Standard',
  storage_location text NOT NULL,
  email text UNIQUE NOT NULL,
  phone text NOT NULL,
  street_address text NOT NULL,
  city text NOT NULL,
  state text NOT NULL,
  zip_code text NOT NULL,
  storage_spots integer DEFAULT 1,
  show_panda_doc_form boolean DEFAULT false,
  date_created date DEFAULT CURRENT_DATE,
  password text NOT NULL,
  num_rows integer DEFAULT 1,
  manual_price numeric(10,2),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create or update the vehicles table
CREATE TABLE IF NOT EXISTS vehicles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id uuid NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
  year integer NOT NULL,
  make text NOT NULL,
  model text NOT NULL,
  vin text UNIQUE NOT NULL,
  storage_location text NOT NULL,
  fair_market_value numeric(10,2) NOT NULL,
  insurance_rider_required boolean DEFAULT false,
  insurance_rider_amount numeric(10,2),
  license_plate text NOT NULL,
  registration_number text NOT NULL,
  registration_state text NOT NULL,
  registration_expiration_date date NOT NULL,
  tire_pressure_default_front integer DEFAULT 32,
  tire_pressure_default_rear integer DEFAULT 30,
  tire_pressure_preferred_front integer DEFAULT 34,
  tire_pressure_preferred_rear integer DEFAULT 32,
  last_service_date date,
  next_service_date date,
  service_interval integer DEFAULT 6,
  maintenance_notes text,
  odometer integer DEFAULT 0,
  image text,
  fuel_level integer DEFAULT 100,
  battery_type battery_type DEFAULT 'Standard',
  color text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create or update the authorized_drivers table
CREATE TABLE IF NOT EXISTS authorized_drivers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  vehicle_id uuid NOT NULL REFERENCES vehicles(id) ON DELETE CASCADE,
  name text NOT NULL,
  phone text,
  email text,
  license_number text,
  relationship text,
  created_at timestamptz DEFAULT now()
);

-- Create or update the authorized_contacts table
CREATE TABLE IF NOT EXISTS authorized_contacts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  vehicle_id uuid NOT NULL REFERENCES vehicles(id) ON DELETE CASCADE,
  name text NOT NULL,
  phone text NOT NULL,
  email text,
  relationship text,
  can_dropoff boolean DEFAULT false,
  can_pickup boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Create or update the check_in_outs table
CREATE TABLE IF NOT EXISTS check_in_outs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  vehicle_id uuid NOT NULL REFERENCES vehicles(id) ON DELETE CASCADE,
  customer_id uuid NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
  date date DEFAULT CURRENT_DATE,
  type check_type NOT NULL,
  location text NOT NULL,
  contact text NOT NULL,
  status check_status DEFAULT 'CHECKED_IN',
  check_in_date timestamptz,
  check_out_date timestamptz,
  fuel_level integer,
  mileage integer,
  tire_pressure_passenger_front integer,
  tire_pressure_passenger_rear integer,
  tire_pressure_driver_front integer,
  tire_pressure_driver_rear integer,
  car_cover boolean DEFAULT false,
  kill_switch boolean DEFAULT false,
  startup_directions text,
  delivery_address text,
  notes text,
  signature text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create or update the service_items table
CREATE TABLE IF NOT EXISTS service_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  check_in_out_id uuid NOT NULL REFERENCES check_in_outs(id) ON DELETE CASCADE,
  description text NOT NULL,
  cost numeric(10,2) DEFAULT 0,
  completed boolean DEFAULT false,
  completed_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create or update the vehicle_photos table
CREATE TABLE IF NOT EXISTS vehicle_photos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  check_in_out_id uuid NOT NULL REFERENCES check_in_outs(id) ON DELETE CASCADE,
  photo_type text NOT NULL,
  photo_url text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security if not already enabled
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE vehicles ENABLE ROW LEVEL SECURITY;
ALTER TABLE authorized_drivers ENABLE ROW LEVEL SECURITY;
ALTER TABLE authorized_contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE check_in_outs ENABLE ROW LEVEL SECURITY;
ALTER TABLE service_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE vehicle_photos ENABLE ROW LEVEL SECURITY;

-- Create or update RLS policies
-- Users policies
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'users' AND policyname = 'Admins can insert users') THEN
    CREATE POLICY "Admins can insert users" ON users FOR INSERT TO authenticated WITH CHECK (
      EXISTS (
        SELECT 1 FROM users
        WHERE users.id = auth.uid() AND users.role = 'Admin'
      )
    );
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'users' AND policyname = 'Admins can read all users') THEN
    CREATE POLICY "Admins can read all users" ON users FOR SELECT TO authenticated USING (
      EXISTS (
        SELECT 1 FROM users
        WHERE users.id = auth.uid() AND users.role = 'Admin'
      )
    );
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'users' AND policyname = 'Admins can update all users') THEN
    CREATE POLICY "Admins can update all users" ON users FOR UPDATE TO authenticated USING (
      EXISTS (
        SELECT 1 FROM users
        WHERE users.id = auth.uid() AND users.role = 'Admin'
      )
    );
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'users' AND policyname = 'Users can read own data') THEN
    CREATE POLICY "Users can read own data" ON users FOR SELECT TO authenticated USING (
      auth.uid() = id
    );
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'users' AND policyname = 'Users can update own data') THEN
    CREATE POLICY "Users can update own data" ON users FOR UPDATE TO authenticated USING (
      auth.uid() = id
    );
  END IF;
END $$;

-- Customers policies
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'customers' AND policyname = 'Authenticated users can read customers') THEN
    CREATE POLICY "Authenticated users can read customers" ON customers FOR SELECT TO authenticated USING (true);
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'customers' AND policyname = 'Staff can insert customers') THEN
    CREATE POLICY "Staff can insert customers" ON customers FOR INSERT TO authenticated WITH CHECK (
      EXISTS (
        SELECT 1 FROM users
        WHERE users.id = auth.uid() AND users.role IN ('Admin', 'Manager', 'Staff')
      )
    );
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'customers' AND policyname = 'Staff can update customers') THEN
    CREATE POLICY "Staff can update customers" ON customers FOR UPDATE TO authenticated USING (
      EXISTS (
        SELECT 1 FROM users
        WHERE users.id = auth.uid() AND users.role IN ('Admin', 'Manager', 'Staff')
      )
    );
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'customers' AND policyname = 'Admins can delete customers') THEN
    CREATE POLICY "Admins can delete customers" ON customers FOR DELETE TO authenticated USING (
      EXISTS (
        SELECT 1 FROM users
        WHERE users.id = auth.uid() AND users.role = 'Admin'
      )
    );
  END IF;
END $$;

-- Vehicles policies
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'vehicles' AND policyname = 'Authenticated users can read vehicles') THEN
    CREATE POLICY "Authenticated users can read vehicles" ON vehicles FOR SELECT TO authenticated USING (true);
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'vehicles' AND policyname = 'Staff can insert vehicles') THEN
    CREATE POLICY "Staff can insert vehicles" ON vehicles FOR INSERT TO authenticated WITH CHECK (
      EXISTS (
        SELECT 1 FROM users
        WHERE users.id = auth.uid() AND users.role IN ('Admin', 'Manager', 'Staff')
      )
    );
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'vehicles' AND policyname = 'Staff can update vehicles') THEN
    CREATE POLICY "Staff can update vehicles" ON vehicles FOR UPDATE TO authenticated USING (
      EXISTS (
        SELECT 1 FROM users
        WHERE users.id = auth.uid() AND users.role IN ('Admin', 'Manager', 'Staff')
      )
    );
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'vehicles' AND policyname = 'Admins can delete vehicles') THEN
    CREATE POLICY "Admins can delete vehicles" ON vehicles FOR DELETE TO authenticated USING (
      EXISTS (
        SELECT 1 FROM users
        WHERE users.id = auth.uid() AND users.role = 'Admin'
      )
    );
  END IF;
END $$;

-- Authorized drivers policies
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'authorized_drivers' AND policyname = 'Authenticated users can read authorized drivers') THEN
    CREATE POLICY "Authenticated users can read authorized drivers" ON authorized_drivers FOR SELECT TO authenticated USING (true);
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'authorized_drivers' AND policyname = 'Staff can manage authorized drivers') THEN
    CREATE POLICY "Staff can manage authorized drivers" ON authorized_drivers FOR ALL TO authenticated USING (
      EXISTS (
        SELECT 1 FROM users
        WHERE users.id = auth.uid() AND users.role IN ('Admin', 'Manager', 'Staff')
      )
    );
  END IF;
END $$;

-- Authorized contacts policies
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'authorized_contacts' AND policyname = 'Authenticated users can read authorized contacts') THEN
    CREATE POLICY "Authenticated users can read authorized contacts" ON authorized_contacts FOR SELECT TO authenticated USING (true);
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'authorized_contacts' AND policyname = 'Staff can manage authorized contacts') THEN
    CREATE POLICY "Staff can manage authorized contacts" ON authorized_contacts FOR ALL TO authenticated USING (
      EXISTS (
        SELECT 1 FROM users
        WHERE users.id = auth.uid() AND users.role IN ('Admin', 'Manager', 'Staff')
      )
    );
  END IF;
END $$;

-- Check in/outs policies
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'check_in_outs' AND policyname = 'Authenticated users can read check in outs') THEN
    CREATE POLICY "Authenticated users can read check in outs" ON check_in_outs FOR SELECT TO authenticated USING (true);
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'check_in_outs' AND policyname = 'Staff can manage check in outs') THEN
    CREATE POLICY "Staff can manage check in outs" ON check_in_outs FOR ALL TO authenticated USING (
      EXISTS (
        SELECT 1 FROM users
        WHERE users.id = auth.uid() AND users.role IN ('Admin', 'Manager', 'Staff')
      )
    );
  END IF;
END $$;

-- Service items policies
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'service_items' AND policyname = 'Authenticated users can read service items') THEN
    CREATE POLICY "Authenticated users can read service items" ON service_items FOR SELECT TO authenticated USING (true);
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'service_items' AND policyname = 'Staff can manage service items') THEN
    CREATE POLICY "Staff can manage service items" ON service_items FOR ALL TO authenticated USING (
      EXISTS (
        SELECT 1 FROM users
        WHERE users.id = auth.uid() AND users.role IN ('Admin', 'Manager', 'Staff')
      )
    );
  END IF;
END $$;

-- Vehicle photos policies
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'vehicle_photos' AND policyname = 'Authenticated users can read vehicle photos') THEN
    CREATE POLICY "Authenticated users can read vehicle photos" ON vehicle_photos FOR SELECT TO authenticated USING (true);
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'vehicle_photos' AND policyname = 'Staff can manage vehicle photos') THEN
    CREATE POLICY "Staff can manage vehicle photos" ON vehicle_photos FOR ALL TO authenticated USING (
      EXISTS (
        SELECT 1 FROM users
        WHERE users.id = auth.uid() AND users.role IN ('Admin', 'Manager', 'Staff')
      )
    );
  END IF;
END $$;

-- Create updated_at trigger function if it doesn't exist
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at if they don't exist
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_users_updated_at') THEN
    CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_customers_updated_at') THEN
    CREATE TRIGGER update_customers_updated_at BEFORE UPDATE ON customers FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_vehicles_updated_at') THEN
    CREATE TRIGGER update_vehicles_updated_at BEFORE UPDATE ON vehicles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_check_in_outs_updated_at') THEN
    CREATE TRIGGER update_check_in_outs_updated_at BEFORE UPDATE ON check_in_outs FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_service_items_updated_at') THEN
    CREATE TRIGGER update_service_items_updated_at BEFORE UPDATE ON service_items FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
  END IF;
END $$;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_customers_email ON customers(email);
CREATE INDEX IF NOT EXISTS idx_customers_type ON customers(type);
CREATE INDEX IF NOT EXISTS idx_customers_membership_level ON customers(membership_level);
CREATE INDEX IF NOT EXISTS idx_vehicles_customer_id ON vehicles(customer_id);
CREATE INDEX IF NOT EXISTS idx_vehicles_vin ON vehicles(vin);
CREATE INDEX IF NOT EXISTS idx_vehicles_license_plate ON vehicles(license_plate);
CREATE INDEX IF NOT EXISTS idx_authorized_drivers_vehicle_id ON authorized_drivers(vehicle_id);
CREATE INDEX IF NOT EXISTS idx_authorized_contacts_vehicle_id ON authorized_contacts(vehicle_id);
CREATE INDEX IF NOT EXISTS idx_check_in_outs_vehicle_id ON check_in_outs(vehicle_id);
CREATE INDEX IF NOT EXISTS idx_check_in_outs_customer_id ON check_in_outs(customer_id);
CREATE INDEX IF NOT EXISTS idx_check_in_outs_date ON check_in_outs(date);
CREATE INDEX IF NOT EXISTS idx_check_in_outs_status ON check_in_outs(status);
CREATE INDEX IF NOT EXISTS idx_service_items_check_in_out_id ON service_items(check_in_out_id);
CREATE INDEX IF NOT EXISTS idx_vehicle_photos_check_in_out_id ON vehicle_photos(check_in_out_id);

-- Insert sample user data if the table is empty
INSERT INTO users (first_name, last_name, email, password, role, is_active, created_at, updated_at)
SELECT 'Admin', 'User', 'admin@autoservice.com', 'admin123', 'Admin', true, now(), now()
WHERE NOT EXISTS (SELECT 1 FROM users WHERE email = 'admin@autoservice.com');

INSERT INTO users (first_name, last_name, email, password, role, is_active, created_at, updated_at)
SELECT 'John', 'Manager', 'john.manager@autoservice.com', 'manager123', 'Manager', true, now(), now()
WHERE NOT EXISTS (SELECT 1 FROM users WHERE email = 'john.manager@autoservice.com');

INSERT INTO users (first_name, last_name, email, password, role, is_active, created_at, updated_at)
SELECT 'Sarah', 'Staff', 'sarah.staff@autoservice.com', 'staff123', 'Staff', true, now(), now()
WHERE NOT EXISTS (SELECT 1 FROM users WHERE email = 'sarah.staff@autoservice.com');

INSERT INTO users (first_name, last_name, email, password, role, is_active, created_at, updated_at)
SELECT 'Viewer', 'User', 'viewer@autoservice.com', 'viewer123', 'Viewer', true, now(), now()
WHERE NOT EXISTS (SELECT 1 FROM users WHERE email = 'viewer@autoservice.com');