import { Op } from 'sequelize';
import * as Yup from 'yup';
import { isBefore, parseISO, startOfHour } from 'date-fns';

import Delivery from '../models/Delivery';
import Deliver from '../models/Deliver';
import Signature from '../models/Signature';
import Recipient from '../models/Recipient';
import File from '../models/File';
import Queue from '../../lib/Queue';
import NewDeliveryMail from '../jobs/newDeliveryMail';

class DeliveryController {
  async list(req, res) {
    const { page = 1, q } = req.query;

    if (q) {
      const { count, rows: deliveries } = await Delivery.findAndCountAll({
        where: {
          product: {
            [Op.iLike]: `${q}%`,
          },
        },
        order: ['start_date'],
        limit: 6,
        offset: (page - 1) * 6,
        include: [
          {
            model: Deliver,
            as: 'deliverman',
            attributes: ['name', 'email'],
            include: [
              {
                model: File,
                as: 'avatar',
                attributes: ['id', 'path', 'url'],
              },
            ],
          },
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
            paranoid: false,
          },
          {
            model: Signature,
            as: 'signature',
            attributes: ['id', 'path', 'url'],
          },
        ],
      });

      return res.json({ deliveries, count });
    }

    const { count, rows: deliveries } = await Delivery.findAndCountAll({
      limit: 6,
      offset: (page - 1) * 6,
      order: ['start_date'],
      include: [
        {
          model: Deliver,
          as: 'deliverman',
          attributes: ['name', 'email'],
          include: [
            {
              model: File,
              as: 'avatar',
              attributes: ['id', 'path', 'url'],
            },
          ],
        },
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
          paranoid: false,
        },
        {
          model: Signature,
          as: 'signature',
          attributes: ['id', 'path', 'url'],
        },
      ],
    });

    return res.json({ count, deliveries });
  }

  async findOne(req, res) {
    const delivery = await Delivery.findOne({
      where: { id: req.params.id },
      include: [
        {
          model: Deliver,
          as: 'deliverman',
          attributes: ['name'],
        },
        {
          model: Recipient,
          as: 'recipient',
          attributes: ['name'],
          paranoid: false,
        },
      ],
    });

    if (!delivery) {
      return res.status(400).json({ error: 'Delivery not found' });
    }

    return res.json(delivery);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      recipient_id: Yup.number().required(),
      deliverman_id: Yup.number().required(),
      product: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { id, recipient_id, deliverman_id, product } = req.body;
    const delivery = await Delivery.create({
      id,
      recipient_id,
      deliverman_id,
      product,
    });

    const recipient = await Recipient.findByPk(recipient_id, {
      attributes: [
        'name',
        'street',
        'number',
        'complement',
        'state',
        'city',
        'zip_code',
      ],
    });

    const deliveryman = await Deliver.findByPk(deliverman_id, {
      attributes: ['name', 'email'],
    });

    await Queue.add(NewDeliveryMail.key, {
      delivery,
      recipient,
      deliveryman,
    });

    return res.json(delivery);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      recipient_id: Yup.number(),
      deliverman_id: Yup.number(),
      product: Yup.string(),
      start_date: Yup.date(),
      end_date: Yup.date(),
      canceled_at: Yup.date(),
      signature_id: Yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }
    const {
      recipient_id,
      deliverman_id,
      product,
      start_date,
      end_date,
      canceled_at,
      signature_id,
    } = req.body;

    let delivery = await Delivery.findByPk(req.params.id);

    if (!delivery) {
      return res.status(400).json({ error: 'Delivery not found.' });
    }

    if (start_date) {
      // check if the date is already passed
      const hourStart = startOfHour(parseISO(start_date));

      if (isBefore(hourStart, new Date())) {
        return res.status(401).json({ error: 'Past date is not permitted.' });
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
        return res.status(401).json({
          error: 'There is already a delivery scheduled for this time',
        });
      }
    }

    if (end_date) {
      const endDate = parseISO(end_date);

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

      await delivery.update({ end_date: endDate });
    }

    delivery = await delivery.update({
      recipient_id,
      deliverman_id,
      product,
      start_date,
      end_date,
      canceled_at,
      signature_id,
    });

    return res.json(delivery);
  }

  async delete(req, res) {
    const delivery = await Delivery.findByPk(req.params.id);

    if (!delivery) {
      return res.status(400).json({ error: 'Delivery not found' });
    }
    await delivery.destroy();
    return res.json({ message: 'Delivery deleted with success' });
  }
}

export default new DeliveryController();
