import mongoose from 'mongoose';

const ReportSchema = new mongoose.Schema({
  ngoId: {
    type: String,
    required: true,
  },
  month: {
    type: String, // Format: YYYY-MM
    required: true,
  },
  peopleHelped: {
    type: Number,
    required: true,
  },
  eventsConducted: {
    type: Number,
    required: true,
  },
  fundsUtilized: {
    type: Number,
    required: true,
  },
}, { timestamps: true });

// Prevent model overwrite on hot reload
export default mongoose.models.Report || mongoose.model('Report', ReportSchema);
