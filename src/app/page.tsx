'use client';
import { DataTable } from '@/components/dataTable';
import { createProductColumns } from '@/components/productColumns';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/context/AuthContext';
import { IProduct } from '@/types/Products';
import { TableFilterOptions } from '@/utils/tableFilterOptions';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Edit, LogOut, Plus, User } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import axios from '../api/axios';
import { DeleteDialog } from '@/components/deleteDialog';
import { UpdateDialog } from '@/components/updateDialog';
import { AddDialog } from '@/components/addDialog';
import { UpdateUserDialog } from '@/components/userDialog';

export default function Home() {
  const { logout } = useAuth();

  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState<IProduct | null>(null);
  const [categories, setCategories] = useState<string[]>([]);
  const [remove, setRemove] = useState(false);
  const [edit, setEdit] = useState(false);
  const [add, setAdd] = useState(false);
  const [openUser, setOpenUser] = useState(false);

  const products_columns = createProductColumns(
    products,
    setProducts,
    setProduct,
    setRemove,
    setEdit
  );
  const getCategories = () => {
    const uniqueCategories = new Set<string>();
    let categories = products.forEach((product: IProduct) =>
      uniqueCategories.add(product.category)
    );
    const categoriesArray = Array.from(uniqueCategories);
    setCategories(categoriesArray);
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get('/products');
        setProducts(response.data.products);

        setLoading(false);
      } catch (error: any) {
        console.error(error.response?.data || 'API call failed');
        logout();
      }
    };
    getData();
  }, []);

  useEffect(() => {
    getCategories();
  }, [products]);
  return (
    <>
      <header className="bg-logzz_primary px-8 py-2 flex justify-between items-center shadow-logzz_primary/80 shadow-lg">
        <Image
          src="/static/logo.png"
          alt="Logo Logzz"
          width={150}
          height={50}
          style={{ height: '30px', width: 'auto' }}
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <User className="text-logzz_green cursor-pointer" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="rounded-md border-1 border-logzz_text/20">
            <DropdownMenuItem
              onClick={() => {
                setOpenUser(true);
              }}
              className="flex justify-between items-center gap-8 px-2 py-3 hover:bg-logzz_text/10 cursor-pointer"
            >
              <p className="text-sm">Editar</p>
              <Edit size={16} />
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={logout}
              className="flex justify-between gap-4 px-2 py-3 hover:bg-logzz_text/10 cursor-pointer"
            >
              <p className="text-sm">Sair</p>
              <LogOut size={16} />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>
      <main className="max-w-[1200px] m-auto px-4 py-6">
        <h1 className="text-logzz_primary text-3xl font-bold mb-3">Produtos</h1>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-logzz_text font-semibold text-base">
              Lista de Produtos
            </CardTitle>
            <Button
              variant="logzz_default"
              onClick={() => {
                setAdd(true);
              }}
            >
              <Plus />
              <span>Add</span>
            </Button>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex justify-center items-center min-h-[200px]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-logzz_green"></div>
                <span className="ml-4 text-logzz_green text-xl font-semibold">
                  Carregando produtos...
                </span>
              </div>
            ) : (
              <>
                {products.length > 0 ? (
                  <DataTable
                    columns={products_columns}
                    data={products}
                    selectorArray={TableFilterOptions.productsFilter}
                  />
                ) : (
                  <div>Sem Resultados</div>
                )}
              </>
            )}
          </CardContent>
        </Card>
      </main>
      {product && (
        <>
          <DeleteDialog
            product={product}
            open={remove}
            setOpen={setRemove}
            products={products}
            setProducts={setProducts}
          />
          <UpdateDialog
            product={product}
            open={edit}
            setOpen={setEdit}
            products={products}
            setProducts={setProducts}
            categories={categories}
          />
        </>
      )}
      <AddDialog
        open={add}
        setOpen={setAdd}
        products={products}
        setProducts={setProducts}
        categories={categories}
      />
      <UpdateUserDialog open={openUser} setOpen={setOpenUser} />
    </>
  );
}
