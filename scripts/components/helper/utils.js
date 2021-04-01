export const formatDate = (date) => {
    return typeof(date) === Date ? format(date) : format(new Date(date))
}

const format = (date) => {
    return date.toLocaleString('ja', { timezone: 'UTC' })
        .replaceAll('/', '-')
}