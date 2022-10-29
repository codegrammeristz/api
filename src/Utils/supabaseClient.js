import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://yujxthajkfsfsdkxmhuu.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY

export const supabase = createClient(supabaseUrl, supabaseKey)
// export const supabase = createClient(supabaseUrl, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl1anh0aGFqa2ZzZnNka3htaHV1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY2MjI1OTc0MiwiZXhwIjoxOTc3ODM1NzQyfQ.zNP2vHWX9zj3IYJxKzSf-7W9fI3VjrREFP4CJrjMMyw')


// let data = await supabase.auth.signIn({
//     email: 'rencesalaveria.dev@gmail.com',
//     password: 'july271914'
// });
//
// data = data.user

// const { user, error } = await supabase.auth.update({
//     email: 'karlgian010@gmail.com',
//     password: 'july271914'
// });
//
// (async () => {
//     // console.log(data)
//     console.log(user)
//     console.log(error)
// })();