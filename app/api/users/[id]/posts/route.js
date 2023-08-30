import { connectToDB } from '@utils/database';
import Prompt from '@models/prompt';

export const GET = async (request, { params }) => {
  try {
    await connectToDB();

    //* We have access to params because of dynamic [id] route/folder
    const prompts = await Prompt.find({
      //! THis gets us the posts from only that specific creator
      creator: params.id,
    }).populate('creator');

    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    return new Response('Failed to fetch all prompts', { status: 500 });
  }
};
