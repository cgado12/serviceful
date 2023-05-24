migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("i2a8phyb2ly0x5a")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "mklunmtr",
    "name": "paymentStrategy",
    "type": "select",
    "required": false,
    "unique": false,
    "options": {
      "maxSelect": 2,
      "values": [
        "card",
        "cash"
      ]
    }
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "3hpjizdy",
    "name": "type",
    "type": "select",
    "required": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "subscription",
        "single"
      ]
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("i2a8phyb2ly0x5a")

  // remove
  collection.schema.removeField("mklunmtr")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "3hpjizdy",
    "name": "type",
    "type": "select",
    "required": false,
    "unique": false,
    "options": {
      "maxSelect": 3,
      "values": [
        "subscription",
        "single",
        "cash"
      ]
    }
  }))

  return dao.saveCollection(collection)
})
