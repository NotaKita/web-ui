import { useEffect, useState } from "react"
import { GlobalWorkerOptions, getDocument } from "pdfjs-dist"
import workerUrl from "pdfjs-dist/build/pdf.worker.min.mjs?url"

GlobalWorkerOptions.workerSrc = workerUrl

// Semua berkas yang ditaruh di folder /lampiran ikut tercetak setelah invoice.
const lampiranFiles = import.meta.glob("/lampiran/*.{pdf,png,jpg,jpeg,webp}", {
  eager: true,
  query: "?url",
  import: "default",
}) as Record<string, string>

// Skala render PDF -> gambar. 2x supaya tetap tajam saat dicetak.
const RENDER_SCALE = 2

type LampiranPage = {
  key: string
  fileName: string
  pageNumber: number
  pageCount: number
  src: string
}

const fileNameOf = (path: string) => path.split("/").pop() ?? path

// Saat dicetak, satu halaman lampiran = satu halaman kertas.
const printStyles = `
  @media print {
    .lampiran-page {
      break-before: page;
      break-inside: avoid;
      height: 100vh;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      padding-bottom: 0;
      margin: 0;
    }
    .lampiran-page img {
      flex: 1 1 auto;
      min-height: 0;
      width: 100%;
      object-fit: contain;
      object-position: top center;
    }
  }
`

const renderPdf = async (path: string, url: string): Promise<LampiranPage[]> => {
  const pdf = await getDocument({ url }).promise
  const pages: LampiranPage[] = []

  for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber++) {
    const page = await pdf.getPage(pageNumber)
    const viewport = page.getViewport({ scale: RENDER_SCALE })
    const canvas = document.createElement("canvas")
    const context = canvas.getContext("2d")
    if (!context) continue

    canvas.width = viewport.width
    canvas.height = viewport.height
    await page.render({ canvas, canvasContext: context, viewport }).promise

    pages.push({
      key: `${path}-${pageNumber}`,
      fileName: fileNameOf(path),
      pageNumber,
      pageCount: pdf.numPages,
      src: canvas.toDataURL("image/png"),
    })
  }

  return pages
}

const Lampiran = () => {
  const [pages, setPages] = useState<LampiranPage[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let isActive = true

    const loadAll = async () => {
      try {
        const entries = Object.entries(lampiranFiles).sort(([a], [b]) => a.localeCompare(b))
        const result: LampiranPage[] = []

        for (const [path, url] of entries) {
          if (path.toLowerCase().endsWith(".pdf")) {
            result.push(...(await renderPdf(path, url)))
          } else {
            result.push({
              key: path,
              fileName: fileNameOf(path),
              pageNumber: 1,
              pageCount: 1,
              src: url,
            })
          }
        }

        if (isActive) setPages(result)
      } catch (e) {
        if (isActive) setError(e instanceof Error ? e.message : "Gagal memuat lampiran")
      } finally {
        if (isActive) setIsLoading(false)
      }
    }

    loadAll()
    return () => {
      isActive = false
    }
  }, [])

  if (Object.keys(lampiranFiles).length === 0) return null

  if (isLoading) {
    return (
      <div className="mt-8 text-center text-xs text-gray-500 print:hidden">Memuat lampiran...</div>
    )
  }

  if (error) {
    return <div className="mt-8 text-center text-xs text-red-600 print:hidden">Lampiran gagal dimuat: {error}</div>
  }

  return (
    <>
      <style>{printStyles}</style>
      {pages.map((page) => (
        <div
          key={page.key}
          className="lampiran-page max-w-4xl mx-auto px-8 pb-8 bg-white break-before-page"
        >
          <div className="flex items-baseline justify-between border-b border-gray-100 pb-2 mb-4">
            <h3 className="text-md font-semibold text-gray-800">Lampiran</h3>
            <span className="text-xs text-gray-500">
              {page.fileName}
              {page.pageCount > 1 ? ` — hal. ${page.pageNumber}/${page.pageCount}` : ""}
            </span>
          </div>
          <img
            src={page.src}
            alt={`Lampiran ${page.fileName} halaman ${page.pageNumber}`}
            className="w-full h-auto border border-gray-150"
          />
        </div>
      ))}
    </>
  )
}

export default Lampiran
