"use client";

export function ConfirmForm({
  action,
  children,
  confirmMessage,
  onSubmit,
  ...props
}) {
  const handleSubmit = (event) => {
    onSubmit?.(event);

    if (event.defaultPrevented || !confirmMessage) {
      return;
    }

    if (!window.confirm(confirmMessage)) {
      event.preventDefault();
      event.stopPropagation();
    }
  };

  return (
    <form action={action} onSubmit={handleSubmit} {...props}>
      {children}
    </form>
  );
}
