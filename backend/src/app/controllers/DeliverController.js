import { Op } from 'sequelize';
import * as Yup from 'yup';
import File from '../models/File';
import Deliver from '../models/Deliver';

class DeliverController {
  async list(req, res) {
    const { page = 1, q } = req.query;

    if (!q) {
      const { count, rows: delivers } = await Deliver.findAndCountAll({
        include: [
          {
            model: File,
            as: 'avatar',
            attributes: ['id', 'path', 'url'],
          },
        ],
        order: ['id'],
        limit: 6,
        offset: (page - 1) * 6,
      });
      return res.json({ delivers, count });
    }

    const { count, rows: delivers } = await Deliver.findAndCountAll({
      where: {
        name: {
          [Op.iLike]: `${q}%`,
        },
      },
      limit: 6,
      offset: (page - 1) * 6,
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['id', 'path', 'url'],
        },
      ],
    });
    return res.json({ delivers, count });
  }

  async findOne(req, res) {
    const delivers = await Deliver.findOne({
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['id', 'url', 'path'],
        },
      ],
    });

    if (!delivers) {
      return res.status(400).json({ error: 'Deliveryman not found' });
    }

    return res.json(delivers);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const userExists = await Deliver.findOne({
      where: { email: req.body.email },
    });

    if (userExists) {
      return res.status(400).json({ error: 'Deliverman already exists.' });
    }

    const { name, email, avatar_id } = req.body;
    const deliver = await Deliver.create({ name, email, avatar_id });
    return res.json(deliver);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const deliver = await Deliver.findByPk(req.params.id);

    if (!deliver) {
      return res.status(400).json({ error: 'Deliverman not found.' });
    }

    const { name, email } = await deliver.update(req.body);

    return res.json({ name, email });
  }

  async delete(req, res) {
    const deliver = await Deliver.findByPk(req.params.id);

    if (!deliver) {
      return res.status(400).json({ error: 'Deliverman not found.' });
    }

    await deliver.destroy();
    return res.json();
  }
}

export default new DeliverController();
