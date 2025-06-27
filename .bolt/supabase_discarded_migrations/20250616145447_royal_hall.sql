/*
  # Initial Schema Setup for AutoService CRM

  1. New Tables
    - `users` - System users (admin, manager, staff)
    - `customers` - Storage customers
    - `vehicles` - Customer vehicles
    - `authorized_drivers` - Vehicle authorized drivers
    - `authorized_contacts` - Vehicle authorized contacts
    - `check_in_outs` - Vehicle check-in/out records
    - `service_items` - Service items for check-in/out records
    - `appointments` - Customer appointments
    - `vehicle_photos` - Vehicle inspection photos

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create enum types
CREATE TYPE user_role AS ENUM ('Admin', 'Manager', 'Staff', 'Viewer');
CREATE TYPE customer_type AS ENUM ('Individual', 'Business', 'Corporate');
CREATE TYPE membership_level AS ENUM ('Basic', 'Premium', 'VIP', 'Enterprise');
CREATE TYPE battery_type AS ENUM ('Standard', 'AGM', 'Lithium', 'Gel', 'Other');
CREATE TYPE check_status AS ENUM ('CHECKED_IN', 'IN_SERVICE', 'CHECKED_OUT');
CREATE TYPE check_type AS ENUM ('CHECK_IN', 'CHECK_OUT');
CREATE TYPE appointment_status AS ENUM ('SCHEDULED', 'COMPLETED', 'CANCELED');

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name text NOT NULL,
  last_name text NOT NULL,
  email text UNIQUE NOT NULL,
  password text NOT NULL,
  role user_role NOT NULL DEFAULT 'Staff',
  avatar text,
  phone text,
  department text,
  last_login timestamptz,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Customers table
CREATE TABLE IF NOT EXISTS customers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name text NOT NULL,
  last_name text NOT NULL,
  type customer_type NOT NULL DEFAULT 'Individual',
  membership_level membership_level NOT NULL DEFAULT 'Basic',
  storage_location text NOT NULL,
  email text UNIQUE NOT NULL,
  phone text NOT NULL,
  street_address text NOT NULL,
  city text NOT NULL,
  state text NOT NULL,
  zip_code text NOT NULL,
  storage_spots integer NOT NULL DEFAULT 1,
  show_panda_doc_form boolean DEFAULT false,
  date_created date DEFAULT CURRENT_DATE,
  password text NOT NULL,
  magic_link text,
  num_rows integer NOT NULL DEFAULT 1,
  manual_price decimal(10,2),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Vehicles table
CREATE TABLE IF NOT EXISTS vehicles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id uuid NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
  year integer NOT NULL,
  make text NOT NULL,
  model text NOT NULL,
  vin text NOT NULL UNIQUE,
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
  odometer integer NOT NULL DEFAULT 0,
  image text,
  fuel_level integer NOT NULL DEFAULT 100,
  battery_type battery_type NOT NULL DEFAULT 'Standard',
  color text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Authorized drivers table
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

-- Authorized contacts table
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

-- Check in/out records table
CREATE TABLE IF NOT EXISTS check_in_outs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  vehicle_id uuid NOT NULL REFERENCES vehicles(id) ON DELETE CASCADE,
  customer_id uuid NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
  date date NOT NULL DEFAULT CURRENT_DATE,
  type check_type NOT NULL,
  location text NOT NULL,
  contact text NOT NULL,
  status check_status NOT NULL DEFAULT 'CHECKED_IN',
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

-- Service items table
CREATE TABLE IF NOT EXISTS service_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  check_in_out_id uuid NOT NULL REFERENCES check_in_outs(id) ON DELETE CASCADE,
  description text NOT NULL,
  cost decimal(10,2) NOT NULL DEFAULT 0,
  completed boolean DEFAULT false,
  completed_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Vehicle photos table
CREATE TABLE IF NOT EXISTS vehicle_photos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  check_in_out_id uuid NOT NULL REFERENCES check_in_outs(id) ON DELETE CASCADE,
  photo_type text NOT NULL,
  photo_url text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Appointments table
CREATE TABLE IF NOT EXISTS appointments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id uuid NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
  vehicle_id uuid REFERENCES vehicles(id) ON DELETE SET NULL,
  date date NOT NULL,
  time time NOT NULL,
  duration integer NOT NULL DEFAULT 60,
  reason text NOT NULL,
  status appointment_status NOT NULL DEFAULT 'SCHEDULED',
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE vehicles ENABLE ROW LEVEL SECURITY;
ALTER TABLE authorized_drivers ENABLE ROW LEVEL SECURITY;
ALTER TABLE authorized_contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE check_in_outs ENABLE ROW LEVEL SECURITY;
ALTER TABLE service_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE vehicle_photos ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;

-- Create policies for authenticated users
CREATE POLICY "Users can read all data" ON users FOR SELECT TO authenticated USING (true);
CREATE POLICY "Users can update own profile" ON users FOR UPDATE TO authenticated USING (auth.uid()::text = id::text);

CREATE POLICY "Users can read all customers" ON customers FOR SELECT TO authenticated USING (true);
CREATE POLICY "Users can insert customers" ON customers FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Users can update customers" ON customers FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Users can delete customers" ON customers FOR DELETE TO authenticated USING (true);

CREATE POLICY "Users can read all vehicles" ON vehicles FOR SELECT TO authenticated USING (true);
CREATE POLICY "Users can insert vehicles" ON vehicles FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Users can update vehicles" ON vehicles FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Users can delete vehicles" ON vehicles FOR DELETE TO authenticated USING (true);

CREATE POLICY "Users can read all authorized drivers" ON authorized_drivers FOR SELECT TO authenticated USING (true);
CREATE POLICY "Users can insert authorized drivers" ON authorized_drivers FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Users can update authorized drivers" ON authorized_drivers FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Users can delete authorized drivers" ON authorized_drivers FOR DELETE TO authenticated USING (true);

CREATE POLICY "Users can read all authorized contacts" ON authorized_contacts FOR SELECT TO authenticated USING (true);
CREATE POLICY "Users can insert authorized contacts" ON authorized_contacts FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Users can update authorized contacts" ON authorized_contacts FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Users can delete authorized contacts" ON authorized_contacts FOR DELETE TO authenticated USING (true);

CREATE POLICY "Users can read all check in/outs" ON check_in_outs FOR SELECT TO authenticated USING (true);
CREATE POLICY "Users can insert check in/outs" ON check_in_outs FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Users can update check in/outs" ON check_in_outs FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Users can delete check in/outs" ON check_in_outs FOR DELETE TO authenticated USING (true);

CREATE POLICY "Users can read all service items" ON service_items FOR SELECT TO authenticated USING (true);
CREATE POLICY "Users can insert service items" ON service_items FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Users can update service items" ON service_items FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Users can delete service items" ON service_items FOR DELETE TO authenticated USING (true);

CREATE POLICY "Users can read all vehicle photos" ON vehicle_photos FOR SELECT TO authenticated USING (true);
CREATE POLICY "Users can insert vehicle photos" ON vehicle_photos FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Users can update vehicle photos" ON vehicle_photos FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Users can delete vehicle photos" ON vehicle_photos FOR DELETE TO authenticated USING (true);

CREATE POLICY "Users can read all appointments" ON appointments FOR SELECT TO authenticated USING (true);
CREATE POLICY "Users can insert appointments" ON appointments FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Users can update appointments" ON appointments FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Users can delete appointments" ON appointments FOR DELETE TO authenticated USING (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_customers_email ON customers(email);
CREATE INDEX IF NOT EXISTS idx_vehicles_customer_id ON vehicles(customer_id);
CREATE INDEX IF NOT EXISTS idx_vehicles_vin ON vehicles(vin);
CREATE INDEX IF NOT EXISTS idx_authorized_drivers_vehicle_id ON authorized_drivers(vehicle_id);
CREATE INDEX IF NOT EXISTS idx_authorized_contacts_vehicle_id ON authorized_contacts(vehicle_id);
CREATE INDEX IF NOT EXISTS idx_check_in_outs_vehicle_id ON check_in_outs(vehicle_id);
CREATE INDEX IF NOT EXISTS idx_check_in_outs_customer_id ON check_in_outs(customer_id);
CREATE INDEX IF NOT EXISTS idx_check_in_outs_date ON check_in_outs(date);
CREATE INDEX IF NOT EXISTS idx_service_items_check_in_out_id ON service_items(check_in_out_id);
CREATE INDEX IF NOT EXISTS idx_vehicle_photos_check_in_out_id ON vehicle_photos(check_in_out_id);
CREATE INDEX IF NOT EXISTS idx_appointments_customer_id ON appointments(customer_id);
CREATE INDEX IF NOT EXISTS idx_appointments_vehicle_id ON appointments(vehicle_id);
CREATE INDEX IF NOT EXISTS idx_appointments_date ON appointments(date);

-- Create updated_at trigger function
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
CREATE TRIGGER update_appointments_updated_at BEFORE UPDATE ON appointments FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();