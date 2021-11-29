import mongoose from 'mongoose';
import JobSchema from '../schemas/job.schema';

export const JobModel = mongoose.model("job", JobSchema);
