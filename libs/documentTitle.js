const companyName = 'TECNOPOR S.A.'

export function createTitleInitial(args) {
  if (typeof args === 'string') {
    return args
  }
  return args.join(' - ')
}

export function createDocumentTitle(...args) {
  if (!args.length) {
    return companyName
  }

  const title = `${createTitleInitial(args)} | ${companyName}`
  return title
}
