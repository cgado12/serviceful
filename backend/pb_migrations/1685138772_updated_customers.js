migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("748hwtp34tged7y")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "d4kmhep6",
    "name": "email",
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
  collection.schema.removeField("d4kmhep6")

  return dao.saveCollection(collection)
})
