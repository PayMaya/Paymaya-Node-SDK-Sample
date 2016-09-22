module.exports = {
  tableName: "Orders",
  attributes: {
    id: {
      primaryKey: true,
      type: "objectid"
    },
    checkoutId: {
      type: "string"
    },
    buyer: {
      type: "json"
    },
    totalAmount: {
      type: "json"
    },
    items: {
      type: "json"
    },
    status: {
      type: "string",
      enum: ["incomplete", "success", "failed"]
    }
  }
}
