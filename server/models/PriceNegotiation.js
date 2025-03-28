const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class PriceNegotiation extends Model {}

  PriceNegotiation.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      serviceRequestId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "ServiceRequests",
          key: "id",
        },
      },
      bidId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Bids",
          key: "id",
        },
      },
      customerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
        },
      },
      serviceProviderId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
        },
      },
      proposedAmount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      message: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      status: {
        type: DataTypes.ENUM("pending", "accepted", "rejected"),
        defaultValue: "pending",
      },
      isFromCustomer: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "PriceNegotiation",
      tableName: "PriceNegotiations",
      timestamps: true,
      indexes: [
        {
          name: "idx_price_negotiations_request",
          fields: ["serviceRequestId"],
        },
        {
          name: "idx_price_negotiations_bid",
          fields: ["bidId"],
        },
        {
          name: "idx_price_negotiations_customer",
          fields: ["customerId"],
        },
        {
          name: "idx_price_negotiations_provider",
          fields: ["serviceProviderId"],
        },
      ],
    }
  );

  return PriceNegotiation;
};
