import { connectToDB } from '@utils/database';
import Prompt from '@models/prompt';

export const POST = async (req, res) => {
  // Extract data from POST request
  const { userId, prompt, tag } = await req.json();

  try {
    //* We need to connectToDB every time because this is a lambda function, meaning that it's going to 'die' once it does its job
    await connectToDB();
    const newPrompt = new Prompt({ creator: userId, prompt, tag });
    //! Save it to the database with save method......?
    await newPrompt.save();
    return new Response(JSON.stringify(newPrompt), { status: 201 });
  } catch (error) {
    return new Response('Failed to create a new prompt', { status: 500 });
  }
};
