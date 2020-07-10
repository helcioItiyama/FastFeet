import { isBefore, parseISO, startOfHour } from 'date-fns';
import * as Yup from 'yup';

import Delivery from '../models/Delivery';
import Recipient from '../models/Recipient';

class ScheduleController {
  async list(req, res) {
    const deliveries = await Delivery.findAll({
      where: {
        deliverman_id: req.params.id,
        canceled_at: null,
        end_date: null,
      },
      attributes: ['product', 'start_date'],
      include: [
        {
          model: Recipient,
          as: 'recipient',
          attributes: [
            'name',
            'street',
            'number',
            'complement',
            'state',
            'city',
            'zip_code',
          ],
        },
      ],
    });
    if (!deliveries) {
      return res.status(400).json({ error: 'Deliveryman not found' });
    }
    return res.json(deliveries);
  }

  async listDone(req, res) {
    const deliveries = await Delivery.findAll({
      where: { deliverman_id: req.params.id },
      attributes: ['product', 'start_date', 'end_date', 'signature_id'],
      include: [
        {
          model: Recipient,
          as: 'recipient',
          attributes: [
            'name',
            'street',
            'number',
            'complement',
            'state',
            'city',
            'zip_code',
          ],
        },
      ],
    });
    if (!deliveries) {
      return res.status(400).json({ error: 'Deliveryman not found' });
    }

    const listDone = deliveries.filter(
      (delivery) => delivery.end_date !== null
    );

    return res.json(listDone);
  }

  async setDateStart(req, res) {
    const schema = Yup.object().shape({
      start_date: Yup.date().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { start_date } = req.body;

    // check if the date is already passed
    const hourStart = startOfHour(parseISO(start_date));

    if (isBefore(hourStart, new Date())) {
      return res.status(401).json({ error: 'Past date is not permitted.' });
    }

    const delivery = await Delivery.findByPk(req.params.productId);
    if (!delivery) {
      return res.status(400).json({ error: 'Delivery not found' });
    }

    // check availabitily
    const noAvailability = await Delivery.findOne({
      where: {
        deliverman_id: delivery.deliverman_id,
        start_date: hourStart,
        canceled_at: null,
      },
    });

    if (noAvailability) {
      return res
        .status(401)
        .json({ error: 'There is already a delivery scheduled for this time' });
    }

    const setDate = await delivery.update({ start_date: hourStart });

    return res.json(setDate);
  }

  async setDateEnd(req, res) {
    const delivery = await Delivery.findByPk(req.params.productId);

    const { start_date, signature_id } = delivery;

    const endDate = new Date();

    if (start_date === null) {
      return res
        .status(401)
        .json({ error: 'You must set delivery start date first' });
    }

    if (isBefore(endDate, start_date)) {
      return res
        .status(401)
        .json({ error: 'End delivery must be after the start date' });
    }

    if (signature_id === null) {
      return res
        .status(401)
        .json({ error: 'Only deliveries with signature can be ended' });
    }

    const endDelivery = await delivery.update({ end_date: endDate });

    return res.json(endDelivery);
  }
}

export default new ScheduleController();
