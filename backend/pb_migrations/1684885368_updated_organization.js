migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("xhj5dt9z9xhjf3f")

  // remove
  collection.schema.removeField("nsspdl8n")

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("xhj5dt9z9xhjf3f")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "nsspdl8n",
    "name": "orgAdminId",
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
