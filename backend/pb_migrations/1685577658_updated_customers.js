migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("748hwtp34tged7y")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "dlv0tha5",
    "name": "squareCustomerId",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("748hwtp34tged7y")

  // remove
  collection.schema.removeField("dlv0tha5")

  return dao.saveCollection(collection)
})
