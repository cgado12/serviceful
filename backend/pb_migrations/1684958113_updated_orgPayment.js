migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("h9e37uqwhptki9r")

  collection.name = "orgPayments"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("h9e37uqwhptki9r")

  collection.name = "orgPayment"

  return dao.saveCollection(collection)
})
