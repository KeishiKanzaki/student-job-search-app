export interface Profile {
  id: string
  email: string
  full_name: string | null
  student_id: string | null
  department: string | null
  faculty: string | null
  graduation_year: number | null
  is_alumni: boolean
  bio: string | null
  location: string | null
  avatar_url: string | null
  points: number
  created_at: string
  updated_at: string
}

export interface Company {
  id: string
  name: string
  industry: string | null
  description: string | null
  website: string | null
  logo_url: string | null
  created_at: string
  updated_at: string
}

export interface CompanyReview {
  id: string
  company_id: string
  user_id: string
  review_type: "internship" | "interview" | "es" | "general"
  title: string
  content: string
  rating: number
  is_online: boolean | null
  location: string | null
  passed: boolean | null
  created_at: string
  updated_at: string
}

export interface Message {
  id: string
  sender_id: string
  receiver_id: string
  content: string
  is_read: boolean
  created_at: string
}

export interface UserTag {
  id: string
  user_id: string
  tag: string
  created_at: string
}
