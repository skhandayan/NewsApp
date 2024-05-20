
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://gzbllebzonwwicxzdwwr.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd6YmxsZWJ6b253d2ljeHpkd3dyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTU5OTcyNzgsImV4cCI6MjAzMTU3MzI3OH0.bA4Qdr64RxEV2pigJ9T1wSonvWffD8cWDnC3GVPgQME'
export const supabase = createClient(supabaseUrl, supabaseKey)

