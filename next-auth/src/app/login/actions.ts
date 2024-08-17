'use server'

// 認証するためのserver actionsを作成
import { signIn } from '@/auth'

export async function authenticate(prevState: boolean, formData: FormData) {
    try {
        // formDataの内容を確認するためのログ出力
        console.log('Form Data:', Object.fromEntries(formData));
        // // Credentialsプロバイダを使っているからsignIn関数の第1引数には'credentials'を指定
        // await signIn('credentials', Object.fromEntries(formData))
        // return true

        const formObject = Object.fromEntries(formData);
        console.log('Form Data:', formObject); // フォームデータをログに出力
        // `redirect` を `false` にすることで、リダイレクトを防ぎます
        const result = await signIn('credentials', {
            redirect: false, // リダイレクトを無効にする
            ...formObject // フォームデータをオプションとして渡します
        });

        if (result?.error) {
            // サインイン失敗の場合
            console.error('SignIn Error:', result.error);
            return false;
        }
        // サインイン成功の場合
        return true;
    } catch (error) {
        if ((error as Error).message.includes('CredentialsSignin')) {
            return false
        }
        console.error('Authentication error:', error); // エラー内容をログ出力
        throw error
    }
}