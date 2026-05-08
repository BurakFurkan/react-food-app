import { TbFaceIdError } from 'react-icons/tb'

export function ErrorHandler() {
  return (
    <div className="pt-20 flex flex-col items-center justify-start gap-4">
      <TbFaceIdError className="text-5xl text-[rgb(237,234,222)] transition-all duration-300" />
      <h2 className="text-text-secondary text-lg font-semibold text-center">
        Ooops.. Seems like Something Bad Happened :S
      </h2>
    </div>
  )
}
