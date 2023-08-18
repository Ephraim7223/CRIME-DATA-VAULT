import cron from 'node-cron';
import PendingUpdateRequest from '../models/pending/pending.model.js';

// Schedule a job to run daily
export const scheduledJob = () => {
  cron.schedule('0 * * * *', async () => { // Updated schedule pattern: '0 * * * *' (runs every hour at the 0th minute)
    try {
      // Find and delete approved or rejected requests
      await PendingUpdateRequest.deleteMany({ isApproved: true });
      await PendingUpdateRequest.deleteMany({ isApproved: false, adminComments: { $exists: true } });
      console.log('Scheduled job executed: Deleted approved and rejected requests.');
    } catch (err) {
      console.error('Error deleting requests:', err);
    }
  });
};