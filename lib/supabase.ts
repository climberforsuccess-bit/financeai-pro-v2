import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.https://rqrpazkkwolxtpiqtdfu.supabase.co
const supabaseKey = process.env.yJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJxcnBhemtrd29seHRwaXF0ZGZ1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA4MTM3MjYsImV4cCI6MjA5NjM4OTcyNn0.InLqCdNMOesXm0_WQXypJBFt5bTJrodlfendlu_YT5Q

export const supabase = createClient(supabaseUrl, supabaseKey)
