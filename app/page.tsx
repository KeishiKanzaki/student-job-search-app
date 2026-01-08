import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Building2, Users, MessageSquare, Award } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">K</span>
            </div>
            <h1 className="text-xl font-bold">九工大就活プラットフォーム</h1>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost">ログイン</Button>
            </Link>
            <Link href="/signup">
              <Button>新規登録</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="text-5xl font-bold text-balance leading-tight">
            九工大生の、九工大生による
            <br />
            <span className="text-primary">就活情報共有プラットフォーム</span>
          </h2>
          <p className="text-xl text-muted-foreground text-balance">
            OB・OGの実体験や現役生の就活状況を共有し、あなたの就活を成功に導きます
          </p>
          <div className="flex gap-4 justify-center pt-4">
            <Link href="/dashboard">
              <Button size="lg" className="text-lg px-8">
                デモを見る
              </Button>
            </Link>
            <Link href="/signup">
              <Button size="lg" variant="outline" className="text-lg px-8 bg-transparent">
                新規登録
              </Button>
            </Link>
            <Link href="/login">
              <Button size="lg" variant="ghost" className="text-lg px-8">
                ログイン
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold mb-4">主な機能</h3>
          <p className="text-muted-foreground text-lg">九工大生の就活を全面サポート</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-2 hover:border-primary transition-colors">
            <CardHeader>
              <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Building2 className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>企業レビュー</CardTitle>
              <CardDescription>インターン情報や選考体験談を共有・閲覧できます</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• ES通過情報</li>
                <li>• 面接体験談</li>
                <li>• インターン詳細</li>
                <li>• 拠点マップ</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-primary transition-colors">
            <CardHeader>
              <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>OB/OG訪問</CardTitle>
              <CardDescription>学部・地域条件でマッチングできます</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• 同じ学部のOB/OG検索</li>
                <li>• 地域条件でフィルタ</li>
                <li>• 業種・企業別検索</li>
                <li>• 訪問申込み機能</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-primary transition-colors">
            <CardHeader>
              <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <MessageSquare className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>DM・相談</CardTitle>
              <CardDescription>先輩と直接やり取りができます</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• プライベートメッセージ</li>
                <li>• Zoom面談機能</li>
                <li>• 相談申込み</li>
                <li>• リアルタイム通知</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-primary transition-colors">
            <CardHeader>
              <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Award className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>ポイント制度</CardTitle>
              <CardDescription>貢献するとポイントが貯まります</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• レビュー投稿で獲得</li>
                <li>• 相談対応で獲得</li>
                <li>• ランキング表示</li>
                <li>• 特典交換可能</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <Card className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground border-0">
          <CardHeader className="text-center space-y-4 pb-8">
            <CardTitle className="text-3xl">今すぐ始めましょう</CardTitle>
            <CardDescription className="text-primary-foreground/90 text-lg">
              @mail.kyutech.jp のメールアドレスがあればすぐに登録できます
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <Link href="/dashboard">
              <Button size="lg" variant="secondary" className="text-lg px-12">
                デモを体験する
              </Button>
            </Link>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t bg-white">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 bg-primary rounded flex items-center justify-center">
                <span className="text-white font-bold text-xs">K</span>
              </div>
              <span className="text-sm text-muted-foreground">九工大就活プラットフォーム</span>
            </div>
            <p className="text-sm text-muted-foreground">© 2025 Kyutech Job Search Platform. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
