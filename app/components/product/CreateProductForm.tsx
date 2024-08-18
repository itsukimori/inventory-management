'use client'

import React, { useState } from 'react'
import { Input, Button, InputWrapper, NumberInput, Dialog, Text, Paper, Group } from '@mantine/core';
import { useRouter } from 'next/navigation';

export default function CreateProductForm() {
    const [name, setName] = useState('');
    const [category, setCategory] = useState<string>('');
    const [price, setPrice] = useState<number>(0);
    const [stock, setStock] = useState<number>(0);
    const [resData, setResData] = useState<any>(null);
    const [errors, setErrors] = useState<any>({});
    const router = useRouter();

    const validate = () => {
        const newErrors: any = {};
        if (!name) newErrors.name = '製品名は必須です';
        if (!category) newErrors.category = 'カテゴリは必須です';
        if (price <= 0) newErrors.price = '価格は0より大きい必要があります';
        if (stock <= 0) newErrors.stock = '在庫数は0より大きい必要があります';
        return newErrors;
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        setErrors({});
        try {
            const response = await fetch('/api/product', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: name,
                    category: category,
                    price: price,
                    stock: stock,
                }),
            });
            const resData = await response.json();
            setResData(resData);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <Paper withBorder shadow="xl" radius="md" p="md">
                <form onSubmit={handleSubmit}>
                    <InputWrapper label="製品名" description="製品名称を入力してください" error={errors.name}>
                        <Input
                            placeholder="テレビモニター"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </InputWrapper>
                    <InputWrapper label="カテゴリ" description="カテゴリを入力してください" error={errors.category}>               
                        <Input
                            placeholder="電子機器"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        />
                    </InputWrapper>
                    <InputWrapper label="価格" description="価格を入力してください" error={errors.price}>
                        <NumberInput
                            placeholder="10000"
                            value={price}
                            onChange={(e) => setPrice(Number(e))}
                        />
                    </InputWrapper>
                    <InputWrapper label="在庫数" description="在庫数を入力してください" error={errors.stock}>
                        <NumberInput
                            placeholder="100"
                            value={stock}
                            onChange={(e) => setStock(Number(e))}
                        />
                    </InputWrapper>
                    <Button type="submit" mt="md" color='gray'>在庫作成</Button>
                </form>
            </Paper>
            {
                resData &&
                <Dialog opened title="ステータス">
                    <Group>
                        <Text>{resData.message}</Text>
                        <Button color='gray' onClick={() => router.push('/dashboard')}>マイページに戻る</Button>
                    </Group>
                </Dialog>
            }
        </>
    )
}
