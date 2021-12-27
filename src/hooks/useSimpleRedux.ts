import { RootState } from '@/models/store';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect';

const getSimpleSelector = <T extends never>(storeName: string, stateName?: string): any => {
    if (!storeName) throw new Error('The corresponding warehouse was not found!');
    return createSelector(
        (store: RootState) => store?.[`${storeName}`],
        (state: T) => (stateName ? state?.[`${stateName}`] : state),
    );
};

export const useContent = (name: string): any => {
    const n: string[] = name.split('/');
    return useSelector(getSimpleSelector(n?.[0], n?.[1]));
};

export const useSend = (): ((type: string, params: any) => any) => {
    const dispatch = useDispatch();
    return (type: string, params: any) => {
        const n: string[] = type.split('/');
        if (!n?.[1]) throw new Error('Type format is incorrect,must be `store/reducer`');
        return dispatch?.[n?.[0]]?.[n?.[1]]?.(params);
    };
};
