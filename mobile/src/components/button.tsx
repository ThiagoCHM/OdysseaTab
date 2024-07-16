import { createContext, useContext } from "react"

import {
  Text,
  TextProps,
  TouchableOpacity,
  ActivityIndicator,
  TouchableOpacityProps,
} from "react-native"
import clsx from "clsx"

type Variants = "primary" | "secondary"

type ButtonProps = TouchableOpacityProps & {
  variant?: Variants
  isLoading?: boolean
}

const ThemeContext = createContext<{ variant?: Variants }>({})

function Button({
  variant = "primary",
  children,
  isLoading,
  className,
  ...rest
}: ButtonProps) {
  return (
    <TouchableOpacity
      className={clsx(
        "h-11 flex-row items-center justify-center rounded-lg gap-2 px-2",
        {
          "bg-sky-500": variant === "primary",
          "bg-zinc-800": variant === "secondary",
        },
        className
      )}
      activeOpacity={0.7}
      disabled={isLoading}
      {...rest}
    >
      <ThemeContext.Provider value={{ variant }}>
        {isLoading ? <ActivityIndicator className="text-cian-600" /> : children}
      </ThemeContext.Provider>
    </TouchableOpacity>
  )
}

function Title({ children }: TextProps) {
  const { variant } = useContext(ThemeContext)

  return (
    <Text
      className={clsx("text-base font-semibold", {
        "text-zinc-100": variant === "primary",
        "text-zinc-200": variant === "secondary",
      })}
    >
      {children}
    </Text>
  )
}

Button.Title = Title

export { Button }
