import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          first_name: string;
          last_name: string;
          email: string;
          password: string;
          role: 'Admin' | 'Manager' | 'Staff' | 'Viewer';
          avatar: string | null;
          phone: string | null;
          department: string | null;
          last_login: string | null;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          first_name: string;
          last_name: string;
          email: string;
          password: string;
          role?: 'Admin' | 'Manager' | 'Staff' | 'Viewer';
          avatar?: string | null;
          phone?: string | null;
          department?: string | null;
          last_login?: string | null;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          first_name?: string;
          last_name?: string;
          email?: string;
          password?: string;
          role?: 'Admin' | 'Manager' | 'Staff' | 'Viewer';
          avatar?: string | null;
          phone?: string | null;
          department?: string | null;
          last_login?: string | null;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      customers: {
        Row: {
          id: string;
          first_name: string;
          last_name: string;
          type: 'Individual' | 'Business';
          membership_level: 'Basic' | 'Premium' | 'VIP' | 'Enterprise';
          storage_location: string;
          email: string;
          phone: string;
          street_address: string;
          city: string;
          state: string;
          zip_code: string;
          storage_spots: number;
          show_panda_doc_form: boolean;
          date_created: string;
          password: string;
          num_rows: number;
          manual_price: number | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          first_name: string;
          last_name: string;
          type?: 'Individual' | 'Business';
          membership_level?: 'Basic' | 'Premium' | 'VIP' | 'Enterprise';
          storage_location: string;
          email: string;
          phone: string;
          street_address: string;
          city: string;
          state: string;
          zip_code: string;
          storage_spots?: number;
          show_panda_doc_form?: boolean;
          date_created?: string;
          password: string;
          num_rows?: number;
          manual_price?: number | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          first_name?: string;
          last_name?: string;
          type?: 'Individual' | 'Business';
          membership_level?: 'Basic' | 'Premium' | 'VIP' | 'Enterprise';
          storage_location?: string;
          email?: string;
          phone?: string;
          street_address?: string;
          city?: string;
          state?: string;
          zip_code?: string;
          storage_spots?: number;
          show_panda_doc_form?: boolean;
          date_created?: string;
          password?: string;
          num_rows?: number;
          manual_price?: number | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      vehicles: {
        Row: {
          id: string;
          customer_id: string;
          year: number;
          make: string;
          model: string;
          vin: string;
          storage_location: string;
          fair_market_value: number;
          insurance_rider_required: boolean;
          insurance_rider_amount: number | null;
          license_plate: string;
          registration_number: string;
          registration_state: string;
          registration_expiration_date: string;
          tire_pressure_default_front: number;
          tire_pressure_default_rear: number;
          tire_pressure_preferred_front: number;
          tire_pressure_preferred_rear: number;
          last_service_date: string | null;
          next_service_date: string | null;
          service_interval: number;
          maintenance_notes: string | null;
          odometer: number;
          image: string | null;
          fuel_level: number;
          battery_type: 'Standard' | 'AGM' | 'Lithium' | 'Gel' | 'Other';
          color: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          customer_id: string;
          year: number;
          make: string;
          model: string;
          vin: string;
          storage_location: string;
          fair_market_value: number;
          insurance_rider_required?: boolean;
          insurance_rider_amount?: number | null;
          license_plate: string;
          registration_number: string;
          registration_state: string;
          registration_expiration_date: string;
          tire_pressure_default_front?: number;
          tire_pressure_default_rear?: number;
          tire_pressure_preferred_front?: number;
          tire_pressure_preferred_rear?: number;
          last_service_date?: string | null;
          next_service_date?: string | null;
          service_interval?: number;
          maintenance_notes?: string | null;
          odometer?: number;
          image?: string | null;
          fuel_level?: number;
          battery_type?: 'Standard' | 'AGM' | 'Lithium' | 'Gel' | 'Other';
          color?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          customer_id?: string;
          year?: number;
          make?: string;
          model?: string;
          vin?: string;
          storage_location?: string;
          fair_market_value?: number;
          insurance_rider_required?: boolean;
          insurance_rider_amount?: number | null;
          license_plate?: string;
          registration_number?: string;
          registration_state?: string;
          registration_expiration_date?: string;
          tire_pressure_default_front?: number;
          tire_pressure_default_rear?: number;
          tire_pressure_preferred_front?: number;
          tire_pressure_preferred_rear?: number;
          last_service_date?: string | null;
          next_service_date?: string | null;
          service_interval?: number;
          maintenance_notes?: string | null;
          odometer?: number;
          image?: string | null;
          fuel_level?: number;
          battery_type?: 'Standard' | 'AGM' | 'Lithium' | 'Gel' | 'Other';
          color?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      authorized_drivers: {
        Row: {
          id: string;
          vehicle_id: string;
          name: string;
          phone: string | null;
          email: string | null;
          license_number: string | null;
          relationship: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          vehicle_id: string;
          name: string;
          phone?: string | null;
          email?: string | null;
          license_number?: string | null;
          relationship?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          vehicle_id?: string;
          name?: string;
          phone?: string | null;
          email?: string | null;
          license_number?: string | null;
          relationship?: string | null;
          created_at?: string;
        };
      };
      authorized_contacts: {
        Row: {
          id: string;
          vehicle_id: string;
          name: string;
          phone: string;
          email: string | null;
          relationship: string | null;
          can_dropoff: boolean;
          can_pickup: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          vehicle_id: string;
          name: string;
          phone: string;
          email?: string | null;
          relationship?: string | null;
          can_dropoff?: boolean;
          can_pickup?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          vehicle_id?: string;
          name?: string;
          phone?: string;
          email?: string | null;
          relationship?: string | null;
          can_dropoff?: boolean;
          can_pickup?: boolean;
          created_at?: string;
        };
      };
      check_in_outs: {
        Row: {
          id: string;
          vehicle_id: string;
          customer_id: string;
          date: string;
          type: 'CHECK_IN' | 'CHECK_OUT';
          location: string;
          contact: string;
          status: 'CHECKED_IN' | 'IN_SERVICE' | 'CHECKED_OUT';
          check_in_date: string | null;
          check_out_date: string | null;
          fuel_level: number | null;
          mileage: number | null;
          tire_pressure_passenger_front: number | null;
          tire_pressure_passenger_rear: number | null;
          tire_pressure_driver_front: number | null;
          tire_pressure_driver_rear: number | null;
          car_cover: boolean;
          kill_switch: boolean;
          startup_directions: string | null;
          delivery_address: string | null;
          notes: string | null;
          signature: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          vehicle_id: string;
          customer_id: string;
          date?: string;
          type: 'CHECK_IN' | 'CHECK_OUT';
          location: string;
          contact: string;
          status?: 'CHECKED_IN' | 'IN_SERVICE' | 'CHECKED_OUT';
          check_in_date?: string | null;
          check_out_date?: string | null;
          fuel_level?: number | null;
          mileage?: number | null;
          tire_pressure_passenger_front?: number | null;
          tire_pressure_passenger_rear?: number | null;
          tire_pressure_driver_front?: number | null;
          tire_pressure_driver_rear?: number | null;
          car_cover?: boolean;
          kill_switch?: boolean;
          startup_directions?: string | null;
          delivery_address?: string | null;
          notes?: string | null;
          signature?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          vehicle_id?: string;
          customer_id?: string;
          date?: string;
          type?: 'CHECK_IN' | 'CHECK_OUT';
          location?: string;
          contact?: string;
          status?: 'CHECKED_IN' | 'IN_SERVICE' | 'CHECKED_OUT';
          check_in_date?: string | null;
          check_out_date?: string | null;
          fuel_level?: number | null;
          mileage?: number | null;
          tire_pressure_passenger_front?: number | null;
          tire_pressure_passenger_rear?: number | null;
          tire_pressure_driver_front?: number | null;
          tire_pressure_driver_rear?: number | null;
          car_cover?: boolean;
          kill_switch?: boolean;
          startup_directions?: string | null;
          delivery_address?: string | null;
          notes?: string | null;
          signature?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      service_items: {
        Row: {
          id: string;
          check_in_out_id: string;
          description: string;
          cost: number;
          completed: boolean;
          completed_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          check_in_out_id: string;
          description: string;
          cost?: number;
          completed?: boolean;
          completed_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          check_in_out_id?: string;
          description?: string;
          cost?: number;
          completed?: boolean;
          completed_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      vehicle_photos: {
        Row: {
          id: string;
          check_in_out_id: string;
          photo_type: string;
          photo_url: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          check_in_out_id: string;
          photo_type: string;
          photo_url: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          check_in_out_id?: string;
          photo_type?: string;
          photo_url?: string;
          created_at?: string;
        };
      };
    };
    Enums: {
      customer_type: 'Individual' | 'Business';
      membership_level: 'Basic' | 'Premium' | 'VIP' | 'Enterprise';
      battery_type: 'Standard' | 'AGM' | 'Lithium' | 'Gel' | 'Other';
      check_status: 'CHECKED_IN' | 'IN_SERVICE' | 'CHECKED_OUT';
      check_type: 'CHECK_IN' | 'CHECK_OUT';
      user_role: 'Admin' | 'Manager' | 'Staff' | 'Viewer';
    };
  };
}