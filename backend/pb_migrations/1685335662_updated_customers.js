migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("748hwtp34tged7y")

  collection.listRule = " @request.auth.orgId = orgId"
  collection.updateRule = ""
  collection.deleteRule = ""

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("748hwtp34tged7y")

  collection.listRule = null
  collection.updateRule = null
  collection.deleteRule = null

  return dao.saveCollection(collection)
})
