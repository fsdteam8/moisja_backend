import RemovalRequest from '../entities/removalRequest/removalRequest.model.js';
import FastRemoval from '../entities/fastRemoval/fastRemoval.model.js';
import HouseVisit from '../entities/houseVisit/houseVisit.model.js';
import getAllMonthlyStats from '../lib/getAllMonthlyStats.js'; 

export const getStats = async (req, res) => {
  try {
    const [removalRequestStats, fastRemovalStats, houseVisitStats] = await Promise.all([
      getAllMonthlyStats(RemovalRequest),
      getAllMonthlyStats(FastRemoval),
      getAllMonthlyStats(HouseVisit)
    ]);

    // Merge all data into one chartData array
    const monthMap = new Map();

    const addToMap = (data, key) => {
      data.forEach(({ month, count }) => {
        if (!monthMap.has(month)) {
          monthMap.set(month, { month });
        }
        monthMap.get(month)[key] = count;
      });
    };

    addToMap(fastRemovalStats, 'fastRemoval');
    addToMap(removalRequestStats, 'removalRequest');
    addToMap(houseVisitStats, 'houseVisit');

    const chartData = Array.from(monthMap.values()).map(entry => ({
      month: entry.month,
      fastRemoval: entry.fastRemoval || 0,
      removalRequest: entry.removalRequest || 0,
      houseVisit: entry.houseVisit || 0,
    }));

    res.status(200).json({
      status: true,
      message: 'Combined monthly completed stats',
      data: chartData,
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
