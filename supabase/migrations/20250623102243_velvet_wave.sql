/*
  # Update schema to match mock-data.ts structure

  1. Schema Updates
    - Update customer_type enum to remove 'Corporate'
    - Drop appointments table as it's no longer used
    - Update customers table to match current structure
    - Update vehicles table to ensure storage_location is set to 'Moorpark'
    - Update check_in_outs table to match current structure

  2. Security
    - Maintain existing RLS policies
*/

-- Update customer_type enum to remove 'Corporate'
ALTER TYPE customer_type DROP ATTRIBUTE 'Corporate';

-- Drop appointments table as it's no longer used
DROP TABLE IF EXISTS appointments CASCADE;

-- Update customers table to match current structure
DO $$ 
BEGIN
  -- Check if magic_link column exists and drop it if it does
  IF EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'customers' AND column_name = 'magic_link'
  ) THEN
    ALTER TABLE customers DROP COLUMN magic_link;
  END IF;
END $$;

-- Update vehicles table to ensure storage_location is set to 'Moorpark'
UPDATE vehicles SET storage_location = 'Moorpark' WHERE storage_location != 'Moorpark';

-- Add default values for vehicle fields if they don't exist
ALTER TABLE vehicles 
  ALTER COLUMN odometer SET DEFAULT 0,
  ALTER COLUMN fuel_level SET DEFAULT 100,
  ALTER COLUMN battery_type SET DEFAULT 'Standard'::battery_type;

-- Update check_in_outs table to match current structure
-- Add default values for check_in_outs fields if they don't exist
ALTER TABLE check_in_outs 
  ALTER COLUMN status SET DEFAULT 'CHECKED_IN'::check_status,
  ALTER COLUMN car_cover SET DEFAULT false,
  ALTER COLUMN kill_switch SET DEFAULT false;

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add triggers for updated_at if they don't exist
DO $$ 
BEGIN
  -- For customers table
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger 
    WHERE tgname = 'update_customers_updated_at'
  ) THEN
    CREATE TRIGGER update_customers_updated_at
    BEFORE UPDATE ON customers
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
  END IF;

  -- For vehicles table
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger 
    WHERE tgname = 'update_vehicles_updated_at'
  ) THEN
    CREATE TRIGGER update_vehicles_updated_at
    BEFORE UPDATE ON vehicles
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
  END IF;

  -- For check_in_outs table
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger 
    WHERE tgname = 'update_check_in_outs_updated_at'
  ) THEN
    CREATE TRIGGER update_check_in_outs_updated_at
    BEFORE UPDATE ON check_in_outs
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
  END IF;

  -- For service_items table
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger 
    WHERE tgname = 'update_service_items_updated_at'
  ) THEN
    CREATE TRIGGER update_service_items_updated_at
    BEFORE UPDATE ON service_items
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
  END IF;
END $$;

-- Update RLS policies to ensure they're properly set
-- For customers table
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;

-- Ensure RLS policies exist for customers
DO $$ 
BEGIN
  -- Check if policy exists before creating
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'customers' AND policyname = 'Users can read all customers'
  ) THEN
    CREATE POLICY "Users can read all customers" 
    ON customers FOR SELECT 
    TO authenticated 
    USING (true);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'customers' AND policyname = 'Users can insert customers'
  ) THEN
    CREATE POLICY "Users can insert customers" 
    ON customers FOR INSERT 
    TO authenticated 
    WITH CHECK (true);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'customers' AND policyname = 'Users can update customers'
  ) THEN
    CREATE POLICY "Users can update customers" 
    ON customers FOR UPDATE 
    TO authenticated 
    USING (true);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'customers' AND policyname = 'Users can delete customers'
  ) THEN
    CREATE POLICY "Users can delete customers" 
    ON customers FOR DELETE 
    TO authenticated 
    USING (true);
  END IF;
END $$;

-- For vehicles table
ALTER TABLE vehicles ENABLE ROW LEVEL SECURITY;

-- Ensure RLS policies exist for vehicles
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'vehicles' AND policyname = 'Users can read all vehicles'
  ) THEN
    CREATE POLICY "Users can read all vehicles" 
    ON vehicles FOR SELECT 
    TO authenticated 
    USING (true);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'vehicles' AND policyname = 'Users can insert vehicles'
  ) THEN
    CREATE POLICY "Users can insert vehicles" 
    ON vehicles FOR INSERT 
    TO authenticated 
    WITH CHECK (true);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'vehicles' AND policyname = 'Users can update vehicles'
  ) THEN
    CREATE POLICY "Users can update vehicles" 
    ON vehicles FOR UPDATE 
    TO authenticated 
    USING (true);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'vehicles' AND policyname = 'Users can delete vehicles'
  ) THEN
    CREATE POLICY "Users can delete vehicles" 
    ON vehicles FOR DELETE 
    TO authenticated 
    USING (true);
  END IF;
END $$;

-- For check_in_outs table
ALTER TABLE check_in_outs ENABLE ROW LEVEL SECURITY;

-- Ensure RLS policies exist for check_in_outs
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'check_in_outs' AND policyname = 'Users can read all check in/outs'
  ) THEN
    CREATE POLICY "Users can read all check in/outs" 
    ON check_in_outs FOR SELECT 
    TO authenticated 
    USING (true);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'check_in_outs' AND policyname = 'Users can insert check in/outs'
  ) THEN
    CREATE POLICY "Users can insert check in/outs" 
    ON check_in_outs FOR INSERT 
    TO authenticated 
    WITH CHECK (true);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'check_in_outs' AND policyname = 'Users can update check in/outs'
  ) THEN
    CREATE POLICY "Users can update check in/outs" 
    ON check_in_outs FOR UPDATE 
    TO authenticated 
    USING (true);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'check_in_outs' AND policyname = 'Users can delete check in/outs'
  ) THEN
    CREATE POLICY "Users can delete check in/outs" 
    ON check_in_outs FOR DELETE 
    TO authenticated 
    USING (true);
  END IF;
