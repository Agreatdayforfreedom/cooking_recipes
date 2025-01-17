interface Props {
  error?: string;
}

export const ErrorMessage = ({ error }: Props) => {
  return (
    <span
      aria-label="error container"
      className="text-sm text-red-800 font-semibold"
    >
      {error && error}
    </span>
  );
};
