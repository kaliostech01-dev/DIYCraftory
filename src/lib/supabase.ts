import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export function getSessionId(): string {
  let sessionId = localStorage.getItem('cart_session_id')
  if (!sessionId) {
    sessionId = crypto.randomUUID()
    localStorage.setItem('cart_session_id', sessionId)
  }
  return sessionId
}
