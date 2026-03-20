import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Brands.css';

gsap.registerPlugin(ScrollTrigger);

const brands = [
  { id: 1, name: 'Brand One', logo: '/brands/logo-tegra.svg' },
  { id: 2, name: 'Brand Two', logo: '/brands/logo-kwai.svg' },
  { id: 3, name: 'Brand Three', logo: '/brands/logo-planoeplano.svg' },
];

const Brands = () => {
  const sectionRef = useRef(null);
  const logosRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        logosRef.current,
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power2.out',
          stagger: 0.1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="brands" ref={sectionRef}>
      <div className="brands-container">
        <h2 className="brands-title">Marcas que trabalhamos</h2>
        <div className="brands-grid">
          {brands.map((brand, index) => (
            <div
              key={brand.id}
              className="brand-item"
              ref={(el) => {
                logosRef.current[index] = el;
              }}
            >
              <img 
                src={brand.logo} 
                alt={brand.name} 
                loading="lazy"
                width="160"
                height="80"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Brands;
