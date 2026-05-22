import Image from "next/image";
import Link from "next/link";
import { FaGithub, FaXTwitter, FaLinkedinIn } from "react-icons/fa6";
import { IoMailOutline, IoLocationOutline } from "react-icons/io5";

const footerLinks = {
  company: ["About", "Blog", "Careers", "Press"],
  legal: ["Privacy Policy", "Terms of Service", "Cookie Policy"],
};

const socialLinks = [
  { icon: FaGithub, href: "https://github.com", label: "GitHub" },
  { icon: FaXTwitter, href: "https://twitter.com", label: "Twitter" },
  { icon: FaLinkedinIn, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: IoMailOutline, href: "mailto:hello@ideavault.com", label: "Email" },
];

export default function Footer() {
  return (
    <footer className="bg-zinc-950 border-t border-zinc-800/60 text-zinc-400">
      <div className="max-w-7xl mx-auto px-6 py-14">

        <div className="grid grid-cols-1 gap-12 md:grid-cols-5">

          <div className="md:col-span-2 flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2.5 w-fit">
              <Image
                src="/ideavaultLogo.png"
                alt="IdeaVault logo"
                width={28}
                height={28}
                className="rounded-md"
              />
              <span className="text-lg font-semibold tracking-tight text-white">
                Idea<span className="text-green-500">Vault</span>
              </span>
            </Link>

            <p className="text-sm leading-relaxed text-zinc-500 max-w-xs">
              The place where ideas live, grow, and get built. Discover and share
              what's next.
            </p>

            <div className="flex flex-col gap-2 mt-1">
              <a
                href="mailto:hello@ideavault.com"
                className="flex items-center gap-2 text-sm hover:text-white transition-colors duration-200"
              >
                <IoMailOutline size={16} className="text-zinc-600 shrink-0" />
                ideavault@gmail.com
              </a>
              <span className="flex items-center gap-2 text-sm">
                <IoLocationOutline size={16} className="text-zinc-600 shrink-0" />
                San Francisco, CA
              </span>
            </div>

            <div className="flex items-center gap-3 mt-1">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-md border border-zinc-800 flex items-center justify-center text-zinc-500 hover:text-white hover:border-zinc-600 transition-all duration-200"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          <nav className="md:col-span-3 grid grid-cols-2 sm:grid-cols-3 gap-8">

            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-zinc-600 mb-4">
                Platform
              </p>
              <ul className="flex flex-col gap-2.5">
                <li>
                  <Link
                    href="/ideas"
                    className="text-sm hover:text-white transition-colors duration-200"
                  >
                    Ideas
                  </Link>
                </li>
                <li className="text-sm cursor-default">Explore</li>
                <li className="text-sm cursor-default">Submit</li>
                <li className="text-sm cursor-default">Categories</li>
              </ul>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-zinc-600 mb-4">
                Company
              </p>
              <ul className="flex flex-col gap-2.5">
                {footerLinks.company.map((label) => (
                  <li key={label} className="text-sm cursor-default">
                    {label}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-zinc-600 mb-4">
                Legal
              </p>
              <ul className="flex flex-col gap-2.5">
                {footerLinks.legal.map((label) => (
                  <li key={label} className="text-sm cursor-default">
                    {label}
                  </li>
                ))}
              </ul>
            </div>

          </nav>
        </div>

        <div className="mt-12 border-t border-zinc-800/60 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-zinc-600">
            © {new Date().getFullYear()} Idea<span className="text-green-500">Vault</span>. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
}