import Button from "./components/button"

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-doto)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <Button/>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <a href="https://wavecut.dev" aria-description="wavecut website">wavecut.dev</a>
      </footer>
    </div>
  );
}
