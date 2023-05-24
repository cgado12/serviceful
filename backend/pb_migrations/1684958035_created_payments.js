migrate((db) => {
  const collection = new Collection({
    "id": "qxrd5ucp9hqmdxl",
    "created": "2023-05-24 19:53:55.294Z",
    "updated": "2023-05-24 19:53:55.294Z",
    "name": "payments",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "xbokrmly",
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
      },
      {
        "system": false,
        "id": "r37knqrb",
        "name": "servicesOffered",
        "type": "json",
        "required": false,
        "unique": false,
        "options": {}
      },
      {
        "system": false,
        "id": "k4ffah6b",
        "name": "amountDue",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "kkzpuuv9",
        "name": "orgId",
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
        "id": "3bxaio2k",
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
        "id": "toutdaf6",
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
      },
      {
        "system": false,
        "id": "8gnj8txw",
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
  const collection = dao.findCollectionByNameOrId("qxrd5ucp9hqmdxl");

  return dao.deleteCollection(collection);
})
