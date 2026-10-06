import { useState } from 'react';
import { Field, Form, Formik } from 'formik';

import {
  loginValidationSchema,
  registerValidationSchema,
} from '@/lib/yupValidations/User';

import { Target, User, AtSign, Lock, AlertCircle } from 'lucide-react';
import type { AuthUser } from '../../../../types';
import { id } from 'date-fns/locale';
import { Login } from '@/API/Forms';

interface AuthFormProps {
  view: 'login' | 'register';
  setView: (v: 'login' | 'register') => void;
  onLogin: (user: AuthUser) => void;
}

export default function AuthForm({ view, setView, onLogin }: AuthFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  /*  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email || !password) {
      setError("Preencha todos os campos.");
      return;
    }
    if (view === "register" && !name) {
      setError("Informe seu nome.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (
        view === "login" &&
        email !== "admin@crm.com" &&
        email !== "ana.lima@crm.com"
      ) {
        setError(
          "Credenciais inválidas. Use admin@crm.com ou ana.lima@crm.com",
        );
        return;
      }
      onLogin({
        id: "u1",
        name:
          view === "register"
            ? name
            : email === "ana.lima@crm.com"
              ? "Ana Lima"
              : "Admin Sistema",
        email,
        role: email === "ana.lima@crm.com" ? "manager" : "admin",
        avatar: "",
      });
    }, 800);
  }; */

  return (
    <div className="flex-1 flex items-center justify-center p-8">
      <div className="w-full max-w-sm">
        <div className="lg:hidden flex items-center gap-2 mb-10">
          <div className="w-8 h-8 rounded-lg bg-[#0EA47A] flex items-center justify-center">
            <Target className="w-4 h-4 text-white" />
          </div>
          <span
            className="text-white font-semibold"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Nexus CRM
          </span>
        </div>

        <h2
          className="text-white text-2xl font-semibold mb-1"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          {view === 'login' ? 'Bem-vindo de volta' : 'Criar conta'}
        </h2>
        <p className="text-[#6B7A94] text-sm mb-8">
          {view === 'login'
            ? 'Entre com suas credenciais para continuar.'
            : 'Preencha os dados para criar sua conta.'}
        </p>
        <Formik
          initialValues={{
            id: '',
            name: '',
            email: '',
            password: '',
            role: 'admin',
            avatar: '',
          }}
          validateOnMount={true}
          validationSchema={
            view === 'login' ? loginValidationSchema : registerValidationSchema
          }
          onSubmit={(values) => {
            console.log(values);
            onLogin({
              id: values.id,
              name: values.name,
              email: values.email,
              role: values.role === 'admin' ? 'admin' : 'manager',
              avatar: '',
            });
            Login(values).then((res) => {
              if (res !== 'Login successful') {
                setError(res);
              }
            });
          }}
        >
          {({ errors, touched, isValid, dirty }) => (
            <Form className="space-y-4">
              {view === 'register' && (
                <div>
                  <label className="text-[#8A9BB5] text-xs font-medium uppercase tracking-wider block mb-2">
                    name completo
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7A94]" />
                    <Field
                      type="text"
                      name="name"
                      placeholder="Seu nome"
                      className="w-full border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white placeholder:text-[#4A5568] text-sm focus:outline-none focus:border-[#0EA47A] transition-colors"
                      style={{ background: 'rgba(255,255,255,0.06)' }}
                    />
                  </div>
                </div>
              )}
              <div>
                <label className="text-[#8A9BB5] text-xs font-medium uppercase tracking-wider block mb-2">
                  E-mail
                </label>
                <div className="relative">
                  <AtSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7A94]" />
                  <Field
                    type="email"
                    name="email"
                    placeholder="voce@empresa.com"
                    className="w-full border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white placeholder:text-[#4A5568] text-sm focus:outline-none focus:border-[#0EA47A] transition-colors"
                    style={{ background: 'rgba(255,255,255,0.06)' }}
                  />
                </div>

                {errors.email && touched.email && (
                  <div className="text-red-500 text-xs mt-1">
                    {errors.email}
                  </div>
                )}
              </div>
              <div>
                <label className="text-[#8A9BB5] text-xs font-medium uppercase tracking-wider block mb-2">
                  Senha
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7A94]" />
                  <Field
                    type="password"
                    name="password"
                    placeholder="••••••••"
                    className="w-full border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white placeholder:text-[#4A5568] text-sm focus:outline-none focus:border-[#0EA47A] transition-colors"
                    style={{ background: 'rgba(255,255,255,0.06)' }}
                  />
                </div>
                {errors.password && touched.password && (
                  <div className="text-red-500 text-xs mt-1">
                    {errors.password}
                  </div>
                )}
              </div>

              {error && (
                <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
                  <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                  <span className="text-red-400 text-xs">{error}</span>
                </div>
              )}

              {view === 'login' && (
                <div className="flex justify-end">
                  <button
                    type="button"
                    className="text-[#0EA47A] text-xs hover:underline"
                  >
                    Esqueceu a senha?
                  </button>
                </div>
              )}

              <button
                type="submit"
                disabled={!isValid || !dirty}
                onClick={() => console.log('eu passei')}
                className="w-full bg-[#0EA47A] hover:bg-[#0d9470] text-white py-3 rounded-lg text-sm font-semibold transition-colors disabled:opacity-60 mt-2"
              >
                {loading
                  ? 'Aguarde...'
                  : view === 'login'
                    ? 'Entrar'
                    : 'Criar conta'}
              </button>
            </Form>
          )}
        </Formik>

        <p className="text-[#6B7A94] text-xs text-center mt-6">
          {view === 'login' ? 'Não tem uma conta? ' : 'Já tem uma conta? '}
          <button
            onClick={() => {
              setView(view === 'login' ? 'register' : 'login');
              setError('');
            }}
            className="text-[#0EA47A] hover:underline font-medium"
          >
            {view === 'login' ? 'Cadastre-se' : 'Entrar'}
          </button>
        </p>

        {view === 'login' && (
          <p className="text-[#4A5568] text-xs text-center mt-4">
            Demo: admin@crm.com · qualquer senha
          </p>
        )}
      </div>
    </div>
  );
}
