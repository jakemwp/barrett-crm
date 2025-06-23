/*
  # Complete Database Schema for Barrett Automotive CRM

  1. Custom Types (Enums)
    - customer_type: Individual, Business
    - membership_level: Basic, Premium, VIP, Enterprise
    - battery_type: Standard, AGM, Lithium, Gel, Other
    - check_status: CHECKED_IN, IN_SERVICE, CHECKED_OUT
    - check_type: CHECK_IN, CHECK_OUT
    - user_role: Admin, Manager, Staff, Viewer

  2. Tables
    - users: System users with authentication
    - customers: Customer information and storage details
    - vehicles: Vehicle details and specifications
    - authorized_drivers: Drivers authorized for each vehicle
    - authorized_contacts: Emergency/pickup contacts for vehicles
    - check_in_outs: Vehicle service records
    - service_items: Individual service items for each check-in/out
    - vehicle_photos: Photo documentation for inspections

  3. Security
    - Enable RLS on all tables
    - Add appropriate policies for data access
    - Create triggers for automatic timestamp updates
*/

-- Create custom types (enums)
CREATE TYPE customer_type AS ENUM ('Individual', 'Business');
CREATE TYPE membership_level AS ENUM ('Basic', 'Premium', 'VIP', 'Enterprise');
CREATE TYPE battery_type AS ENUM ('Standard', 'AGM', 'Lithium', 'Gel', 'Other');
CREATE TYPE check_status AS ENUM ('CHECKED_IN', 'IN_SERVICE', 'CHECKED_OUT');
CREATE TYPE check_type AS ENUM ('CHECK_IN', 'CHECK_OUT');
CREATE TYPE user_role AS ENUM ('Admin', 'Manager', 'Staff', 'Viewer');

-- Create users table
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

-- Create customers table
CREATE TABLE IF NOT EXISTS customers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name text NOT NULL,
  last_name text NOT NULL,
  type customer_type DEFAULT 'Individual',
  membership_level membership_level DEFAULT 'Basic',
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
  manual_price decimal(10,2),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create vehicles table
CREATE TABLE IF NOT EXISTS vehicles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id uuid NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
  year integer NOT NULL,
  make text NOT NULL,
  model text NOT NULL,
  vin text UNIQUE NOT NULL,
  storage_location text NOT NULL,
  fair_market_value decimal(10,2) NOT NULL,
  insurance_rider_required boolean DEFAULT false,
  insurance_rider_amount decimal(10,2),
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

-- Create authorized_drivers table
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

-- Create authorized_contacts table
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

-- Create check_in_outs table
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

-- Create service_items table
CREATE TABLE IF NOT EXISTS service_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  check_in_out_id uuid NOT NULL REFERENCES check_in_outs(id) ON DELETE CASCADE,
  description text NOT NULL,
  cost decimal(10,2) DEFAULT 0,
  completed boolean DEFAULT false,
  completed_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create vehicle_photos table
CREATE TABLE IF NOT EXISTS vehicle_photos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  check_in_out_id uuid NOT NULL REFERENCES check_in_outs(id) ON DELETE CASCADE,
  photo_type text NOT NULL,
  photo_url text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_customers_updated_at BEFORE UPDATE ON customers FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_vehicles_updated_at BEFORE UPDATE ON vehicles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_check_in_outs_updated_at BEFORE UPDATE ON check_in_outs FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_service_items_updated_at BEFORE UPDATE ON service_items FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE vehicles ENABLE ROW LEVEL SECURITY;
ALTER TABLE authorized_drivers ENABLE ROW LEVEL SECURITY;
ALTER TABLE authorized_contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE check_in_outs ENABLE ROW LEVEL SECURITY;
ALTER TABLE service_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE vehicle_photos ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for users table
CREATE POLICY "Users can read own data" ON users FOR SELECT TO authenticated USING (auth.uid() = id);
CREATE POLICY "Users can update own data" ON users FOR UPDATE TO authenticated USING (auth.uid() = id);
CREATE POLICY "Admins can read all users" ON users FOR SELECT TO authenticated USING (
  EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'Admin')
);
CREATE POLICY "Admins can insert users" ON users FOR INSERT TO authenticated WITH CHECK (
  EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'Admin')
);
CREATE POLICY "Admins can update all users" ON users FOR UPDATE TO authenticated USING (
  EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'Admin')
);

