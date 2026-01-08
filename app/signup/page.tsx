"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function SignupPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">新規登録</CardTitle>
          <CardDescription className="text-center">九工大メールアドレスで登録してください</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <Alert>
              <AlertDescription className="text-sm">
                デモUIです。実際の認証機能は後から実装してください。
              </AlertDescription>
            </Alert>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                メールアドレス
              </label>
              <Input id="email" type="email" placeholder="example@mail.kyutech.jp" />
              <p className="text-xs text-muted-foreground">※ @mail.kyutech.jp のメールアドレスが必要です</p>
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">
                パスワード
              </label>
              <Input id="password" type="password" placeholder="••••••••" />
            </div>
            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="text-sm font-medium">
                パスワード（確認）
              </label>
              <Input id="confirmPassword" type="password" placeholder="••••••••" />
            </div>
            <Link href="/dashboard">
              <Button type="button" className="w-full">
                登録する（デモ）
              </Button>
            </Link>
          </form>
          {/* </CHANGE> */}
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <div className="text-sm text-center text-muted-foreground">
            既にアカウントをお持ちの方は
            <Link href="/login" className="text-primary hover:underline ml-1">
              ログイン
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
