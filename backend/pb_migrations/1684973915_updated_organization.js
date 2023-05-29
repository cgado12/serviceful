migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("xhj5dt9z9xhjf3f")

  collection.createRule = ""
  collection.updateRule = ""

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("xhj5dt9z9xhjf3f")

  collection.createRule = null
  collection.updateRule = null

  return dao.saveCollection(collection)
})
