migrate((db) => {
  const collection = new Collection({
    "id": "i2a8phyb2ly0x5a",
    "created": "2023-05-23 23:46:54.196Z",
    "updated": "2023-05-23 23:46:54.196Z",
    "name": "jobPayments",
    "type": "base",
    "system": false,
    "schema": [
      {
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
      },
      {
        "system": false,
        "id": "fwrnrqx6",
        "name": "servicesOffered",
        "type": "json",
        "required": false,
        "unique": false,
        "options": {}
      },
      {
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
      },
      {
        "system": false,
        "id": "hfu4likf",
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
        "id": "0dmbfbby",
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
        "id": "vdqnh69e",
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
  const collection = dao.findCollectionByNameOrId("i2a8phyb2ly0x5a");

  return dao.deleteCollection(collection);
})
