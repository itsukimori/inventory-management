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
  keys
} from '@mantine/core';
import classes from '@/app/mantine-css-modules/OrderProductTable.module.css';
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

export function OrderProductTable() {
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
  const [selection, setSelection] = useState(['1']);
  const [selectedProductFlg, setSelectedProductFlg] = useState(true);

  const toggleRow = (id: string) => setSelection((current) => current[0] === id ? [] : [id]);

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
        <Checkbox checked={selection.includes(row.name)} onChange={() => toggleRow(row.name)} />
      </Table.Td>
      <Table.Td>{row.name}</Table.Td>
      <Table.Td>{row.price}</Table.Td>
      <Table.Td>{row.stock}</Table.Td>
    </Table.Tr>
  ));

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
                          データが見つかりません
                        </Text>
                      </Table.Td>
                    </Table.Tr>
                  )}
                </Table.Tbody>
              </Table>
            </ScrollArea>
            <Button onClick={() => setSelectedProductFlg(false)}>
              製品を選択
            </Button>
          </>
        ) : (
          <>
            <Paper withBorder shadow="xl" radius="md" p="md">
              <Text>製品名：{selection}</Text>
            </Paper>
          </>
        )
      }
    </>
  );
}