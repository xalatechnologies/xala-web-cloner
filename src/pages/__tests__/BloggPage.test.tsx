import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { describe, it, expect, vi } from 'vitest';
import BloggPage from '../BloggPage';
import { allPosts } from '@/lib/blog';
import { publishedPosts } from '@/lib/blog/posts';
import { BLOG_LISTING_HEADING } from '@/lib/blog/seo';
import { getPageSEO } from '@/components/seo/seoContent';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string, fallback?: string) => fallback ?? key,
    i18n: { language: 'no', changeLanguage: vi.fn() },
  }),
}));

vi.mock('next-themes', () => ({
  useTheme: () => ({ theme: 'light', setTheme: vi.fn() }),
}));

function renderBloggPage(entry = '/blogg') {
  return render(
    <HelmetProvider>
      <MemoryRouter initialEntries={[entry]}>
        <BloggPage />
      </MemoryRouter>
    </HelmetProvider>
  );
}

/** Every result a reader could open, in the order they are offered. */
function resultLinks(container: HTMLElement) {
  return Array.from(container.querySelectorAll('main section a, main ol li a')).map((link) =>
    link.getAttribute('href')
  );
}

describe('BloggPage heading vs document title', () => {
  it('keeps the designed H1 and the SEO <title> as different sentences', async () => {
    // XWEB-188: flipping the visible H1 to the SEO title would "fix" the
    // prerender mismatch the wrong way. Helmet owns the document title.
    renderBloggPage();

    const seoTitle = getPageSEO('blog', 'no').title;
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveTextContent(BLOG_LISTING_HEADING);
    expect(BLOG_LISTING_HEADING).toBe('Erfaringer fra systemer i drift');
    expect(seoTitle).toBe('Fagartikler om offentlig digitalisering | Xala');
    expect(heading).not.toHaveTextContent(
      seoTitle.split(' | ')[0],
    );
    // XWEB-194: 18ch forced «drift» onto line 2 while the container was ~728px.
    expect(heading.className).toContain('page-heading');
    expect(heading.className).not.toContain('max-w-[18ch]');
    expect(heading.className).not.toContain('max-w-[20ch]');
    await waitFor(() => expect(document.title).toBe(seoTitle));
  });
});

describe('BloggPage cover frames', () => {
  it('sizes the cover frame to the generated cover\'s own 1200x630 ratio, so object-cover has nothing to crop', () => {
    const withCover = publishedPosts(allPosts()).find((post) => post.cover);
    expect(withCover).toBeTruthy();

    const { container } = renderBloggPage();

    const img = container.querySelector(`img[src="${withCover!.cover}"]`);
    expect(img).toBeTruthy();

    // scripts/make-blog-cover.mjs bakes the title in near the left edge of a
    // 1200x630 canvas. Any frame narrower than that ratio (e.g. 4:3) makes
    // object-cover crop the sides and slice into the title text.
    const frame = img!.parentElement!;
    expect(frame.className).toContain('aspect-[40/21]');
    expect(frame.className).not.toContain('aspect-[4/3]');
    // Hover zoom re-crops the baked-in title; keep the cover at 1:1 with the frame.
    expect(img!.className).not.toContain('group-hover:scale');
  });
});

describe('BloggPage search', () => {
  it('picks up a query submitted from the navbar while the page is already mounted', () => {
    const { container } = renderBloggPage();

    const pageBox = container.querySelector<HTMLInputElement>('#blogg-sok')!;
    const navBox = container.querySelector<HTMLInputElement>('#nav-sok')!;

    // The router reuses this component when the navbar navigates to
    // /blogg?q=…, so the state initialiser never runs a second time and the
    // typed query used to land in the URL and nowhere else.
    fireEvent.change(navBox, { target: { value: 'tilskuddsportal' } });
    fireEvent.submit(navBox.closest('form')!);

    expect(pageBox.value).toBe('tilskuddsportal');
  });

  it('leaves a trailing space alone while the reader is still typing', () => {
    const { container } = renderBloggPage();

    const pageBox = container.querySelector<HTMLInputElement>('#blogg-sok')!;

    // The URL carries the trimmed query, so a naive sync back from the URL
    // deletes the space the reader just typed between two words.
    fireEvent.change(pageBox, { target: { value: 'tilskudd ' } });

    expect(pageBox.value).toBe('tilskudd ');
  });

  it('gives the listing and navbar searchboxes different Norwegian names', () => {
    const { container } = renderBloggPage();

    // Both stay in the tree from md up. Live /blogg used to name them both
    // «Søk i artikler»; getByRole then cannot tell them apart.
    const pageBox = container.querySelector<HTMLInputElement>('#blogg-sok')!;
    const navBox = container.querySelector<HTMLInputElement>('#nav-sok')!;

    expect(pageBox).toHaveAccessibleName('Søk i artikler og sider');
    expect(navBox).toHaveAccessibleName('Søk på nettstedet i navigasjonen');
    expect(navBox).not.toHaveAccessibleName('Søk i artikler og sider');
  });

  it('keeps the drawer search distinct from both when the menu is open', () => {
    renderBloggPage();

    fireEvent.click(screen.getByLabelText('Åpne meny'));

    expect(screen.getByRole('searchbox', { name: 'Søk i artikler og sider' })).toHaveAttribute(
      'id',
      'blogg-sok',
    );
    expect(screen.getByRole('searchbox', { name: 'Søk på nettstedet i navigasjonen' })).toHaveAttribute(
      'id',
      'nav-sok',
    );
    expect(screen.getByRole('searchbox', { name: 'Søk på nettstedet i menyen' })).toHaveAttribute(
      'id',
      'nav-sok-drawer',
    );
  });
});

