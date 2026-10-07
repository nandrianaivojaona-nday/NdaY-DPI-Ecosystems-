"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const cards = [
  {
    title: "Become a Partner",
    description: "Collaborate with us to build sustainable digital ecosystems.",
    href: "/partner",
    cta: "Learn More",
  },
  {
    title: "Join a Living Lab",
    description: "Co-create solutions with communities in your region.",
    href: "/join",
    cta: "Get Involved",
  },
  {
    title: "Become a Founding Commune",
    description: "Pioneer the digital transformation at the local level.",
    href: "/contact",
    cta: "Contact Us",
  },
  {
    title: "Contact NdaY",
    description: "Have questions? Reach out to our team.",
    href: "/contact",
    cta: "Get in Touch",
  },
];

export default function GetInvolved() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((card, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
          className="glass-card flex flex-col rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all hover:bg-white/10"
        >
          <h3 className="text-lg font-semibold text-white">{card.title}</h3>
          <p className="mt-2 flex-1 text-sm text-white/60">{card.description}</p>
          <Link
            href={card.href}
            className="mt-4 inline-block text-sm font-medium text-white/80 underline underline-offset-2 transition-colors hover:text-white"
          >
            {card.cta} →
          </Link>
        </motion.div>
      ))}
    </div>
  );
}