export interface FullResult {
  count: number
  total_pages: number
  current_page: number
  next: null|string
  previous: null|string
  results: Task[]
}
export interface Task {
  id: number
  useduuid: string
  percentage: string
  text: string
  title: string
  status: string
  video_url: string
  audio_url: string
  ass_url: string
  thumbnail_url: string
  created_at: string
  updated_at: string
  user: number
}


export interface Voices {
  id: number
  voice: string
  voice_url: string
}
export interface Videos {
  id: number
  video_url: string
  image_url: string
}

