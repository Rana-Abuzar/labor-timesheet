import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export async function exportToPDF(
  element: HTMLElement,
  laborName: string,
  month: string,
  year: string | number
): Promise<void> {
  try {
    // Replace inputs/selects/textareas with spans
    const inputs = element.querySelectorAll('input, select, textarea');
    const inputOriginals: { el: HTMLElement; display: string; span: HTMLSpanElement }[] = [];

    inputs.forEach((input) => {
      const el = input as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
      const span = document.createElement('span');
      span.textContent = el instanceof HTMLSelectElement
        ? el.options[el.selectedIndex]?.text || el.value
        : el.value;
      const computed = window.getComputedStyle(el);
      span.style.fontSize = computed.fontSize;
      span.style.fontWeight = computed.fontWeight;
      span.style.fontFamily = computed.fontFamily;
      span.style.color = computed.color;
      span.style.textAlign = computed.textAlign;
      span.style.width = '100%';
      span.style.display = 'inline-block';
      span.style.verticalAlign = 'middle';
      span.style.lineHeight = computed.lineHeight;
      span.style.whiteSpace = 'pre-wrap';
      span.style.wordBreak = 'break-word';
      el.parentNode?.insertBefore(span, el);
      inputOriginals.push({ el, display: el.style.display, span });
      el.style.display = 'none';
    });

    // Fix vertical centering for html2canvas
    // html2canvas doesn't render vertical-align: middle correctly
    // Fix: set line-height = cell inner height for single-line cells
    const cells = element.querySelectorAll('td, th');
    const cellFixups: { el: HTMLElement; origLH: string; origVA: string; origH: string }[] = [];

    cells.forEach((cell) => {
      const el = cell as HTMLElement;
      const computed = window.getComputedStyle(el);

      if (computed.verticalAlign === 'middle') {
        // Skip multi-line cells (headers with <br> tags)
        const hasBr = el.innerHTML.includes('<br');
        if (hasBr) return;

        const cellH = el.offsetHeight;
        const pTop = parseFloat(computed.paddingTop);
        const pBot = parseFloat(computed.paddingBottom);
        const bTop = parseFloat(computed.borderTopWidth);
        const bBot = parseFloat(computed.borderBottomWidth);
        const innerH = cellH - pTop - pBot - bTop - bBot;

        if (innerH > 0) {
          cellFixups.push({
            el,
            origLH: el.style.lineHeight,
            origVA: el.style.verticalAlign,
            origH: el.style.height,
          });
          el.style.height = cellH + 'px';
          el.style.lineHeight = innerH + 'px';
          el.style.verticalAlign = 'top';
        }
      }
    });

    // Force reflow
    element.offsetHeight;

    // Wait for browser to paint
    await new Promise<void>((resolve) => {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => resolve());
      });
    });

    // Capture with html2canvas
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      backgroundColor: '#ffffff',
      logging: false,
    });
    const dataUrl = canvas.toDataURL('image/png', 0.98);

    // Restore cell styles
    cellFixups.forEach(({ el, origLH, origVA, origH }) => {
      el.style.lineHeight = origLH;
      el.style.verticalAlign = origVA;
      el.style.height = origH;
    });

    // Restore original inputs
    inputOriginals.forEach(({ el, display, span }) => {
      el.style.display = display;
      span.remove();
    });

    // Create PDF
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: true,
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = pdfWidth;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(dataUrl, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pdfHeight;

    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(dataUrl, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pdfHeight;
    }

    const filename = `TimeSheet_${laborName || 'Labor'}_${month}_${year}.pdf`;
    pdf.save(filename);
  } catch (error) {
    console.error('PDF export error:', error);
    throw new Error('Failed to export PDF');
  }
}
