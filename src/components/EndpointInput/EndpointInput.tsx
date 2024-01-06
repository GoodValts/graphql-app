import { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AuthContext } from '../../controllers/appControllers';
import { RootState } from '../../redux/store';
import { setEndpoint } from '../../redux/reducers/endpointSlice';
import { makeRequest } from '../../utils/api';
import EndpointTextObj from './langData';

import styles from './EndpointInput.module.scss';

const EndpointInput = (): JSX.Element => {
  const dispatch = useDispatch();
  const url = useSelector((state: RootState) => state.endpoint.value);
  const [statusColor, setStatusColor] = useState('status_loading');
  const [statusMessage, setStatusMessage] = useState('');
  const { lang } = useContext(AuthContext);

  useEffect(() => {
    setStatusColor('status_loading');
    setStatusMessage('');
    makeRequest(url).then(
      () => {
        setStatusColor('status_success');
      },
      () => {
        setStatusColor('status_error');
        setStatusMessage(EndpointTextObj[lang].errorMessage);
      }
    );
  }, [url]);

  const handleChange = (value: string): void => {
    dispatch(setEndpoint(value));
  };

  return (
    <div className={styles.endpoint}>
      <input
        name="url"
        className={styles.input}
        type="url"
        placeholder={EndpointTextObj[lang].urlPlaceholder}
        value={url}
        onChange={(e): void => handleChange(e.target.value)}
      />
      <label htmlFor="url" className={styles.status_message}>
        {statusMessage}
      </label>
      <div className={styles[statusColor]} />
    </div>
  );
};

export default EndpointInput;
