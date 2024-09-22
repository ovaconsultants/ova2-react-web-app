import Spinner from 'react-bootstrap/Spinner';

const LoadingSpinner = () => {
    return (
        <div>
            <Spinner animation="grow" size="sm" />
            <Spinner animation="grow" />
        </div>
    );
}
export default LoadingSpinner;