import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './breadcrumb.scss';

const Breadcrumb = () => {
  const location = useLocation();
  const paths = location.pathname.split('/').filter((path) => path);

  return (
    <div className='container'>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">home</Link>
          </li>
          {paths.map((path, index) => {
            const routeTo = `/${paths.slice(0, index + 1).join('/')}`;
            const isLast = index === paths.length - 1;

            return isLast ? (
              <li className="breadcrumb-item active" aria-current="page" key={index}>
                {path}
              </li>
            ) : (
              <li className="breadcrumb-item" key={index}>
                <Link to={routeTo}>{path}</Link>
              </li>
            );
          })}
        </ol>
      </nav>
    </div>
  );
};

export default Breadcrumb;
