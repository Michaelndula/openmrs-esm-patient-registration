import React, { useState } from 'react';
import styles from '../field.scss';
import { Input } from '../../input/basic-input/input/input.component';
import TextInput from 'carbon-components-react/es/components/TextInput';
import { useTranslation } from 'react-i18next';
import { countryCodes } from './country-codes';

interface InputProps {
  id: string;
  name: string;
  labelText: string;
  light: boolean;
  disabled?: boolean;
  placeholder?: string;
}

export const PhoneField: React.FC<InputProps> = props => {
  const { t } = useTranslation();
  const [countryCode, setCountryCode] = useState('');

  const handleCountryCodeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCountryCode(event.target.value);
  };

  const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {};

  return (
    <div className={styles.phoneFieldContainer}>
      <div className={styles.fieldRow}>
        <div className={styles.fieldColumn}>
          <h4 className={styles.productiveHeading02Light}>{t('mobileCountryCodeLabelText', 'Mobile Country Code')}</h4>
          <select
            id="mobileCountryCode"
            name="mobileCountryCode"
            className={styles.selectInput}
            onChange={handleCountryCodeChange}
            value={countryCode}>
            <option value="" disabled>
              {t('selectCountryCode', 'Select Country Code')}
            </option>
            {countryCodes.map(code => (
              <option key={code.value} value={code.value}>
                {code.label}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.fieldColumn}>
          <h4 className={styles.productiveHeading02Light}>{t('phoneLabelText', 'Phone')}</h4>
          <TextInput
            id="phone"
            name="phone"
            labelText={t('phoneNumberInputLabelText', 'Clients Telephone Number')}
            light={true}
            value={countryCode}
          />
        </div>
      </div>
    </div>
  );
};
