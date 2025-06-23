/*
  # Initial database schema for AutoService CRM

  1. New Tables
    - `users` - System users with roles and permissions
    - `customers` - Customer information and storage details
    - `vehicles` - Vehicle details and specifications
    - `authorized_drivers` - People authorized to drive specific vehicles
    - `authorized_contacts` - People authorized for pickup/dropoff
    - `check_in_outs` - Vehicle check-in and check-out records
    - `service_items` - Services performed during check-in/out
    - `vehicle_photos` - Photos taken during vehicle inspections

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create custom types
CREATE TYPE customer_type AS ENUM ('Individual', 'Business');
CREATE TYPE membership_level AS ENUM ('Basic', 'Premium', 'VIP', 'Enterprise');
CREATE TYPE battery_type AS ENUM ('Standard', 'AGM', 'Lithium', 'Gel', 'Other');
CREATE TYPE check_status AS ENUM ('CHECKED_IN', 'IN_SERVICE', 'CHECKED_OUT');
CREATE TYPE check_type AS ENUM ('CHECK_IN', 'CHECK_OUT');
CREATE TYPE user_role AS ENUM ('Admin', 'Manager', 'Staff', 'Viewer');

-- Create users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  role user_role NOT NULL DEFAULT 'Staff',
  avatar TEXT,
  phone TEXT,
  department TEXT,
  last_login TIMESTAMPTZ,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create customers table
CREATE TABLE customers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  type customer_type NOT NULL DEFAULT 'Individual',
  membership_level membership_level NOT NULL DEFAULT 'Basic',
  storage_location TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  phone TEXT NOT NULL,
  street_address TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  zip_code TEXT NOT NULL,
  storage_spots INTEGER NOT NULL DEFAULT 1,
  show_panda_doc_form BOOLEAN NOT NULL DEFAULT false,
  date_created TEXT NOT NULL,
  password TEXT NOT NULL,
  num_rows INTEGER NOT NULL DEFAULT 1,
  manual_price DECIMAL(10, 2),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create vehicles table
CREATE TABLE vehicles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
  year INTEGER NOT NULL,
  make TEXT NOT NULL,
  model TEXT NOT NULL,
  vin TEXT UNIQUE NOT NULL,
  storage_location TEXT NOT NULL,
  fair_market_value DECIMAL(10, 2) NOT NULL,
  insurance_rider_required BOOLEAN NOT NULL DEFAULT false,
  insurance_rider_amount DECIMAL(10, 2),
  license_plate TEXT NOT NULL,
  registration_number TEXT NOT NULL,
  registration_state TEXT NOT NULL,
  registration_expiration_date TEXT NOT NULL,
  tire_pressure_default_front INTEGER NOT NULL DEFAULT 32,
  tire_pressure_default_rear INTEGER NOT NULL DEFAULT 30,
  tire_pressure_preferred_front INTEGER NOT NULL DEFAULT 34,
  tire_pressure_preferred_rear INTEGER NOT NULL DEFAULT 32,
  last_service_date TEXT,
  next_service_date TEXT,
  service_interval INTEGER NOT NULL DEFAULT 6,
  maintenance_notes TEXT,
  odometer INTEGER NOT NULL DEFAULT 0,
  image TEXT,
  fuel_level INTEGER NOT NULL DEFAULT 100,
  battery_type battery_type NOT NULL DEFAULT 'Standard',
  color TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create authorized_drivers table
CREATE TABLE authorized_drivers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vehicle_id UUID NOT NULL REFERENCES vehicles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  phone TEXT,
  email TEXT,
  license_number TEXT,
  relationship TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create authorized_contacts table
CREATE TABLE authorized_contacts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vehicle_id UUID NOT NULL REFERENCES vehicles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  relationship TEXT,
  can_dropoff BOOLEAN NOT NULL DEFAULT false,
  can_pickup BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create check_in_outs table
CREATE TABLE check_in_outs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vehicle_id UUID NOT NULL REFERENCES vehicles(id) ON DELETE CASCADE,
  customer_id UUID NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
  date TEXT NOT NULL,
  type check_type NOT NULL,
  location TEXT NOT NULL,
  contact TEXT NOT NULL,
  status check_status NOT NULL DEFAULT 'CHECKED_IN',
  check_in_date TIMESTAMPTZ,
  check_out_date TIMESTAMPTZ,
  fuel_level INTEGER,
  mileage INTEGER,
  tire_pressure_passenger_front INTEGER,
  tire_pressure_passenger_rear INTEGER,
  tire_pressure_driver_front INTEGER,
  tire_pressure_driver_rear INTEGER,
  car_cover BOOLEAN NOT NULL DEFAULT false,
  kill_switch BOOLEAN NOT NULL DEFAULT false,
  startup_directions TEXT,
  delivery_address TEXT,
  notes TEXT,
  signature TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create service_items table
CREATE TABLE service_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  check_in_out_id UUID NOT NULL REFERENCES check_in_outs(id) ON DELETE CASCADE,
  description TEXT NOT NULL,
  cost DECIMAL(10, 2) NOT NULL DEFAULT 0,
  completed BOOLEAN NOT NULL DEFAULT false,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create vehicle_photos table
CREATE TABLE vehicle_photos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  check_in_out_id UUID NOT NULL REFERENCES check_in_outs(id) ON DELETE CASCADE,
  photo_type TEXT NOT NULL,
  photo_url TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create function to update updated_at column
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_customers_updated_at
BEFORE UPDATE ON customers
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_vehicles_updated_at
BEFORE UPDATE ON vehicles
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_check_in_outs_updated_at
BEFORE UPDATE ON check_in_outs
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_service_items_updated_at
BEFORE UPDATE ON service_items
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_users_updated_at
BEFORE UPDATE ON users
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE vehicles ENABLE ROW LEVEL SECURITY;
ALTER TABLE authorized_drivers ENABLE ROW LEVEL SECURITY;
ALTER TABLE authorized_contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE check_in_outs ENABLE ROW LEVEL SECURITY;
ALTER TABLE service_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE vehicle_photos ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for users
CREATE POLICY "Users can read all users" 
ON users FOR SELECT 
TO authenticated 
USING (true);

CREATE POLICY "Users can update own profile" 
ON users FOR UPDATE 
TO authenticated 
USING (((auth.uid())::text = (id)::text));

-- Create RLS policies for customers
CREATE POLICY "Users can read all customers" 
ON customers FOR SELECT 
TO authenticated 
USING (true);

CREATE POLICY "Users can insert customers" 
ON customers FOR INSERT 
TO authenticated 
WITH CHECK (true);

CREATE POLICY "Users can update customers" 
ON customers FOR UPDATE 
TO authenticated 
USING (true);

CREATE POLICY "Users can delete customers" 
ON customers FOR DELETE 
TO authenticated 
USING (true);

-- Create RLS policies for vehicles
CREATE POLICY "Users can read all vehicles" 
ON vehicles FOR SELECT 
TO authenticated 
USING (true);

CREATE POLICY "Users can insert vehicles" 
ON vehicles FOR INSERT 
TO authenticated 
WITH CHECK (true);

CREATE POLICY "Users can update vehicles" 
ON vehicles FOR UPDATE 
TO authenticated 
USING (true);

CREATE POLICY "Users can delete vehicles" 
ON vehicles FOR DELETE 
TO authenticated 
USING (true);

-- Create RLS policies for authorized_drivers
CREATE POLICY "Users can read all authorized drivers" 
ON authorized_drivers FOR SELECT 
TO authenticated 
USING (true);

CREATE POLICY "Users can insert authorized drivers" 
ON authorized_drivers FOR INSERT 
TO authenticated 
WITH CHECK (true);

CREATE POLICY "Users can update authorized drivers" 
ON authorized_drivers FOR UPDATE 
TO authenticated 
USING (true);

CREATE POLICY "Users can delete authorized drivers" 
ON authorized_drivers FOR DELETE 
TO authenticated 
USING (true);

-- Create RLS policies for authorized_contacts
CREATE POLICY "Users can read all authorized contacts" 
ON authorized_contacts FOR SELECT 
TO authenticated 
USING (true);

CREATE POLICY "Users can insert authorized contacts" 
ON authorized_contacts FOR INSERT 
TO authenticated 
WITH CHECK (true);

CREATE POLICY "Users can update authorized contacts" 
ON authorized_contacts FOR UPDATE 
TO authenticated 
USING (true);

CREATE POLICY "Users can delete authorized contacts" 
ON authorized_contacts FOR DELETE 
TO authenticated 
USING (true);

-- Create RLS policies for check_in_outs
CREATE POLICY "Users can read all check in/outs" 
ON check_in_outs FOR SELECT 
TO authenticated 
USING (true);

CREATE POLICY "Users can insert check in/outs" 
ON check_in_outs FOR INSERT 
TO authenticated 
WITH CHECK (true);

CREATE POLICY "Users can update check in/outs" 
ON check_in_outs FOR UPDATE 
TO authenticated 
USING (true);

CREATE POLICY "Users can delete check in/outs" 
ON check_in_outs FOR DELETE 
TO authenticated 
USING (true);

-- Create RLS policies for service_items
CREATE POLICY "Users can read all service items" 
ON service_items FOR SELECT 
TO authenticated 
USING (true);

CREATE POLICY "Users can insert service items" 
ON service_items FOR INSERT 
TO authenticated 
WITH CHECK (true);

CREATE POLICY "Users can update service items" 
ON service_items FOR UPDATE 
TO authenticated 
USING (true);

CREATE POLICY "Users can delete service items" 
ON service_items FOR DELETE 
TO authenticated 
USING (true);

-- Create RLS policies for vehicle_photos
CREATE POLICY "Users can read all vehicle photos" 
ON vehicle_photos FOR SELECT 
TO authenticated 
USING (true);

CREATE POLICY "Users can insert vehicle photos" 
ON vehicle_photos FOR INSERT 
TO authenticated 
WITH CHECK (true);

CREATE POLICY "Users can update vehicle photos" 
ON vehicle_photos FOR UPDATE 
TO authenticated 
USING (true);

CREATE POLICY "Users can delete vehicle photos" 
ON vehicle_photos FOR DELETE 
TO authenticated 
USING (true);