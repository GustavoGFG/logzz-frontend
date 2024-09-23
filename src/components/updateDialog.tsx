import { IProduct } from '@/types/Products';
import axios from '@/api/axios';
import { Shirt } from 'lucide-react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { Avatar } from './ui/avatar';
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
import { Textarea } from './ui/textarea';
import { Switch } from './ui/switch';
import { CustomSelector } from './customSelector';
import * as z from 'zod';

export const updateProductSchema = z.object({
  name: z.string().optional(),
  price: z.number().positive('O preço deve ser positivo').optional(),
  description: z.string().optional(),
  category: z.string().optional(),
  image_url: z.string().url('A URL é inválida').optional(),
});

interface UpdateDialogProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  product: IProduct;
  products: IProduct[];
  setProducts: (array: IProduct[]) => void;
  categories: string[];
}

export const UpdateDialog = ({
  open,
  setOpen,
  product,
  products,
  setProducts,
  categories,
}: UpdateDialogProps) => {
  const [name, setName] = useState(product.name);
  const [description, setDescription] = useState(product.description);
  const [price, setPrice] = useState<number | ''>(product.price);
  const [category, setCategory] = useState(product.category);
  const [img, setImg] = useState(product.image_url);

  const [createCategory, setCreateCategory] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (open) {
      setName(product.name);
      setDescription(product.description);
      setPrice(product.price);
      setCategory(product.category);
      setImg(product.image_url);
      setErrorMessage(null);
    }
  }, [open, product]);

  const handleUpdate = async () => {
    setErrorMessage(null);

    const formData = {
      name,
      description,
      price: typeof price === 'string' ? Number(price) : price,
      category,
      image_url: img,
    };

    const result = updateProductSchema.safeParse(formData);

    if (!result.success) {
      const messages = result.error.errors.map(err => err.message);
      setErrorMessage(result.error.errors[0]?.message || 'Erro no formulário');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.put(`/products/${product._id}`, formData);
      setProducts(
        products.map(obj =>
          obj._id === product._id ? response.data.product : obj
        )
      );
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
        <DialogTitle>Edite o produto:</DialogTitle>
        <DialogDescription>
          <div className="flex items-center gap-3 w-full">
            <Avatar className="flex items-center justify-center p-0">
              {product.image_url ? (
                <Image
                  src={product.image_url}
                  alt="Foto do Produto"
                  width={150}
                  height={50}
                  style={{ height: '30px', width: 'auto' }}
                />
              ) : (
                <Shirt />
              )}
            </Avatar>
            <span>{product.name}</span>
          </div>
        </DialogDescription>
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
              Imagem
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
            onClick={handleUpdate}
          >
            Salvar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
