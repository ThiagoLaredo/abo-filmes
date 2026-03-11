import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import './ContactPage.css';

const ContactPage = () => {
  const pageRef = useRef(null);
  const contentRef = useRef(null);
  const curtainRef = useRef(null);
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    empresa: '',
    mensagem: '',
  });
  const [isSent, setIsSent] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsSent(true);
    setFormData({
      nome: '',
      email: '',
      empresa: '',
      telefone: '',
      mensagem: '',
    });
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(contentRef.current, { opacity: 0, y: 24 });
      gsap.set(curtainRef.current, { scaleY: 1, transformOrigin: 'top center' });

      gsap.timeline()
        .to(curtainRef.current, {
          scaleY: 0,
          duration: 0.8,
          ease: 'power3.inOut',
        })
        .to(
          contentRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.65,
            ease: 'power2.out',
          },
          '-=0.12'
        );
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <main className="contact-page" ref={pageRef}>
      <div className="contact-page-curtain" ref={curtainRef}></div>
      <section className="contact-shell" ref={contentRef}>
        <header className="contact-header">
          <h1>Contato</h1>
          <p>Vamos criar histórias que aproximam sua marca do público.</p>
        </header>

        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="contact-grid">
            <label className="contact-field">
              <input
                type="text"
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                placeholder="Nome"
                required
              />
            </label>

            <label className="contact-field">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="E-mail"
                required
              />
            </label>

                        <label className="contact-field">
              <input
                type="text"
                name="telefone"
                value={formData.telefone}
                onChange={handleChange}
                placeholder="Celular"
              />
            </label>

            <label className="contact-field">
              <input
                type="text"
                name="empresa"
                value={formData.empresa}
                onChange={handleChange}
                placeholder="Empresa"
              />
            </label>


            <label className="contact-field contact-field-full">
              <textarea
                name="mensagem"
                rows="6"
                value={formData.mensagem}
                onChange={handleChange}
                placeholder="Mensagem"
                required
              />
            </label>
          </div>

          <button type="submit" className="contact-submit">Enviar mensagem</button>

          {isSent && (
            <p className="contact-feedback">Mensagem enviada. Retornaremos em breve.</p>
          )}
        </form>
      </section>
    </main>
  );
};

export default ContactPage;
