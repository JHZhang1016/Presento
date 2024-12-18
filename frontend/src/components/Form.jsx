import { useEffect } from 'react';
import { useState } from 'react';
import { Button, Flowbite, Label, TextInput, FileInput, Textarea } from 'flowbite-react';

const Form = ({ title, fields, buttonText, onSubmit }) => {
  const [errors, setErrors] = useState({});
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const handleValidation = (field) => {
    setErrors({ ...errors, [field.name]: field.validate ? field.validate(field.value) : '' });
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit();
  }

  const changeButtonState = () => {


    if (fields.every(field => field.validate ? field.validate(field.value) === '' : true)) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }

  useEffect(() => {
    changeButtonState();
  }, [fields, errors]);

  const label = (field) => {
    return (
      <Label
        htmlFor={field.name} value={field.label} className='mt-2'
        color={(errors[field.name] && errors[field.name] !== '') ? 'failure' : null}
      />
    )
  }

  return (
    <Flowbite>
      <div>
        <h5 className='text-2xl font-bold text-gray-900 dark:text-white mb-6'>
          {title}
        </h5>
        <form onSubmit={handleSubmit} className='flex flex-col *:flex-grow gap-2' noValidate>
          {fields.map((field) => (
            <div className='inline' key={field.name}>
              {
                field.type === 'textarea' &&
                <>
                  {label(field)}
                  <Textarea id={field.name} name={field.name} placeholder={field.placeholder} value={field.value} onChange={field.onChange} line={4}
                    className='text-gray-900 dark:text-black dark:bg-gray-50'
                    color={(errors[field.name] && errors[field.name] !== '') ? 'failure' : null}
                    helperText={errors[field.name] !== '' ? errors[field.name] : null}
                    onBlur={() => {
                      handleValidation(field);
                      changeButtonState();
                    }} />
                </>
              }
              {
                field.type === 'checkbox' &&
                <>
                  {label(field)}
                  <input id={field.name} name={field.name} type={field.type} checked={field.checked} onChange={field.onChange}
                    className='ml-6'
                    onBlur={() => {
                      handleValidation(field);
                      changeButtonState();
                    }} />
                </>
              }
              {
                field.type === 'select' &&
                <>
                  {label(field)}
                  <select id={field.name} name={field.name} value={field.value} onChange={field.onChange}
                    onBlur={() => {
                      handleValidation(field);
                      changeButtonState();
                    }}>
                    {field.options.map((option, index) => (
                      <option key={index} value={option}>{option}</option>
                    ))}
                  </select>
                </>
              }
              {
                field.type === 'file' &&
                <>
                  {label(field)}
                  <FileInput id={field.name} name={field.name} accept={field.accept} onChange={field.onChange}
                    onBlur={() => {
                      handleValidation(field);
                      changeButtonState();
                    }} />
                </>
              }
              {
                field.type === 'color' &&
                <>
                  {label(field)}
                  <input id={field.name} name={field.name} value={field.value} type='color' className='p-1 h-10 w-full block bg-white border border-gray-200 cursor-pointer rounded-lg disabled:opacity-50 disabled:pointer-events-none'
                    onChange={(e) => { field.onChange(e); changeButtonState(); }}
                  />
                </>
              }

              {(field.type !== 'textarea' && field.type !== 'checkbox' && field.type !== 'select' && field.type !== 'file' && field.type != 'color') &&
                <>
                  {label(field)}
                  <TextInput id={field.name} name={field.name} type={field.type} placeholder={field.placeholder} value={field.value}
                    className='text-gray-900'
                    helperText={errors[field.name] !== '' ? errors[field.name] : null}
                    color={(errors[field.name] && errors[field.name] !== '') ? 'failure' : null}
                    onBlur={() => {
                      handleValidation(field);
                      changeButtonState();
                    }}
                    onChange={(e) => {
                      field.onChange(e);
                      changeButtonState();
                    }}
                  ></TextInput>
                </>
              }
            </div>
          ))}
          <Button color='blue' type='submit' disabled={buttonDisabled} className='mt-10' aria-label='submit form'>{buttonText}</Button>

        </form>
      </div>
    </Flowbite>
  )
}

export default Form;