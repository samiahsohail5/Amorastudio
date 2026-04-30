export default function About() {
  return (
    <div className="pt-16">
      <section className="py-24 max-w-7xl mx-auto px-4">
        <div className="max-w-3xl">
          <p className="text-xs uppercase tracking-widest font-bold text-orange-500 mb-4">Our Origin Story</p>
          <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter mb-12">More Than just <br /> A Brand.</h1>
          <p className="text-xl md:text-2xl font-medium leading-relaxed mb-12 italic">
            Amora Studio was born in the heart of Karachi, driven by the desire to bridge the gap between high-end aesthetic streetwear and the local Pakistani audience.
          </p>
          <p className="text-sm text-black/60 leading-relaxed mb-8">
            We believe that clothing is an extension of one's identity. In an era of fast fashion, Amora stands for quality, intentionality, and aesthetic precision. Each piece is crafted with heavy-weight premium cotton, designed for that perfect oversized silhouette that the Gen-Z soul craves.
          </p>
          <p className="text-sm text-black/60 leading-relaxed">
            Our mission is to create a community where "Vibe" isn't just a word, but a lifestyle. From the streets of Karachi to your doorstep, we're bringing the studio to you.
          </p>
        </div>
      </section>

      <section className="bg-neutral-100 py-24">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-12">
          <div>
            <h3 className="text-4xl font-black uppercase tracking-tighter mb-4">01.</h3>
            <h4 className="text-sm font-bold uppercase tracking-widest mb-4">Quality First</h4>
            <p className="text-xs text-black/50 leading-relaxed">We source the highest quality local fabrics, ensuring our t-shirts feel as good as they look, wash after wash.</p>
          </div>
          <div>
            <h3 className="text-4xl font-black uppercase tracking-tighter mb-4">02.</h3>
            <h4 className="text-sm font-bold uppercase tracking-widest mb-4">Minimal Aesthetic</h4>
            <p className="text-xs text-black/50 leading-relaxed">Less is more. Our designs focus on typography, silhouette, and subtle details that make a bold statement.</p>
          </div>
          <div>
            <h3 className="text-4xl font-black uppercase tracking-tighter mb-4">03.</h3>
            <h4 className="text-sm font-bold uppercase tracking-widest mb-4">Community Focused</h4>
            <p className="text-xs text-black/50 leading-relaxed">Amora isn't just a label; it's a collective of creators, dreamers, and street culture enthusiasts in Pakistan.</p>
          </div>
        </div>
      </section>

      <section className="py-24 text-center border-b border-black/5">
        <h2 className="text-4xl font-black uppercase tracking-tighter mb-8">Join the Vibe.</h2>
        <a href="/shop" className="inline-block bg-black text-white px-10 py-5 text-xs uppercase font-bold tracking-widest hover:opacity-80 transition-all">Shop the Collection</a>
      </section>
    </div>
  );
}
