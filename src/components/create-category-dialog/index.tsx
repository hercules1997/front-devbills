import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';

import { useFetchAPI } from '../../hooks/useFetchAPI';
import { theme } from '../../styles/theme';
import { createCategorySchema } from '../../validators/schemas';
import { CreateCategoryData } from '../../validators/types';
import { Button } from '../button';
import { Dialog } from '../dialog';
import { Input } from '../input';
import { Title } from '../title';
import { Container } from './styles';

export function CreateCategoryDialog() {
  const { createCategory, fetchCategories } = useFetchAPI();
  const [open, setOpen] = useState(false);
  const { register, handleSubmit, formState } = useForm<CreateCategoryData>({
    defaultValues: {
      title: '',
      color: theme.colors.primary,
    },
    resolver: zodResolver(createCategorySchema),
  });

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const onSubmit = useCallback(
    async (data: CreateCategoryData) => {
      await createCategory(data);
      handleClose();
      await fetchCategories();
    },
    [handleClose, createCategory, fetchCategories],
  );

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
      trigger={<Button>Nova categoria</Button>}
    >
      <Container>
        <Title
          title="Nova Categoria"
          subtitle="Crie uma nova categoria para suas transações"
        />

        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <Input
              label="Nome"
              placeholder="Nome da categoria..."
              {...register('title')}
              error={formState.errors?.title?.message}
            />
            <Input
              label="Cor"
              type="color"
              {...register('color')}
              error={formState.errors?.color?.message}
            />
          </div>
          <footer>
            <Button onClick={handleClose} variant="outline" type="button">
              Calcelar
            </Button>
            <Button type="submit">Cadastrar</Button>
          </footer>
        </form>
      </Container>
    </Dialog>
  );
}
