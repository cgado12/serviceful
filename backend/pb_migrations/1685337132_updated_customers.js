migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("748hwtp34tged7y")

  collection.listRule = "@request.auth.orgId:each ~ orgId"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("748hwtp34tged7y")

  collection.listRule = null

  return dao.saveCollection(collection)
})
