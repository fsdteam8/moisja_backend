const getAllMonthlyStats = (Model) => {
    return Model.aggregate([
      { $match: { status: 'completed' } },
      {
        $group: {
          _id: {
            month: { $month: { $toDate: '$createdAt' } },
            year: { $year: { $toDate: '$createdAt' } }
          },
          count: { $sum: 1 }
        }
      },
      {
        $project: {
          year: '$_id.year',
          monthNum: '$_id.month',
          month: {
            $switch: {
              branches: [
                { case: { $eq: ['$_id.month', 1] }, then: 'January' },
                { case: { $eq: ['$_id.month', 2] }, then: 'February' },
                { case: { $eq: ['$_id.month', 3] }, then: 'March' },
                { case: { $eq: ['$_id.month', 4] }, then: 'April' },
                { case: { $eq: ['$_id.month', 5] }, then: 'May' },
                { case: { $eq: ['$_id.month', 6] }, then: 'June' },
                { case: { $eq: ['$_id.month', 7] }, then: 'July' },
                { case: { $eq: ['$_id.month', 8] }, then: 'August' },
                { case: { $eq: ['$_id.month', 9] }, then: 'September' },
                { case: { $eq: ['$_id.month', 10] }, then: 'October' },
                { case: { $eq: ['$_id.month', 11] }, then: 'November' },
                { case: { $eq: ['$_id.month', 12] }, then: 'December' },
              ],
              default: 'Unknown'
            }
          },
          count: 1
        }
      },
      { $sort: { year: 1, monthNum: 1 } }
    ]);
  };
  
  export default getAllMonthlyStats;
  