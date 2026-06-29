import { useState, type ChangeEvent, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card } from '../components/Card'
import { useBookmarksContext } from '../context/useBookmarksContext'
import type { BookmarkFormErrors, BookmarkFormValues } from '../types'

const initialFormValues: BookmarkFormValues = {
  title: '',
  url: '',
  category: '',
  ownerEmail: '',
  notes: '',
}

export function AddBookmarkView() {
  const [values, setValues] = useState<BookmarkFormValues>(initialFormValues)
  const [errors, setErrors] = useState<BookmarkFormErrors>({})
  const { setBookmarks } = useBookmarksContext()
  const navigate = useNavigate()

  function validate(currentValues: BookmarkFormValues): BookmarkFormErrors {
    const validationErrors: BookmarkFormErrors = {}

    if (!currentValues.title.trim()) {
      validationErrors.title = 'Title is required.'
    }

    if (!currentValues.url.trim()) {
      validationErrors.url = 'URL is required.'
    }

    if (!currentValues.category.trim()) {
      validationErrors.category = 'Category is required.'
    }

    if (!currentValues.ownerEmail.trim()) {
      validationErrors.ownerEmail = 'Owner email is required.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(currentValues.ownerEmail)) {
      validationErrors.ownerEmail = 'Please enter a valid email.'
    }

    return validationErrors
  }

  function handleChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = event.target
    setValues((previousValues) => ({
      ...previousValues,
      [name]: value,
    }))
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const validationErrors = validate(values)
    setErrors(validationErrors)

    if (Object.keys(validationErrors).length > 0) {
      return
    }

    setBookmarks((currentBookmarks) => [
      ...currentBookmarks,
      {
        id: crypto.randomUUID(),
        title: values.title,
        url: values.url,
        category: values.category,
        ownerEmail: values.ownerEmail,
        notes: values.notes,
      },
    ])

    navigate('/')
  }

  return (
    <Card title="Add a Bookmark">
      <form onSubmit={handleSubmit} noValidate>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          value={values.title}
          onChange={handleChange}
          aria-invalid={Boolean(errors.title)}
        />
        {errors.title && <p role="alert">{errors.title}</p>}

        <label htmlFor="url">URL</label>
        <input
          id="url"
          name="url"
          value={values.url}
          onChange={handleChange}
          aria-invalid={Boolean(errors.url)}
        />
        {errors.url && <p role="alert">{errors.url}</p>}

        <label htmlFor="category">Category</label>
        <input
          id="category"
          name="category"
          value={values.category}
          onChange={handleChange}
          aria-invalid={Boolean(errors.category)}
        />
        {errors.category && <p role="alert">{errors.category}</p>}

        <label htmlFor="ownerEmail">Owner Email</label>
        <input
          id="ownerEmail"
          name="ownerEmail"
          value={values.ownerEmail}
          onChange={handleChange}
          aria-invalid={Boolean(errors.ownerEmail)}
        />
        {errors.ownerEmail && <p role="alert">{errors.ownerEmail}</p>}

        <label htmlFor="notes">Notes</label>
        <textarea
          id="notes"
          name="notes"
          value={values.notes}
          onChange={handleChange}
        />

        <button type="submit">Save Bookmark</button>
      </form>
    </Card>
  )
}
