export function getRandom(min, max) {
  return Math.ceil(Math.random() * (max - min) + min)
}

export function getCoords(elem) {
  const box = elem.getBoundingClientRect()
  return {
    top: box.top + pageYOffset,
    left: box.left + pageXOffset
  }
}

export function transformData(initialData) {
  const datasets = []
  let labels = []

  initialData.columns.forEach(item => {
    if (item[0] === 'x') {
      item.shift()
      labels = item.concat()
    } else {
      const type = item.shift()
      datasets.push({
        data: [...item],
        color: initialData.colors[type],
        name: initialData.names[type],
        type: initialData.types[type]
      })
    }
  })

  return {labels, datasets}
}

export function getYValues(datasets) {
  return datasets.reduce((all, dataset) => {
    return all.concat(dataset.data)
  }, [])
}

export function getBoundary(datasets) {
  const allValues = getYValues(datasets)
  const min = Math.floor(Math.min.apply(null, allValues))
  const max = Math.ceil(Math.max.apply(null, allValues))

  return [min, max]
}

export function computeRatio(max, min, columnsCount, width, height) {
  const yRatio = (max - min) / height
  const xRatio = width / (columnsCount - 2)

  return [xRatio, yRatio]
}

export function getCoordinates(data, min, height, xRatio, yRatio, margin = 0) {
  return data.map((value, index) => {
    const y = Math.floor(height - ((value - min) / yRatio))
    const x = Math.floor(index * xRatio)
    return [x, y + margin]
  })
}

const shortMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const shortDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

export function dateFilter(timestamp, withDay) {
  const date = new Date(timestamp)
  if (withDay) {
    return `${shortDays[date.getDay()]}, ${shortMonths[date.getMonth()]} ${date.getDate()}`
  }
  return `${shortMonths[date.getMonth()]} ${date.getDate()}`
}

export function css(el, styles = {}) {
  Object.keys(styles).forEach(style => {
    el.style[style] = styles[style]
  })
}

export function noop() {}