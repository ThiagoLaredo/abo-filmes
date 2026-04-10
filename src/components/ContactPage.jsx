import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import './ContactPage.css';

const WEB3FORMS_ACCESS_KEY = 'f875aa3f-2374-4293-adb5-54e41b76c48e';

const initialFormData = {
  nome: '',
  email: '',
  empresa: '',
  telefone: '',
  mensagem: '',
};

const ContactPage = () => {
  const pageRef = useRef(null);
  const contentRef = useRef(null);
  const curtainRef = useRef(null);
  const [formData, setFormData] = useState(initialFormData);
  const [submitState, setSubmitState] = useState({ status: 'idle', message: '' });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setSubmitState({ status: 'loading', message: 'Enviando mensagem...' });

    const submission = new FormData();
    submission.append('access_key', WEB3FORMS_ACCESS_KEY);
    submission.append('name', formData.nome);
    submission.append('email', formData.email);
    submission.append('phone', formData.telefone);
    submission.append('company', formData.empresa);
    submission.append('message', formData.mensagem);
    submission.append('subject', 'Novo contato pelo site Abó Filmes');
    submission.append('from_name', formData.nome);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: submission,
      });

      const data = await response.json();

      if (data.success) {
        setSubmitState({
          status: 'success',
          message: 'Mensagem enviada. Retornaremos em breve.',
        });
        setFormData(initialFormData);
        return;
      }

      setSubmitState({
        status: 'error',
        message: 'Nao foi possivel enviar agora. Tente novamente em instantes.',
      });
    } catch {
      setSubmitState({
        status: 'error',
        message: 'Erro de conexao ao enviar a mensagem. Tente novamente em instantes.',
      });
    }
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
                autoComplete="name"
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
                autoComplete="email"
                placeholder="E-mail"
                required
              />
            </label>

            <label className="contact-field">
              <input
                type="tel"
                name="telefone"
                value={formData.telefone}
                onChange={handleChange}
                autoComplete="tel"
                placeholder="Celular"
              />
            </label>

            <label className="contact-field">
              <input
                type="text"
                name="empresa"
                value={formData.empresa}
                onChange={handleChange}
                autoComplete="organization"
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

          <button type="submit" className="contact-submit" disabled={submitState.status === 'loading'}>
            {submitState.status === 'loading' ? 'Enviando...' : 'Enviar mensagem'}
          </button>

          {submitState.message && (
            <p className={`contact-feedback contact-feedback-${submitState.status}`} aria-live="polite">
              {submitState.message}
            </p>
          )}
        </form>
      </section>
    </main>
  );
};

export default ContactPage;
