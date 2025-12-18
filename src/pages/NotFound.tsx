import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Not Found</h1>
      <p>Page does not exist.</p>
      <Link to="/">Go home</Link>
    </div>
  );
}

