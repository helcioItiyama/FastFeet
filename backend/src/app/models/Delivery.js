import Sequelize, { Model } from 'sequelize';

class Delivery extends Model {
  static init(sequelize) {
    super.init(
      {
        product: Sequelize.STRING,
        canceled_at: Sequelize.DATE, // FALTA PREENCHER
        start_date: Sequelize.DATE, // FALTA PREENCHER
        end_date: Sequelize.DATE, // FALTA PREENCHER
      },
      {
        sequelize,
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Signature, {
      foreignKey: 'signature_id',
      as: 'signature',
    });
    this.belongsTo(models.Recipient, {
      foreignKey: 'recipient_id',
      as: 'recipient',
    });
    this.belongsTo(models.Deliver, {
      foreignKey: 'deliverman_id',
      as: 'deliverman',
    });
  }
}

export default Delivery;
