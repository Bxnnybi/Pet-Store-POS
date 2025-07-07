import { createClient } from '@supabase/supabase-js'

// 🔴  ทดสอบโดยการใส่ค่าลงไปตรงๆ (Hardcode)
// 🔴  อย่าลืมเปลี่ยนกลับเมื่อหาสาเหตุเจอแล้ว
const supabaseUrl = "https://xqshipavwzsnxipcbhyg.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhxc2hpcGF2d3pzbnhpcGNiaHlnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE3MjQ1OTAsImV4cCI6MjA2NzMwMDU5MH0.wdfWAXLbUo7o9OMwx8mvM_21vLjqYd-Iu1wxh5u-vnE"

export const supabase = createClient(supabaseUrl, supabaseAnonKey)