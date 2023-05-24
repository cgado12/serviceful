migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("i2a8phyb2ly0x5a")

  collection.name = "jobPayment"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("i2a8phyb2ly0x5a")

  collection.name = "jobPayments"

  return dao.saveCollection(collection)
})
