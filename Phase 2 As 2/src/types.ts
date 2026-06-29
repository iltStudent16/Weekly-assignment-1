export interface Bookmark {
  id: string
  title: string
  url: string
  category: string
  ownerEmail: string
  notes?: string
}

export interface BookmarkFormValues {
  title: string
  url: string
  category: string
  ownerEmail: string
  notes: string
}

export interface BookmarkFormErrors {
  title?: string
  url?: string
  category?: string
  ownerEmail?: string
}
