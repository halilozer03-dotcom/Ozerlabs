import { useEffect } from 'react'

/**
 * Sekme başlığını ve arama sonucu açıklamasını yazan TEK mekanizma.
 *
 * Sözleşme: BAŞLIĞIN SAHİBİ ROTADIR. <Routes> aynı anda tek bir rota bileşeni
 * bağlar, o bileşen de kendi başlığını kendi yazar. Temizleme (cleanup)
 * YOKTUR — bilerek:
 *
 *   - Eski sözleşmede blog sayfaları ayrılırken "sitenin varsayılanına"
 *     dönüyordu. O varsayılan (siteMeta.js) derleme anında index.html'den
 *     gömülen SABİT FRANSIZCA metindi. Ziyaretçi Türkçedeyken blogdan çıkınca
 *     sekmede Fransızca başlık kalıyordu — P1-1'in kök nedeni buydu.
 *   - Ayrılan bileşenin "varsayılana dön" yazması ile bağlanan bileşenin kendi
 *     başlığını yazması aynı commit'e düşer; doğru sonuç React'in "önce
 *     cleanup, sonra effect" sırasına bağlı kalırdı. Tek yazıcı bırakılınca
 *     sıraya bağlı yarış durumu tamamen ortadan kalkar.
 *
 * title boşsa hiçbir şey yazılmaz. Çağıranlar bu duruma DÜŞMEMEK zorundadır:
 * her rota her koşulda bir başlık verir (BlogPost yazıyı bulamazsa sitenin
 * varsayılanını verir). Aksi halde sekmede bir önceki sayfanın başlığı kalır.
 */
export function useDocumentMeta(title, description) {
  useEffect(() => {
    if (!title) return
    document.title = title
    const metaDesc = document.querySelector('meta[name="description"]')
    if (metaDesc && description) metaDesc.setAttribute('content', description)
  }, [title, description])
}
