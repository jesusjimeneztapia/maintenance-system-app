const companyName = 'TECNOPOR S.A.'

export function createDocumentTitle(...args) {
  if (!args.length) {
    return companyName
  }

  const title = `${args.join(' - ')} | ${companyName}`
  return title
}
