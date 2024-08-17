// この設定ファイルに色々と追加していく
import type { NextAuthConfig } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'

export const authConfig: NextAuthConfig = {
    providers: [
        Credentials({
            async authorize(credentials) {
                await new Promise((resolve) => setTimeout(resolve, 5000))

                const email = 'user@nextemail.com'
                return credentials.email === email && credentials.password === '123456'
                    ? { id: 'userId', email }
                    : null
            },
        }),
    ],
    pages: {
        // ここでsignInが必要な際は、/loginに遷移させるようにしている
        signIn: '/login',
        // signInの他にサインアウト時の遷移先を決めるsignOutなどのいくつかの設定が可能らしい
    },
    callbacks: {
        // ルートに対してアクセスがあったときに、認証されている/認証されていないでリダイレクトしたりしなかったりする処理を書く
        // リダイレクトループを防ぎ、ログインしていれば/dashboardに遷移するようにしている
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user
            const isOnDashboard = nextUrl.pathname.startsWith('/dashboard')
            if (isOnDashboard) {
                if (isLoggedIn) return true
                return false
            } else if (isLoggedIn) {
                return Response.redirect(new URL('/dashboard', nextUrl))
            }
            return true
        },
    },
}