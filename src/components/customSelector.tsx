import React from 'react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

interface CustomSelectorProps {
  values: string[];
  state?: string;
  setState: (e: string) => void;
  placeholder: string;
}

export const CustomSelector = ({
  values,
  state,
  setState,
  placeholder,
}: CustomSelectorProps) => {
  return (
    <Select
      onValueChange={value => {
        setState(value);
      }}
    >
      <SelectTrigger>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {values.map((option, index) => (
            <SelectItem key={index} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
