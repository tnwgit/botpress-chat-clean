import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

const supabaseUrl = 'https://clngtypfotklhyekznzi.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNsbmd0eXBmb3RrbGh5ZWt6bnppIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIxNjI5MTIsImV4cCI6MjA1NzczODkxMn0.89eVhGEdDrQzQQ82zo_OizlzJ4K9X3xGIliwSOf2H8A'

const supabase = createClient(supabaseUrl, supabaseKey)

// Functie om alle bots op te halen
export async function getBots() {
    const { data, error } = await supabase
        .from('bots')
        .select('*')
        .order('created_at', { ascending: true })
    
    if (error) {
        console.error('Error:', error)
        return []
    }
    return data
}

// Functie om een nieuwe bot toe te voegen
export async function addBot(name, webhookId) {
    const { data, error } = await supabase
        .from('bots')
        .insert([
            { name: name, webhook_id: webhookId }
        ])
        .select()

    if (error) {
        console.error('Error:', error)
        return null
    }
    return data[0]
}

// Functie om een bot te verwijderen
export async function deleteBot(id) {
    const { error } = await supabase
        .from('bots')
        .delete()
        .eq('id', id)

    if (error) {
        console.error('Error:', error)
        return false
    }
    return true
} 