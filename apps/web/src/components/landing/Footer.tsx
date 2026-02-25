import { KeystoneSeal } from "@/components/KeystoneSeal";

export function Footer() {
  return (
    <footer className="border-t border-white/[0.06] py-12 px-6">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2.5 group">
          <KeystoneSeal className="w-6 h-6 transition-opacity group-hover:opacity-70" />
          <span className="text-sm font-semibold text-white/60 tracking-tight">Keystone</span>
        </a>

        {/* Links */}
        <div className="flex items-center gap-6 text-xs text-white/30">
          <a href="#" className="hover:text-white/60 transition-colors">Privacy</a>
          <a href="#" className="hover:text-white/60 transition-colors">Terms</a>
          <a href="#" className="hover:text-white/60 transition-colors">Security</a>
          <a href="#" className="hover:text-white/60 transition-colors">Contact</a>
        </div>

        {/* Right */}
        <p className="text-xs text-white/20">
          © {new Date().getFullYear()} Keystone. Built with obsession.
        </p>
      </div>
    </footer>
  );
}
