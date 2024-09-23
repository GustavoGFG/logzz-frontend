export interface FilterOption {
  placeholder: string;
  column: string;
  label: string;
}

export interface TableFilterOptions {
  productsFilter: FilterOption[];
}

export const TableFilterOptions: TableFilterOptions = {
  productsFilter: [
    {
      placeholder: 'Filtrar por Id',
      column: '_id',
      label: 'Id',
    },
    {
      placeholder: 'Filtrar por Nome',
      column: 'name',
      label: 'Nome',
    },
    {
      placeholder: 'Filtrar por Categoria',
      column: 'category',
      label: 'Categoria',
    },
  ],
};
