async function handler ({ item }) {
  const { isString, has } = this.app.bajo.lib._
  if (!has(item, 'path')) throw this.error('connMustHavePath')
  item.baudRate = item.baudRate ?? 38400
  if (isString(item.parser)) item.parser = { name: item.parser }
  item.parser = item.parser ?? { name: 'ReadlineParser', delimiter: '\r\n' }
  if (!this.parsers.includes(item.parser.name)) throw this.error('unknownParser%s', item.parser.name)
  item.broadcast = item.broadcast ?? false
}

async function init () {
  const { buildCollections } = this.app.bajo
  this.connections = await buildCollections({ ns: this.name, handler, dupChecks: ['name', 'path'], container: 'connections' })
}

export default init
