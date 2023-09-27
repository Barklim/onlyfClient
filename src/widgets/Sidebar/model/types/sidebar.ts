import React from 'react';
import { UserRole } from '@/entities/User';

export interface SidebarItemType {
    path: string;
    text: string;
    Icon: React.VFC<React.SVGProps<SVGSVGElement>>;
    authOnly?: boolean;
    roles?: UserRole[];
}
