import { createClient } from '@supabase/supabase-js';
import type { Database } from './database.types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

export async function fetchCustomers() {
  const { data, error } = await supabase
    .from('customers')
    .select('*')
    .order('first_name');
  
  if (error) {
    console.error('Error fetching customers:', error);
    throw error;
  }
  
  return data;
}

export async function fetchCustomerById(id: string) {
  const { data, error } = await supabase
    .from('customers')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) {
    console.error('Error fetching customer:', error);
    throw error;
  }
  
  return data;
}

export async function fetchVehicles() {
  const { data, error } = await supabase
    .from('vehicles')
    .select('*')
    .order('make');
  
  if (error) {
    console.error('Error fetching vehicles:', error);
    throw error;
  }
  
  return data;
}

export async function fetchVehiclesByCustomerId(customerId: string) {
  const { data, error } = await supabase
    .from('vehicles')
    .select('*')
    .eq('customer_id', customerId)
    .order('make');
  
  if (error) {
    console.error('Error fetching vehicles by customer:', error);
    throw error;
  }
  
  return data;
}

export async function fetchVehicleById(id: string) {
  const { data, error } = await supabase
    .from('vehicles')
    .select(`
      *,
      authorized_drivers(*),
      authorized_contacts(*)
    `)
    .eq('id', id)
    .single();
  
  if (error) {
    console.error('Error fetching vehicle:', error);
    throw error;
  }
  
  return data;
}

export async function fetchCheckInOuts() {
  const { data, error } = await supabase
    .from('check_in_outs')
    .select(`
      *,
      service_items(*)
    `)
    .order('date', { ascending: false });
  
  if (error) {
    console.error('Error fetching check in/outs:', error);
    throw error;
  }
  
  return data;
}

export async function fetchCheckInOutById(id: string) {
  const { data, error } = await supabase
    .from('check_in_outs')
    .select(`
      *,
      service_items(*),
      vehicle_photos(*)
    `)
    .eq('id', id)
    .single();
  
  if (error) {
    console.error('Error fetching check in/out:', error);
    throw error;
  }
  
  return data;
}

export async function fetchVehiclePhotos(checkInOutId: string) {
  const { data, error } = await supabase
    .from('vehicle_photos')
    .select('*')
    .eq('check_in_out_id', checkInOutId);
  
  if (error) {
    console.error('Error fetching vehicle photos:', error);
    throw error;
  }
  
  return data;
}

export async function uploadVehiclePhoto(checkInOutId: string, photoType: string, file: File) {
  // Generate a unique file path
  const fileExt = file.name.split('.').pop();
  const fileName = `${checkInOutId}/${photoType}_${Math.random().toString(36).substring(2)}.${fileExt}`;
  const filePath = `vehicle-photos/${fileName}`;
  
  // Upload the file to storage
  const { error: uploadError } = await supabase.storage
    .from('photos')
    .upload(filePath, file);
  
  if (uploadError) {
    console.error('Error uploading photo:', uploadError);
    throw uploadError;
  }
  
  // Get the public URL
  const { data: { publicUrl } } = supabase.storage
    .from('photos')
    .getPublicUrl(filePath);
  
  // Save the photo record in the database
  const { data, error } = await supabase
    .from('vehicle_photos')
    .insert({
      check_in_out_id: checkInOutId,
      photo_type: photoType,
      photo_url: publicUrl
    })
    .select()
    .single();
  
  if (error) {
    console.error('Error saving photo record:', error);
    throw error;
  }
  
  return data;
}

export async function createCustomer(customerData: Omit<Database['public']['Tables']['customers']['Insert'], 'id'>) {
  const { data, error } = await supabase
    .from('customers')
    .insert(customerData)
    .select()
    .single();
  
  if (error) {
    console.error('Error creating customer:', error);
    throw error;
  }
  
  return data;
}

export async function updateCustomer(id: string, customerData: Partial<Database['public']['Tables']['customers']['Update']>) {
  const { data, error } = await supabase
    .from('customers')
    .update(customerData)
    .eq('id', id)
    .select()
    .single();
  
  if (error) {
    console.error('Error updating customer:', error);
    throw error;
  }
  
  return data;
}

export async function createVehicle(vehicleData: Omit<Database['public']['Tables']['vehicles']['Insert'], 'id'>) {
  const { data, error } = await supabase
    .from('vehicles')
    .insert(vehicleData)
    .select()
    .single();
  
  if (error) {
    console.error('Error creating vehicle:', error);
    throw error;
  }
  
  return data;
}

export async function updateVehicle(id: string, vehicleData: Partial<Database['public']['Tables']['vehicles']['Update']>) {
  const { data, error } = await supabase
    .from('vehicles')
    .update(vehicleData)
    .eq('id', id)
    .select()
    .single();
  
  if (error) {
    console.error('Error updating vehicle:', error);
    throw error;
  }
  
  return data;
}

export async function createAuthorizedDriver(driverData: Omit<Database['public']['Tables']['authorized_drivers']['Insert'], 'id'>) {
  const { data, error } = await supabase
    .from('authorized_drivers')
    .insert(driverData)
    .select()
    .single();
  
  if (error) {
    console.error('Error creating authorized driver:', error);
    throw error;
  }
  
  return data;
}

export async function createAuthorizedContact(contactData: Omit<Database['public']['Tables']['authorized_contacts']['Insert'], 'id'>) {
  const { data, error } = await supabase
    .from('authorized_contacts')
    .insert(contactData)
    .select()
    .single();
  
  if (error) {
    console.error('Error creating authorized contact:', error);
    throw error;
  }
  
  return data;
}

export async function createCheckInOut(checkInOutData: Omit<Database['public']['Tables']['check_in_outs']['Insert'], 'id'>) {
  const { data, error } = await supabase
    .from('check_in_outs')
    .insert(checkInOutData)
    .select()
    .single();
  
  if (error) {
    console.error('Error creating check in/out:', error);
    throw error;
  }
  
  return data;
}

export async function updateCheckInOut(id: string, checkInOutData: Partial<Database['public']['Tables']['check_in_outs']['Update']>) {
  const { data, error } = await supabase
    .from('check_in_outs')
    .update(checkInOutData)
    .eq('id', id)
    .select()
    .single();
  
  if (error) {
    console.error('Error updating check in/out:', error);
    throw error;
  }
  
  return data;
}

export async function createServiceItem(serviceItemData: Omit<Database['public']['Tables']['service_items']['Insert'], 'id'>) {
  const { data, error } = await supabase
    .from('service_items')
    .insert(serviceItemData)
    .select()
    .single();
  
  if (error) {
    console.error('Error creating service item:', error);
    throw error;
  }
  
  return data;
}

export async function updateServiceItem(id: string, serviceItemData: Partial<Database['public']['Tables']['service_items']['Update']>) {
  const { data, error } = await supabase
    .from('service_items')
    .update(serviceItemData)
    .eq('id', id)
    .select()
    .single();
  
  if (error) {
    console.error('Error updating service item:', error);
    throw error;
  }
  
  return data;
}

export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });
  
  if (error) {
    console.error('Error signing in:', error);
    throw error;
  }
  
  return data;
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  
  if (error) {
    console.error('Error signing out:', error);
    throw error;
  }
}

export async function getCurrentUser() {
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}