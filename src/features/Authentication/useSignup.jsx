import { useMutation, useQueryClient } from '@tanstack/react-query';
import { signUp } from '../../services/apiAuth';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function useSignup() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: signingUp, isPending: isSigningUp } = useMutation({
    mutationFn: signUp,
    onSuccess: ({ data }) => {
      queryClient.setQueryData(['user'], data.user);
      navigate('/home', { replace: true });
      toast.success('user successfully created');
    },
    onError: (err) => {
      console.error(err);
      throw new Error(err.message);
    },
  });
  return { signingUp, isSigningUp };
}

export default useSignup;
