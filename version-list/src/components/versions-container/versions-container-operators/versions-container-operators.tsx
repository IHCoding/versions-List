import React, { useState } from 'react';
import styled from 'styled-components';
import ArrowDropDownIcon from '../../../custom-components/icons/arrow-drop-down-icon';
import ArrowDropUpIcon from '../../../custom-components/icons/arrow-drop-up-icon';
import { OperatorsListValues } from '../../../utils/global-values/operators-list-values/operators-list-values';
import VersionsContainerInputField from '../versions-container-input-field';

const VersionsContainerInputRoot = styled.div`
  border-radius: 4px;
  min-height: 24px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 85px;
  margin-top: 3rem;
  padding: 1rem;
  box-sizing: border-box;
  position: relative;
`;

const OperatorLabelAndIconsContainer = styled.div`
  border-radius: 5px;
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  justify-content: space-between;
  box-sizing: border-box;
  cursor: pointer;
  position: relative;
`;

const OperatorLabelsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 8px;
`;

const OperatorLabel = styled.div`
  font-size: 16px;
  margin: 2px;
  padding: 4px;
`;

const OperatorChosen = styled.div`
  font-size: 16px;
  padding: 4px;
  margin: 2px;
`;

const IconContainer = styled.div`
  position: absolute;
  right: 0;
  bottom: 18px;
  margin: 8px;
  margin-right: 12px;
`;

const DropdownOperatorsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 8px 0;
  box-shadow: 0px 4px 8px rgb(0 0 0 / 35%);
  position: absolute;
  top: 89px;
  border-radius: 4px;
  background-color: white;
`;

const DropdownItemSpan = styled.span`
  margin-bottom: 2px;
  cursor: pointer;
  padding: 4px 16px;
  height: 30px;
  color: black;
  font-size: 1em;
  border-radius: 4px;

  &:hover {
    background: rgba(0, 0, 0, 0.3);
    color: #fff;
  }
`;

const activeDropdown = {
  backgroundColor: '#4E4A4A',
  color: '#fff',
};

const DropdownTriggerContainer = styled.div`
  border: 1px solid rgb(166 166 166);
  background: rgb(246 246 246);
  width: 100%;
  border-radius: 5px;
  height: 100%;
  min-width: 120px;
`;

const Operators = Object.values(OperatorsListValues);

const VersionsContainerOperators: React.FC<any> = (props) => {
  const [dropdown, setDropdown] = useState<boolean>(false);

  console.log('logging value', props);

  const handleDropdown = () => {
    console.log('triggered button');
    setDropdown(!dropdown);
  };

  const handleOperatorclick = (value: string) => {
    props.onSelectVersion({ ...props.currentForm, operator: value });
    setDropdown(!dropdown);
  };

  return (
    <VersionsContainerInputRoot>
      <OperatorLabelAndIconsContainer onClick={() => handleDropdown()}>
        <DropdownTriggerContainer>
          <OperatorLabelsContainer>
            <OperatorLabel>Operator </OperatorLabel>
            <OperatorChosen>{props.currentForm.operator}</OperatorChosen>
          </OperatorLabelsContainer>
          <IconContainer>
            {dropdown ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
          </IconContainer>
        </DropdownTriggerContainer>
        {dropdown && (
          <DropdownOperatorsContainer>
            {Operators.map((item) => (
              <DropdownItemSpan
                key={item}
                onClick={() => handleOperatorclick(item)}
                style={
                  item === props.currentForm.operator ? activeDropdown : {}
                }
              >
                {item}
              </DropdownItemSpan>
            ))}
          </DropdownOperatorsContainer>
        )}
      </OperatorLabelAndIconsContainer>
      {props.currentForm.operator && props.currentForm.operator === 'Between' && (
        <VersionsContainerInputField
          value={props.currentForm.minVersion}
          setValue={(val: string) => {
            props.onSelectVersion({ ...props.currentForm, minVersion: val });
          }}
        />
      )}
      <VersionsContainerInputField
        value={props.currentForm.maxVersion}
        setValue={(val: string) => {
          props.onSelectVersion({ ...props.currentForm, maxVersion: val });
        }}
      />
    </VersionsContainerInputRoot>
  );
};

export default VersionsContainerOperators;
