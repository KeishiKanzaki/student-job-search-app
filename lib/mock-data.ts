// Mock data for demo purposes
export const mockUser = {
  id: "demo-user-1",
  email: "demo@mail.kyutech.jp",
}

export const mockCompanies = [
  {
    id: "company-1",
    name: "サイボウズ株式会社",
    industry: "IT・通信",
    description: "グループウェアの開発・販売を行う企業",
    website: "https://cybozu.co.jp",
    logo_url: null,
  },
  {
    id: "company-2",
    name: "株式会社メルカリ",
    industry: "IT・通信",
    description: "フリマアプリ「メルカリ」を運営",
    website: "https://about.mercari.com",
    logo_url: null,
  },
  {
    id: "company-3",
    name: "トヨタ自動車株式会社",
    industry: "自動車・輸送機器",
    description: "世界的な自動車メーカー",
    website: "https://global.toyota",
    logo_url: null,
  },
]

export const mockProfiles = [
  {
    id: "user-1",
    email: "yamada@mail.kyutech.jp",
    full_name: "山田 太郎",
    department: "知能情報工学科",
    faculty: "情報工学部",
    graduation_year: 2024,
    is_alumni: true,
    bio: "トヨタ自動車でソフトウェアエンジニアとして働いています",
    location: "愛知県名古屋市",
    points: 150,
    user_tags: [{ tag: "本選考通過" }, { tag: "ES通過" }, { tag: "面接経験" }],
  },
  {
    id: "user-2",
    email: "tanaka@mail.kyutech.jp",
    full_name: "田中 花子",
    department: "情報・通信工学科",
    faculty: "情報工学部",
    graduation_year: 2025,
    is_alumni: false,
    bio: "IT企業を中心に就活中です",
    location: "福岡県福岡市",
    points: 80,
    user_tags: [{ tag: "インターン参加" }, { tag: "ES通過" }],
  },
]

export const mockReviews = [
  {
    id: "review-1",
    company_id: "company-1",
    user_id: "user-1",
    review_type: "internship",
    title: "2023年夏季インターン体験談",
    content: "非常に有意義なインターンでした。実際の業務に近い課題に取り組めました。",
    rating: 5,
    is_online: false,
    location: "東京都渋谷区",
    passed: true,
    created_at: new Date("2023-08-15").toISOString(),
  },
  {
    id: "review-2",
    company_id: "company-2",
    user_id: "user-2",
    review_type: "interview",
    title: "一次面接の様子",
    content: "オンラインでの面接でした。技術的な質問が多かったです。",
    rating: 4,
    is_online: true,
    location: null,
    passed: true,
    created_at: new Date("2024-03-20").toISOString(),
  },
]

export const mockMessages = [
  {
    id: "msg-1",
    sender_id: "demo-user-1",
    receiver_id: "user-1",
    content: "インターンについて教えていただけますか?",
    is_read: true,
    created_at: new Date("2024-01-10T10:00:00").toISOString(),
    sender: mockUser,
    receiver: mockProfiles[0],
  },
  {
    id: "msg-2",
    sender_id: "user-1",
    receiver_id: "demo-user-1",
    content: "もちろんです。何でも聞いてください!",
    is_read: true,
    created_at: new Date("2024-01-10T10:05:00").toISOString(),
    sender: mockProfiles[0],
    receiver: mockUser,
  },
]
