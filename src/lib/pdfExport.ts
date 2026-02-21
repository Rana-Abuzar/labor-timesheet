import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export async function exportToPDF(
  element: HTMLElement,
  laborName: string,
  month: string,
  year: string | number
): Promise<void> {
  try {
    // Hide any non-printable elements if needed
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
    });

    const imgData = canvas.toDataURL('image/jpeg', 0.98);
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: true,
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = pdfWidth - 20; // 10mm margin on each side
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = 10; // Top margin

    pdf.addImage(imgData, 'JPEG', 10, position, imgWidth, imgHeight);
    heightLeft -= pdfHeight - 20; // Account for margins

    // Add new pages if content overflows
    while (heightLeft > 0) {
      position = heightLeft - imgHeight + 10;
      pdf.addPage();
      pdf.addImage(imgData, 'JPEG', 10, position, imgWidth, imgHeight);
      heightLeft -= pdfHeight - 20;
    }

    const filename = `TimeSheet_${laborName || 'Labor'}_${month}_${year}.pdf`;
    pdf.save(filename);
  } catch (error) {
    console.error('PDF export error:', error);
    throw new Error('Failed to export PDF');
  }
}
