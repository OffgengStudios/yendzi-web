import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Clock } from "lucide-react";

const posts = [
  {
    tag: "Recipe",
    title: "How to Make Auntie Akua's Famous Kontomire Stew",
    excerpt: "A beloved Ghanaian classic, made with the freshest leaves from Aburi. Simple, nourishing, deeply rooted.",
    readTime: "5 min",
    image: "https://images.pexels.com/photos/30893239/pexels-photo-30893239.jpeg?auto=compress&cs=tinysrgb&w=900",
    featured: true,
  },
  {
    tag: "Urban Gardening",
    title: "Growing Tomatoes on Your Accra Balcony",
    excerpt: "You don't need a farm. A pot, sunlight, and patience is all it takes.",
    readTime: "3 min",
    image: "https://images.pexels.com/photos/8540196/pexels-photo-8540196.jpeg?auto=compress&cs=tinysrgb&w=700",
    featured: false,
  },
  {
    tag: "Sustainability",
    title: "Why Going Plastic-Free in Your Kitchen Actually Works",
    excerpt: "Small swaps, big impact. Here's how families across Accra are making it happen.",
    readTime: "4 min",
    image: "https://images.pexels.com/photos/36611201/pexels-photo-36611201.jpeg?auto=compress&cs=tinysrgb&w=700",
    featured: false,
  },
];

export function LearnPreview() {
  const [featured, ...rest] = posts;

  return (
    <section className="bg-cream py-16 px-4">
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-terra text-xs font-semibold tracking-widest uppercase flex items-center gap-2 mb-2">
              <span className="w-5 h-px bg-terra block" /> From Our Kitchen &amp; Fields
            </p>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-charcoal">
              Learn, Cook, <em className="italic text-terra">Grow</em>
            </h2>
          </div>
          <Link
            href="/learn"
            className="hidden sm:flex items-center gap-1.5 text-green-deep text-sm font-semibold hover:gap-2.5 transition-all"
          >
            Visit the blog <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Featured large card */}
          <Link href="/learn" className="group lg:col-span-1 bg-white rounded-2xl border border-cream-dark overflow-hidden hover:shadow-lg hover:border-green-light transition-all">
            <div className="relative h-64 overflow-hidden">
              <Image
                src={featured.image}
                alt={featured.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 1024px) 100vw, 33vw"
              />
              <div className="absolute top-3 left-3">
                <span className="bg-terra text-cream text-xs font-semibold px-3 py-1 rounded-full">
                  {featured.tag}
                </span>
              </div>
            </div>
            <div className="p-6">
              <h3 className="font-heading font-bold text-charcoal text-xl leading-snug mb-2 group-hover:text-green-deep transition-colors">
                {featured.title}
              </h3>
              <p className="text-charcoal-light text-sm leading-relaxed mb-4">{featured.excerpt}</p>
              <span className="flex items-center gap-1.5 text-xs text-charcoal-light">
                <Clock className="w-3.5 h-3.5" /> {featured.readTime} read
              </span>
            </div>
          </Link>

          {/* Two smaller cards stacked */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {rest.map((p) => (
              <Link
                key={p.title}
                href="/learn"
                className="group bg-white rounded-2xl border border-cream-dark overflow-hidden hover:shadow-lg hover:border-green-light transition-all flex flex-col"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={p.image}
                    alt={p.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, 50vw"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="bg-green-deep text-cream text-xs font-semibold px-3 py-1 rounded-full">
                      {p.tag}
                    </span>
                  </div>
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="font-heading font-bold text-charcoal text-base leading-snug mb-2 group-hover:text-green-deep transition-colors flex-1">
                    {p.title}
                  </h3>
                  <p className="text-charcoal-light text-sm leading-relaxed mb-3">{p.excerpt}</p>
                  <span className="flex items-center gap-1.5 text-xs text-charcoal-light">
                    <Clock className="w-3.5 h-3.5" /> {p.readTime} read
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="sm:hidden mt-6 text-center">
          <Link href="/learn" className="inline-flex items-center gap-1.5 text-green-deep text-sm font-semibold">
            Visit the blog <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
