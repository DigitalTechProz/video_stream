"use client";

import { useSessionContext, useSupabaseClient } from "@supabase/auth-helpers-react";
import Modal from "./Modal";
import { useRouter } from "next/navigation";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import useAuthModal from "@/hooks/useAuthModal";
import { useEffect } from "react";


interface AuthModalProps {
  isOpen: boolean;
  onChange: (open: boolean) => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onChange }) => {
  const supabaseClient = useSupabaseClient();
  const router = useRouter();
  const { session } = useSessionContext();
  const { onClose } = useAuthModal();

  useEffect(() => {
    if (session) {
      const fetchOrCreatePreference = async () => {
        // Try to fetch existing preference
        let { data, error } = await supabaseClient
          .from('user_preferences')
          .select('last_watched_video_id')
          .eq('user_id', session.user.id)
          .single();

        if (error && error.code === 'PGRST116') {
          // If no preference exists, create one
          const { data: insertData, error: insertError } = await supabaseClient
            .from('user_preferences')
            .insert({ user_id: session.user.id })
            .select('last_watched_video_id')
            .single();

          if (insertError) {
            console.error('Error creating user preference:', insertError);
            return null;
          }

          data = insertData;
        } else if (error) {
          console.error('Error fetching user preference:', error);
          return null;
        }

        return data?.last_watched_video_id;
      };

      fetchOrCreatePreference().then((videoId) => {
        if (videoId) {
          router.push(`/dashboard/${videoId}`);
        } else {
          router.push('/');
        }
        onClose();
      });
    }
  }, [session, router, onClose, supabaseClient]);

  return (
    <Modal
      title="Welcome Back!"
      description="Sign in to your account and watch your favorite videos"
      isOpen={isOpen}
      onChange={onChange}
    >
      <Auth
        theme="dark"
        magicLink
        providers={["github", "google"]}
        supabaseClient={supabaseClient}
        appearance={{
          theme: ThemeSupa,
          variables: {
            default: {
              colors: {
                brand: '#404040',
                brandAccent: '#22c55e'
              }
            }
          }
        }}
      />
    </Modal>
  );
};

export default AuthModal;