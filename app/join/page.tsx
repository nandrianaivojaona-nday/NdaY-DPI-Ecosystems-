import Chapter from "@/components/ui/Chapter";

export default function ContactPage() {
  return (
    <Chapter
      id="contact"
      title="Contact NdaY’"
      description="We welcome governments, communities, academic institutions, development partners, innovators, businesses and civil society organisations interested in collaborating to strengthen Digital Public Infrastructure."
      align="center"
      className="pb-24"
    >
      <div className="flex w-full justify-center">
        <div className="w-full max-w-3xl space-y-8">
          {/* Contact Information */}
          <div className="glass-card rounded-xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
            <h2 className="mb-4 text-xl font-semibold text-white">Contact Information</h2>
            <div className="space-y-3 text-sm text-white/80">
              <p>
                Email:{" "}
                <a
                  href="mailto:nandrianaivojaona+contact@gmail.com"
                  className="text-cyan-300 hover:underline"
                >
                  nandrianaivojaona+nday_contact@gmail.com
                </a>
              </p>
              <p>
                Partnerships:{" "}
                <a
                  href="mailto:nandrianaivojaona+partnerships@gmail.com"
                  className="text-cyan-300 hover:underline"
                >
                  nandrianaivojaona+nday_partnerships@gmail.com
                </a>
              </p>
              <p>
                Location: Lot A62 Manohisoa Alasora 103 Antananarivo Avaradrano,
                Analamanga Madagascar
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="glass-card rounded-xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
            <h2 className="mb-4 text-xl font-semibold text-white">Send a Message</h2>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full rounded-lg border border-white/20 bg-white/10 p-3 text-white placeholder:text-white/55 outline-none focus:border-cyan-400"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full rounded-lg border border-white/20 bg-white/10 p-3 text-white placeholder:text-white/55 outline-none focus:border-cyan-400"
              />
              <select className="w-full rounded-lg border border-white/20 bg-white/10 p-3 text-white outline-none focus:border-cyan-400">
                <option className="text-black">Collaboration Opportunity</option>
                <option className="text-black">Government Partnership</option>
                <option className="text-black">Research & Academia</option>
                <option className="text-black">Technical Collaboration</option>
                <option className="text-black">Living Labs</option>
                <option className="text-black">Innovation & Co‑creation</option>
                <option className="text-black">Media & Communications</option>
                <option className="text-black">General Enquiry</option>
              </select>
              <textarea
                rows={6}
                placeholder="Your Message"
                className="w-full rounded-lg border border-white/20 bg-white/10 p-3 text-white placeholder:text-white/55 outline-none focus:border-cyan-400"
              />
              <button className="inline-flex items-center gap-2 rounded-full bg-cyan-500/20 px-6 py-3 text-sm font-semibold text-cyan-200 transition hover:bg-cyan-500/30">
                Send Message
              </button>
            </div>
          </div>
        </div>
      </div>
    </Chapter>
  );
}