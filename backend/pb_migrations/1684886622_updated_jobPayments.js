migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("i2a8phyb2ly0x5a")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ltph7nir",
    "name": "currency",
    "type": "select",
    "required": true,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "usd"
      ]
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("i2a8phyb2ly0x5a")

  // remove
  collection.schema.removeField("ltph7nir")

  return dao.saveCollection(collection)
})
