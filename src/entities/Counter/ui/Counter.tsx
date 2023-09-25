import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Button } from '@/shared/ui/deprecated/Button';
import { useCounterActions } from '../model/slice/counterSlice';
import { useCounterValue } from '../model/selectors/getCounterValue/getCounterValue';

export const Counter = () => {
    const dispatch = useDispatch();
    const counterValue = useCounterValue();
    const { t } = useTranslation();
    const { decrement, increment, add } = useCounterActions();

    const handleInc = () => {
        increment();
    };

    const handleDec = () => {
        decrement();
    };

    const handleAddFive = () => {
        add(5);
    };

    return (
        <div>
            <h1 data-testid="value-title">{counterValue}</h1>
            <Button onClick={handleAddFive} data-testid="increment-btn5">
                {t('add5')}
            </Button>
            <Button onClick={handleInc} data-testid="increment-btn">
                {t('increment')}
            </Button>
            <Button data-testid="decrement-btn" onClick={handleDec}>
                {t('decrement')}
            </Button>
        </div>
    );
};
