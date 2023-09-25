import { memo } from 'react';
import { useParams } from 'react-router-dom';
import { ArticleDetails } from '@/entities/Article';
import { Card } from '@/shared/ui/redesigned/Card';

interface DetailsContainterProps {
    className?: string;
}

export const DetailsContainer = memo((props: DetailsContainterProps) => {
    const { className } = props;
    const { id } = useParams<{ id: string }>();

    return (
        <Card fullWidth border="partial" className={className} padding="24">
            <ArticleDetails id={id} />
        </Card>
    );
});
