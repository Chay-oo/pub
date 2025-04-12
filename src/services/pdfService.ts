import html2pdf from 'html2pdf.js';
import { useFinanceStore } from '../store/financeStore';

interface PDFOptions {
  filename?: string;
  margin?: number[];
  image?: {
    type: string;
    quality: number;
  };
  html2canvas?: {
    scale: number;
    useCORS: boolean;
    logging: boolean;
  };
  jsPDF?: {
    unit: string;
    format: string;
    orientation: string;
  };
  pagebreak?: {
    mode: string;
  };
}

export const generatePDF = async (
  element: HTMLElement,
  options: Partial<PDFOptions> = {}
) => {
  // Get the user's name from the store
  const data = useFinanceStore.getState().data;
  const userName = data.personal?.fullName || 'User';
  
  // Create filename with user's name
  const filename = `Financial_Advisory_${userName.replace(/\s+/g, '_')}.pdf`;

  const defaultOptions: PDFOptions = {
    filename,
    margin: [0.5, 0.5],
    image: {
      type: 'jpeg',
      quality: 0.98,
    },
    html2canvas: {
      scale: 2,
      useCORS: true,
      logging: false,
    },
    jsPDF: {
      unit: 'in',
      format: 'letter',
      orientation: 'portrait',
    },
    pagebreak: {
      mode: 'avoid-all',
    },
  };

  const mergedOptions = { ...defaultOptions, ...options };

  try {
    // Clone the original element to avoid modifying it
    const clonedElement = element.cloneNode(true) as HTMLElement;

    // Add the salutation with the user's name
    const salutation = document.createElement('div');
    salutation.className = 'text-xl font-semibold text-gray-900 mb-6';
    salutation.textContent = `Dear ${userName},`;
    clonedElement.prepend(salutation);

    // Remove the action buttons section
    const actionButtons = clonedElement.querySelector('.flex.justify-between.pt-6');
    if (actionButtons) {
      actionButtons.remove();
    }

    // Generate the PDF using the modified cloned element
    await html2pdf().set(mergedOptions).from(clonedElement).save();
    return true;
  } catch (error) {
    console.error('Error generating PDF:', error);
    return false;
  }
};