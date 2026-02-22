import { usePrivy } from '@privy-io/react-auth';
import { Button } from '@/components/ui/button';

export function Login() {
  const { login } = usePrivy();

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4">
      <h2 className="text-2xl font-bold">Bem-vindo à Dona Liamba</h2>
      <p className="text-muted-foreground text-center max-w-md">
        Acesse sua plataforma Web3 para saúde canábica. Conecte-se para gerenciar prescrições e produtos.
      </p>
      <Button onClick={login} size="lg">
        Entrar / Cadastrar
      </Button>
    </div>
  );
}
