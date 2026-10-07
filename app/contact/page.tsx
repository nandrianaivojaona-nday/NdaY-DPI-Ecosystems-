import Chapter from "@/components/ui/Chapter";

const TOPICS = [
  "General Enquiry",
  "Collaboration Opportunity",
  "Government Partnership",
  "Research & Academia",
  "Technical Collaboration",
  "Living Labs",
  "Innovation & Co‑creation",
  "Media & Communications",
];

const fieldClass =
  "w-full rounded-lg border border-white/20 bg-white/10 p-3 text-white placeholder:text-white/55 outline-none focus:border-cyan-400";

type Props = { searchParams: Promise<{ subject?: string }> };

export default async function ContactPage({ searchParams }: Props) {
  const { subject } = await searchParams;

  return (
    <Chapter
      id="contact"
      title="Contact NdaY’"
      description="Questions, partnerships or media requests? Reach the NdaY' Enterprise team directly."
      align="center"
      className="pb-24"
    >
      <div className="flex w-full justify-center">
        <div className="w-full max-w-3xl space-y-8">
          <div className="glass-card rounded-xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
            <h2 className="mb-4 text-xl font-semibold text-white">Contact Information</h2>
            <div className="space-y-3 text-sm text-white/80">
              <p>
                Email:{" "}
                <a href="mailto:nandrianaivojaona+contact@gmail.com" className="text-cyan-300 hover:underline">
                  nandrianaivojaona+nday_contact@gmail.com
                </a>
              </p>
              <p>
                Partnerships:{" "}
                <a href="mailto:nandrianaivojaona+partnerships@gmail.com" className="text-cyan-300 hover:underline">
                  nandrianaivojaona+nday_partnerships@gmail.com
                </a>
              </p>
              <p>
                Location: Lot A62 Manohisoa Alasora 103 Antananarivo Avaradrano,
                Analamanga Madagascar
              </p>
            </div>
          </div>

          <div className="glass-card rounded-xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
            <h2 className="mb-4 text-xl font-semibold text-white">Send a Message</h2>
            <form className="space-y-4">
              <input type="text" name="name" placeholder="Your Name" className={fieldClass} />
              <input type="email" name="email" placeholder="Your Email" className={fieldClass} />
              <select name="topic" className={fieldClass} defaultValue={TOPICS[0]}>
                {TOPICS.map((t) => (
                  <option key={t} className="text-black">{t}</option>
                ))}
              </select>
              <input type="text" name="subject" placeholder="Subject" defaultValue={subject ?? ""} className={fieldClass} />
              <textarea name="message" rows={6} placeholder="Your Message" className={fieldClass} />
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-full bg-cyan-500/20 px-6 py-3 text-sm font-semibold text-cyan-200 transition hover:bg-cyan-500/30"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </Chapter>
  );
}
