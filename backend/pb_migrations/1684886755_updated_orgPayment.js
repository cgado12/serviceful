migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("h9e37uqwhptki9r")

  // remove
  collection.schema.removeField("doa9qhw0")

  // remove
  collection.schema.removeField("r9lqfhnd")

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("h9e37uqwhptki9r")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "doa9qhw0",
    "name": "address",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "r9lqfhnd",
    "name": "phone",
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