END $$;

-- For service_items table
ALTER TABLE service_items ENABLE ROW LEVEL SECURITY;

-- Ensure RLS policies exist for service_items
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'service_items' AND policyname = 'Users can read all service items'
  ) THEN
    CREATE POLICY "Users can read all service items" 
    ON service_items FOR SELECT 
    TO authenticated 
    USING (true);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'service_items' AND policyname = 'Users can insert service items'
  ) THEN
    CREATE POLICY "Users can insert service items" 
    ON service_items FOR INSERT 
    TO authenticated 
    WITH CHECK (true);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'service_items' AND policyname = 'Users can update service items'
  ) THEN
    CREATE POLICY "Users can update service items" 
    ON service_items FOR UPDATE 
    TO authenticated 
    USING (true);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'service_items' AND policyname = 'Users can delete service items'
  ) THEN
    CREATE POLICY "Users can delete service items" 
    ON service_items FOR DELETE 
    TO authenticated 
    USING (true);
  END IF;
END $$;

-- For vehicle_photos table
ALTER TABLE vehicle_photos ENABLE ROW LEVEL SECURITY;

-- Ensure RLS policies exist for vehicle_photos
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'vehicle_photos' AND policyname = 'Users can read all vehicle photos'
  ) THEN
    CREATE POLICY "Users can read all vehicle photos" 
    ON vehicle_photos FOR SELECT 
    TO authenticated 
    USING (true);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'vehicle_photos' AND policyname = 'Users can insert vehicle photos'
  ) THEN
    CREATE POLICY "Users can insert vehicle photos" 
    ON vehicle_photos FOR INSERT 
    TO authenticated 
    WITH CHECK (true);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'vehicle_photos' AND policyname = 'Users can update vehicle photos'
  ) THEN
    CREATE POLICY "Users can update vehicle photos" 
    ON vehicle_photos FOR UPDATE 
    TO authenticated 
    USING (true);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'vehicle_photos' AND policyname = 'Users can delete vehicle photos'
  ) THEN
    CREATE POLICY "Users can delete vehicle photos" 
    ON vehicle_photos FOR DELETE 
    TO authenticated 
    USING (true);
  END IF;
END $$;

-- For authorized_drivers table
ALTER TABLE authorized_drivers ENABLE ROW LEVEL SECURITY;

-- Ensure RLS policies exist for authorized_drivers
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'authorized_drivers' AND policyname = 'Users can read all authorized drivers'
  ) THEN
    CREATE POLICY "Users can read all authorized drivers" 
    ON authorized_drivers FOR SELECT 
    TO authenticated 
    USING (true);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'authorized_drivers' AND policyname = 'Users can insert authorized drivers'
  ) THEN
    CREATE POLICY "Users can insert authorized drivers" 
    ON authorized_drivers FOR INSERT 
    TO authenticated 
    WITH CHECK (true);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'authorized_drivers' AND policyname = 'Users can update authorized drivers'
  ) THEN
    CREATE POLICY "Users can update authorized drivers" 
    ON authorized_drivers FOR UPDATE 
    TO authenticated 
    USING (true);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'authorized_drivers' AND policyname = 'Users can delete authorized drivers'
  ) THEN
    CREATE POLICY "Users can delete authorized drivers" 
    ON authorized_drivers FOR DELETE 
    TO authenticated 
    USING (true);
  END IF;
END $$;

-- For authorized_contacts table
ALTER TABLE authorized_contacts ENABLE ROW LEVEL SECURITY;

-- Ensure RLS policies exist for authorized_contacts
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'authorized_contacts' AND policyname = 'Users can read all authorized contacts'
  ) THEN
    CREATE POLICY "Users can read all authorized contacts" 
    ON authorized_contacts FOR SELECT 
    TO authenticated 
    USING (true);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'authorized_contacts' AND policyname = 'Users can insert authorized contacts'
  ) THEN
    CREATE POLICY "Users can insert authorized contacts" 
    ON authorized_contacts FOR INSERT 
    TO authenticated 
    WITH CHECK (true);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'authorized_contacts' AND policyname = 'Users can update authorized contacts'
  ) THEN
    CREATE POLICY "Users can update authorized contacts" 
    ON authorized_contacts FOR UPDATE 
    TO authenticated 
    USING (true);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'authorized_contacts' AND policyname = 'Users can delete authorized contacts'
  ) THEN
    CREATE POLICY "Users can delete authorized contacts" 
    ON authorized_contacts FOR DELETE 
    TO authenticated 
    USING (true);
  END IF;
END $$;

-- For users table
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Ensure RLS policies exist for users
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'users' AND policyname = 'Users can read all data'
  ) THEN
    CREATE POLICY "Users can read all data" 
    ON users FOR SELECT 
    TO authenticated 
    USING (true);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'users' AND policyname = 'Users can update own profile'
  ) THEN
    CREATE POLICY "Users can update own profile" 
    ON users FOR UPDATE 
    TO authenticated 
    USING (((auth.uid())::text = (id)::text));
  END IF;
END $$;