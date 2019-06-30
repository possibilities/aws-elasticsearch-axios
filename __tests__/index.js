const configureDb = require('../index')

const elasticsearch = configureDb('http://127.0.0.1:9200')

test('configureDb', async () => {
  await elasticsearch.delete('/test-index').catch(() => null)
  const { data } = await elasticsearch.put('/test-index?pretty')
  expect(data.index).toEqual('test-index')
})

// Note: assuming that if some verbs work they'll all work
test('standard verbs', async () => {
  await elasticsearch.delete('/test-index').catch(() => null)
  await elasticsearch.put('/test-index?pretty')
  await elasticsearch.put('/test-index/_doc/1?pretty', { name: 'Bob' })
  const { data } = await elasticsearch.get('/test-index/_doc/1?pretty')
  expect(data._source.name).toEqual('Bob')
})

test('bulk queries', async () => {
  await elasticsearch.delete('/test-index').catch(() => null)
  await elasticsearch.put('/test-index?pretty')
  await elasticsearch.bulk('/test-index', [
    { index: { _id: '1' } },
    { foo: 'bar' },
    { index: { _id: '2' } },
    { foof: 'doof' }
  ])

  const { data: data1 } = await elasticsearch.get('/test-index/_doc/1?pretty')
  expect(data1._source.foo).toEqual('bar')
  const { data: data2 } = await elasticsearch.get('/test-index/_doc/2?pretty')
  expect(data2._source.foof).toEqual('doof')
})
