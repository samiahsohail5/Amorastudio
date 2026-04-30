import { Mail, Phone, MapPin, Instagram, Facebook, Send } from 'lucide-react';

export default function Contact() {
  return (
    <div className="pt-32 pb-24 max-w-7xl mx-auto px-4">
      <div className="grid lg:grid-cols-2 gap-16">
        <div>
          <h1 className="text-6xl font-black uppercase tracking-tighter mb-8 italic">Get in <br /> Touch.</h1>
          <p className="text-sm text-black/60 uppercase tracking-widest font-bold mb-12 max-w-md">
            Any questions regarding your order or our drops? Drop us a message and the studio will get back to you shortly.
          </p>

          <div className="space-y-8">
            <div className="flex items-center gap-6">
              <div className="w-12 h-12 bg-black text-white flex items-center justify-center rounded-full">
                <Mail size={20} />
              </div>
              <div>
                <p className="text-[10px] uppercase font-black tracking-widest text-black/40">Email Us</p>
                <p className="text-sm font-bold uppercase">contact@amorastudio.com</p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="w-12 h-12 bg-black text-white flex items-center justify-center rounded-full">
                <Phone size={20} />
              </div>
              <div>
                <p className="text-[10px] uppercase font-black tracking-widest text-black/40">WhatsApp</p>
                <p className="text-sm font-bold uppercase">+92 3XX XXXXXXX</p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="w-12 h-12 bg-black text-white flex items-center justify-center rounded-full">
                <MapPin size={20} />
              </div>
              <div>
                <p className="text-[10px] uppercase font-black tracking-widest text-black/40">Studio Location</p>
                <p className="text-sm font-bold uppercase">Karachi, Pakistan</p>
              </div>
            </div>
          </div>
          
          <div className="mt-16 flex gap-4">
            <a href="#" className="w-10 h-10 border border-black/10 flex items-center justify-center rounded-full hover:bg-black hover:text-white transition-all"><Instagram size={18} /></a>
            <a href="#" className="w-10 h-10 border border-black/10 flex items-center justify-center rounded-full hover:bg-black hover:text-white transition-all"><Facebook size={18} /></a>
          </div>
        </div>

        <div className="bg-neutral-50 p-10 rounded-sm">
          <form className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-black tracking-widest">Full Name</label>
                <input type="text" className="w-full bg-white border border-black/10 px-4 py-3 text-xs uppercase outline-none focus:border-black" placeholder="John Doe" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-black tracking-widest">Email Address</label>
                <input type="email" className="w-full bg-white border border-black/10 px-4 py-3 text-xs uppercase outline-none focus:border-black" placeholder="john@example.com" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase font-black tracking-widest">Subject</label>
              <input type="text" className="w-full bg-white border border-black/10 px-4 py-3 text-xs uppercase outline-none focus:border-black" placeholder="Order Query" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase font-black tracking-widest">Message</label>
              <textarea rows={5} className="w-full bg-white border border-black/10 px-4 py-3 text-xs uppercase outline-none focus:border-black" placeholder="How can we help?"></textarea>
            </div>
            <button className="w-full bg-black text-white py-4 text-xs uppercase tracking-widest font-bold flex items-center justify-center gap-2 hover:bg-black/80">
              Send Message <Send size={14} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
