export const formatDate = (date) => {
  if (!date) return null

  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

export const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
