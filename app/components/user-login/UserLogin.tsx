'use client'
import {
    InputWrapper,
    Input,
    Group,
    Divider,
    Paper,
    Center,
    Text,
    Box,
    Button,
  } from '@mantine/core';
  import { useState } from 'react';
  import { useRouter } from 'next/navigation';  

  export function UserLogin() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState<any>({});
    const [responseErrors, setResponseErrors] = useState<boolean>(false);

    const validate = () => {
      const newErrors: any = {};
      if (!email) newErrors.email = 'メールアドレスは必須です';
      if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) newErrors.email = '有効なメールアドレスを入力してください';
      if (!password) newErrors.password = 'パスワードは必須です';
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
          const response = await fetch('/api/user-login', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              credentials: 'include',
              body: JSON.stringify({
                  email: email,
                  password: password,
              }),
          });

          if (response) {
            const data = await response.json();
            if(data.status === 400) {
              setResponseErrors(true);
            } else {
              router.push('/dashboard');
            }
          }
      } catch (error) {
          console.error(error);
      }
    };

    return (
        <Center style={{ height: '100vh' }}>
        <Box style={{ width: '380px' }}>
            <form onSubmit={handleSubmit}>
            <Paper withBorder shadow="md" p={30} mt={30} radius="md">
                {responseErrors && 
                    <Text style={{ color: 'red', fontSize: '12px' }}>
                        メールアドレスかパスワードが正しくありません
                    </Text>
                }
                <InputWrapper mb={8} label="メールアドレス" error={errors.email}>
                <Input
                    placeholder="example@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                </InputWrapper>
                <InputWrapper mb={8} label="パスワード" error={errors.password}>
                <Input
                    placeholder="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                </InputWrapper>
                <Button color="gray" fullWidth mt="xl" type="submit">
                ログイン
                </Button>
                <Divider my="md" mt={32}/>

                <Group justify='center'>
                    <Text style={{ fontSize: '12px', color: 'gray' }}>
                        アカウントをお持ちでない方は
                        <a href='/register' style={{ color: 'blue' }}>新規登録</a>
                    </Text>
                </Group>
            </Paper>
            </form>
        </Box>
      </Center>
    );
  }