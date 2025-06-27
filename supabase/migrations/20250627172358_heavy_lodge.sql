/*
  # Update schema to allow null values for customers and related tables

  1. Schema Updates
    - Modify customers table to allow null values for various fields
    - Modify vehicles table to allow null values for various fields
    - Modify check_in_outs table to allow null values for various fields
    - Ensure all related tables have appropriate null constraints

  2. Changes
    - Make non-essential fields nullable
    - Keep essential identifiers and foreign keys as NOT NULL
    - Ensure data integrity while allowing for incomplete records
*/

-- Update customers table to allow null values
ALTER TABLE IF EXISTS customers
  ALTER COLUMN first_name DROP NOT NULL,
  ALTER COLUMN storage_location DROP NOT NULL,
  ALTER COLUMN email DROP NOT NULL,
  ALTER COLUMN phone DROP NOT NULL,
  ALTER COLUMN street_address DROP NOT NULL,
  ALTER COLUMN city DROP NOT NULL,
  ALTER COLUMN state DROP NOT NULL,
  ALTER COLUMN zip_code DROP NOT NULL,
  ALTER COLUMN password DROP NOT NULL;

-- Update vehicles table to allow null values
ALTER TABLE IF EXISTS vehicles
  ALTER COLUMN year DROP NOT NULL,
  ALTER COLUMN make DROP NOT NULL,
  ALTER COLUMN model DROP NOT NULL,
  ALTER COLUMN vin DROP NOT NULL,
  ALTER COLUMN storage_location DROP NOT NULL,
  ALTER COLUMN fair_market_value DROP NOT NULL,
  ALTER COLUMN license_plate DROP NOT NULL,
  ALTER COLUMN registration_number DROP NOT NULL,
  ALTER COLUMN registration_state DROP NOT NULL,
  ALTER COLUMN registration_expiration_date DROP NOT NULL;

-- Update check_in_outs table to allow null values
ALTER TABLE IF EXISTS check_in_outs
  ALTER COLUMN date DROP NOT NULL,
  ALTER COLUMN type DROP NOT NULL,
  ALTER COLUMN location DROP NOT NULL,
  ALTER COLUMN contact DROP NOT NULL;

-- Update authorized_contacts table to allow null values
ALTER TABLE IF EXISTS authorized_contacts
  ALTER COLUMN phone DROP NOT NULL;

-- Update service_items table to allow null values
ALTER TABLE IF EXISTS service_items
  ALTER COLUMN description DROP NOT NULL;

-- Update vehicle_photos table to allow null values
ALTER TABLE IF EXISTS vehicle_photos
  ALTER COLUMN photo_type DROP NOT NULL,
  ALTER COLUMN photo_url DROP NOT NULL;

-- Add default values for nullable fields where appropriate
ALTER TABLE IF EXISTS vehicles
  ALTER COLUMN odometer SET DEFAULT NULL;

-- Update unique constraint on vehicles.vin to handle null values
-- First drop the existing constraint
ALTER TABLE IF EXISTS vehicles
  DROP CONSTRAINT IF EXISTS vehicles_vin_key;

-- Then create a new constraint that only applies to non-null values
ALTER TABLE IF EXISTS vehicles
  ADD CONSTRAINT vehicles_vin_key UNIQUE (vin) 
  DEFERRABLE INITIALLY DEFERRED;

-- Create a function to handle null values in unique constraints
CREATE OR REPLACE FUNCTION ignore_null_unique_constraint()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.vin IS NULL THEN
    RETURN NEW;
  END IF;
  
  IF EXISTS (
    SELECT 1 FROM vehicles 
    WHERE vin = NEW.vin AND id != NEW.id
  ) THEN
    RAISE EXCEPTION 'Duplicate VIN: %', NEW.vin;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create a trigger to handle null values in unique constraints
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger 
    WHERE tgname = 'vehicles_vin_unique_check'
  ) THEN
    CREATE TRIGGER vehicles_vin_unique_check
    BEFORE INSERT OR UPDATE ON vehicles
    FOR EACH ROW
    EXECUTE FUNCTION ignore_null_unique_constraint();
  END IF;
END $$;

-- Update email unique constraint on customers to handle null values
-- First drop the existing constraint
ALTER TABLE IF EXISTS customers
  DROP CONSTRAINT IF EXISTS customers_email_key;

-- Then create a new constraint that only applies to non-null values
ALTER TABLE IF EXISTS customers
  ADD CONSTRAINT customers_email_key UNIQUE (email)
  DEFERRABLE INITIALLY DEFERRED;

-- Create a function to handle null values in unique constraints for email
CREATE OR REPLACE FUNCTION ignore_null_email_unique_constraint()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.email IS NULL THEN
    RETURN NEW;
  END IF;
  
  IF EXISTS (
    SELECT 1 FROM customers 
    WHERE email = NEW.email AND id != NEW.id
  ) THEN
    RAISE EXCEPTION 'Duplicate email: %', NEW.email;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create a trigger to handle null values in unique constraints for email
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger 
    WHERE tgname = 'customers_email_unique_check'
  ) THEN
    CREATE TRIGGER customers_email_unique_check
    BEFORE INSERT OR UPDATE ON customers
    FOR EACH ROW
    EXECUTE FUNCTION ignore_null_email_unique_constraint();
  END IF;
END $$;