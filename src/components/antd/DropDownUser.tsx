import React, { FC } from 'react';
import { DownOutlined, SmileOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Dropdown, Space } from 'antd';
import { AiOutlineEllipsis } from 'react-icons/ai';
import { Link } from 'react-router-dom';

interface Props {
    userId: string;
    slug: string;
    handleEvaluation: (userId: string) => void;
}

export const UserDropdown:FC<Props> = ({ userId, slug, handleEvaluation }) => {
    const items: MenuProps['items'] = [
        {
            key: '1',
            label: (
                <Link to={`/perfil/${slug}`}>
                    Ver perfil
                </Link>
            ),
        },
        {
            key: '2',
            label: 'Evaluar',
            onClick: () => handleEvaluation(userId),
        }
    ];

    return (
        <Dropdown menu={{ items }} trigger={['click']} className='cursor-pointer'>
            <a onClick={(e) => e.preventDefault()}>
            <   AiOutlineEllipsis className='text-white text-2xl' />
            </a>
        </Dropdown>
    );
};

