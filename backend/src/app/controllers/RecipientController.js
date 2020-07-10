import { Op } from 'sequelize';
import * as Yup from 'yup';
import Recipient from '../models/Recipient';

class RecipientController {
  async list(req, res) {
    const { q } = req.query;

    let recipients;

    if (!q) {
      recipients = await Recipient.findAll({
        order: [['id', 'ASC']],
        attributes: [
          'id',
          'name',
          'street',
          'number',
          'complement',
          'state',
          'city',
          'zip_code',
        ],
      });
      return res.json(recipients);
    }

    recipients = await Recipient.findAll({
      where: {
        name: {
          [Op.iLike]: `${q}%`,
        },
      },
      order: [['id', 'ASC']],
      attributes: [
        'id',
        'name',
        'street',
        'number',
        'complement',
        'state',
        'city',
        'zip_code',
      ],
    });
    return res.json(recipients);
  }

  async findOne(req, res) {
    const recipient = await Recipient.findByPk(req.params.id);

    if (!recipient) {
      return res.status(400).json({ error: 'Recipient not found' });
    }

    return res.json(recipient);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      street: Yup.string().required(),
      number: Yup.number().required(),
      complement: Yup.string(),
      state: Yup.string().required(),
      city: Yup.string().required(),
      zip_code: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const {
      id,
      name,
      street,
      number,
      complement,
      state,
      city,
      zip_code,
    } = await Recipient.create(req.body);
    return res.json({
      id,
      name,
      street,
      number,
      complement,
      state,
      city,
      zip_code,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      street: Yup.string().required(),
      number: Yup.number().required(),
      complement: Yup.string(),
      state: Yup.string().required(),
      city: Yup.string().required(),
      zip_code: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }
    const user = await Recipient.findByPk(req.params.id);

    if (!user) {
      return res.status(401).json({ error: 'Recipient not found!' });
    }

    const {
      id,
      name,
      street,
      number,
      complement,
      state,
      city,
      zip_code,
    } = await user.update(req.body);

    return res.json({
      id,
      name,
      street,
      number,
      complement,
      state,
      city,
      zip_code,
    });
  }

  async delete(req, res) {
    const recipient = await Recipient.findByPk(req.params.id);

    if (!recipient) {
      return res.status(400).json({ error: 'Recipient not found' });
    }

    await recipient.destroy();
    return res.json('Recipient deleted with success');
  }
}

export default new RecipientController();
