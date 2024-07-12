'use client'

import React, { useState } from 'react'
import { Input, Button, InputWrapper, NumberInput } from '@mantine/core';

export default function CreateProductForm() {
    const [name, setName] = useState('');
    const [category, setCategory] = useState<string>('');
    const [price, setPrice] = useState<number>(0);
    const [stock, setStock] = useState<number>(0);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
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
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <InputWrapper label="製品名" description="製品名称を入力してください">
                    <Input
                        placeholder="テレビモニター"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </InputWrapper>
                <InputWrapper label="カテゴリ" description="カテゴリを入力してください">               
                    <Input
                        placeholder="電子機器"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    />
                </InputWrapper>
                <InputWrapper label="価格" description="価格を入力してください">
                    <NumberInput
                        placeholder="10000"
                        value={price}
                        onChange={(e) => setPrice(Number(e))}
                    />
                </InputWrapper>
                <InputWrapper label="在庫数" description="在庫数を入力してください">
                    <NumberInput
                        placeholder="100"
                        value={stock}
                        onChange={(e) => setStock(Number(e))}
                    />
                </InputWrapper>
                <Button type="submit">在庫作成</Button>
            </form>
        </>
    )
}
