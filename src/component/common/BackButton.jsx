import { useNavigate } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'
import { Button } from './Button'

export const BackButton = ({ to = -1, label = 'Back' }) => {
  const navigate = useNavigate()

  const handleClick = () => {
    if (typeof to === 'number') {
      navigate(to)
    } else {
      navigate(to)
    }
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleClick}
      className="flex items-center gap-2 mb-4"
    >
      <FiArrowLeft className="w-4 h-4" />
      {label}
    </Button>
  )
}
