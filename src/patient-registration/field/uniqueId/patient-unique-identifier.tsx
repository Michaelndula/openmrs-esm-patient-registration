import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Tile, ComboBox, Layer, Button, Search, InlineLoading } from '@carbon/react';
import TextInput from 'carbon-components-react/es/components/TextInput';
import styles from './patient-unique-identifier.scss';
import { showToast } from '@openmrs/esm-framework';
import { FormikProps } from 'formik';
import { FormValues } from '../../patient-registration-types';
import { states, facility } from './assets/identifier-assets';

interface PatientIdentifierProps {
  props: FormikProps<FormValues>;
}

interface Item {
  label: string;
  value: string;
  name: string;
}

const PatientVerification: React.FC<PatientIdentifierProps> = ({ props }) => {
  const { t } = useTranslation();

  const [selectedState, setSelectedState] = useState(states[0]);
  const [selectedFacility, setSelectedFacility] = useState(facility[0]);
  const [uniqueArtNumber, setUniqueArtNumber] = useState('');

  const transformStateValue = selectedItem => {
    const words = selectedItem.label.split(' ');
    const transformedValue = words.map(word => word[0].toUpperCase()).join('');
    return { ...selectedItem, label: transformedValue, value: transformedValue };
  };

  const transformFacilityValue = selectedItem => {
    const words = selectedItem.label.split(' ');
    const transformedValue = words.map(word => word[0].toUpperCase()).join('');
    return { ...selectedItem, label: transformedValue, value: transformedValue };
  };

  const handleStateChange = selectedItem => {
    setSelectedState(transformStateValue(selectedItem));
    updatePatientIdentifier();
  };

  const handleFacilityChange = selectedItem => {
    setSelectedFacility(transformFacilityValue(selectedItem));
    updatePatientIdentifier();
  };

  const updatePatientIdentifier = () => {
    const combinedText = `${selectedState.value}/${selectedFacility.value}/`;
    setUniqueArtNumber(combinedText);
  };

  return (
    <div id={'patientIdentifier'}>
      <h3 className={styles.productiveHeading02} style={{ color: '#161616' }}>
        {t('uniqueArtNumber', 'Unique ART Number')}
      </h3>
      <div style={{ margin: '1rem 0 1rem' }}>
        <Tile className={styles.wrapper}>
          <Layer>
            <ComboBox
              ariaLabel={t('selectState', 'Select State')}
              id="selectState"
              items={states}
              itemToString={(item: Item) => item?.name ?? ''}
              titleText={t('selectState', 'Select State')}
              initialSelectedItem={states[0]}
              onChange={handleStateChange}
            />
          </Layer>
          <Layer>
            <ComboBox
              ariaLabel={t('selectFacility', 'Select Facility')}
              id="selectFacility"
              items={facility}
              itemToString={(item: Item) => item?.name ?? ''}
              titleText={t('selectFacility', 'Select Facility')}
              initialSelectedItem={facility[0]}
              onChange={handleFacilityChange}
            />
          </Layer>
          <Layer>
            <TextInput id="uniqueArtNumber" labelText="Number" placeholder="Enter text here" value={uniqueArtNumber} />
          </Layer>
        </Tile>
      </div>
    </div>
  );
};

export default PatientVerification;
