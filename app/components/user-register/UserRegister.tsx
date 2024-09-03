'use client'
import {
    Avatar,
    Checkbox,
    Anchor,
    InputWrapper,
    Input,
    Image,
    Divider,
    Paper,
    Title,
    Text,
    Container,
    HoverCard,
    Box,
    Button,
    SimpleGrid
  } from '@mantine/core';
  import classes from '../../mantine-css-modules/UserRegister.module.css';
  import { useState } from 'react';
  import { avaterImagesUrl } from '../../lib/avater';
  import { useRouter } from 'next/navigation';  

  export function UserRegister() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [image, setImage] = useState('');
    const [name, setName] = useState('');
    const [errors, setErrors] = useState<any>({});

    const validate = () => {
      const newErrors: any = {};
      if (!email) newErrors.email = 'メールアドレスは必須です';
      if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) newErrors.email = '有効なメールアドレスを入力してください';
      if (!password) newErrors.password = 'パスワードは必須です';
      if (!name) newErrors.name = '名前は必須です';
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
        console.log(email, password, image, "テスト");
          const response = await fetch('/api/register', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              credentials: 'include',
              body: JSON.stringify({
                  name: name,
                  email: email,
                  password: password,
                  imageUrl: image,
              }),
          });

          if (response) {
            const data = await response.json();
            if(data.status === 400) {
              setErrors({ email: data.message });
            } else {
              router.push('/dashboard');
            }
          }
      } catch (error) {
          console.error(error);
      }
    };
    return (
      <Container size={420} my={40}>
        <Title ta="center" className={classes.title}>
          新規登録
        </Title>
        <Text c="dimmed" size="sm" ta="center" mt={5}>
          すでにアカウントをお持ちの方はこちら
          <Anchor size="sm" component="button">
            ログイン
          </Anchor>
        </Text>
        <form onSubmit={handleSubmit}>
          <Paper withBorder shadow="md" p={30} mt={30} radius="md">
            <InputWrapper mb={8} label="名前" error={errors.name}>
              <Input
                placeholder="鈴木太郎"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </InputWrapper>
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
            <HoverCard width={360} position="bottom" radius="md" shadow="md" withinPortal>
              <HoverCard.Target>
                <Button color="gray" size="sm" variant="outline" style={{ marginBottom: '8px', marginTop: '8px' }}>アバター画像を選択</Button>
              </HoverCard.Target>
              <HoverCard.Dropdown style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                <SimpleGrid cols={3} spacing="xs">
                  {avaterImagesUrl.map((url, index) => (
                    <Box key={index}>
                    <Checkbox
                      checked={image === url}
                      onChange={(event) => {
                        if (event.currentTarget.checked) {
                          setImage(url);
                        } else {
                          setImage('');
                        }
                      }}
                      label={`アバター ${index + 1}`}
                    />
                    <Avatar
                      src={url}
                      radius="xs"
                      size={100}
                      alt={`アバター ${index + 1}`}
                      onClick={() => setImage(url)}
                      style={{
                        cursor: 'pointer',
                        border: image === url ? '2px solid blue' : 'none',
                      }}
                    />
                  </Box>
                ))}
                </SimpleGrid>
              </HoverCard.Dropdown>
            </HoverCard>
            {image && (
              <Image src={image} radius="md" alt="アバター画像" h={100} w={100} />
            )}
            <Divider my="sm" />
            <Button color="gray" fullWidth mt="xl" type="submit">
              登録
            </Button>
          </Paper>
        </form>
      </Container>
    );
  }