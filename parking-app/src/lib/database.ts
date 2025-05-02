import { supabase } from './supabase';
import { PostgrestError, AuthError } from '@supabase/supabase-js';

export type User = {
  id: string;
  email: string;
  username: string;
  full_name: string;
  phone_number: string;
  address: string;
  avatar_url?: string;
  member_since: string;
};

export type Vehicle = {
  id: string;
  plate: string;
  make: string;
  model: string;
  color: string;
  is_default: boolean;
};

export type PaymentMethod = {
  id: string;
  type: string;
  last4?: string;
  expiry?: string;
  is_default: boolean;
};

export type ParkingSession = {
  id: string;
  date: string;
  formatted_date: string;
  duration: string;
  start_time: string;
  end_time: string;
  zone: string;
  location: string;
  parking_spot: string;
  status: string;
  purpose: string;
  parking_rate: string;
  subtotal: string;
  discount: string;
  total: string;
  has_receipt: boolean;
  vehicle_id: string;
  payment_method_id: string;
};

export type UserStats = {
  total_spent: string;
  total_hours: string;
  most_visited_zone: string;
  average_stay: string;
};

export type UserProfile = {
  user: User;
  vehicles: Vehicle[];
  paymentMethods: PaymentMethod[];
  sessions: ParkingSession[];
  stats: UserStats;
};

// Convert AuthError to PostgrestError format for consistency
const convertError = (error: AuthError): PostgrestError => {
  return {
    message: error.message,
    details: error.message,
    hint: "",
    code: error.status?.toString() || "500"
  } as PostgrestError;
};

// Auth Functions
export const signUp = async (
  email: string, 
  password: string, 
  fullName: string, 
  phoneNumber: string, 
  address: string,
  licensePlate: string,
  username?: string
): Promise<{ user: any | null; error: PostgrestError | null }> => {
  try {
    // Generate a username if not provided
    const finalUsername = username || email.split('@')[0] + Math.floor(Math.random() * 1000);
    
    console.log("Signing up user with email:", email, "and username:", finalUsername);

    // Sign up with Supabase Auth - simplified to avoid two-stage error handling
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username: finalUsername,
          full_name: fullName,
          phone_number: phoneNumber,
          address: address
        },
        emailRedirectTo: `${window.location.origin}/login?verified=true`
      }
    });

    if (authError) {
      console.error("Auth error during signup:", authError);
      return { user: null, error: convertError(authError) };
    }

    const userId = authData.user?.id;

    if (!userId) {
      console.error("No user ID returned from auth signup");
      return { 
        user: null, 
        error: { 
          message: "User ID not returned from auth signup",
          details: "Authentication successful but no user ID was returned",
          hint: "Try again or contact support",
          code: "AUTH_USER_NOT_FOUND"
        } as PostgrestError 
      };
    }

    // Return success - the trigger function in the database will handle creating the profile
    return { 
      user: { 
        id: userId, 
        email,
        username: finalUsername,
        full_name: fullName
      }, 
      error: null 
    };

  } catch (error) {
    console.error("Unexpected error during signup:", error);
    return {
      user: null,
      error: { 
        message: (error as Error).message,
        details: "An unexpected error occurred during signup",
        hint: "Please try again later",
        code: "UNEXPECTED_ERROR"  
      } as PostgrestError
    };
  }
};

// Modified to login with either email or username
export const signIn = async (identifier: string, password: string) => {
  // Check if the identifier is an email (contains @)
  const isEmail = identifier.includes('@');

  if (isEmail) {
    // Log in with email
    console.log("Attempting login with email:", identifier);
    return await supabase.auth.signInWithPassword({
      email: identifier,
      password,
    });
  } else {
    // Login with username (case-insensitive)
    try {
      console.log("Attempting login with username (case-insensitive):", identifier);
      
      // First, look up the email associated with this username (case-insensitive)
      const { data, error } = await supabase
        .from('users')
        .select('email')
        .ilike('username', identifier) // Use ilike for case-insensitive match
        .limit(1);

      // Log the query result for debugging
      console.log("Username lookup result:", { data, error });

      if (error) {
        console.error("Database error looking up username:", error);
        return {
          data: { user: null },
          error: { 
            message: "Error looking up username: " + error.message,
            name: "AuthApiError",
            status: 400
          } as AuthError
        };
      }
      
      if (!data || data.length === 0) {
        console.error("Username not found in database:", identifier);
        return {
          data: { user: null },
          error: { 
            message: "Username not found",
            name: "AuthApiError",
            status: 400
          } as AuthError
        };
      }

      const userEmail = data[0].email;
      console.log(`Found email '${userEmail}' for username '${identifier}'. Proceeding with email login.`);
      
      // Now log in with the email
      return await supabase.auth.signInWithPassword({
        email: userEmail,
        password,
      });
    } catch (error) {
      console.error("Unexpected error during username login:", error);
      return {
        data: { user: null },
        error: {
          message: (error as Error).message,
          name: "AuthApiError",
          status: 400
        } as AuthError
      };
    }
  }
};

