import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Card, Form, Button, Alert } from 'react-bootstrap';
import api from '../../api/axios';
import { loginFailure, loginStart, loginSuccess, type User } from './authSlice';
import type { RootState } from '../../store';

type UserRecord = User & { password: string };

export default function LoginBS() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state: RootState) => state.auth);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const from = (location.state as { from?: string } | null)?.from || '/dashboard';

  useEffect(() => {
    if (user) navigate(from, { replace: true });
  }, [user, navigate, from]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    dispatch(loginStart());

    try {
      const { data: users } = await api.get<UserRecord[]>(`/users?email=${encodeURIComponent(email)}`);

      if (users.length === 0 || users[0].password !== password) {
        dispatch(loginFailure('Email ou mot de passe incorrect'));
        return;
      }

      const { password: _pw, ...user } = users[0];
      const fakeToken = btoa(JSON.stringify({
        userId: user.id,
        email: user.email,
        role: 'admin',
        exp: Date.now() + 3600000,
      }));

      dispatch(loginSuccess({ user, token: fakeToken }));
    } catch {
      dispatch(loginFailure('Erreur serveur'));
    }
  }

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh', background: '#f0f0f0' }}>
      <Card style={{ maxWidth: 400, width: '100%' }} className="shadow-sm">
        <Card.Body className="p-4 d-flex flex-column gap-3">
          <Card.Title className="text-center mb-0" style={{ color: '#1B8C3E', fontSize: '2rem', fontWeight: 700 }}>
            TaskFlow
          </Card.Title>
          <div className="text-center text-muted">Connectez-vous pour continuer</div>
          {error && <Alert variant="danger" className="mb-0">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Control type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control type="password" placeholder="Mot de passe" value={password} onChange={e => setPassword(e.target.value)} required />
            </Form.Group>
            <Button type="submit" className="w-100" variant="success" disabled={loading}>
              {loading ? 'Connexion...' : 'Se connecter'}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}
