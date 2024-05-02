
export default function Main({ children, className, ...props }) {
  return (
    <main
      id="main-content"
      tabIndex={-1}
      className=""
      {...props}
    >
      {children}
    </main>
  );
}
