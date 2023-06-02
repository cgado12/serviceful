migrate((db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("h9e37uqwhptki9r");

  return dao.deleteCollection(collection);
}, (db) => {
  const collection = new Collection({
    "id": "h9e37uqwhptki9r",
    "created": "2023-05-23 23:48:13.652Z",
    "updated": "2023-05-24 19:55:33.040Z",
    "name": "orgPayment",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "j92xab61",
        "name": "userId",
        "type": "relation",
        "required": false,
        "unique": false,
        "options": {
          "collectionId": "_pb_users_auth_",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": []
        }
      },
      {
        "system": false,
        "id": "0a03apnx",
        "name": "orgID",
        "type": "relation",
        "required": false,
        "unique": false,
        "options": {
          "collectionId": "xhj5dt9z9xhjf3f",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": []
        }
      },
      {
        "system": false,
        "id": "ldnca7u1",
        "name": "subscriptionType",
        "type": "select",
        "required": false,
        "unique": false,
        "options": {
          "maxSelect": 1,
          "values": [
            "base",
            "plus",
            "enterprise"
          ]
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
})
