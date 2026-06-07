export function FlashMessage({ success, error }) {
  if (!success && !error) {
    return null;
  }

  return (
    <div className={`flash ${success ? "flash-success" : "flash-error"}`}>
      <strong>{success ? success : error}</strong>
    </div>
  );
}
