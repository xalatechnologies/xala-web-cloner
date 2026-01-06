import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Input, Form } from '@/components/ui';

const searchFormSchema = z.object({
  query: z.string().min(1, 'Please enter a search query'),
});

type SearchFormData = z.infer<typeof searchFormSchema>;

interface SearchFormProps {
  onSubmit: (data: SearchFormData) => Promise<void>;
  isLoading: boolean;
}

export function SearchForm({ onSubmit, isLoading }: SearchFormProps) {
  const form = useForm<SearchFormData>({
    resolver: zodResolver(searchFormSchema),
    defaultValues: {
      query: '',
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <Form.Field
          control={form.control}
          name="query"
          render={({ field }) => (
            <Form.Item>
              <Form.Label>Search Query</Form.Label>
              <Form.Control>
                <Input
                  {...field}
                  placeholder="Enter your query..."
                  disabled={isLoading}
                />
              </Form.Control>
              <Form.Message />
            </Form.Item>
          )}
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Searching...' : 'Search'}
        </Button>
      </form>
    </Form>
  );
}
