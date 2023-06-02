migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("orochhhtqld6amy")

  // remove
  collection.schema.removeField("csdfymdc")

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("orochhhtqld6amy")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "csdfymdc",
    "name": "payment",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "i2a8phyb2ly0x5a",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
})
