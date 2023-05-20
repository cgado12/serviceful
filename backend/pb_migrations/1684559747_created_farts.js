migrate((db) => {
  const collection = new Collection({
    "id": "ejcyqy9lnrc12qq",
    "created": "2023-05-20 05:15:47.498Z",
    "updated": "2023-05-20 05:15:47.498Z",
    "name": "farts",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "6wtolzih",
        "name": "fieldddddd",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("ejcyqy9lnrc12qq");

  return dao.deleteCollection(collection);
})
