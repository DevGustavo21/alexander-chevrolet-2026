export default function Logo({ size = 28 }) {
  return (
    <svg viewBox="0 0 32 32" width={size} height={size} fill="none">
      <path d="M16 4 L28 12 L24 16 L16 11 L8 16 L4 12 Z" fill="currentColor" />
      <path
        d="M16 13 L28 20 L24 24 L16 19 L8 24 L4 20 Z"
        fill="currentColor"
        opacity="0.5"
      />
    </svg>
  );
}
