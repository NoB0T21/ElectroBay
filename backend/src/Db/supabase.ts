import { createClient } from "@supabase/supabase-js";
import dotenv from 'dotenv'
dotenv.config()

const supabaseURI = `${process.env.SUPABASE_URL}`
const supabaseKEY = `${process.env.SUPABASE_KEY}`

const supabase = createClient(supabaseURI, supabaseKEY)

export default supabase