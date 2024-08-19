// 認証用のログイン・ログアウト用の関数
// これらの関数は基本的にServer Actionsとして呼ばれる
import NextAuth from 'next-auth'
import { authConfig } from '../auth.config'

export const { signIn, signOut } = NextAuth(authConfig)