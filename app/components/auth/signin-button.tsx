import { signIn } from "@/auth";
import { Button } from '@mantine/core';
import { IconBrandGoogleFilled, IconBrandGithubFilled } from '@tabler/icons-react';

export default function SignIn() {
  return (
    <form
        action={ async () => {
            "use server";
            await signIn();
        }}
    >
      <Button
        type="submit"
        variant="default"
        color="gray"
        radius="md"
        size="md"
        >
          <IconBrandGoogleFilled />
          、
          <IconBrandGithubFilled />
          　でログイン
      </Button>
    </form>
  )
}
