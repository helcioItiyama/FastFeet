import * as Yup from 'yup';

import DeliveryProblem from '../models/DeliveryProblem';
import Delivery from '../models/Delivery';
import Deliver from '../models/Deliver';
import Recipient from '../models/Recipient';

import CancellationMail from '../jobs/cancellationMail';
import Queue from '../../lib/Queue';

class DeliveryProblemController {
  async listAll(req, res) {
    const { page = 1 } = req.query;
    const deliveries = await DeliveryProblem.findAll({
      order: ['createdAt'],
      limit: 6,
      offset: (page - 1) * 6,
      include: [
        {
          model: Delivery,
          as: 'delivery',
          attributes: ['canceled_at'],
          include: [
            {
              model: Deliver,
              as: 'deliverman',
              attributes: ['name', 'id'],
            },
            {
              model: Recipient,
              as: 'recipient',
              attributes: ['name'],
            },
          ],
        },
      ],
    });
    return res.json(deliveries);
  }

  async listOne(req, res) {
    const { page = 1 } = req.query;
    const deliveries = await DeliveryProblem.findAll({
      where: { delivery_id: req.params.id },
      order: ['createdAt'],
      limit: 6,
      offset: (page - 1) * 6,
      include: [
        {
          model: Delivery,
          as: 'delivery',
          attributes: ['canceled_at'],
          include: [
            {
              model: Deliver,
              as: 'deliverman',
              attributes: ['name', 'id'],
            },
            {
              model: Recipient,
              as: 'recipient',
              attributes: ['name'],
            },
          ],
        },
      ],
    });
    return res.json(deliveries);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      description: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { description } = req.body;

    const delivery = await Delivery.findByPk(req.params.id);

    if (!delivery) {
      return res.status(400).json({ error: 'Delivery not found' });
    }

    const deliveryProblem = await DeliveryProblem.create({
      description,
      delivery_id: delivery.id,
    });

    return res.json(deliveryProblem);
  }

  async cancel_delivery(req, res) {
    const delivery = await Delivery.findByPk(req.params.id, {
      include: [
        {
          model: Deliver,
          as: 'deliverman',
          attributes: ['name', 'email'],
        },
        {
          model: Recipient,
          as: 'recipient',
          attributes: ['name', 'street', 'number', 'city', 'state'],
        },
      ],
    });

    if (!delivery) {
      return res.status(400).json({ error: 'Delivery not found' });
    }

    delivery.canceled_at = new Date();
    await delivery.save();

    await Queue.add(CancellationMail.key, {
      delivery,
    });

    return res.json(delivery);
  }
}

export default new DeliveryProblemController();
