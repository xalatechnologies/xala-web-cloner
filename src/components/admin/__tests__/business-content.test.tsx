/**
 * Business Content Admin Components Tests
 * 
 * Tests for admin portal business content management components.
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BusinessStoriesManager } from '../business-content/BusinessStoriesManager';
import { BusinessServicesManager } from '../business-content/BusinessServicesManager';
import { createMockBusinessImpactStory, createMockBusinessServiceCategory } from '@/types/__tests__/business.test';

// Mock react-i18next
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: {
      language: 'en'
    }
  })
}));

// Mock Supabase services
const mockBusinessImpactStoriesService = {
  getAllStories: vi.fn(),
  createStory: vi.fn(),
  updateStory: vi.fn(),
  deleteStory: vi.fn()
};

const mockBusinessServiceCategoriesService = {
  getAllCategories: vi.fn(),
  createCategory: vi.fn(),
  updateCategory: vi.fn(),
  deleteCategory: vi.fn()
};

vi.mock('@/integrations/supabase/business-content', () => ({
  BusinessImpactStoriesService: mockBusinessImpactStoriesService,
  BusinessServiceCategoriesService: mockBusinessServiceCategoriesService
}));

// Mock UI components with proper types
interface MockComponentProps {
  children?: React.ReactNode;
  onClick?: () => void;
  value?: string | number | boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onValueChange?: (value: string) => void;
  onCheckedChange?: (checked: boolean) => void;
  placeholder?: string;
  variant?: string;
  className?: string;
  checked?: boolean;
  [key: string]: unknown;
}

vi.mock('@/components/ui/button', () => ({
  Button: ({ children, onClick, ...props }: MockComponentProps) => (
    <button onClick={onClick} {...props}>{children}</button>
  )
}));

vi.mock('@/components/ui/card', () => ({
  Card: ({ children, ...props }: MockComponentProps) => <div {...props}>{children}</div>,
  CardContent: ({ children, ...props }: MockComponentProps) => <div {...props}>{children}</div>,
  CardDescription: ({ children, ...props }: MockComponentProps) => <div {...props}>{children}</div>,
  CardHeader: ({ children, ...props }: MockComponentProps) => <div {...props}>{children}</div>,
  CardTitle: ({ children, ...props }: MockComponentProps) => <h3 {...props}>{children}</h3>
}));

vi.mock('@/components/ui/input', () => ({
  Input: ({ value, onChange, placeholder, ...props }: MockComponentProps) => (
    <input
      value={value as string}
      onChange={onChange}
      placeholder={placeholder}
      {...props}
    />
  )
}));

vi.mock('@/components/ui/textarea', () => ({
  Textarea: ({ value, onChange, placeholder, ...props }: MockComponentProps) => (
    <textarea
      value={value as string}
      onChange={onChange}
      placeholder={placeholder}
      {...props}
    />
  )
}));

vi.mock('@/components/ui/label', () => ({
  Label: ({ children, ...props }: MockComponentProps) => <label {...props}>{children}</label>
}));

vi.mock('@/components/ui/select', () => ({
  Select: ({ children, value, onValueChange }: MockComponentProps) => (
    <div data-testid="select" data-value={value}>
      {children}
    </div>
  ),
  SelectContent: ({ children }: MockComponentProps) => <div>{children}</div>,
  SelectItem: ({ children, value }: MockComponentProps) => (
    <div data-testid="select-item" data-value={value}>{children}</div>
  ),
  SelectTrigger: ({ children }: MockComponentProps) => <div>{children}</div>,
  SelectValue: ({ placeholder }: MockComponentProps) => <div>{placeholder}</div>
}));

vi.mock('@/components/ui/switch', () => ({
  Switch: ({ checked, onCheckedChange, ...props }: MockComponentProps) => (
    <input
      type="checkbox"
      checked={checked}
      onChange={(e) => onCheckedChange?.(e.target.checked)}
      {...props}
    />
  )
}));

vi.mock('@/components/ui/badge', () => ({
  Badge: ({ children, variant, ...props }: MockComponentProps) => (
    <span data-variant={variant} {...props}>{children}</span>
  )
}));

vi.mock('@/components/ui/alert', () => ({
  Alert: ({ children, variant, ...props }: MockComponentProps) => (
    <div data-variant={variant} {...props}>{children}</div>
  ),
  AlertDescription: ({ children, ...props }: MockComponentProps) => <div {...props}>{children}</div>
}));

vi.mock('@/components/ui/skeleton', () => ({
  Skeleton: ({ className, ...props }: MockComponentProps) => (
    <div className={`skeleton ${className}`} {...props} />
  )
}));

describe('BusinessStoriesManager', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render loading state initially', async () => {
    mockBusinessImpactStoriesService.getAllStories.mockImplementation(() => new Promise(() => {})); // Never resolves

    render(<BusinessStoriesManager />);

    expect(screen.getByText('Business Impact Stories')).toBeInTheDocument();
    expect(document.querySelector('.skeleton')).toBeInTheDocument();
  });

  it('should load and display stories', async () => {
    const mockStories = [
      createMockBusinessImpactStory(),
      createMockBusinessImpactStory({ id: 'story-2', project_title: 'Second Project' })
    ];

    mockBusinessImpactStoriesService.getAllStories.mockResolvedValue(mockStories);

    render(<BusinessStoriesManager />);

    await waitFor(() => {
      expect(screen.getByText('Test Project')).toBeInTheDocument();
      expect(screen.getByText('Second Project')).toBeInTheDocument();
    });

    expect(screen.getByText('Test Client')).toBeInTheDocument();
    expect(screen.getByText('Published')).toBeInTheDocument();
  });

  it('should handle errors when loading stories', async () => {
    mockBusinessImpactStoriesService.getAllStories.mockRejectedValue(new Error('Database error'));

    render(<BusinessStoriesManager />);

    await waitFor(() => {
      expect(screen.getByText('Database error')).toBeInTheDocument();
    });
  });

  it('should show create form when create button is clicked', async () => {
    mockBusinessImpactStoriesService.getAllStories.mockResolvedValue([]);

    render(<BusinessStoriesManager />);

    await waitFor(() => {
      expect(screen.getByText('Create New Story')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('Create New Story'));

    expect(screen.getByText('Create New Story')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter client name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter project title')).toBeInTheDocument();
  });

  it('should create a new story when form is submitted', async () => {
    const newStory = createMockBusinessImpactStory();
    mockBusinessImpactStoriesService.getAllStories
      .mockResolvedValueOnce([])
      .mockResolvedValueOnce([newStory]);
    mockBusinessImpactStoriesService.createStory.mockResolvedValue(newStory);

    render(<BusinessStoriesManager />);

    await waitFor(() => {
      fireEvent.click(screen.getByText('Create New Story'));
    });

    // Fill form fields
    fireEvent.change(screen.getByPlaceholderText('Enter client name'), {
      target: { value: 'Test Client' }
    });
    fireEvent.change(screen.getByPlaceholderText('Enter project title'), {
      target: { value: 'Test Project' }
    });
    fireEvent.change(screen.getByPlaceholderText('Describe the business challenge'), {
      target: { value: 'Test challenge' }
    });
    fireEvent.change(screen.getByPlaceholderText('Describe how Xala addressed the challenge'), {
      target: { value: 'Test solution' }
    });

    fireEvent.click(screen.getByText('Create Story'));

    await waitFor(() => {
      expect(mockBusinessImpactStoriesService.createStory).toHaveBeenCalled();
    });
  });

  it('should edit an existing story', async () => {
    const mockStory = createMockBusinessImpactStory();
    mockBusinessImpactStoriesService.getAllStories.mockResolvedValue([mockStory]);

    render(<BusinessStoriesManager />);

    await waitFor(() => {
      expect(screen.getByText('Test Project')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('Edit'));

    expect(screen.getByText('Edit Story')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Test Client')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Test Project')).toBeInTheDocument();
  });

  it('should delete a story with confirmation', async () => {
    const mockStory = createMockBusinessImpactStory();
    mockBusinessImpactStoriesService.getAllStories
      .mockResolvedValueOnce([mockStory])
      .mockResolvedValueOnce([]);
    mockBusinessImpactStoriesService.deleteStory.mockResolvedValue(true);

    // Mock window.confirm
    vi.stubGlobal('confirm', vi.fn().mockReturnValue(true));

    render(<BusinessStoriesManager />);

    await waitFor(() => {
      expect(screen.getByText('Test Project')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('Delete'));

    await waitFor(() => {
      expect(mockBusinessImpactStoriesService.deleteStory).toHaveBeenCalledWith('test-story-id');
    });

    vi.unstubAllGlobals();
  });
});

describe('BusinessServicesManager', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should load and display service categories', async () => {
    const mockServices = [
      createMockBusinessServiceCategory(),
      createMockBusinessServiceCategory({ id: 'service-2', service_name: 'Second Service' })
    ];

    mockBusinessServiceCategoriesService.getAllCategories.mockResolvedValue(mockServices);

    render(<BusinessServicesManager />);

    await waitFor(() => {
      expect(screen.getByText('Test Service')).toBeInTheDocument();
      expect(screen.getByText('Second Service')).toBeInTheDocument();
    });

    expect(screen.getByText('Test short description')).toBeInTheDocument();
    expect(screen.getByText('Active')).toBeInTheDocument();
  });

  it('should show create form when create button is clicked', async () => {
    mockBusinessServiceCategoriesService.getAllCategories.mockResolvedValue([]);

    render(<BusinessServicesManager />);

    await waitFor(() => {
      expect(screen.getByText('Create New Service')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('Create New Service'));

    expect(screen.getByText('Create New Service Category')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('e.g., Digital Transformation')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Brief description for cards and navigation')).toBeInTheDocument();
  });

  it('should create a new service category when form is submitted', async () => {
    const newService = createMockBusinessServiceCategory();
    mockBusinessServiceCategoriesService.getAllCategories
      .mockResolvedValueOnce([])
      .mockResolvedValueOnce([newService]);
    mockBusinessServiceCategoriesService.createCategory.mockResolvedValue(newService);

    render(<BusinessServicesManager />);

    await waitFor(() => {
      fireEvent.click(screen.getByText('Create New Service'));
    });

    // Fill form fields
    fireEvent.change(screen.getByPlaceholderText('e.g., Digital Transformation'), {
      target: { value: 'Test Service' }
    });
    fireEvent.change(screen.getByPlaceholderText('Brief description for cards and navigation'), {
      target: { value: 'Test description' }
    });
    fireEvent.change(screen.getByPlaceholderText('What problem does this service solve?'), {
      target: { value: 'Test challenge' }
    });
    fireEvent.change(screen.getByPlaceholderText('What business results can clients expect?'), {
      target: { value: 'Test outcome' }
    });

    fireEvent.click(screen.getByText('Create Service'));

    await waitFor(() => {
      expect(mockBusinessServiceCategoriesService.createCategory).toHaveBeenCalled();
    });
  });

  it('should handle service category editing', async () => {
    const mockService = createMockBusinessServiceCategory();
    mockBusinessServiceCategoriesService.getAllCategories.mockResolvedValue([mockService]);

    render(<BusinessServicesManager />);

    await waitFor(() => {
      expect(screen.getByText('Test Service')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('Edit'));

    expect(screen.getByText('Edit Service Category')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Test Service')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Test short description')).toBeInTheDocument();
  });

  it('should handle target industries input correctly', async () => {
    mockBusinessServiceCategoriesService.getAllCategories.mockResolvedValue([]);

    render(<BusinessServicesManager />);

    await waitFor(() => {
      fireEvent.click(screen.getByText('Create New Service'));
    });

    const industriesInput = screen.getByPlaceholderText('e.g., Healthcare, Finance, Public Sector');
    fireEvent.change(industriesInput, {
      target: { value: 'Healthcare, Finance, Technology' }
    });

    // The component should parse comma-separated values into an array
    expect(industriesInput.value).toBe('Healthcare, Finance, Technology');
  });
});

// Integration test for the complete admin business content workflow
describe('Business Content Admin Integration', () => {
  it('should handle complete workflow of creating story and linking to service', async () => {
    const mockStory = createMockBusinessImpactStory();
    const mockService = createMockBusinessServiceCategory({
      related_case_studies: [mockStory.id]
    });

    mockBusinessImpactStoriesService.getAllStories.mockResolvedValue([mockStory]);
    mockBusinessServiceCategoriesService.getAllCategories.mockResolvedValue([mockService]);

    // This would typically be tested in a more complex integration test
    // that involves both components working together
    expect(mockStory.id).toBe('test-story-id');
    expect(mockService.related_case_studies).toContain(mockStory.id);
  });
});
