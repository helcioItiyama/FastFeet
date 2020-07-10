import pt from 'date-fns/locale/pt';
import { format, parseISO } from 'date-fns';
import Mail from '../../lib/Mail';

class CancellationMail {
  get key() {
    return 'CancellationMail';
  }

  async handle({ data }) {
    const { delivery } = data;

    let date;

    if (delivery.start_date === null) {
      date = 'Entrega ainda não agendada';
    } else {
      date = format(
        parseISO(delivery.start_date),
        "'Dia' dd 'de' MMMM', às' hh:mm'h'",
        {
          locale: pt,
        }
      );
    }

    await Mail.sendMail({
      to: `${delivery.deliverman.name} <${delivery.deliverman.email}>`,
      subject: 'Delivery cancelado',
      template: 'cancellation',
      context: {
        deliveryman: delivery.deliverman.name,
        product: delivery.product,
        recipient: delivery.recipient.name,
        street: delivery.recipient.street,
        number: delivery.recipient.number,
        city: delivery.recipient.city,
        state: delivery.recipient.state,
        date,
      },
    });
  }
}

export default new CancellationMail();
