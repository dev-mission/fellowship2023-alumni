import { Link } from 'react-router-dom';
import { useAuthContext } from './AuthContext';

function Card({ id, image, title, breifDescription}) {
    const { user } = useAuthContext();
    return (
        
    );
}

export default Card;