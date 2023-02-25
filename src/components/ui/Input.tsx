import '../../assets/css/Input.css'

interface InputProps {
    id?: any;
    title: string;
    inputName: string;
    className?: string;
    fn: (value:any) => void;
    value?: any
    disabled?: boolean;
    type?: 'text' | 'password' | 'email' | 'number' | 'tel' 
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
}


export const Input = ({title, inputName, className, fn, value, disabled, type="text", id, onBlur}:InputProps) => {
  return (
    <div className="group-inpt">
        <input id={id} disabled={disabled || false} required name={inputName} value={value} type={type} className={`input ${className?? className}`} onChange={fn} onBlur={onBlur}/>
        <span className="highlight"></span>
        <span className="bar"></span>
        <label className='label text-devarana-midnight font-light text-opacity-50'>{title}</label>
    </div>
  )
}
