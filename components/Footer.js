export default function Footer() {
  return (
    <footer className="bg-white/60 border-t">
      <div className="container py-8 text-center text-sm text-slate-600">
        <p>Made with ❤️ — bring dancing shoes. © {new Date().getFullYear()}</p>
      </div>
    </footer>
  )
}
