import { Paper, Text, ThemeIcon, rem, Button } from '@mantine/core';
import classes from '@/app/mantine-css-modules/CardGradient.module.css';

export function CardGradient({ title, description, icon, color1, color2, buttonText }: { title: string, description: string, icon: React.ReactNode, color1: string, color2: string, buttonText: string }) {
  return (
    <Paper withBorder shadow="xl" radius="md" className={classes.card}>
      <ThemeIcon
        size="xl"
        radius="md"
        variant="gradient"
        gradient={{ deg: 0, from: color1, to: color2 }}
      >
        {icon}
      </ThemeIcon>
      <Text size="xl" fw={500} mt="md">
        {title}
      </Text>
      <Text size="sm" mt="sm" c="dimmed">
        {description}
      </Text>
      <Button
        mt="md"
        variant="gradient"
        gradient={{ from: color1, to: color2, deg: 90 }}
      >
        {buttonText}
      </Button>
    </Paper>
  );
}