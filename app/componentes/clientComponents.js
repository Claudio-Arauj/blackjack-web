"use client"
import { useRouter } from 'next/navigation';
import { handleServerNavigation } from './serverComponents';

// Função de navegação clientside
export function useNavigation() {
  const router = useRouter();
  
  const handleClientNavigation = async (key, id) => {
    try {
      // chama a server action handleGo pra lidar com o caminho
      const path = await handleServerNavigation(key, id);
      // usa o router para ir pro caminho dado pelo handlego        {[(Fudeu)]}
      router.push(path);//                                              /
    } catch (error) {//se der merda,fala pro console que fudeu:     ('-')-b
      console.error('Navigation error:', error);
    }
  };
  
  return handleClientNavigation;
}