describe('BloggPage results for a query the articles cannot answer', () => {
  it('opens the page the query names instead of ending at "Ingen treff."', () => {
    // The navbar hands every query here, and here knew about 25 articles and
    // nothing else — so a reader searching for the price page got an empty
    // state with no first result to open.
    const { container, queryByText } = renderBloggPage('/blogg?q=priser');

    expect(queryByText('Ingen treff.')).not.toBeInTheDocument();
    expect(resultLinks(container)[0]).toBe('/priser');
  });

  it('keeps the article results, and puts the page above them', () => {
    const { container } = renderBloggPage('/blogg?q=integrasjon');

    const links = resultLinks(container);
    expect(links[0]).toBe('/');
    expect(links).toContain('/tjenester');
    expect(links.some((href) => href?.startsWith('/blogg/'))).toBe(true);
  });

  it('offers somewhere to go when nothing matches at all', () => {
    const { container, getByText } = renderBloggPage('/blogg?q=zzzzzz');

    expect(getByText('Ingen treff.')).toBeInTheDocument();
    // An apology with no link out is a dead end; the site itself is the answer.
    const suggestions = within(container).getByRole('heading', { name: 'Prøv en av disse sidene' });
    expect(suggestions).toBeInTheDocument();
    expect(resultLinks(container)[0]).toBe('/');
  });

  it('leaves the unfiltered listing alone', () => {
    const { container } = renderBloggPage();

    // No query, no page section: this is the blog index, not a results page.
    expect(container.querySelectorAll('main section a').length).toBe(0);
    expect(resultLinks(container).every((href) => href?.startsWith('/blogg/'))).toBe(true);
  });

  it('keeps the gebyr first-HTML filter on the hydrated listing', () => {
    // XWEB-186: /blogg?q=gebyr must still be the gebyr card after hydrate,
    // not the full newest-first index this ticket paginates.
    const { container } = renderBloggPage('/blogg?q=gebyr');

    const links = resultLinks(container);
    expect(links).toContain('/blogg/skjenkebevilling-gebyr-og-omsetningsoppgave');
    expect(links).not.toContain('/blogg/iso-27001-i-praksis-for-utviklingsprosjekter');
    expect(links.some((href) => href === '/blogg/tilskudd-purring-og-uklare-rapporteringskrav')).toBe(
      false,
    );
  });
});

const LISTING_PAGE_SIZE = 8;

describe('BloggPage pagination from the URL', () => {
  const posts = publishedPosts(allPosts());
  const page1 = posts.slice(0, LISTING_PAGE_SIZE);
  const page2 = posts.slice(LISTING_PAGE_SIZE, LISTING_PAGE_SIZE * 2);

  it('opens page 2 on first render of /blogg?page=2, not page 1', async () => {
    // XWEB-193: the slice existed, but first load of ?page=2 stayed on page 1
    // until the pager was clicked. Deep links have to apply after render.
    // Live (2026-08-19) page 2 started at tilskudd-purring; the assertion is
    // the same slice the listing uses, so a newer post does not break this.
    expect(posts.length).toBeGreaterThan(LISTING_PAGE_SIZE);
    const firstOnPage2 = page2[0];
    const firstOnPage1 = page1[0];
    expect(firstOnPage2).toBeTruthy();
    expect(firstOnPage1).toBeTruthy();

    const { container } = renderBloggPage('/blogg?page=2');

    await waitFor(() => {
      const links = resultLinks(container);
      expect(links[0]).toBe(`/blogg/${firstOnPage2.slug}`);
    });

    const links = resultLinks(container);
    expect(links).toEqual(page2.map((post) => `/blogg/${post.slug}`));
    expect(links).not.toContain(`/blogg/${firstOnPage1.slug}`);
    expect(screen.getByText(`Side 2 av ${Math.ceil(posts.length / LISTING_PAGE_SIZE)}`)).toBeInTheDocument();
  });

  it('accepts the inbound side param the live site also tried', async () => {
    const firstOnPage2 = page2[0];
    expect(firstOnPage2).toBeTruthy();

    const { container } = renderBloggPage('/blogg?side=2');

    await waitFor(() => {
      expect(resultLinks(container)[0]).toBe(`/blogg/${firstOnPage2.slug}`);
    });
  });

  it('keeps page 1 newest-first', () => {
    const { container } = renderBloggPage('/blogg');

    const links = resultLinks(container);
    expect(links).toEqual(page1.map((post) => `/blogg/${post.slug}`));
    expect(links).toHaveLength(LISTING_PAGE_SIZE);
    expect(new Date(page1[0].date).getTime()).toBeGreaterThan(new Date(page1[1].date).getTime());
  });
});
