import React, { useState } from 'react';
import Select, { SingleValue } from 'react-select';

type Option = {
  label: string;
  value?: string;
  options?: Option[]; // サブオプションがある場合
};

type DataType = {
  [key: string]: {
    [key: string]: {
      [key: string]: string[]
    } | string[]
  } | {}
};

const data: DataType = {
  "氾濫域": {},
  "集水域": {
    "治水基準地点上流域": {
      "ダム上流域": ["小流域", "小流域"],
      "ダム下流域 (ダム上流域以外)": ["小流域", "小流域", "小流域"]
    },
    "治水基準地点下流域": {
      "ダム下流域 (ダム上流域以外)": ["小流域", "小流域"]
    }
  }
};

const initialOptions: Option[] = [
  { label: "氾濫域", value: "氾濫域" },
  { label: "集水域", value: "集水域" }
];

const convertToOptions = (data: any, prefix = ''): Option[] => {
  return Object.keys(data).map(key => {
    const value = prefix ? `${prefix} > ${key}` : key;
    if (typeof data[key] === 'object' && data[key] !== null && Object.keys(data[key]).length > 0) {
      return {
        label: key,
        options: convertToOptions(data[key], value)
      };
    }
    return { label: key, value };
  });
};

const MapRasterComponent: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<SingleValue<Option>>(null);
  const [subOptions, setSubOptions] = useState<Option[]>([]);

  const handleChange = (option: SingleValue<Option>) => {
    setSelectedOption(option);
    if (option && data[option.value as keyof DataType]) {
      setSubOptions(convertToOptions(data[option.value as keyof DataType]));
    } else {
      setSubOptions([]);
    }
  };

  return (
    <div>
      <Select
        value={selectedOption}
        onChange={handleChange}
        options={initialOptions}
        placeholder="選択してください"
      />
      {subOptions.length > 0 && (
        <Select
          onChange={handleChange}
          options={subOptions}
          placeholder="治水基準地点を選択してください"
        />
      )}
    </div>
  );
};

export default MapRasterComponent;