-- Create RLS policies for customers table
CREATE POLICY "Authenticated users can read customers" ON customers FOR SELECT TO authenticated USING (true);
CREATE POLICY "Staff can insert customers" ON customers FOR INSERT TO authenticated WITH CHECK (
  EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role IN ('Admin', 'Manager', 'Staff'))
);
CREATE POLICY "Staff can update customers" ON customers FOR UPDATE TO authenticated USING (
  EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role IN ('Admin', 'Manager', 'Staff'))
);
CREATE POLICY "Admins can delete customers" ON customers FOR DELETE TO authenticated USING (
  EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'Admin')
);

-- Create RLS policies for vehicles table
CREATE POLICY "Authenticated users can read vehicles" ON vehicles FOR SELECT TO authenticated USING (true);
CREATE POLICY "Staff can insert vehicles" ON vehicles FOR INSERT TO authenticated WITH CHECK (
  EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role IN ('Admin', 'Manager', 'Staff'))
);
CREATE POLICY "Staff can update vehicles" ON vehicles FOR UPDATE TO authenticated USING (
  EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role IN ('Admin', 'Manager', 'Staff'))
);
CREATE POLICY "Admins can delete vehicles" ON vehicles FOR DELETE TO authenticated USING (
  EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'Admin')
);

-- Create RLS policies for authorized_drivers table
CREATE POLICY "Authenticated users can read authorized drivers" ON authorized_drivers FOR SELECT TO authenticated USING (true);
CREATE POLICY "Staff can manage authorized drivers" ON authorized_drivers FOR ALL TO authenticated USING (
  EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role IN ('Admin', 'Manager', 'Staff'))
);

-- Create RLS policies for authorized_contacts table
CREATE POLICY "Authenticated users can read authorized contacts" ON authorized_contacts FOR SELECT TO authenticated USING (true);
CREATE POLICY "Staff can manage authorized contacts" ON authorized_contacts FOR ALL TO authenticated USING (
  EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role IN ('Admin', 'Manager', 'Staff'))
);

-- Create RLS policies for check_in_outs table
CREATE POLICY "Authenticated users can read check in outs" ON check_in_outs FOR SELECT TO authenticated USING (true);
CREATE POLICY "Staff can manage check in outs" ON check_in_outs FOR ALL TO authenticated USING (
  EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role IN ('Admin', 'Manager', 'Staff'))
);

-- Create RLS policies for service_items table
CREATE POLICY "Authenticated users can read service items" ON service_items FOR SELECT TO authenticated USING (true);
CREATE POLICY "Staff can manage service items" ON service_items FOR ALL TO authenticated USING (
  EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role IN ('Admin', 'Manager', 'Staff'))
);

-- Create RLS policies for vehicle_photos table
CREATE POLICY "Authenticated users can read vehicle photos" ON vehicle_photos FOR SELECT TO authenticated USING (true);
CREATE POLICY "Staff can manage vehicle photos" ON vehicle_photos FOR ALL TO authenticated USING (
  EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role IN ('Admin', 'Manager', 'Staff'))
);

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
CREATE INDEX IF NOT EXISTS idx_check_in_outs_status ON check_in_outs(status);
CREATE INDEX IF NOT EXISTS idx_check_in_outs_date ON check_in_outs(date);
CREATE INDEX IF NOT EXISTS idx_service_items_check_in_out_id ON service_items(check_in_out_id);
CREATE INDEX IF NOT EXISTS idx_vehicle_photos_check_in_out_id ON vehicle_photos(check_in_out_id);