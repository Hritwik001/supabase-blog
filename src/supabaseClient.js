// src/supabaseClient.js
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://qzskgomowfveozmesuuf.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF6c2tnb21vd2Z2ZW96bWVzdXVmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY1OTE4OTcsImV4cCI6MjA2MjE2Nzg5N30.zkThmZX7sCrf3gbAm5OzPWu4SLPEVIhUrq9e2HZg_FU'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
