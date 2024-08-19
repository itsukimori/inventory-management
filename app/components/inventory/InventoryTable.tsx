'use client'

import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import 'mantine-react-table/styles.css';
import { useMemo, useState, useEffect } from 'react';
import {
  MantineReactTable,
  useMantineReactTable,
  type MRT_ColumnDef,
  MRT_GlobalFilterTextInput,
  MRT_ToggleFiltersButton,
} from 'mantine-react-table';
import { Box, Flex, Menu } from '@mantine/core';
import { IconUserCircle, IconSend } from '@tabler/icons-react';
import { MRT_Localization_JA } from 'mantine-react-table/locales/ja';

export type Product = {
  name: string;
  staffEmail: string;
  category: string;
  price: number;
  stock: number;
  createdAt: Date;
};

const InventoryTable = () => {
    const [data, setData] = useState<Product[]>([]);
    useEffect(() => {
        const handleGetProductData = async () => {
        const response = await fetch('/api/product');
        const data = await response.json();
        setData(data);
        console.log(data);
        };
        handleGetProductData();
    }, []);
  const columns = useMemo<MRT_ColumnDef<Product>[]>(
    () => [
      {
        id: 'inventory', //id used to define `group` column
        header: '',
        columns: [
          {
            accessorFn: (row) => row.name, //accessorFn used to join multiple data into a single cell
            id: 'name', //id is still required when using accessorFn instead of accessorKey
            header: '製品名',
            size: 250,
            filterVariant: 'autocomplete',
            Cell: ({ renderedCellValue, row }) => (
              <Box
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                }}
              >
                <span>{renderedCellValue}</span>
              </Box>
            ),
          },
          {
            accessorKey: 'category',
            enableClickToCopy: true,
            header: 'カテゴリ',
            size: 150,
          },
          {
            accessorKey: 'staffEmail',
            enableClickToCopy: true,
            header: 'スタッフメールアドレス',
            size: 150,
          },
          {
            accessorKey: 'price',
            header: '価格',
            size: 200,
            filterVariant: 'range-slider',
            mantineFilterRangeSliderProps: {
              color: 'indigo',
              label: (value) =>
                value?.toLocaleString?.('en-US', {
                  style: 'currency',
                  currency: 'JPY',
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                }),
            },
            //custom conditional format and styling
            Cell: ({ cell }) => (
              <Box
                style={(theme) => ({
                  backgroundColor:
                    cell.getValue<number>() < 50_000
                      ? theme.colors.red[9]
                      : cell.getValue<number>() >= 50_000 &&
                          cell.getValue<number>() < 75_000
                        ? theme.colors.yellow[9]
                        : theme.colors.green[9],
                  borderRadius: '4px',
                  color: '#fff',
                  maxWidth: '9ch',
                  padding: '4px',
                })}
              >
                {cell.getValue<number>()?.toLocaleString?.('en-US', {
                  style: 'currency',
                  currency: 'JPY',
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                })}
              </Box>
            ),
          },
          {
            accessorKey: 'stock',
            header: '在庫数',
            size: 200,
            filterVariant: 'range-slider',
            mantineFilterRangeSliderProps: {
              color: 'indigo',
              label: (value) =>
                value?.toLocaleString?.('ja-JP'),
            },
            //custom conditional format and styling
            Cell: ({ cell }) => (
              <Box
                style={(theme) => ({
                  backgroundColor:
                    cell.getValue<number>() < 50_000
                      ? theme.colors.red[9]
                      : cell.getValue<number>() >= 50_000 &&
                          cell.getValue<number>() < 75_000
                        ? theme.colors.yellow[9]
                        : theme.colors.green[9],
                  borderRadius: '4px',
                  color: '#fff',
                  maxWidth: '9ch',
                  padding: '4px',
                })}
              >
                {cell.getValue<number>()?.toLocaleString?.('ja-JP')}
              </Box>
            ),
          },
          {
            accessorFn: (row) => {
              const sDay = new Date(row.createdAt);
              sDay.setHours(0, 0, 0, 0);
              return sDay;
            },
            id: 'createdAt',
            header: '作成日',
            size: 100,
            filterVariant: 'date',
            sortingFn: 'datetime',
            enableColumnFilterModes: false,
            Cell: ({ cell }) => cell.getValue<Date>()?.toLocaleDateString(),
            Header: ({ column }) => <em>{column.columnDef.header}</em>
          },
        ],
      },
    ],
    [],
  );

  const table = useMantineReactTable({
    columns,
    data,
    enableColumnFilterModes: true,
    enableColumnOrdering: true,
    enableFacetedValues: true,
    enableGrouping: true,
    initialState: {
      showColumnFilters: true,
      showGlobalFilter: true,
    },
    paginationDisplayMode: 'pages',
    positionToolbarAlertBanner: 'bottom',
    mantinePaginationProps: {
      radius: 'xl',
      size: 'lg',
    },
    mantineSearchTextInputProps: {
      placeholder: '製品を検索',
    },
    renderRowActionMenuItems: () => (
      <>
        <Menu.Item leftSection={<IconUserCircle />}>View Profile</Menu.Item>
        <Menu.Item leftSection={<IconSend />}>Send Email</Menu.Item>
      </>
    ),
    renderTopToolbar: ({ table }) => {
      return (
        <Flex p="md" justify="space-between">
          <Flex gap="xs">
            {/* import MRT sub-components */}
            <MRT_GlobalFilterTextInput table={table} />
            <MRT_ToggleFiltersButton table={table} />
          </Flex>
          <Flex style={{ gap: '8px' }}>
          </Flex>
        </Flex>
      );
    },
    localization: MRT_Localization_JA,
  });

  return <MantineReactTable table={table} />;
};

export default InventoryTable;