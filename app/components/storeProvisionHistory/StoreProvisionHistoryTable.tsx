'use client'

import cx from 'clsx';
import { useState, useEffect } from 'react';
import { Table, ScrollArea } from '@mantine/core';
import classes from '@/app/mantine-css-modules/TableScrollArea.module.css';

type Data = {
    storeName: string;
    productName: string;
    productQuantity: number;
    productPrice: number;
    createdAt: string;
}

export function StoreProvisionHistoryTable() {
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const year = date.getFullYear().toString().slice(-2); // 年の下2桁を取得
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // 月を2桁に
        const day = date.getDate().toString().padStart(2, '0'); // 日を2桁に
        return `${year}/${month}/${day}`;
    };

    const [data, setData] = useState<Data[]>([]);
    useEffect(() => {
        const handleGetStoreProvisionHistoryData = async () => {
            const response = await fetch('/api/store-provision-history');
            const data = await response.json();
            setData(data);
        };
        handleGetStoreProvisionHistoryData();
    }, []);

    const [scrolled, setScrolled] = useState(false);

    const rows = data.map((row) => (
        <Table.Tr key={row.storeName}>
        <Table.Td>{row.storeName}</Table.Td>
        <Table.Td>{row.productName}</Table.Td>
        <Table.Td>{row.productQuantity}</Table.Td>
        <Table.Td>{row.productPrice}</Table.Td>
        <Table.Td>{formatDate(row.createdAt)}</Table.Td>
        </Table.Tr>
    ));

  return (
    <ScrollArea h={300} onScrollPositionChange={({ y }) => setScrolled(y !== 0)}>
      <Table miw={700}>
        <Table.Thead className={cx(classes.header, { [classes.scrolled]: scrolled })}>
          <Table.Tr>
            <Table.Th>提供先店舗名</Table.Th>
            <Table.Th>製品名</Table.Th>
            <Table.Th>数量</Table.Th>
            <Table.Th>価格</Table.Th>
            <Table.Th>提供日</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </ScrollArea>
  );
}
