migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("orochhhtqld6amy")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "7zgfq0yo",
    "name": "amountDue",
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
  const collection = dao.findCollectionByNameOrId("orochhhtqld6amy")

  // remove
  collection.schema.removeField("7zgfq0yo")

  return dao.saveCollection(collection)
})
