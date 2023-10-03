import { useParams } from 'react-router-dom';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Page } from '@/widgets/Page';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { EditableProfileCard } from '@/features/editableProfileCard';
import { TableProfile } from '@/features/TableProfile';

interface ProfilePageProps {
    className?: string;
}

const ProfilePage = ({ className }: ProfilePageProps) => {
    const { id } = useParams<{ id: string }>();

    return (
        <Page
            data-testid="ProfilePage"
            className={classNames('', {}, [className])}
        >
            <VStack gap="32" max>
                <HStack justify='between'>
                    <EditableProfileCard id={id} />
                </HStack>
                <TableProfile />
            </VStack>
        </Page>
    );
};

export default ProfilePage;
