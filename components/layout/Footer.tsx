import Link from "next/link";
import { Leaf } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-green-deep text-cream mt-auto pb-28 md:pb-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 bg-terra rounded-full flex items-center justify-center">
                <Leaf className="w-3.5 h-3.5 text-cream" />
              </div>
              <span className="font-heading font-bold text-lg">Yendzi</span>
            </div>
            <p className="text-cream/70 text-sm leading-relaxed max-w-xs">
              Yɛn Adze — Our Thing. Ghana&apos;s farm-to-doorstep marketplace,
              connecting farmers and families.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-3 text-soft-yellow">Shop</h4>
            <ul className="space-y-2 text-sm text-cream/70">
              {["Fresh Produce", "Butchery", "Juices", "Eco Products", "Subscription Boxes"].map((item) => (
                <li key={item}><Link href="/shop" className="hover:text-cream transition-colors">{item}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-3 text-soft-yellow">Community</h4>
            <ul className="space-y-2 text-sm text-cream/70">
              <li><Link href="/farmers" className="hover:text-cream transition-colors">Our Farmers</Link></li>
              <li><Link href="/learn" className="hover:text-cream transition-colors">Learn</Link></li>
              <li><Link href="/about" className="hover:text-cream transition-colors">About Yendzi</Link></li>
              <li><Link href="/vendor/apply" className="hover:text-cream transition-colors">Sell on Yendzi</Link></li>
              <li><Link href="/for-business" className="hover:text-cream transition-colors">For Business</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-3 text-soft-yellow">Help</h4>
            <ul className="space-y-2 text-sm text-cream/70">
              {["FAQ", "Delivery Info", "Returns", "Contact Us", "Privacy Policy"].map((item) => (
                <li key={item}><Link href="#" className="hover:text-cream transition-colors">{item}</Link></li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-cream/10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-cream/50">
          <p>© 2026 Yendzi. All rights reserved.</p>
          <div className="flex items-center gap-5">
            {[
              { label: "Instagram", href: "https://instagram.com/yendzi" },
              { label: "Twitter / X", href: "https://twitter.com/yendzi" },
              { label: "Facebook", href: "https://facebook.com/yendzi" },
            ].map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="hover:text-cream transition-colors">
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
