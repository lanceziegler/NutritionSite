'use client';
import { useEffect, useState } from 'react';
// import { useSession } from 'next-auth/react';
//next/navigation?
import { useRouter, useSearchParams } from 'next/navigation';
import Form from '@components/Form';

const EditPrompt = () => {
  const router = useRouter();
  //   const { data: session } = useSession();
  //! This is how we can access the [id] after the slash in url
  const searchParams = useSearchParams();
  const promptId = searchParams.get('id');

  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: '',
    tag: '',
  });

  useEffect(() => {
    const getPromptDetails = async () => {
      const response = await fetch(`/api/prompt/${promptId}`);
      const data = await response.json();

      setPost({
        prompt: data.prompt,
        tag: data.tag,
      });
    };

    if (promptId) getPromptDetails();
  }, [promptId]);

  const updatePrompt = async (e) => {
    //* We want the least amount of reloads as possible
    e.preventDefault();
    setSubmitting(true);

    if (!promptId) return alert('Missing prompt ID');

    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: 'PATCH',
        body: JSON.stringify({
          prompt: post.prompt,
          //! We don't need the userId because we know who created it (just updating it here)
          //   userId: session?.user.id,
          tag: post.tag,
        }),
      });

      if (response.ok) {
        router.push('/');
      }
    } catch (error) {
      console.log(error);
      //! Happens regardless of try/catch result
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <Form
        type='Edit'
        post={post}
        setPost={setPost}
        submitting={submitting}
        handleSubmit={updatePrompt}
      />
    </div>
  );
};

export default EditPrompt;
