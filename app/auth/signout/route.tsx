import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { type NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const supabase = createClient()

  // Check if a user's logged in
  const {
    data: { user },
    error: getUserError,
  } = await supabase.auth.getUser()

  if (getUserError) {
    console.error('Error fetching user:', getUserError)
  } else {
    console.log('User data:', user)
  }

  if (user) {
    const { error: signOutError } = await supabase.auth.signOut()
    if (signOutError) {
      console.error('Error signing out:', signOutError)
    } else {
      console.log('User signed out successfully')
    }
  }

  revalidatePath('/', 'layout')
  return NextResponse.redirect(new URL('/login', req.url), {
    status: 302,
  })
}