import { ColumnDef } from '@tanstack/react-table';
import {
  ArrowUpDown,
  Copy,
  Edit,
  ExternalLink,
  MessageCircle,
  MoreHorizontal,
  Shirt,
  Trash2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { IProduct } from '@/types/Products';
import Image from 'next/image';
import { Avatar } from './ui/avatar';
import React from 'react';

export function createProductColumns(
  products: IProduct[],
  setProducts: React.Dispatch<React.SetStateAction<IProduct[]>>,
  setProduct: React.Dispatch<React.SetStateAction<IProduct | null>>,
  setRemove: React.Dispatch<React.SetStateAction<boolean>>,
  setEdit: React.Dispatch<React.SetStateAction<boolean>>
): ColumnDef<IProduct>[] {
  return [
    {
      id: 'actions',
      cell: ({ row }) => {
        const product = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() =>
                  product._id
                    ? navigator.clipboard.writeText(product._id)
                    : null
                }
              >
                <div className="flex justify-between items-center w-full">
                  <p>Copiar</p>
                  <Copy size={16} />
                </div>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  setProduct(product);
                  setEdit(true);
                }}
              >
                <div className="flex justify-between items-center w-full">
                  <p>Editar</p>
                  <Edit size={16} />
                </div>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  setProduct(product);
                  setRemove(true);
                }}
              >
                <div className="flex justify-between items-center w-full">
                  <p>Excluir</p>
                  <Trash2 size={16} className="text-g_danger" />
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
    {
      accessorKey: '_id',
      header: '',
      cell: () => null, // You can optionally provide a cell renderer
    },
    {
      accessorKey: 'name',
      header: 'Produto',
      cell: ({ row }) => {
        const product = row.original;
        return (
          <div className="flex items-center gap-3 w-full">
            <Avatar className="flex items-center justify-center p-0">
              {product.image_url ? (
                <Image
                  src={product.image_url}
                  alt="Foto do Produto"
                  width={150}
                  height={50}
                  style={{ height: '100%', width: 'auto' }}
                />
              ) : (
                <Shirt />
              )}
            </Avatar>
            <span className="truncate">{product.name}</span>
          </div>
        );
      },
    },
    {
      accessorKey: 'price',
      header: 'Preço',
      cell: ({ getValue }) => {
        const value = getValue() as number;
        return (
          <div className="flex justify-between">
            <span>R$</span>
            <span>{value.toFixed(2).replace('.', ',')}</span>
          </div>
        );
      },
    },
    {
      accessorKey: 'category',
      header: 'Categoria',
    },
  ];
}
