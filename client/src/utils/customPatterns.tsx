import React from 'react';
import { PatternFormat, PatternFormatProps } from 'react-number-format';

interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
  format: string;
}


const CPFPatternCustom = React.forwardRef<PatternFormatProps, CustomProps>(
  function NumericFormatCustom(props, ref) {
    const { onChange, ...other } = props;

    return (
      <PatternFormat
        {...other}
        getInputRef={ref}
        onValueChange={(values) => {
          onChange({
            target: {
              name: props.name,
              value: values.value,
            },
          });
        }}
        format="###.###.###-##"
        mask=""
      />
    );
  }
);

const PhonePatternCustom = React.forwardRef<PatternFormatProps, CustomProps>(
  function NumericFormatCustom(props, ref) {
    const { onChange, ...other } = props;

    return (
      <PatternFormat
        {...other}
        getInputRef={ref}
        onValueChange={(values) => {
          onChange({
            target: {
              name: props.name,
              value: values.value,
            },
          });
        }}
        format="(##) #####-####"
        mask=""
      />
    );
  }
);

export { CPFPatternCustom, PhonePatternCustom };