// Create a direct login function that doesn't require email verification 
// (for demo purposes)
export const directLogin = async (userId: string) => {
  try {
    // Get admin API key (this function would only work server-side)
    // For client-side demo, we'd need to set up a serverless function
    
    // This is just a placeholder showing the approach
    const adminAuthClient = supabase.auth.admin;
    if (adminAuthClient) {
      // Create a link for the user
      const { data, error } = await adminAuthClient.generateLink({
        type: 'magiclink',
        email: 'john.smith@example.com',
      });
      
      if (error) {
        throw error;
      }
      
      return { data, error: null };
    }
    
    throw new Error("Admin API not available");
  } catch (error) {
    return {
      data: null,
      error: error as Error
    };
  }
};

export const signOut = async () => {
  return await supabase.auth.signOut();
};

export const getCurrentUser = async () => {
  return await supabase.auth.getUser();
};

// Profile Functions
export const getUserProfile = async (userId: string): Promise<{ data: UserProfile | null; error: PostgrestError | null }> => {
  try {
    // Get user data
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();

    if (userError) {
      return { data: null, error: userError };
    }

    // Get vehicles
    const { data: vehiclesData, error: vehiclesError } = await supabase
      .from('vehicles')
      .select('*')
      .eq('user_id', userId);

    if (vehiclesError) {
      return { data: null, error: vehiclesError };
    }

    // Get payment methods
    const { data: paymentData, error: paymentError } = await supabase
      .from('payment_methods')
      .select('*')
      .eq('user_id', userId);

    if (paymentError) {
      return { data: null, error: paymentError };
    }

    // Get parking sessions
    const { data: sessionsData, error: sessionsError } = await supabase
      .from('parking_sessions')
      .select('*')
      .eq('user_id', userId)
      .order('date', { ascending: false });

    if (sessionsError) {
      return { data: null, error: sessionsError };
    }

    // Get user stats
    const { data: statsData, error: statsError } = await supabase
      .from('user_stats')
      .select('*')
      .eq('id', userId)
      .single();

    if (statsError) {
      return { data: null, error: statsError };
    }

    const profile: UserProfile = {
      user: userData as User,
      vehicles: vehiclesData as Vehicle[],
      paymentMethods: paymentData as PaymentMethod[],
      sessions: sessionsData as ParkingSession[],
      stats: statsData as UserStats,
    };

    return { data: profile, error: null };
  } catch (error) {
    return {
      data: null,
      error: { 
        message: (error as Error).message,
        details: "An unexpected error occurred while fetching user profile",
        hint: "Please try again later",
        code: "UNEXPECTED_ERROR" 
      } as PostgrestError
    };
  }
};

// Get a specific parking session
export const getParkingSession = async (sessionId: string): Promise<{ data: any; error: PostgrestError | null }> => {
  try {
    const { data: sessionData, error: sessionError } = await supabase
      .from('parking_sessions')
      .select(`
        *,
        vehicles:vehicle_id(*),
        payment_methods:payment_method_id(*)
      `)
      .eq('id', sessionId)
      .single();

    if (sessionError) {
      return { data: null, error: sessionError };
    }

    // Format the data to match the expected structure in the frontend
    const formattedSession = {
      id: sessionData.id,
      date: sessionData.date,
      formattedDate: sessionData.formatted_date,
      duration: sessionData.duration,
      startTime: sessionData.start_time,
      endTime: sessionData.end_time,
      parking: sessionData.parking_spot,
      total: sessionData.total,
      zone: sessionData.zone,
      location: sessionData.location,
      status: sessionData.status,
      vehicle: {
        plate: sessionData.vehicles.plate,
        make: sessionData.vehicles.make,
        model: sessionData.vehicles.model
      },
      payment: {
        type: sessionData.payment_methods.type,
        last4: sessionData.payment_methods.last4
      },
      details: {
        parkingRate: sessionData.parking_rate,
        subtotal: sessionData.subtotal,
        discount: sessionData.discount,
        total: sessionData.total
      },
      purpose: sessionData.purpose,
      receipt: sessionData.has_receipt
    };

    return { data: formattedSession, error: null };
  } catch (error) {
    return {
      data: null,
      error: { 
        message: (error as Error).message,
        details: "An unexpected error occurred while fetching parking session",
        hint: "Please try again later",
        code: "UNEXPECTED_ERROR"
      } as PostgrestError
    };
  }
};