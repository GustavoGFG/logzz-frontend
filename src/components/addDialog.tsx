import { IProduct } from '@/types/Products';
import axios from '@/api/axios';
import React, { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogFooter, DialogTitle } from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Switch } from './ui/switch';
import { CustomSelector } from './customSelector';
import * as z from 'zod';

const productSchema = z.object({
  name: z.string().nonempty('Nome do produto é obrigatório'),
  description: z.string().nonempty('Descrição é obrigatória'),
  price: z.number().positive('Preço deve ser maior que 0'),
  category: z.string().nonempty('Categoria é obrigatória'),
  image_url: z.string().optional(),
});

interface AddDialogProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  products: IProduct[];
  setProducts: (array: IProduct[]) => void;
  categories: string[];
}

export const AddDialog = ({
  open,
  setOpen,
  products,
  setProducts,
  categories,
}: AddDialogProps) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState<number | ''>('');
  const [category, setCategory] = useState('');
  const [img, setImg] = useState('');
  const [createCategory, setCreateCategory] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (open) {
      setName('');
      setDescription('');
      setPrice('');
      setCategory('');
      setImg('');
      setCreateCategory(true);
      setErrorMessage(null);
    }
  }, [open]);

  const handleCreate = async () => {
    setErrorMessage(null);

    const formData = {
      name,
      description,
      price: typeof price === 'string' ? Number(price) : price,
      category,
      image_url: img,
    };

    const result = productSchema.safeParse(formData);

    if (!result.success) {
      setErrorMessage(result.error.errors[0]?.message || 'Erro no formulário');
      return;
    }

    setLoading(true);

    try {
      const payload: any = {
        name: formData.name,
        description: formData.description,
        category: formData.category,
        price: formData.price,
      };
      if (formData.image_url) {
        payload.image_url = formData.image_url;
      }

      const response = await axios.post(`/products`, payload);
      setProducts([...products, response.data.product]);
      setLoading(false);
      setOpen(false);
    } catch (error: any) {
      console.error(error.response?.data || 'API call failed');
      setErrorMessage('Falha ao criar o produto. Tente novamente.');
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="bg-white">
        <DialogTitle>Adicione um novo produto:</DialogTitle>

        <div className="flex flex-col gap-2">
          <div>
            <Label
              htmlFor="name"
              className="text-logzz_dark_green font-bold px-3"
            >
              Título
            </Label>
            <Input
              id="name"
              value={name}
              onChange={e => setName(e.target.value)}
              type="text"
              placeholder="Digite o nome do produto"
            />
          </div>
          <div>
            <Label
              htmlFor="description"
              className="text-logzz_dark_green font-bold px-3"
            >
              Descrição
            </Label>
            <Textarea
              id="description"
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Digite a descrição do produto"
            />
          </div>
          <div>
            <Label
              htmlFor="price"
              className="text-logzz_dark_green font-bold px-3"
            >
              Preço
            </Label>
            <Input
              id="price"
              value={price}
              onChange={e => setPrice(Number(e.target.value))}
              type="number"
              placeholder="Digite o preço"
            />
          </div>
          <div>
            <div className="flex justify-between px-3 mb-1">
              <Label
                htmlFor="category"
                className="text-logzz_dark_green font-bold"
              >
                Categoria
              </Label>
              <div className="flex items-center gap-2">
                <span
                  className={`text-xs ${createCategory ? 'text-logzz_green' : 'text-input'}`}
                >
                  Nova
                </span>
                <Switch
                  checked={createCategory}
                  onCheckedChange={setCreateCategory}
                />
              </div>
            </div>
            {createCategory ? (
              <Input
                id="category"
                value={category}
                onChange={e => setCategory(e.target.value)}
                type="text"
                placeholder="Digite a categoria do produto"
              />
            ) : (
              <CustomSelector
                placeholder="Selecione a categoria"
                setState={setCategory}
                values={categories}
              />
            )}
          </div>
          <div>
            <Label
              htmlFor="img"
              className="text-logzz_dark_green font-bold px-3"
            >
              Imagem (opcional)
            </Label>
            <Input
              id="img"
              value={img}
              onChange={e => setImg(e.target.value)}
              type="text"
              placeholder="Digite a URL da imagem do produto"
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
            onClick={handleCreate}
          >
            {loading ? 'Salvando...' : 'Salvar'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
