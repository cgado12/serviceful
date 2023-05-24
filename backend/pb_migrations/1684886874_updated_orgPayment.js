migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("h9e37uqwhptki9r")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ldnca7u1",
    "name": "subscriptionType",
    "type": "select",
    "required": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "base",
        "plus",
        "enterprise"
      ]
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("h9e37uqwhptki9r")

  // remove
  collection.schema.removeField("ldnca7u1")

  return dao.saveCollection(collection)
})
