import Mail from '../../lib/Mail';

class NewDeliveryMail {
  get key() {
    return 'NewDeliveryMail';
  }

  async handle({ data }) {
    const { delivery, recipient, deliveryman } = data;

    await Mail.sendMail({
      to: `${deliveryman.name} <${deliveryman.email}>`,
      subject: 'New delivery for you!',
      template: 'newDelivery',
      context: {
        deliveryman: deliveryman.name,
        product: delivery.product,
        recipient: recipient.name,
        street: recipient.street,
        number: recipient.number,
        complement: recipient.complement,
        state: recipient.state,
        city: recipient.city,
        zipCode: recipient.zip_code,
      },
    });
  }
}

export default new NewDeliveryMail();
