export function Footer() {
  return (
    <footer className="mt-20 border-t border-border">
      <div className="container mx-auto py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <div className="font-semibold mb-2">Xala Technologies</div>
          <p className="p-small text-neutral">Software, AI og rådgivning</p>
        </div>
        <div>
          <div className="font-semibold mb-2">Kontakt</div>
          <p className="p-small text-neutral">hello@xala.no</p>
        </div>
        <div>
          <div className="font-semibold mb-2">Følg oss</div>
          <div className="flex gap-3">
            <a className="p-small underline-offset-2 hover:underline" href="#">LinkedIn</a>
            <a className="p-small underline-offset-2 hover:underline" href="#">GitHub</a>
          </div>
        </div>
      </div>
      <div className="border-t border-border py-6 text-center p-small text-neutral">© {new Date().getFullYear()} Xala</div>
    </footer>
  );
} 