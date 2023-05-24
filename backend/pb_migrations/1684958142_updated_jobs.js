migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("orochhhtqld6amy")

  collection.name = "job"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("orochhhtqld6amy")

  collection.name = "jobs"

  return dao.saveCollection(collection)
})
