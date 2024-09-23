import * as React from 'react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { FilterOption } from '@/utils/tableFilterOptions';

interface FilterTableSelectorProps {
  selectorArray: FilterOption[];
  setSelectedColumn: (value: FilterOption) => void;
}

export const FilterTableSelector: React.FC<FilterTableSelectorProps> = ({
  selectorArray,
  setSelectedColumn,
}) => {
  return (
    <div className="flex items-center gap-4">
      <Select
        onValueChange={value => {
          const selected = selectorArray.find(obj => obj.column === value);
          setSelectedColumn(selected ? selected : selectorArray[0]);
        }}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Selecione a coluna" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {selectorArray.map((option, index) => (
              <SelectItem key={index} value={option.column}>
                {option.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};
