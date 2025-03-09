import React, { Fragment, useCallback, useState } from 'react'

export const SeedButton: React.FC = () => {
  const [loading, setLoading] = useState(false)
  const [seeded, setSeeded] = useState(false)
  const [error, setError] = useState(null)

  const handleClick = useCallback(
    async e => {
      e.preventDefault()
      if (loading || seeded) return

      setLoading(true)

      setTimeout(async () => {
        try {
          await fetch('/api/seed')
          setSeeded(true)
        } catch (err) {
          setError(err)
        }
      }, 1000)
    },
    [loading, seeded],
  )

  let message = ''
  if (loading) message = ' (seeding...)'
  if (seeded) message = ' (done!)'
  if (error) message = ` (error: ${error})`

  return (
    <Fragment>
      <a
        href="/api/seed"
        className="seed-your-database"
        target="_blank"
        rel="noopener noreferrer"
        onClick={e => {
          const confirm = window.confirm(
            'This will seed your database with some data. Are you sure?',
          )
          if (!confirm) e.preventDefault()
          else handleClick(e)
        }}
      >
        Seed your database
      </a>
      {message}
    </Fragment>
  )
}
