'use client'

import { useState, useEffect } from 'react';
import { 
  Table,
  TextInput,
  Checkbox,
  Button,
  ScrollArea,
  Group,
  Text,
  rem,
  UnstyledButton,
  Center,
  Paper,
  InputWrapper,
  Input,
  NumberInput,
} from '@mantine/core';
import classes from '@/app/mantine-css-modules/OrderProductFormTable.module.css';
import { IconSelector, IconChevronDown, IconChevronUp, IconSearch } from '@tabler/icons-react';

interface RowData {
  name: string;
  price: number;
  stock: number;
}

interface ThProps {
  children: React.ReactNode;
  reversed: boolean;
  sorted: boolean;
  onSort(): void;
}

function Th({ children, reversed, sorted, onSort }: ThProps) {
  const Icon = sorted ? (reversed ? IconChevronUp : IconChevronDown) : IconSelector;
  return (
    <Table.Th className={classes.th}>
      <UnstyledButton onClick={onSort} className={classes.control}>
        <Group justify="space-between">
          <Text fw={500} fz="sm">
            {children}
          </Text>
          <Center className={classes.icon}>
            <Icon style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
          </Center>
        </Group>
      </UnstyledButton>
    </Table.Th>
  );
}

function filterData(data: RowData[], search: string) {
  const query = search.toLowerCase().trim();
  return data.filter((item) =>
    Object.values(item).some((value) => 
      typeof value === 'string' && value.toLowerCase().includes(query)
    )
  );
}

function sortData(
  data: RowData[],
  payload: { sortBy: keyof RowData | null; reversed: boolean; search: string }
) {
  const { sortBy } = payload;

  if (!sortBy) {
    return filterData(data, payload.search);
  }

  return filterData(
    [...data].sort((a, b) => {
      const aValue = a[sortBy];
      const bValue = b[sortBy];
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return payload.reversed ? bValue.localeCompare(aValue) : aValue.localeCompare(bValue);
      }
      
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return payload.reversed ? bValue - aValue : aValue - bValue;
      }
      
      return 0;
    }),
    payload.search
  );
}

export function OrderProductFormTable() {
  const validate = () => {
    const newErrors: any = {};
    if (quantity > selection[0].stock) newErrors.quantity = '在庫数以下の数値を入力してください';
    if (quantity <= 0) newErrors.quantity = '1以上の数値を入力してください';
    if (quantity >= 101) newErrors.quantity = '100以下の数値を入力してください';
    if (!quantity) newErrors.quantity = '数量は必須です';
    if (!storeName) newErrors.storeName = '店舗名は必須です';
    return newErrors;
  };
  const [data, setData] = useState<RowData[]>([]);
  useEffect(() => {
      const handleGetProductData = async () => {
      const response = await fetch('/api/product');
      const data = await response.json();
      setData(data);
      setSortedData(data);
    };
    handleGetProductData();
  }, []);

  const [search, setSearch] = useState('');
  const [sortedData, setSortedData] = useState(data);
  const [sortBy, setSortBy] = useState<keyof RowData | null>(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);
  const [selection, setSelection] = useState<RowData[]>([]);
  const [selectedProductFlg, setSelectedProductFlg] = useState(true);
  const [errors, setErrors] = useState<any>({});

  const [quantity, setQuantity] = useState(0);
  const [storeName, setStoreName] = useState('');

  const toggleRow = (id: RowData) => setSelection((current) => current[0] === id ? [] : [id]);

  const setSorting = (field: keyof RowData) => {
    const reversed = field === sortBy ? !reverseSortDirection : false;
    setReverseSortDirection(reversed);
    setSortBy(field);
    setSortedData(sortData(data, { sortBy: field, reversed, search }));
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    setSearch(value);
    setSortedData(sortData(data, { sortBy, reversed: reverseSortDirection, search: value }));
  };

  const rows = sortedData.map((row) => (
    <Table.Tr key={row.name}>
      <Table.Td>
        <Checkbox checked={selection.includes(row)} onChange={() => toggleRow(row)} />
      </Table.Td>
      <Table.Td>{row.name}</Table.Td>
      <Table.Td>{row.price}</Table.Td>
      <Table.Td>{row.stock}</Table.Td>
    </Table.Tr>
  ));

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    try {
      const response = await fetch('/api/order', {
        method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          name: selection[0].name,
          quantity: quantity,
          storeName: storeName,
          price: quantity * selection[0].price,
        }),
      });
      const resData = await response.json();
      if (resData.status === 200) {
        window.location.reload();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSelectProduct = () => {
    if (selection.length > 0) {
      setSelectedProductFlg(false);
    }
  };

  return (
    <>
      {
        selectedProductFlg ? (
          <>
            <TextInput
              placeholder="製品名で検索"
              mb="md"
              leftSection={<IconSearch style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}
              value={search}
              onChange={handleSearchChange}
            />
            <ScrollArea h={500}>
              <Table horizontalSpacing="md" verticalSpacing="xs" miw={700} layout="fixed">
                <Table.Tbody>
                  <Table.Tr>
                    <Table.Th style={{ width: rem(40) }}>
                    </Table.Th>
                    <Th
                      sorted={sortBy === 'name'}
                      reversed={reverseSortDirection}
                      onSort={() => setSorting('name')}
                    >
                      製品名
                    </Th>
                    <Th
                      sorted={sortBy === 'price'}
                      reversed={reverseSortDirection}
                      onSort={() => setSorting('price')}
                    >
                      単価
                    </Th>
                    <Th
                      sorted={sortBy === 'stock'}
                      reversed={reverseSortDirection}
                      onSort={() => setSorting('stock')}
                    >
                      在庫数
                    </Th>
                  </Table.Tr>
                </Table.Tbody>
                <Table.Tbody>
                  {rows.length > 0 ? (
                    rows
                  ) : (
                    <Table.Tr>
                      <Table.Td colSpan={data.length > 0 ? Object.keys(data[0]).length + 1 : 4}>
                        <Text fw={500} ta="center">
                          データを取得しています
                        </Text>
                      </Table.Td>
                    </Table.Tr>
                  )}
                </Table.Tbody>
              </Table>
            </ScrollArea>
            <Button color="gray" mt="md" onClick={handleSelectProduct}>
              製品を選択
            </Button>
          </>
        ) : (
          <>
            <Paper withBorder shadow="xl" radius="md" p="md">
              <form onSubmit={handleSubmit}>
                <Text>製品名：{selection[0].name}</Text>
                <Text>単価：{selection[0].price}</Text>
                <Text>在庫数：{selection[0].stock}</Text>
                <br />
                <InputWrapper label="数量" description="数量を入力してください" error={errors.quantity}>
                  <NumberInput
                    placeholder="100"
                    onChange={(e) => setQuantity(Number(e))}
                  />
                </InputWrapper>
                <InputWrapper label="店舗名" description="店舗名を入力してください" error={errors.storeName}>
                  <Input
                    placeholder="大塚商会"
                    onChange={(e) => setStoreName(e.target.value)}
                  />
                </InputWrapper>
                <Button color="gray" mt="md" type="submit">注文</Button>
                <Button color="gray" mt="md" ml="md" onClick={() => setSelectedProductFlg(true)}>戻る</Button>
              </form>
            </Paper>
          </>
        )
      }
    </>
  );
}
