'use client';
import { useAuth } from '../../context/AuthContext';
import { useState } from 'react';
import axios from '../../api/axios';
import { navigate } from '@/utils/navigate';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { z } from 'zod';

const userSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  email: z.string().email('Formato de e-mail inválido').toLowerCase(),
  password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
});

const LoginPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    const validationResult = userSchema.safeParse({ name, email, password });

    if (!validationResult.success) {
      const messages = validationResult.error.errors.map(err => err.message);
      setError(messages[0]);
      return;
    }

    try {
      const response = await axios.post('/auth/signup', {
        name,
        email,
        password,
      });
      login(response.data.token, response.data.user);
      navigate('/');
    } catch (error: any) {
      setError(error.response?.data?.message || 'Tentativa de cadastro falhou');
    }
  };

  return (
    <section className="flex min-h-screen">
      <Card className="w-[400px] m-auto flex flex-col gap-3">
        <CardHeader>
          <Image
            src="/static/logo.png"
            alt="Logo Logzz"
            width={150}
            height={50}
            className="m-auto py-4"
            style={{ height: 'auto', width: '120px' }}
          />
          <CardTitle className="text-[28px]">Crie sua Conta</CardTitle>
          <CardDescription className="text-base">
            Insira seus dados abaixo para se cadastrar!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <Input
              value={name}
              onChange={e => setName(e.target.value)}
              type="text"
              placeholder="Digite seu nome"
            />
            <Input
              value={email}
              onChange={e => setEmail(e.target.value)}
              type="email"
              placeholder="Digite seu e-mail"
            />
            <Input
              value={password}
              onChange={e => setPassword(e.target.value)}
              type="password"
              placeholder="Digite sua senha"
            />
            {error && <p className="text-red-500">{error}</p>}
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-2 w-full mb-4">
          <Button
            variant="logzz_default"
            className="py-[20px] w-full"
            onClick={handleLogin}
          >
            Continuar
          </Button>
          <div className="flex gap-1 justify-center w-full">
            <p>Já tenho uma conta!</p>
            <span
              onClick={() => {
                navigate('/signin');
              }}
              className="text-logzz_green cursor-pointer"
            >
              Acessar
            </span>
          </div>
        </CardFooter>
      </Card>
    </section>
  );
};

export default LoginPage;
