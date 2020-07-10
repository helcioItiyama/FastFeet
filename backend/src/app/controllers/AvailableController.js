import {
  startOfDay,
  endOfDay,
  isAfter,
  setHours,
  setMinutes,
  setSeconds,
  format,
} from 'date-fns';
import { Op } from 'sequelize';
import Delivery from '../models/Delivery';

class AvailableController {
  async index(req, res) {
    const { date } = req.query;
    const searchDate = Number(date);

    const deliveries = await Delivery.findAll({
      where: {
        deliverman_id: req.params.id,
        canceled_at: null,
        start_date: {
          [Op.between]: [startOfDay(searchDate), endOfDay(searchDate)],
        },
      },
    });

    const schedule = ['08:00', '10:30', '13:00', '15:30', '18:00'];

    const available = schedule.map((time) => {
      const [hour, minute] = time.split(':');

      const value = setSeconds(
        setMinutes(setHours(searchDate, hour), minute),
        0
      );

      return {
        time,
        value: format(value, "yyyy-MM-dd'T'HH:mm:ssxxx"),
        available:
          isAfter(value, new Date()) &&
          !deliveries.find(
            (delivery) => format(delivery.start_date, 'HH:mm') === time
          ),
      };
    });

    return res.json(available);
  }
}

export default new AvailableController();
