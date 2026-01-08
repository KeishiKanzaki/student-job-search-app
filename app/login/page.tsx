"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      if (!email.endsWith("@mail.kyutech.jp")) {
        throw new Error("九工大のメールアドレスを使用してください")
      }

      if (password.length < 6) {
        throw new Error("パスワードは6文字以上で入力してください")
      }

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 800))

      // Store mock user data
      localStorage.setItem(
        "demo_user",
        JSON.stringify({
          id: "demo-user-1",
          email,
          full_name: email.split("@")[0],
        }),
      )

      router.push("/dashboard")
    } catch (err: any) {
      setError(err.message || "ログインに失敗しました")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">ログイン</CardTitle>
          <CardDescription className="text-center">九工大就活プラットフォームへようこそ</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <Alert>
              <AlertDescription className="text-sm">
                デモ版: 任意の@mail.kyutech.jpメールアドレスとパスワード（6文字以上）でログインできます
              </AlertDescription>
            </Alert>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                メールアドレス
              </label>
              <Input
                id="email"
                type="email"
                placeholder="example@mail.kyutech.jp"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">
                パスワード
              </label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "ログイン中..." : "ログイン"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <div className="text-sm text-center text-muted-foreground">
            アカウントをお持ちでない方は
            <Link href="/signup" className="text-primary hover:underline ml-1">
              新規登録
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
