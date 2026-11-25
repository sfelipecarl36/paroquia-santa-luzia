import { supabase } from './supabase'

export async function loginAdmin(
  email: string,
  password: string
) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    throw error
  }

  if (!data.user) {
    throw new Error('Não foi possível identificar o usuário.')
  }

  const { data: admin, error: adminError } = await supabase
    .from('administradores')
    .select('user_id, nome')
    .eq('user_id', data.user.id)
    .maybeSingle()

  if (adminError || !admin) {
    await supabase.auth.signOut()

    throw new Error(
      'Esta conta não possui autorização administrativa.'
    )
  }

  return {
    user: data.user,
    admin,
  }
}

export async function logoutAdmin() {
  const { error } = await supabase.auth.signOut()

  if (error) {
    throw error
  }
}

export async function verificarAdmin(userId: string) {
  const { data, error } = await supabase
    .from('administradores')
    .select('user_id, nome')
    .eq('user_id', userId)
    .maybeSingle()

  if (error) {
    throw error
  }

  return data
}
