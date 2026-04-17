import { cn } from '@/lib/utils';
import React from 'react'

const FormattedDateTime = ({date, className}:{date:string;className?:string}) => {
  return (
    <p className={cn(className)}>{date.substring(0,10)}</p>
  )
}

export default FormattedDateTime