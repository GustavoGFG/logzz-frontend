import { IProduct } from '@/types/Products';
import axios from '@/api/axios';
import { Shirt } from 'lucide-react';
import Image from 'next/image';
import React, { useState } from 'react';
import { Avatar } from './ui/avatar';
import { Button } from './ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from './ui/dialog';

interface DeleteDialogProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  product: IProduct;
  products: IProduct[];
  setProducts: (array: IProduct[]) => void;
}

export const DeleteDialog = ({
  open,
  setOpen,
  product,
  products,
  setProducts,
}: DeleteDialogProps) => {
  const [loading, setLoading] = useState(false);
  const handleDelete = async () => {
    try {
      const response = await axios.delete(`/products/${product._id}`);
      setProducts(products.filter(obj => obj._id !== product._id));
      setLoading(false);
      setOpen(false);
    } catch (error: any) {
      console.error(error.response?.data || 'API call failed');
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="bg-white">
        <DialogTitle>Tem certeza que deseja excluir esse produto?</DialogTitle>
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
        <DialogFooter>
          <Button
            disabled={loading}
            variant="ghost"
            onClick={() => {
              setOpen(false);
            }}
          >
            Cancelar
          </Button>
          <Button
            disabled={loading}
            variant="destructive"
            onClick={handleDelete}
          >
            Excluir
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
