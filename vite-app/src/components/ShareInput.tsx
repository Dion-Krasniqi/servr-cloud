import type { ShareProps } from '../types'

const ShareInput = ({file,onInputChange,onRemove}:ShareProps) => {
  console.log(file.file_id)
  return (
    <div>ShareInput</div>
  )
}

export default ShareInput