import { rutaPrivada } from '@/router';
import { Breadcrumb } from 'antd';
import { FaHome } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';

const MyBreadcrumb = () => {
    const location = useLocation();
    const paths = location.pathname.split('/').filter(path => path !== '');

    const breadcrumbItems = paths.map((path, index) => {
        const currentPath = `/${paths.slice(0, index + 1).join('/')}`;
        const route = rutaPrivada.find(route => route.path === currentPath);

        if (route) {
            return {
                title: route.title,
                path: route.path,
                breadcrumbName: route.title,
            };
        }

        return null;
    }).filter(item => item !== null);

    const homeItem = {
        title: <span className="inline-flex align-middle">
        <FaHome className={`text-xl ${location.pathname === '/' ? 'pointer-events-none' : ''}`} />
      </span>,
        path: '/',
        breadcrumbName: 'Home',
    };

    const finalItems = [homeItem, ...breadcrumbItems];

    return (
        <Breadcrumb>
            {finalItems.map(item => (
                item && (
                    <Breadcrumb.Item key={item.path}>
                        <Link
                            to={item.path}
                            className={location.pathname === '/' ? 'cursor-default hover:bg-none hover:text-devarana-pink' : ''}
                        >
                            {item.title}
                        </Link>
                    </Breadcrumb.Item>
                )
            ))}
        </Breadcrumb>
    );
};

export default MyBreadcrumb;
