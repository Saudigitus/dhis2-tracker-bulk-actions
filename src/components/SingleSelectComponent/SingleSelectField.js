import { CenteredContent, CircularLoader } from '@dhis2/ui';
import React from 'react'
// eslint-disable-next-line import/order
import { Autocomplete } from '@material-ui/lab';
// eslint-disable-next-line import/order
import { TextField, makeStyles } from '@material-ui/core';


const useStyles = makeStyles({
  root: {
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: '#A0ADBA', // cor da borda padrão
    },
    '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: '#A0ADBA', // cor da borda onHover
    },
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: '#147CD7', // cor da borda quando clicado
    },
  },
});


// eslint-disable-next-line react/prop-types
const OptionSetAutocomplete = ({ options, value, onChange, helperText, disabled }) => {
  const classes = useStyles();

  return (
    <Autocomplete
      classes={classes}
      options={options}
      closeIcon={null}
      getOptionLabel={(option) => option?.label}
      getOptionSelected={(option, value) => option.value === value}
      value={options.filter(element => element.value === value)?.[0]}
      disabled={disabled}
      renderInput={(params) => (
        <TextField
          {...params}
          variant="outlined"
          size='small'
          InputProps={{
            ...params.InputProps,
            style: {
              backgroundColor: '#fff', // fundo branco
            },
          }}
          placeholder={helperText}
          disabled={disabled}
        />
      )}
      onChange={onChange}
    />
  );
};


// eslint-disable-next-line react/prop-types
function SingleSelectField({ onChange, value, loading, options, helperText, disabled }) {

  if (loading) {
    return (
      <CenteredContent>
        <CircularLoader small />
      </CenteredContent>
    )
  }

  return (
    <div style={{ maxHeight: 200, zIndex: 1000 }} >
      <OptionSetAutocomplete
        onChange={onChange}
        options={options}
        value={value}
        helperText={helperText}
        disabled={disabled}
      />
    </div>
  )
}

export default SingleSelectField

