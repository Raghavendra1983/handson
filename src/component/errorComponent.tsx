import React, { FunctionComponent } from 'react';
interface PropsType {
    message: string
}
type Props = {
    message: ''
};

const Error: FunctionComponent<PropsType> = (props): JSX.Element => {
    return <h5 className='text-red-500'>{props.message}</h5>;
}

export default Error;
