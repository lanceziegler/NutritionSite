import { Schema, model, models } from 'mongoose';

const PromptSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    // creating a one-to-many relationship. One user can create many prompts
    ref: 'User',
  },
  prompt: {
    type: String,
    required: [true, 'Prompt is required.'],
  },
  tag: {
    type: String,
    required: [true, 'Tag is required.'],
  },
});

//* Either get the prompt that already exists on the models object OR create a new model called 'Prompt' based on the PromptSchema
const Prompt = models.Prompt || model('Prompt', PromptSchema);
export default Prompt;
