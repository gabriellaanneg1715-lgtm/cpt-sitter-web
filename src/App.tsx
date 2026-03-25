/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { 
  Instagram, 
  Menu,
  X,
  Heart,
  Shield,
  Star,
  MapPin,
  MessageCircle,
  Phone,
  Dog,
  Mail
} from "lucide-react";
import React, { useState, useEffect } from "react";
import Lenis from "lenis";
import Chatbot from "./components/Chatbot";

const services = [
  {
    title: "Pet Sitting",
    description: "Personalized care in your pet's own environment. I provide feeding, exercise, and plenty of companionship.",
    image: "https://images.unsplash.com/photo-1541599540903-216a46ca1ad0?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "House Sitting",
    description: "Complete home management. Security, maintenance, and peace of mind while you are away from home.",
    image: "https://images.unsplash.com/photo-1513584684374-8bab748fbf90?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "Dog Walking",
    description: "Structured exercise tailored to your dog's energy levels and individual needs in your local area.",
    image: "https://images.unsplash.com/photo-1551730459-92db2a308d6a?auto=format&fit=crop&q=80&w=800"
  }
];

const testimonials = [
  {
    name: "Kezia",
    text: "We couldn’t have asked for a better dog sitter than Gaby. She stayed in our home while we were away and took such wonderful care of Obi. From the moment we left, she kept us constantly updated with messages and photos, which gave us real peace of mind. It was clear that Obi wasn’t just being looked after; he was truly cared for and loved like one of her own. We came home to a happy, relaxed Obi and a home that had been well looked after, too. It’s such a comfort knowing there is someone we trust completely to care for him. We’re incredibly grateful and would highly recommend Gaby to anyone looking for a kind, reliable dog sitter.",
  },
  {
    name: "Seh & Isabella",
    text: "We were so happy with Gabby’s cat sitting services! She’s incredibly responsible and we trusted her completely from the start. The cats were calm, content, and clearly adored her. The daily updates and photos were such a comfort, and it was obvious how much love and attention she gave them. We came home to very happy cats who’d completely bonded with her. Can’t recommend her enough",
  },
  {
    name: "Ehlke",
    text: "I genuinely can’t recommend @capetownsitter enough! Gabby has taken amazing care of our two cats, Fig and Angus. Both get easily stressed, so having a caring, attentive cat sitter is a top priority when we travel. This is exactly why we use @capetownsitter — we always have complete peace of mind knowing our cats are happy and getting lots of love and attention. We come home to calm, happy pets and a well-looked-after home. Gabby is thoughtful, reliable, genuinely cares, and keeps us updated with lots of pics. We trust her completely while we’re away.",
  }
];

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "Pet Sitting",
    message: ""
  });

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      if (!anchor) return;
      
      const href = anchor.getAttribute('href');
      if (href?.startsWith('#')) {
        e.preventDefault();
        lenis.scrollTo(href, { offset: -100 });
      }
    };

    document.addEventListener('click', handleAnchorClick);

    return () => {
      document.removeEventListener('click', handleAnchorClick);
      lenis.destroy();
    };
  }, []);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`New Inquiry from ${formData.name} - ${formData.service}`);
    const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\nService: ${formData.service}\n\nMessage:\n${formData.message}`);
    window.location.href = `mailto:gabby@capetownsitter.co.za?subject=${subject}&body=${body}`;
  };

  return (
    <div className="min-h-screen selection:bg-accent selection:text-bg">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-bg/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
          <a href="#" className="flex items-center">
            <span className="text-2xl font-brand font-semibold tracking-wide text-ink">Cape Town Sitter</span>
          </a>
          
          <div className="hidden md:flex items-center gap-10 text-sm font-medium">
            <a href="#services" className="hover:text-accent transition-colors">Services</a>
            <a href="#about" className="hover:text-accent transition-colors">About</a>
            <a href="#testimonials" className="hover:text-accent transition-colors">Reviews</a>
            <a href="#contact" className="btn-warm py-2.5">Book Now</a>
          </div>

          <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden bg-bg border-b border-border p-8 flex flex-col gap-6 text-center font-serif text-xl"
          >
            <a href="#services" onClick={() => setIsMenuOpen(false)}>Services</a>
            <a href="#about" onClick={() => setIsMenuOpen(false)}>About</a>
            <a href="#testimonials" onClick={() => setIsMenuOpen(false)}>Reviews</a>
            <a href="#contact" className="btn-warm" onClick={() => setIsMenuOpen(false)}>Book Now</a>
          </motion.div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-40 pb-20 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-serif mb-8 leading-[1.1]">
              Loving care for your <span className="italic text-accent">furry family</span> members.
            </h1>
            <p className="text-lg text-muted mb-10 leading-relaxed max-w-lg">
              Professional pet sitting and house management in Cape Town. I treat your home and pets with the same love and respect as my own.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#contact" className="btn-warm text-lg px-10">Check Availability</a>
              <a href="#services" className="btn-outline-warm text-lg px-10">My Services</a>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-[40px] overflow-hidden shadow-2xl border-8 border-bg">
              <img 
                src="https://images.unsplash.com/photo-1573865526739-10659fec78a5?auto=format&fit=crop&q=80&w=1200" 
                alt="Cat being pet" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="section-padding bg-surface">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl mb-4">My Services</h2>
            <p className="text-muted italic text-lg">Tailored care for every home and every pet.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="card-warm group"
              >
                <h3 className="text-2xl mb-4">{service.title}</h3>
                <p className="text-muted text-sm leading-relaxed mb-6">{service.description}</p>
                <a href="#contact" className="text-accent text-xs font-bold uppercase tracking-widest flex items-center gap-2 hover:gap-3 transition-all">
                  Learn More <ArrowRight size={14} />
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section-padding">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center">
          <div className="order-2 md:order-1">
            <div className="group relative aspect-[4/5] rounded-[40px] shadow-xl bg-surface border border-border flex items-center justify-center overflow-hidden cursor-pointer">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--color-accent)_0%,transparent_70%)] opacity-10 transition-opacity duration-500 group-hover:opacity-20"></div>
              <AnimatedDog 
                className="w-2/3 h-2/3 text-accent opacity-80 transition-transform duration-500 group-hover:scale-105" 
              />
            </div>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-1 md:order-2"
          >
            <h2 className="text-5xl mb-8 leading-tight">I care for your home as if it were <span className="italic text-accent">my own.</span></h2>
            <div className="space-y-10">
              <div className="flex gap-6">
                <div className="mt-1 p-3 bg-surface rounded-2xl text-accent">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="text-lg font-bold mb-2">Cape Town Local</h4>
                  <p className="text-muted text-sm leading-relaxed">I'm from Cape Town, and I have great routes I walk the dogs on, visiting the best dog-friendly places and beaches.</p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="mt-1 p-3 bg-surface rounded-2xl text-accent">
                  <MessageCircle size={24} />
                </div>
                <div>
                  <h4 className="text-lg font-bold mb-2">Daily Photo Updates</h4>
                  <p className="text-muted text-sm leading-relaxed">Stay connected with your furry friends through daily photos and status updates sent directly to your phone.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="section-padding bg-surface">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl mb-4">Kind Words</h2>
            <p className="text-muted italic">From my wonderful community of pet parents.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-bg p-10 rounded-[40px] border border-border shadow-sm"
              >
                <p className="text-base font-serif italic mb-8 leading-relaxed">"{t.text}"</p>
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-widest text-accent">{t.name}</h4>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section-padding">
        <div className="max-w-4xl mx-auto bg-surface rounded-[48px] p-10 md:p-20 border border-border relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
          
          <div className="relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-5xl mb-6">Start a <span className="italic text-accent">Conversation</span></h2>
              <p className="text-muted max-w-md mx-auto mb-6">Tell me about your pets and your travel dates, and I'll be in touch shortly.</p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <a href="tel:0661863886" className="inline-flex items-center gap-2 text-xl font-medium text-accent hover:opacity-80 transition-opacity">
                  <Phone size={20} />
                  066 186 3886
                </a>
                <a href="mailto:gabby@capetownsitter.co.za" className="inline-flex items-center gap-2 text-xl font-medium text-accent hover:opacity-80 transition-opacity">
                  <Mail size={20} />
                  gabby@capetownsitter.co.za
                </a>
              </div>
            </div>
            
            <form className="space-y-8" onSubmit={handleFormSubmit}>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-bold opacity-40 ml-4">Full Name</label>
                  <input 
                    type="text" 
                    className="input-warm" 
                    placeholder="Your Name" 
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-bold opacity-40 ml-4">Email Address</label>
                  <input 
                    type="email" 
                    className="input-warm" 
                    placeholder="hello@example.com" 
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-bold opacity-40 ml-4">Service Required</label>
                <select 
                  className="input-warm appearance-none"
                  value={formData.service}
                  onChange={(e) => setFormData({...formData, service: e.target.value})}
                >
                  <option>Pet Sitting</option>
                  <option>House Sitting</option>
                  <option>Dog Walking</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-bold opacity-40 ml-4">Tell me more</label>
                <textarea 
                  rows={4} 
                  className="input-warm resize-none" 
                  placeholder="Tell me about your pets and your needs..."
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                ></textarea>
              </div>
              <button type="submit" className="btn-warm w-full py-6 text-lg">Send Inquiry</button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 border-t border-border bg-surface/30">
        <div className="max-w-7xl mx-auto px-6 flex flex-col items-center gap-12">
          <div className="flex flex-col items-center gap-4">
            <div className="flex items-center">
              <span className="text-3xl font-brand font-semibold tracking-wide text-ink">Cape Town Sitter</span>
            </div>
            <p className="text-sm text-muted italic">Loving care for your Mother City home and pets.</p>
          </div>
          
          <div className="flex flex-col items-center gap-8">
            <div className="flex flex-wrap justify-center gap-6 items-center">
              <a href="tel:0661863886" className="flex items-center gap-2 text-muted hover:text-accent transition-colors">
                <Phone size={16} />
                <span className="text-sm">066 186 3886</span>
              </a>
              <a href="mailto:gabby@capetownsitter.co.za" className="flex items-center gap-2 text-muted hover:text-accent transition-colors">
                <Mail size={16} />
                <span className="text-sm">gabby@capetownsitter.co.za</span>
              </a>
            </div>
            <div className="flex gap-4">
              <a href="#" className="p-4 bg-bg rounded-full border border-border hover:text-accent hover:border-accent transition-all">
                <Instagram size={24} />
              </a>
              <a href="https://wa.me/27661863886" target="_blank" rel="noopener noreferrer" className="p-4 bg-bg rounded-full border border-border hover:text-accent hover:border-accent transition-all">
                <WhatsAppIcon size={24} />
              </a>
            </div>
            <div className="flex gap-12 text-[10px] uppercase tracking-[0.2em] font-bold opacity-40">
              <a href="#" className="hover:opacity-100 transition-opacity">Privacy</a>
              <a href="#" className="hover:opacity-100 transition-opacity">Terms</a>
              <a href="#" className="hover:opacity-100 transition-opacity">FAQ</a>
            </div>
          </div>

          <div className="text-[10px] opacity-20 uppercase tracking-widest">
            © 2024 Cape Town Sitter • Handcrafted in Cape Town
          </div>
        </div>
      </footer>

      <Chatbot />
    </div>
  );
}

const ArrowRight = ({ size, className }: { size: number, className?: string }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </svg>
);

const WhatsAppIcon = ({ size, className }: { size: number, className?: string }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M17.498 14.382c-.301-.15-1.767-.867-2.04-.966-.273-.101-.473-.15-.673.15-.197.295-.771.964-.944 1.162-.175.195-.349.21-.646.06-.301-.15-1.265-.462-2.406-1.485-.888-.795-1.484-1.77-1.66-2.07-.174-.3-.019-.465.13-.615.136-.135.301-.345.451-.523.146-.181.194-.301.297-.496.1-.21.049-.375-.025-.524-.075-.15-.672-1.62-.922-2.206-.24-.584-.487-.51-.672-.51-.172-.015-.371-.015-.571-.015-.2 0-.523.074-.797.359-.273.3-1.045 1.02-1.045 2.475s1.07 2.865 1.219 3.075c.149.195 2.105 3.195 5.1 4.485.714.3 1.27.48 1.704.629.714.227 1.365.195 1.88.121.574-.091 1.767-.721 2.016-1.426.255-.705.255-1.29.18-1.425-.074-.135-.27-.21-.57-.345z" />
    <path d="M20.52 3.449C18.24 1.245 15.24 0 12.045 0 5.463 0 .104 5.334.101 11.893c0 2.096.549 4.14 1.595 5.945L0 24l6.335-1.652c1.746.943 3.71 1.444 5.71 1.447h.006c6.585 0 11.946-5.336 11.949-11.896 0-3.176-1.24-6.151-3.48-8.45zM12.046 21.77c-1.775 0-3.516-.476-5.041-1.375l-.361-.214-3.75.975.996-3.645-.235-.373c-.99-1.56-1.51-3.375-1.51-5.245 0-5.405 4.415-9.815 9.835-9.815 2.625 0 5.09 1.02 6.94 2.885 1.855 1.86 2.875 4.335 2.875 6.96 0 5.41-4.415 9.825-9.835 9.825z" />
  </svg>
);

const AnimatedDog = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 200 200" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="1.5" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    className={className}
  >
    {/* Human Hand (Animatable) */}
    <path 
      d="M -20 110 C 0 110, 20 115, 40 108 C 50 105, 45 95, 35 100 C 20 105, 0 100, -20 100" 
      className="opacity-0 -translate-x-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0"
    />

    {/* Main Body (without front leg) */}
    <path d="M 40 80 C 50 80, 60 75, 70 65 L 75 50 L 90 80 C 110 80, 130 90, 150 90 C 160 90, 165 110, 160 130 C 150 160, 160 180, 160 180 L 145 180 C 145 160, 135 140, 120 135" />
    
    {/* Standing Front Leg */}
    <path 
      d="M 120 135 C 100 135, 90 140, 90 180 L 75 180 C 75 140, 85 110, 75 95" 
      className="transition-opacity duration-300 group-hover:opacity-0"
    />

    {/* Raised Front Leg */}
    <path 
      d="M 120 135 C 100 130, 80 120, 55 115 L 45 105 C 55 100, 65 95, 75 95" 
      className="opacity-0 transition-opacity duration-300 group-hover:opacity-100"
    />
    
    {/* Upper Jaw / Snout */}
    <path d="M 75 95 C 60 95, 45 90, 40 80" />

    {/* Lower Jaw (Animatable) */}
    <path 
      d="M 75 95 C 65 105, 50 105, 45 95" 
      className="origin-[75px_95px] group-hover:rotate-[15deg] transition-transform duration-300" 
    />

    {/* Tail (Animatable) */}
    <path 
      d="M 150 90 C 170 80, 180 60, 175 40" 
      className="origin-[150px_90px] dog-tail" 
    />
          
    {/* Eye */}
    <circle cx="65" cy="75" r="2" fill="currentColor" stroke="none" />
  </svg>
);
