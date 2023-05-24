migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("i2a8phyb2ly0x5a")

  // remove
  collection.schema.removeField("afoslaxi")

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("i2a8phyb2ly0x5a")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "afoslaxi",
    "name": "name",
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
})
