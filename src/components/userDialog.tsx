import { IUser } from '@/types/Users';
import axios from '@/api/axios';
import React, { useEffect, useState } from 'react';
import { Button } from './ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import * as z from 'zod';

export const updateUserSchema = z.object({
  name: z.string().optional(),
  email: z.string().email('Formato de e-mail inválido').optional(),
  password: z
    .string()
    .min(6, 'A senha deve ter pelo menos 6 caracteres')
    .optional(),
});

interface UpdateUserDialogProps {
  open: boolean;
  setOpen: (value: boolean) => void;
}

export const UpdateUserDialog = ({ open, setOpen }: UpdateUserDialogProps) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (open) {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser) as IUser;
        setUser(parsedUser);
        setName(parsedUser.name);
        setEmail(parsedUser.email);
        setPassword('');
        setErrorMessage(null);
      }
    }
  }, [open]);

  const handleUpdate = async () => {
    if (!user) return;

    setErrorMessage(null);

    const formData = {
      name,
      email,
      password: password || undefined,
    };

    const result = updateUserSchema.safeParse(formData);

    if (!result.success) {
      const messages = result.error.errors.map(err => err.message);
      setErrorMessage(result.error.errors[0]?.message || 'Erro no formulário');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.put(`/auth/update`, formData);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      setLoading(false);
      setOpen(false);
    } catch (error: any) {
      console.error(error.response?.data || 'Falha ao atualizar o usuário');
      setErrorMessage('Falha ao atualizar o usuário. Tente novamente.');
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="bg-white">
        <DialogTitle>Edite o usuário:</DialogTitle>
        <DialogDescription>
          <p>{user?.email}</p>
        </DialogDescription>
        <div className="flex flex-col gap-2">
          <div>
            <Label
              htmlFor="name"
              className="text-logzz_dark_green font-bold px-3"
            >
              Nome
            </Label>
            <Input
              id="name"
              value={name}
              onChange={e => setName(e.target.value)}
              type="text"
              placeholder="Digite o nome do usuário"
            />
          </div>
          <div>
            <Label
              htmlFor="email"
              className="text-logzz_dark_green font-bold px-3"
            >
              E-mail
            </Label>
            <Input
              id="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              type="email"
              placeholder="Digite o e-mail do usuário"
            />
          </div>
          <div>
            <Label
              htmlFor="password"
              className="text-logzz_dark_green font-bold px-3"
            >
              Senha (deixe em branco para não alterar)
            </Label>
            <Input
              id="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              type="password"
              placeholder="Digite a nova senha"
            />
          </div>
        </div>
        <DialogFooter className="flex items-center">
          {errorMessage && (
            <p className="text-red-500 text-sm">{errorMessage}</p>
          )}
          <Button
            disabled={loading}
            variant="ghost"
            onClick={() => setOpen(false)}
          >
            Cancelar
          </Button>
          <Button
            disabled={loading}
            variant="logzz_default"
            onClick={handleUpdate}
          >
            Salvar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
